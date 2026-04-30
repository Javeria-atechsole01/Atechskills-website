import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema({
  affiliateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
  referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeRecord' },
  coursePrice: Number,
  commissionRate: { type: Number, default: 0.10 }, // 10%
  commissionAmount: Number,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  approvalDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const Commission = mongoose.model('Commission', commissionSchema);
export default Commission;
