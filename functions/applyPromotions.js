const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.applyPromotions = functions.https.onCall(async (data, context) => {
    const { cart } = data;
    const promotionsRef = admin.firestore().collection('promotions');
    const promotionsSnap = await promotionsRef.get();
    const promotions = promotionsSnap.docs.map(doc => doc.data());

    let discount = 0;
    promotions.forEach(promo => {
        if (promo.type === 'bogo') {
            const itemCount = cart.items.reduce((acc, item) => {
                if (item.id === promo.productId) {
                    return acc + item.quantity;
                }
                return acc;
            }, 0);
            discount += Math.floor(itemCount / 2) * promo.discount;
        } else if (promo.type === 'category') {
            cart.items.forEach(item => {
                if (item.category === promo.category) {
                    discount += item.price * promo.discount;
                }
            });
        }
    });

    return { discount };
});
