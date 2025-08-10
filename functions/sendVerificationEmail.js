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

exports.sendVerificationEmail = functions.https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.token?.admin) {
        console.error('Permission denied. User is not an admin.');
        throw new functions.https.HttpsError('permission-denied', 'Only admins can call this function.');
    }

    const { captainId, status } = data;

    try {
        const captainDoc = await admin.firestore()
            .collection('captains')
            .doc(captainId)
            .get();

        if (!captainDoc.exists) {
            console.error('Captain not found:', captainId);
            throw new functions.https.HttpsError('not-found', 'Captain not found.');
        }

        const captain = captainDoc.data();

        if (!transporter) {
            throw new functions.https.HttpsError('failed-precondition', 'Email transporter not initialized.');
        }

        const mailOptions = {
            from: `Your App Name <${functions.config().gmail.email}>`,
            to: captain.email,
            subject: `Your Captain Application has been ${status}`,
            html: `
                <p>Hi ${captain.name},</p>
                <p>Your application to become a captain has been <strong>${status}</strong>.</p>
                ${status === 'approved' ? '<p>You can now log in to your dashboard and start accepting orders.</p>' : ''}
                <p>Thanks,</p>
                <p>The Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email.');
    }
});
