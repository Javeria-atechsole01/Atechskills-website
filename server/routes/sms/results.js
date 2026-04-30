import express from 'express';
import Result from '../../models/sms/Result.js';
import Student from '../../models/sms/Student.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sms/results
router.get('/', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const results = await Result.find({ studentId: req.user.id }).populate('courseId', 'name').sort({ publishedAt: -1 }).lean();

    const formattedResults = results.map(res => ({
      id: res._id,
      course: res.courseId?.name || 'Unknown Course',
      exam: res.examTitle,
      marks: `${res.marksObtained}/${res.totalMarks}`,
      grade: res.grade,
      status: res.status
    }));

    res.json(formattedResults);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
