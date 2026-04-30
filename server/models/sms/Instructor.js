import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
  bio: { type: String },
  expertise: [{ type: String }],
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Instructor = mongoose.model('Instructor', instructorSchema);
export default Instructor;
