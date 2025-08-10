const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

if (!admin.apps.length) {
    admin.initializeApp();
}

let transporter;
try {
    const gmailEmail = functions.config().gmail?.email;
    const gmailPassword = functions.config().gmail?.password;

    if (gmailEmail && gmailPassword) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: gmailEmail, pass: gmailPassword },
        });
    } else {
        console.warn('Gmail credentials not set in Firebase functions config.');
    }
} catch (error) {
    console.error('Error creating transporter:', error);
}

exports.sendOrderUpdateEmail = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
        const order = change.after.data();
        const previousOrder = change.before.data();

        if (order.status !== previousOrder.status) {
            const userDoc = await admin.firestore().collection('users').doc(order.userId).get();
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

            await transporter.sendMail(mailOptions);
        }
    });
