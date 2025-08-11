const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions/v2");

exports.updateinventoryonorder = onDocumentCreated("orders/{orderId}", (event) => {
  logger.log("Updating inventory for order:", event.params.orderId);

  const orderData = event.data.data();
  const items = orderData.items;

  if (!items || !Array.isArray(items)) {
    logger.log("No items found in order, skipping inventory update.");
    return null;
  }

  const db = getFirestore();
  const batch = db.batch();

  items.forEach((item) => {
    const productRef = db.collection("products").doc(item.id);
    const decrement = item.quantity;
    batch.update(productRef, { stock: FieldValue.increment(-decrement) });
  });

  return batch.commit().then(() => {
    logger.log("Inventory updated successfully for order:", event.params.orderId);
  }).catch((error) => {
    logger.error("Error updating inventory:", error);
  });
});
