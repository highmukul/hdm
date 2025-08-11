const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions/v2");
const nodemailer = require('nodemailer');
const {credential} = require("firebase-admin");

let transporter;
try {
  const gmailEmail = functions.config().gmail?.email;
  const gmailPassword = functions.config().gmail?.password;

  if (gmailEmail && gmailPassword) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });
  } else {
    logger.warn('Gmail credentials not set in Firebase functions config.');
  }
} catch (error) {
  logger.error('Error creating transporter:', error);
}

exports.sendorderupdateemail = onDocumentUpdated("orders/{orderId}", (event) => {
  const order = event.data.after.data();
  const previousOrder = event.data.before.data();

  if (order.status === previousOrder.status) {
    logger.log("Order status has not changed, not sending email.");
    return null;
  }

  const db = getFirestore();
  return db.collection("users").doc(order.userId).get().then((userDoc) => {
    const user = userDoc.data();

    if (!transporter) {
      throw new functions.https.HttpsError('failed-precondition', 'Email transporter not initialized.');
    }

    const mailOptions = {
      from: `Your App Name <${functions.config().gmail.email}>`,
      to: user.email,
      subject: `Your order status has been updated to ${order.status}`,
      html: `
        <p>Hi ${user.name},</p>
        <p>Your order status has been updated to <strong>${order.status}</strong>.</p>
        <p>Thanks,</p>
        <p>The Team</p>
      `,
    };

    return transporter.sendMail(mailOptions);
  }).catch((error) => {
    logger.error("Error sending order update email:", error);
  });
});
