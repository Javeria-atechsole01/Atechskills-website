import mongoose from 'mongoose';

const referralClickSchema = new mongoose.Schema({
  affiliateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
  referralCode: String,
  ipAddress: String,
  userAgent: String,
  deviceFingerprint: String,
  landingPage: String,
  convertedToSignup: { type: Boolean, default: false },
  convertedToOrder: { type: Boolean, default: false },
  clickedAt: { type: Date, default: Date.now }
});

const ReferralClick = mongoose.model('ReferralClick', referralClickSchema);
export default ReferralClick;
