const admin = require('firebase-admin');
const env = require('../config/env');

let initialized = false;

function initFirebase() {
  if (initialized || !env.firebaseProjectId || !env.firebaseClientEmail || !env.firebasePrivateKey) return;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebaseProjectId,
      clientEmail: env.firebaseClientEmail,
      privateKey: env.firebasePrivateKey
    })
  });
  initialized = true;
}

async function verifyGoogleToken(idToken) {
  if (process.env.NODE_ENV === 'test') {
    return { uid: 'test-uid', email: 'test@example.com', name: 'Test User', picture: 'https://example.com/avatar.png' };
  }

  initFirebase();
  const decoded = await admin.auth().verifyIdToken(idToken);
  return {
    uid: decoded.uid,
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture
  };
}

module.exports = { verifyGoogleToken };
