const admin = require('../firebase');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // If Firebase is initialized, verify the token properly
        if (admin.apps.length > 0) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } else {
            // DEVELOPMENT ONLY: If no service account, decode without verification
            console.warn('Firebase Admin not initialized. Using INSECURE mock verification for development.');
            const base64Url = token.split('.')[1];
            if (!base64Url) throw new Error('Invalid token format');
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = Buffer.from(base64, 'base64').toString();
            req.user = JSON.parse(jsonPayload);
            next();
        }
    } catch (error) {
        console.error('VERIFY TOKEN ERROR:', error.message);
        return res.status(403).json({ message: 'Forbidden: Invalid token', error: error.message });
    }
};

module.exports = verifyToken;
