const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    emotionalTone: {
        type: String,
        required: true
    },
    imageURL: String,
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    accessLevel: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creatorName: String,
    creatorPhoto: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
