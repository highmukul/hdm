const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.onCreateOrder = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
        const order = snap.data();
        const items = order.items;

        if (!order.storeId) {
            console.error('storeId is missing from the order');
            return null;
        }

        // Update sales count for each product
        const batch = db.batch();
        items.forEach(item => {
            const productRef = db.collection('stores').doc(order.storeId).collection('products').doc(item.id);
            batch.update(productRef, { salesCount: admin.firestore.FieldValue.increment(item.quantity) });
        });
        await batch.commit();

        // Recompute "also bought" pairs
        const analyticsBatch = db.batch();
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                const itemA = items[i].id;
                const itemB = items[j].id;

                const docRef1 = db.collection('analytics').doc('alsoBought').collection(itemA).doc(itemB);
                const docRef2 = db.collection('analytics').doc('alsoBought').collection(itemB).doc(itemA);

                analyticsBatch.set(docRef1, { count: admin.firestore.FieldValue.increment(1) }, { merge: true });
                analyticsBatch.set(docRef2, { count: admin.firestore.FieldValue.increment(1) }, { merge: true });
            }
        }
        await analyticsBatch.commit();


        return null;
    });

exports.onProductUpdate = functions.firestore
    .document('stores/{storeId}/products/{productId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();

        if (newValue.price !== previousValue.price || newValue.discountRules !== previousValue.discountRules) {
            const discountedPrice = calculateDiscountedPrice(newValue);
            await change.after.ref.update({ discountedPrice });
        }
        return null;
    });


exports.expireDiscounts = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const query = db.collectionGroup('products').where('hasActiveDiscount', '==', true);
    const snapshot = await query.get();

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        const product = doc.data();
        const updatedRules = product.discountRules.filter(rule => rule.endDate > now);
        const hasActiveDiscount = updatedRules.length > 0;
        batch.update(doc.ref, { discountRules: updatedRules, hasActiveDiscount });
    });

    await batch.commit();
    return null;
});

function calculateDiscountedPrice(product) {
    const rule = product.discountRules?.[0];
    if (!rule) return product.price;

    if (rule.type === 'flat') {
        return product.price - rule.value;
    } else if (rule.type === 'percent') {
        return product.price * (1 - rule.value / 100);
    }
    return product.price;
}
