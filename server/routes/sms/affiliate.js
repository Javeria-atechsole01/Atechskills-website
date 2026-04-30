import express from 'express';
import Affiliate from '../../models/sms/Affiliate.js';
import Commission from '../../models/sms/Commission.js';
import PayoutRequest from '../../models/sms/PayoutRequest.js';
import ReferralClick from '../../models/sms/ReferralClick.js';
import WalletTransaction from '../../models/sms/WalletTransaction.js';
import Student from '../../models/sms/Student.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public: Validate referral code
router.post('/validate-code', async (req, res) => {
  try {
    const { code } = req.body;
    const affiliate = await Affiliate.findOne({ referralCode: code });
    if (!affiliate) return res.status(404).json({ valid: false, message: 'Invalid referral code' });
    res.json({ valid: true, code });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Get affiliate dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ userId: req.user.id });
    if (!affiliate) return res.status(404).json({ message: 'Affiliate profile not found' });

    const recentCommissions = await Commission.find({ affiliateId: affiliate._id })
      .populate('referredUserId', 'name email enrollmentStatus')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentClicks = await ReferralClick.find({ affiliateId: affiliate._id })
      .sort({ clickedAt: -1 })
      .limit(10);

    res.json({
      profile: affiliate,
      recentCommissions,
      recentClicks
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protected: Get wallet balance and transactions
router.get('/wallet', authMiddleware, async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ userId: req.user.id });
    if (!affiliate) return res.status(404).json({ message: 'Affiliate profile not found' });

    const transactions = await WalletTransaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.json({
      pendingBalance: affiliate.pendingBalance,
      approvedBalance: affiliate.approvedBalance,
      withdrawnBalance: affiliate.withdrawnBalance,
      transactions
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protected: Get all commissions
router.get('/commissions', authMiddleware, async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ userId: req.user.id });
    const commissions = await Commission.find({ affiliateId: affiliate._id })
      .populate('referredUserId', 'name email')
      .sort({ createdAt: -1 });
    res.json(commissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Get payout history
router.get('/payout/history', authMiddleware, async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ userId: req.user.id });
    const payouts = await PayoutRequest.find({ affiliateId: affiliate._id }).sort({ requestedAt: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: Submit payout request
router.post('/payout/request', authMiddleware, async (req, res) => {
  try {
    const { amount, method, accountDetails } = req.body;
    const affiliate = await Affiliate.findOne({ userId: req.user.id });

    if (amount < 500) return res.status(400).json({ message: 'Minimum withdrawal is 500' });
    if (affiliate.approvedBalance < amount) return res.status(400).json({ message: 'Insufficient approved balance' });

    const payout = new PayoutRequest({
      affiliateId: affiliate._id,
      amount,
      method,
      accountDetails
    });
    await payout.save();

    // Deduct from approved balance
    affiliate.approvedBalance -= amount;
    await affiliate.save();

    // Create transaction log
    await new WalletTransaction({
      userId: req.user.id,
      amount,
      type: 'debit',
      source: 'payout',
      description: `Payout request via ${method}`
    }).save();

    res.status(201).json({ message: 'Payout request submitted', payout });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
