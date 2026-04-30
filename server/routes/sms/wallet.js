import express from 'express';
import Student from '../../models/sms/Student.js';
import Affiliate from '../../models/sms/Affiliate.js';
import WalletTransaction from '../../models/sms/WalletTransaction.js';
import PayoutRequest from '../../models/sms/PayoutRequest.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sms/wallet
router.get('/', authMiddleware, async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ userId: req.user.id });
    const transactions = await WalletTransaction.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      balance: {
        pending: affiliate?.pendingBalance || 0,
        approved: affiliate?.approvedBalance || 0,
        paid: affiliate?.withdrawnBalance || 0
      },
      transactions
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/sms/payout/request
router.post('/payout/request', authMiddleware, async (req, res) => {
  try {
    const { amount, method, accountDetails } = req.body;
    const affiliate = await Affiliate.findOne({ userId: req.user.id });

    if (!affiliate) return res.status(404).json({ message: 'Affiliate profile not found' });
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
      status: 'pending',
      description: `Payout request via ${method}`
    }).save();

    res.status(201).json({ message: 'Payout request submitted', payout });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
