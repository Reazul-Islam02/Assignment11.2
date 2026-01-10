require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const User = require('./models/User');

const seedLessons = [
    {
        title: "The Power of Resilience",
        description: "Learn how to bounce back from failure and come back stronger.",
        category: "Personal Development",
        emotionalTone: "motivational",
        imageURL: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&auto=format&fit=crop&q=60",
        visibility: "public",
        accessLevel: "free",
        creatorName: "ANM Reazul Islam"
    },
    {
        title: "Mindful Breathing Techniques",
        description: "A guide to instant stress relief through controlled breathing.",
        category: "wellness",
        emotionalTone: "calm",
        imageURL: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
        visibility: "public",
        accessLevel: "free",
        creatorName: "ANM Reazul Islam"
    },
    {
        title: "Mastering Financial Discipline",
        description: "Steps to take control of your finances and build wealth.",
        category: "career",
        emotionalTone: "serious",
        imageURL: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
        visibility: "public",
        accessLevel: "premium",
        creatorName: "ANM Reazul Islam"
    },
    {
        title: "The Art of Letting Go",
        description: "Finding peace by releasing what you cannot control.",
        category: "relationships",
        emotionalTone: "empathetic",
        imageURL: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60",
        visibility: "public",
        accessLevel: "free",
        creatorName: "ANM Reazul Islam"
    },
    {
        title: "Finding Your Passion",
        description: "A journey to discovering what truly moves you.",
        category: "Personal Development",
        emotionalTone: "joyful",
        imageURL: "https://images.unsplash.com/photo-1493612276216-9c5901955d43?w=800&auto=format&fit=crop&q=60",
        visibility: "public",
        accessLevel: "free",
        creatorName: "ANM Reazul Islam"
    }
];

const seedDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find a default user to assign as creator (or create a dummy one if needed)
        // ideally we should use a real admin user ID, but for seed we can try to find one
        let adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            console.log('No admin user found, finding any user...');
            adminUser = await User.findOne({});
        }

        if (!adminUser) {
            console.log('No users found. Creating a dummy admin user...');
            // Simplified user creation for seed purpose
            adminUser = await User.create({
                name: 'ANM Reazul Islam',
                email: 'admin@digitallifelessons.com',
                photoURL: 'https://placehold.co/100',
                role: 'admin'
            });
        }

        console.log(`Assigning lessons to creator: ${adminUser.name} (${adminUser._id})`);

        // Prepare lessons with creatorId
        const lessonsWithCreator = seedLessons.map(lesson => ({
            ...lesson,
            creatorId: adminUser._id,
            creatorEmail: adminUser.email,
            creatorPhoto: adminUser.photoURL
        }));

        await Lesson.deleteMany({ title: { $in: seedLessons.map(l => l.title) } }); // Prevent duplicates of seed data
        const result = await Lesson.insertMany(lessonsWithCreator);

        console.log(`Successfully seeded ${result.length} lessons!`);
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
