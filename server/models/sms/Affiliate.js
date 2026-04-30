import mongoose from 'mongoose';

const affiliateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
  referralCode: { type: String, unique: true, required: true },
  referralLink: { type: String },
  totalClicks: { type: Number, default: 0 },
  totalConversions: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  pendingBalance: { type: Number, default: 0 },
  approvedBalance: { type: Number, default: 0 },
  withdrawnBalance: { type: Number, default: 0 },
  tier: { type: String, enum: ['bronze', 'silver', 'gold'], default: 'bronze' },
  createdAt: { type: Date, default: Date.now }
});

const Affiliate = mongoose.model('Affiliate', affiliateSchema);
export default Affiliate;
