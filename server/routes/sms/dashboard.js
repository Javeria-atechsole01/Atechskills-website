import express from 'express';
import Student from '../../models/sms/Student.js';
import FeeRecord from '../../models/sms/FeeRecord.js';
import Assignment from '../../models/sms/Assignment.js';
import AssignmentSubmission from '../../models/sms/Submission.js';
import Result from '../../models/sms/Result.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sms/dashboard/overview
router.get('/overview', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('selectedCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const feeRecord = await FeeRecord.findOne({ studentId: req.user.id }).sort({ dueDate: -1 });

    const assignments = await Assignment.find({ courseId: { $in: student.selectedCourses || [] } }).lean();
    const submissions = await AssignmentSubmission.find({ studentId: req.user.id }).lean();
    const submittedAsmIds = submissions.map(s => s.assignmentId.toString());
    const pendingAsms = assignments.filter(a => !submittedAsmIds.includes(a._id.toString()));
    const nextDue = pendingAsms.length > 0 ? pendingAsms.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0].dueDate : null;

    const resultsCount = await Result.countDocuments({ studentId: req.user.id });

    const dashboardData = {
      courseName: student.selectedCourses?.[0]?.name || student.course || 'N/A',
      coursesCount: student.selectedCourses?.length || 0,
      track: student.selectedCourses?.[0]?.track || 'N/A',
      feeStatus: feeRecord?.status || 'pending',
      pendingAssignments: { count: pendingAsms.length, nextDue: nextDue ? new Date(nextDue).toLocaleDateString() : null },
      resultsAvailable: resultsCount > 0,
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
