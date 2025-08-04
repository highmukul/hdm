const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GeoFirestore } = require('geofirestore');

admin.initializeApp();

const db = admin.firestore();
const geoFirestore = new GeoFirestore(db);
const captainsCollection = geoFirestore.collection('captains');

exports.onCreateOrder = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
        const order = snap.data();
        const orderId = context.params.orderId;

        const query = captainsCollection.near({
            center: new admin.firestore.GeoPoint(order.shippingAddress.location.lat, order.shippingAddress.location.lng),
            radius: 10 // km
        }).where('isOnline', '==', true).where('status', '==', 'available');

        const captains = await query.get();

        if (captains.empty) {
            console.log('No available captains.');
            // Implement a retry mechanism or notify the user
            return null;
        }

        const nearestCaptain = captains.docs[0];

        if (nearestCaptain) {
            await db.collection('orders').doc(orderId).update({
                captainId: nearestCaptain.id,
                status: 'assigned'
            });
            await nearestCaptain.ref.update({ status: 'busy' });

            // Send notification to captain
            // ... (implementation of FCM notification)
        }

        return null;
    });

exports.onUpdateOrderStatus = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();

        if (newValue.status !== previousValue.status) {
            // Send notification to customer
            // ... (implementation of FCM notification)

            if (newValue.status === 'delivered') {
                await db.collection('captains').doc(newValue.captainId).update({
                    status: 'available'
                });
            } else if (newValue.status === 'declined') {
                // Re-assign the order
                const orderId = context.params.orderId;
                // ... (call a new function to re-assign the order)
            }
        }

        return null;
    });

exports.onAuthCreateUser = functions.auth.user().onCreate(async (user) => {
    return null;
});
