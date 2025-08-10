// This script grants admin privileges to a user.
// Usage: node setAdmin.js <user-email-to-make-admin>

const admin = require('firebase-admin');
// IMPORTANT: Replace with the path to your downloaded service account key
const serviceAccount = require('./hadoti-daily-mart-467808-firebase-adminsdk-fbsvc-b0a2d60c22.json');

const userEmail = process.argv[2];

if (!userEmail) {
  console.error('Error: Please provide the user email as an argument.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(userEmail);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Success! ${userEmail} has been made an admin.`);
  } catch (error) {
    console.error('Error setting custom claim:', error.message);
  }
  process.exit();
}

setAdminClaim();