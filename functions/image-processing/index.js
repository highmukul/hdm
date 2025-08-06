const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { logger } = require("firebase-functions");
const admin = require('firebase-admin');
const sharp = require("sharp");
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

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
