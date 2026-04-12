import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  course: { type: String, enum: ['DEVSECAI Bootcamp', 'Short Bootcamp'] },
  batch: { type: String },
  role: { type: String, enum: ['student', 'admin', 'instructor'], default: 'student' },
  profilePic: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  // Enrollment system fields
  selectedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  enrollmentStatus: { type: String, enum: ['none', 'pending_payment', 'enrolled', 'rejected'], default: 'none' },
  enrollmentDate: { type: Date },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // admin ref
  approvedAt: { type: Date }
});

// Auto-generate studentId before saving
studentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    try {
      const Student = mongoose.model('Student');
      const count = await Student.countDocuments({});
      this.studentId = `ATS-2024-${String(count + 1).padStart(3, '0')}`;
    } catch (err) {
      console.error('Error generating studentId:', err);
    }
  }
  if (typeof next === 'function') next();
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (typeof next === 'function') next();
});

studentSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
