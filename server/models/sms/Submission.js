import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  submissionLink: { type: String },
  fileUrl: { type: String },
  status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'submitted' },
  marks: { type: String }, // e.g., '90/100'
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

const AssignmentSubmission = mongoose.model('AssignmentSubmission', submissionSchema);
export default AssignmentSubmission;
