const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Sync User (Create or Update)
router.post('/users/:email', async (req, res) => {
    const email = req.params.email;
    const userData = req.body;

    // Simple validation
    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const result = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    name: userData.name || email.split('@')[0] || 'User',
                    email: userData.email,
                    photoURL: userData.photoURL
                },
                $setOnInsert: {
                    role: 'user',
                    isPremium: false,
                    createdLessons: 0
                }
            },
            { upsert: true, new: true, runValidators: true }
        );
        res.send(result);
    } catch (error) {
        console.error('CRITICAL: Error syncing user:', email, error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

// Get User by Email
router.get('/users/:email', verifyToken, async (req, res) => {
    const email = req.params.email;
    if (req.user.email.toLowerCase() !== email.toLowerCase()) {
        console.error(`Forbidden Access: Token email (${req.user.email}) !== Param email (${email})`);
        return res.status(403).send({ message: 'Forbidden access' });
    }

    try {
        const user = await User.findOne({ email });
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Check Admin (for frontend guards)
router.get('/users/admin/:email', verifyToken, async (req, res) => {
    const email = req.params.email;
    if (req.user.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(403).send({ message: 'Forbidden access' });
    }

    try {
        const user = await User.findOne({ email });
        res.send({ admin: user?.role === 'admin' });
    } catch (error) {
        console.error('Error checking admin:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Toggle Favorite
router.put('/users/favorites/:email', verifyToken, async (req, res) => {
    const { email } = req.params;
    const { lessonId } = req.body;

    if (req.user.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    try {
        const user = await User.findOne({ email });
        if (user.favorites.includes(lessonId)) {
            // Remove
            await User.updateOne({ email }, { $pull: { favorites: lessonId } });
            res.send({ message: 'Removed from favorites', added: false });
        } else {
            // Add
            await User.updateOne({ email }, { $addToSet: { favorites: lessonId } });
            res.send({ message: 'Added to favorites', added: true });
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Get My Favorites
router.get('/users/favorites/:email', verifyToken, async (req, res) => {
    const { email } = req.params;
    if (req.user.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    try {
        const user = await User.findOne({ email }).populate('favorites');
        res.send(user.favorites || []);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Update User Profile
router.put('/users/profile/:email', verifyToken, async (req, res) => {
    const { email } = req.params;
    const { name, photoURL, bio, socialLinks } = req.body;

    if (req.user.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    photoURL,
                    bio,
                    socialLinks
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
