const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Haversine formula for distance calculation
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to find eligible captains and send them bidding requests
exports.broadcastOrderToCaptains = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
        const orderData = snap.data();
        const { orderId } = context.params;

        if (orderData.status !== 'Pending') return null;

        const db = admin.firestore();
        const orderPincode = orderData.shippingAddress.zip;
        
        try {
            const captainsQuery = db.collection('captains')
                .where('isOnline', '==', true)
                .where('pincode', '==', orderPincode) // Matching pincode
                .where('activeOrderId', '==', null); // Not on a current delivery
            
            const captainsSnapshot = await captainsQuery.get();
            if (captainsSnapshot.empty) {
                await snap.ref.update({ status: 'Pending Assignment' });
                return null;
            }

            const earnings = (orderData.total * 0.20).toFixed(2); // 20% commission
            const batch = db.batch();

            captainsSnapshot.forEach(doc => {
                const captainData = doc.data();
                const distance = getDistanceInKm(
                    orderData.shippingAddress.location.lat,
                    orderData.shippingAddress.location.lng,
                    captainData.location.lat,
                    captainData.location.lng
                ).toFixed(2);

                // Create a bid request for each eligible captain
                const bidRef = db.collection('captains').doc(doc.id).collection('bids').doc(orderId);
                batch.set(bidRef, {
                    orderId,
                    customerAddress: orderData.shippingAddress.fullAddress,
                    earnings,
                    distance,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            });

            await batch.commit();
            console.log(`Bids sent to ${captainsSnapshot.size} captains for order ${orderId}`);
            return { result: `Bids sent to ${captainsSnapshot.size} captains.` };

        } catch (error) {
            console.error('Error broadcasting order:', error);
            await snap.ref.update({ status: 'Assignment Error' });
            return null;
        }
    });

// Function to handle a captain accepting a bid
exports.acceptBid = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
    
    const { orderId } = data;
    const captainId = context.auth.uid;
    const db = admin.firestore();
    
    const orderRef = db.collection('orders').doc(orderId);
    
    return db.runTransaction(async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists) throw new functions.https.HttpsError('not-found', 'Order no longer exists.');
        
        const orderData = orderDoc.data();
        if (orderData.status !== 'Pending') throw new functions.https.HttpsError('failed-precondition', 'This order has already been accepted.');

        // Update the order and the captain's status
        transaction.update(orderRef, { status: 'Accepted', captainId });
        transaction.update(db.collection('captains').doc(captainId), { activeOrderId: orderId });
        
        return { success: true, message: 'Order assigned to you!' };
    });
});

/**
 * Cloud Function to clean up product images from Cloud Storage when a product is deleted.
 */
exports.onProductDeleted = functions.firestore
    .document('products/{productId}')
    .onDelete(async (snap, context) => {
        const deletedProduct = snap.data();
        const imageUrls = deletedProduct.imageUrls;

        if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
            console.log(`Product ${context.params.productId} had no images to delete.`);
            return null;
        }

        const storage = admin.storage();
        
        const deletePromises = imageUrls.map(url => {
            try {
                const filePath = new URL(url).pathname.split('/o/')[1].split('?')[0];
                const decodedFilePath = decodeURIComponent(filePath);
                
                console.log(`Attempting to delete: ${decodedFilePath}`);
                return storage.bucket().file(decodedFilePath).delete();
            } catch (error) {
                console.error(`Error parsing URL or deleting file for URL: ${url}`, error);
                return Promise.resolve(); 
            }
        });
        
        try {
            await Promise.all(deletePromises);
            console.log(`Successfully deleted all images for product ${context.params.productId}.`);
            return { success: true };
        } catch (error) {
            console.error(`Error during batch deletion for product ${context.params.productId}:`, error);
            return { success: false, error: error.message };
        }
    });
