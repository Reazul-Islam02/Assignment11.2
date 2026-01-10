const admin = require('firebase-admin');
require('dotenv').config();

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
        let serviceAccount;
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim().startsWith('{')) {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        } else {
            // Assume it's a file path
            serviceAccount = require(require('path').resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
} else {
    // Try to load 'serviceAccountKey.json' from root if env is missing
    try {
        const serviceAccount = require('./serviceAccountKey.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin Initialized from default file');
    } catch (e) {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not found and no local serviceAccountKey.json');
    }
}

module.exports = admin;
