import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Easypaisa', 'JazzCash', 'Bank'], required: true },
  details: {
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String }, // Optional for mobile wallets
    cnic: { type: String } // Optional but common in PK
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: { type: String }
}, { timestamps: true });

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);
export default Withdrawal;
