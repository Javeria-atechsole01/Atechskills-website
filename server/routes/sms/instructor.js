import express from 'express';
import Instructor from '../../models/sms/Instructor.js';
import Course from '../../models/sms/Course.js';
import Enrollment from '../../models/sms/Enrollment.js';
import WalletTransaction from '../../models/sms/WalletTransaction.js';
import Student from '../../models/sms/Student.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// Instructor role check middleware
function instructorOnly(req, res, next) {
  if (req.user?.role !== 'instructor' && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Instructor access required' });
  }
  next();
}

// GET /dashboard
router.get('/dashboard', authMiddleware, instructorOnly, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ userId: req.user.id });
    if (!instructor) return res.status(404).json({ message: 'Instructor profile not found' });

    const courses = await Course.find({ instructorId: instructor._id });
    const courseIds = courses.map(c => c._id);
    
    const totalStudents = await Enrollment.countDocuments({ courseId: { $in: courseIds } });
    
    const earningsData = await WalletTransaction.aggregate([
      { $match: { userId: req.user.id, source: 'instructor' } },
      { $group: { 
          _id: null, 
          total: { $sum: '$amount' },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0] } }
        } 
      }
    ]);

    const earningsByDate = await WalletTransaction.aggregate([
      { $match: { userId: req.user.id, source: 'instructor' } },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$amount" }
      }},
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", amount: 1, _id: 0 } }
    ]);

    res.json({
      totalEarnings: earningsData[0]?.total || 0,
      pendingEarnings: earningsData[0]?.pending || 0,
      totalCourses: courses.length,
      totalStudents,
      earningsByDate
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /courses
router.get('/courses', authMiddleware, instructorOnly, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ userId: req.user.id });
    const courses = await Course.find({ instructorId: instructor?._id }).sort({ createdAt: -1 });
    
    // Enrich with enrollment data
    const enriched = await Promise.all(courses.map(async (c) => {
        const studentCount = await Enrollment.countDocuments({ courseId: c._id });
        const revenue = await Enrollment.aggregate([
            { $match: { courseId: c._id } },
            { $group: { _id: null, total: { $sum: '$pricePaid' } } }
        ]);
        return {
            ...c.toObject(),
            studentCount,
            totalRevenue: (revenue[0]?.total || 0) * 0.7 // Simplified instructor share
        };
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /course
router.post('/course', authMiddleware, instructorOnly, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ userId: req.user.id });
    if (!instructor) return res.status(404).json({ message: 'Instructor profile not found' });

    const course = new Course({
      ...req.body,
      instructorId: instructor._id,
      status: 'draft'
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /course/:id
router.put('/course/:id', authMiddleware, instructorOnly, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ userId: req.user.id });
    const course = await Course.findOne({ _id: req.params.id, instructorId: instructor._id });
    if (!course) return res.status(404).json({ message: 'Course not found or unauthorized' });

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /earnings
router.get('/earnings', authMiddleware, instructorOnly, async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({ 
      userId: req.user.id, 
      source: 'instructor' 
    }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
