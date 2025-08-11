const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

function calculateDiscountedPrice(product) {
    const rule = product.discountRules?.[0];
    if (!rule) return product.price;
    if (rule.type === 'flat') return product.price - rule.value;
    if (rule.type === 'percent') return product.price * (1 - rule.value / 100);
    return product.price;
}

exports.onCreateOrder = onDocumentCreated("orders/{orderId}", async (event) => {
    const snap = event.data;
    if (!snap) {
        console.error("onCreateOrder: No data associated with the event, exiting.");
        return;
    }
    const order = snap.data();
    if (!order.storeId) {
        console.error('onCreateOrder: storeId is missing from the order.');
        return;
    }

    const productBatch = db.batch();
    order.items.forEach(item => {
        const productRef = db.collection('stores').doc(order.storeId).collection('products').doc(item.id);
        productBatch.update(productRef, { salesCount: admin.firestore.FieldValue.increment(item.quantity) });
    });
    await productBatch.commit();
    console.log("onCreateOrder: Product sales counts updated.");
});

exports.onProductUpdate = onDocumentUpdated("stores/{storeId}/products/{productId}", async (event) => {
    const change = event.data;
    if (!change) {
      console.error("onProductUpdate: No data associated with the event, exiting.");
      return;
    }
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.price !== previousValue.price || newValue.discountRules !== previousValue.discountRules) {
        const discountedPrice = calculateDiscountedPrice(newValue);
        await change.after.ref.update({ discountedPrice });
        console.log(`onProductUpdate: Updated discounted price for product ${change.after.id}`);
    }
});

exports.expireDiscounts = onSchedule('every 5 minutes', async (event) => {
    const now = admin.firestore.Timestamp.now();
    const query = db.collectionGroup('products').where('hasActiveDiscount', '==', true);
    const snapshot = await query.get();

    if (snapshot.empty) {
        console.log("expireDiscounts: No active discounts to expire.");
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        const product = doc.data();
        const updatedRules = product.discountRules.filter(rule => rule.endDate.toDate() > now.toDate());
        batch.update(doc.ref, { 
            discountRules: updatedRules, 
            hasActiveDiscount: updatedRules.length > 0 
        });
    });

    await batch.commit();
    console.log(`expireDiscounts: Processed discounts for ${snapshot.docs.length} products.`);
});

exports.sendVerificationEmail = require('./sendVerificationEmail');
exports.updateInventoryOnOrder = require('./updateInventoryOnOrder');
exports.sendOrderUpdateEmail = require('./sendOrderUpdateEmail');
exports.applyPromotions = require('./applyPromotions');
