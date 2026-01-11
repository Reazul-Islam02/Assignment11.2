
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

// Webhook Route (Must be before express.json)
// Webhook Route (Must be before express.json)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = require('stripe')(stripeKey);
const User = require('./models/User');

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_email; // Need to ensure we pass this or get from customer

        if (customerEmail) {
            try {
                await User.findOneAndUpdate(
                    { email: customerEmail },
                    { isPremium: true }
                );
                console.log(`User ${customerEmail} upgraded to Premium.`);
            } catch (error) {
                console.error('Error updating user premium status:', error);
            }
        }
    }

    res.json({ received: true });
});

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://digital-life-lessons02.netlify.app'
    ],
    credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use('/api', authRoutes);
app.use('/api', lessonRoutes);
app.use('/api', paymentRoutes);
app.use('/api', adminRoutes);


app.get('/', (req, res) => {
    res.send('Digital Life Lessons Server is Running');
});

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (uri) {
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connection established successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn("MONGODB_URI not found in .env");
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
