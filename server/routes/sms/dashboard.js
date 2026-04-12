import express from 'express';
import Student from '../../models/sms/Student.js';
import FeeRecord from '../../models/sms/FeeRecord.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sms/dashboard/overview
router.get('/overview', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('selectedCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const feeRecord = await FeeRecord.findOne({ studentId: req.user.id }).sort({ dueDate: -1 });

    // Mock data for assignments and results for now
    const dashboardData = {
      courseName: student.selectedCourses?.[0]?.name || student.course || 'N/A',
      coursesCount: student.selectedCourses?.length || 0,
      track: student.selectedCourses?.[0]?.track || 'N/A',
      feeStatus: feeRecord?.status || 'pending',
      pendingAssignments: { count: 0, nextDue: null },
      resultsAvailable: false,
      batchNo: student.batch || 'N/A',
      startDate: student.enrollmentDate || null,
      instructorName: 'N/A',
      activityFeed: [
        { type: 'info', text: 'Welcome to your dashboard!' }
      ]
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
