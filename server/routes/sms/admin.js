import express from 'express';
import Student from '../../models/sms/Student.js';
import FeeRecord from '../../models/sms/FeeRecord.js';
import Course from '../../models/sms/Course.js';
import Affiliate from '../../models/sms/Affiliate.js';
import Commission from '../../models/sms/Commission.js';
import PayoutRequest from '../../models/sms/PayoutRequest.js';
import authMiddleware from '../../middleware/authMiddleware.js';
const router = express.Router();

// Admin role check middleware
function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
}

// GET /dashboard
router.get('/dashboard', authMiddleware, adminOnly, async (req, res) => {
  try {
    const totalUsers = await Student.countDocuments({});
    const totalStudents = await Student.countDocuments({ role: 'student' });
    const totalInstructors = await Student.countDocuments({ role: 'instructor' });
    
    const revenueData = await FeeRecord.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentUsers = await Student.find({})
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalRevenue: revenueData[0]?.total || 0,
      recentUsers
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /users (Paginated + Search)
router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search = '' } = req.query;
    const query = {};
    
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Student.countDocuments(query);
    const users = await Student.find(query)
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      data: users,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /fee-records
router.get('/fee-records', authMiddleware, adminOnly, async (req, res) => {
  try {
    const records = await FeeRecord.find({})
      .populate('studentId', 'name studentId')
      .populate('courseId', 'name')
      .sort({ dueDate: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /fee/create
router.post('/fee/create', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { studentId, courseId, amount, dueDate, label } = req.body;
    const feeRecord = new FeeRecord({
      studentId,
      courseId,
      amount,
      dueDate,
      label,
      status: 'pending'
    });
    await feeRecord.save();
    res.status(201).json(feeRecord);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/sms/courses/:id
router.put('/api/sms/courses/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- Affiliate Management ---

// GET /affiliate/commissions
router.get('/affiliate/commissions', authMiddleware, adminOnly, async (req, res) => {
  try {
    const commissions = await Commission.find({ status: 'pending' })
      .populate('affiliateId')
      .populate('referredUserId', 'name email')
      .sort({ createdAt: -1 });
    res.json(commissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /affiliate/commissions/:id/approve
router.patch('/affiliate/commissions/:id/approve', authMiddleware, adminOnly, async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);
    if (!commission) return res.status(404).json({ message: 'Commission not found' });
    if (commission.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

    commission.status = 'approved';
    commission.approvalDate = new Date();
    await commission.save();

    // Stats were updated at triggerCommission (auto-approve), 
    // but if we had a manual approval flow, we'd update balances here.
    // In current triggerCommission, we set them to approved immediately.
    
    res.json({ message: 'Commission approved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /affiliate/payouts
router.get('/affiliate/payouts', authMiddleware, adminOnly, async (req, res) => {
  try {
    const payouts = await PayoutRequest.find({ status: 'pending' })
      .populate({
        path: 'affiliateId',
        populate: { path: 'userId', select: 'name email' }
      })
      .sort({ requestedAt: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /affiliate/payouts/:id/process
router.patch('/affiliate/payouts/:id/process', authMiddleware, adminOnly, async (req, res) => {
  try {
    const payout = await PayoutRequest.findById(req.params.id);
    if (!payout) return res.status(404).json({ message: 'Payout not found' });
    
    payout.status = 'completed';
    payout.processedAt = new Date();
    await payout.save();

    // Update withdrawn balance in affiliate profile
    const affiliate = await Affiliate.findById(payout.affiliateId);
    if (affiliate) {
      affiliate.withdrawnBalance += payout.amount;
      await affiliate.save();
    }

    res.json({ message: 'Payout marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /affiliate/leaderboard
router.get('/affiliate/leaderboard', authMiddleware, adminOnly, async (req, res) => {
  try {
    const top = await Affiliate.find({})
      .populate('userId', 'name email')
      .sort({ totalEarned: -1 })
      .limit(10);
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
