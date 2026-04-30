import mongoose from 'mongoose';

const payoutRequestSchema = new mongoose.Schema({
  affiliateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
  amount: Number,
  method: { type: String, enum: ['bank_transfer', 'jazzcash', 'easypaisa'] },
  accountDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String // for bank transfer
  },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'rejected'], default: 'pending' },
  adminNotes: String,
  requestedAt: { type: Date, default: Date.now },
  processedAt: Date
});

const PayoutRequest = mongoose.model('PayoutRequest', payoutRequestSchema);
export default PayoutRequest;
