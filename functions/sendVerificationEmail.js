const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// It's recommended to use a dedicated email service like SendGrid or Mailgun in production.
// For this example, we're using a Gmail account.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password,
    },
});

exports.sendVerificationEmail = functions.https.onCall(async (data, context) => {
    // Ensure the user is an admin
    if (!context.auth.token.admin) {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can call this function.');
    }

    const { captainId, status } = data;

    const captainDoc = await admin.firestore().collection('captains').doc(captainId).get();
    const captain = captainDoc.data();

    let mailOptions = {
        from: 'Your App Name <yourapp@example.com>',
        to: captain.email,
        subject: `Your Captain Application has been ${status}`,
        html: `<p>Hi ${captain.name},</p>
               <p>Your application to become a captain has been ${status}.</p>
               ${status === 'approved' ? '<p>You can now log in to your dashboard and start accepting orders.</p>' : ''}
               <p>Thanks,</p>
               <p>The Team</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email.');
    }
});
