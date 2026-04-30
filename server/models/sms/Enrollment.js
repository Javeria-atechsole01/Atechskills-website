import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  feeRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeRecord' },
  referralId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Who referred this student
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }, // Course instructor at time of enrollment
  pricePaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
