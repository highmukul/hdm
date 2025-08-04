const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// (Your existing Cloud Functions for order assignment would be here)

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
        
        // Create a promise for each file deletion
        const deletePromises = imageUrls.map(url => {
            try {
                // Extract the file path from the full URL
                const filePath = new URL(url).pathname.split('/o/')[1].split('?')[0];
                const decodedFilePath = decodeURIComponent(filePath);
                
                console.log(`Attempting to delete: ${decodedFilePath}`);
                return storage.bucket().file(decodedFilePath).delete();
            } catch (error) {
                console.error(`Error parsing URL or deleting file for URL: ${url}`, error);
                // Return a resolved promise so that one failure doesn't stop others
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
