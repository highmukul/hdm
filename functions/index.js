// CommonJS Imports for Firebase Functions
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { logger } = require("firebase-functions");

// Firebase Admin SDK for backend operations
const admin = require('firebase-admin');

// Libraries for Image Processing
const sharp = require("sharp");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Initialize Firebase Admin SDK - MUST be done only once
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

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


// --- Storage Function for Image Resizing ---

exports.resizeImage = onObjectFinalized({ cpu: 2 }, async (object) => {
  const fileBucket = object.data.bucket;
  const filePath = object.data.name;
  const contentType = object.data.contentType;

  if (!contentType.startsWith("image/") || filePath.includes("_resized_")) {
    return logger.log(`Exiting function for object: ${filePath}. Not an image or already resized.`);
  }

  if (!filePath.startsWith("products/")) {
    return logger.log(`Exiting function for object: ${filePath}. Not a product image.`);
  }

  const bucket = storage.bucket(fileBucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  
  try {
    await bucket.file(filePath).download({ destination: tmpFilePath });
    logger.log(`Image downloaded to ${tmpFilePath}.`);

    const sizes = [ { width: 200, suffix: "thumb" } ];

    const uploadPromises = sizes.map(async (size) => {
      const resizedFileName = `${path.basename(filePath, path.extname(filePath))}_resized_${size.suffix}${path.extname(filePath)}`;
      const resizedPath = path.join(os.tmpdir(), resizedFileName);

      await sharp(tmpFilePath).resize({ width: size.width }).toFile(resizedPath);
      
      const destination = path.join(path.dirname(filePath), resizedFileName);
      await bucket.upload(resizedPath, { destination });
      
      fs.unlinkSync(resizedPath);
      return bucket.file(destination).publicUrl();
    });

    const urls = await Promise.all(uploadPromises);
    const productId = path.basename(path.dirname(filePath));
    
    const productsCollectionGroup = db.collectionGroup("products");
    const productQuery = productsCollectionGroup.where("id", "==", productId);
    const querySnapshot = await productQuery.get();

    if (querySnapshot.empty) {
        return logger.error(`Could not find product with ID ${productId} to update image URLs.`);
    }
    
    const productDocRef = querySnapshot.docs[0].ref;
    
    await productDocRef.update({
      "imageUrls.thumb": urls[0],
    });
    return logger.log(`Updated Firestore for product ${productId} with new thumb URL.`);

  } catch (error) {
    return logger.error("Error in resizeImage:", error);
  } finally {
    fs.unlinkSync(tmpFilePath);
  }
});
