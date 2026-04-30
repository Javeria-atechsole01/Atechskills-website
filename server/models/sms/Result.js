import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  examTitle: { type: String, required: true }, // e.g., "Mid-Term", "Final Project"
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
  publishedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
