const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateInventoryOnOrder = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
        const order = snap.data();
        const batch = admin.firestore().batch();

        order.items.forEach(item => {
            const productRef = admin.firestore().collection('products').doc(item.id);
            batch.update(productRef, {
                stock: admin.firestore.FieldValue.increment(-item.quantity)
            });
        });

        await batch.commit();
    });
