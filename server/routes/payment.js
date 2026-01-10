const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = require('stripe')(stripeKey);
const verifyToken = require('../middlewares/verifyToken');

router.post('/create-checkout-session', verifyToken, async (req, res) => {
    try {
        const { redirectUrl } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: 'Lifetime Premium Access',
                            description: 'Unlock all premium lessons and features.',
                        },
                        unit_amount: 1500 * 100, // 1500 BDT
                    },
                    quantity: 1,
                },
            ],
            customer_email: req.user.email, // Use email from token
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?redirect=${encodeURIComponent(redirectUrl || '/dashboard')}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/cancel?redirect=${encodeURIComponent(redirectUrl || '/dashboard')}`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error('Stripe session error:', e);
        res.status(500).json({ error: e.message });
    }
});

router.post('/payment-success', verifyToken, async (req, res) => {
    try {
        const User = require('../models/User');
        const email = req.user.email;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { isPremium: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'Success', user: updatedUser });
    } catch (error) {
        console.error('Payment success update error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
