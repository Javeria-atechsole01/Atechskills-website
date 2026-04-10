import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
  track: { type: String, trim: true, required: true },
  source: { type: String, enum: ['enroll', 'join'], required: true },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);

