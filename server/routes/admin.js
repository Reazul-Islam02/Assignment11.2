const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const LessonReport = require('../models/LessonReport');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Middleware to ensure all routes in this file are admin protected (chained)
// Actually better to apply per route or use a router.use()
router.use(verifyToken, verifyAdmin);

// Dashboard Stats
router.get('/admin/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalLessons = await Lesson.countDocuments();
        const totalReports = await LessonReport.countDocuments();
        res.json({ totalUsers, totalLessons, totalReports });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Manage Users
router.get('/admin/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/admin/users/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) return res.status(400).send('Invalid role');

        await User.findByIdAndUpdate(req.params.id, { role });
        res.json({ message: 'User role updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/admin/users/:id/premium', async (req, res) => {
    try {
        const { isPremium } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { isPremium }, { new: true });
        res.json({ message: `User premium status updated to ${isPremium}`, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Manage Lessons (All)
router.get('/admin/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('creatorId', 'name email').sort({ createdAt: -1 });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/admin/lessons/:id', async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted by admin' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reported Lessons
router.get('/admin/reports', async (req, res) => {
    try {
        const reports = await LessonReport.find().populate('lessonId').populate('reporterId', 'name email');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Resolve Report (Delete Report)
router.delete('/admin/reports/:id', async (req, res) => {
    try {
        await LessonReport.findByIdAndDelete(req.params.id);
        res.json({ message: 'Report resolved/deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
