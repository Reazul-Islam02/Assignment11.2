const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    const email = req.user?.email;

    if (!email) {
        return res.status(401).json({ message: 'Unauthorized: No email found in token' });
    }

    try {
        const user = await User.findOne({ email });
        if (user?.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Admin access only' });
        }
    } catch (error) {
        console.error('Error verifying admin:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = verifyAdmin;
