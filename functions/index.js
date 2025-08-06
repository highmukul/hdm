// CommonJS Imports for Firebase Functions
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

// Firebase Admin SDK for backend operations
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK - MUST be done only once
admin.initializeApp();
const db = admin.firestore();

// --- Helper Functions ---

function calculateDiscountedPrice(product) {
    const rule = product.discountRules?.[0];
    if (!rule) return product.price;
    if (rule.type === 'flat') return product.price - rule.value;
    if (rule.type === 'percent') return product.price * (1 - rule.value / 100);
    return product.price;
}

// --- Firestore and Pub/Sub Functions ---

exports.onCreateOrder = onDocumentCreated("orders/{orderId}", async (event) => {
    const snap = event.data;
    if (!snap) {
        logger.info("onCreateOrder: No data associated with the event, exiting.");
        return;
    }
    const order = snap.data();
    if (!order.storeId) {
        logger.error('onCreateOrder: storeId is missing from the order.');
        return;
    }

    const productBatch = db.batch();
    order.items.forEach(item => {
        const productRef = db.collection('stores').doc(order.storeId).collection('products').doc(item.id);
        productBatch.update(productRef, { salesCount: admin.firestore.FieldValue.increment(item.quantity) });
    });
    await productBatch.commit();
    logger.info("onCreateOrder: Product sales counts updated.");
});

exports.onProductUpdate = onDocumentUpdated("stores/{storeId}/products/{productId}", async (event) => {
    const change = event.data;
    if (!change) {
      logger.info("onProductUpdate: No data associated with the event, exiting.");
      return;
    }
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.price !== previousValue.price || newValue.discountRules !== previousValue.discountRules) {
        const discountedPrice = calculateDiscountedPrice(newValue);
        await change.after.ref.update({ discountedPrice });
        logger.info(`onProductUpdate: Updated discounted price for product ${change.after.id}`);
    }
});

exports.expireDiscounts = onSchedule('every 5 minutes', async (event) => {
    const now = admin.firestore.Timestamp.now();
    const query = db.collectionGroup('products').where('hasActiveDiscount', '==', true);
    const snapshot = await query.get();

    if (snapshot.empty) {
        logger.info("expireDiscounts: No active discounts to expire.");
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
    logger.info(`expireDiscounts: Processed discounts for ${snapshot.docs.length} products.`);
});

// Export the new function
exports.sendVerificationEmail = require('./sendVerificationEmail').sendVerificationEmail;
