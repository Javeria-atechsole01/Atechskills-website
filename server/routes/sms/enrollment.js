import express from 'express';
import Course from '../../models/sms/Course.js';
import Student from '../../models/sms/Student.js';
import FeeRecord from '../../models/sms/FeeRecord.js';
import authMiddleware from '../../middleware/authMiddleware.js';
import { processRevenueDistribution } from '../../services/sms/revenueService.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer setup for fee proof uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../uploads/fee-proofs/');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e6)}${ext}`);
  }
});
const upload = multer({ storage });

// GET all active courses
router.get('/courses/all', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET course detail
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST select multiple courses
router.post('/select-courses', authMiddleware, async (req, res) => {
  try {
    const { courseIds } = req.body;
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    student.selectedCourses = courseIds;
    student.enrollmentStatus = 'pending_payment';
    student.enrollmentDate = new Date();
    await student.save();
    
    res.json({ message: 'Courses selected. Please submit fee.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST submit fee
router.post('/submit-fee', authMiddleware, upload.single('paymentProof'), async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student || !student.selectedCourses || student.selectedCourses.length === 0) return res.status(400).json({ message: 'No course selected' });
    const course = await Course.findById(student.selectedCourses[0]);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    // Create FeeRecord
    const feeRecord = new FeeRecord({
      studentId: student._id,
      courseId: course._id,
      amount: course.fee,
      dueDate: new Date(Date.now() + 7*24*60*60*1000), // 7 days from now
      paymentProofUrl: req.file ? `/uploads/fee-proofs/${req.file.filename}` : undefined,
      submissionDate: new Date(),
      status: 'pending'
    });
    await feeRecord.save();
    res.json({ message: 'Fee submitted. Awaiting admin approval.', challanNo: feeRecord.challanNo });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET my enrollment + fee status
router.get('/my-status', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('selectedCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const feeRecord = await FeeRecord.findOne({ studentId: student._id }).sort({ submissionDate: -1 });
    res.json({ student, feeRecord });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Approve Enrollment
router.put('/approve/:studentId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    // Approve student
    student.enrollmentStatus = 'enrolled';
    student.approvedBy = req.user.id;
    student.approvedAt = new Date();
    await student.save();
    
    // Find pending fee record to trigger commission
    const feeRecord = await FeeRecord.findOne({ studentId: student._id, status: 'pending' });
    
    // Approve fee record
    await FeeRecord.updateMany({ studentId: student._id, status: 'pending' }, { status: 'approved', approvedBy: req.user.id, approvedAt: new Date() });
    
    // Trigger revenue distribution if record exists
    if (feeRecord) {
      await processRevenueDistribution(feeRecord);
    }

    res.json({ message: 'Student enrollment approved.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin Reject Enrollment
router.put('/reject/:studentId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    const { reason } = req.body;
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.enrollmentStatus = 'rejected';
    await student.save();
    // Reject fee record
    await FeeRecord.updateMany({ studentId: student._id, status: 'pending' }, { status: 'rejected', rejectionReason: reason });
    res.json({ message: 'Student enrollment rejected.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
