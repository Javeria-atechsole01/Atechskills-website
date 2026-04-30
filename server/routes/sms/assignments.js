import express from 'express';
import Assignment from '../../models/sms/Assignment.js';
import AssignmentSubmission from '../../models/sms/Submission.js';
import Student from '../../models/sms/Student.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sms/assignments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Fetch all assignments for the courses the student is enrolled in
    const assignments = await Assignment.find({ courseId: { $in: student.selectedCourses } }).populate('courseId', 'name').lean();

    // Fetch student's submissions
    const submissions = await AssignmentSubmission.find({ studentId: req.user.id }).lean();
    const submissionMap = {};
    submissions.forEach(sub => {
      submissionMap[sub.assignmentId.toString()] = sub;
    });

    // Merge submissions with assignments
    const assignmentsWithStatus = assignments.map(asm => {
      const sub = submissionMap[asm._id.toString()];
      return {
        ...asm,
        courseName: asm.courseId?.name || 'Unknown Course',
        status: sub ? sub.status : 'pending',
        marks: sub?.marks || null,
        submissionLink: sub?.submissionLink || null,
        feedback: sub?.feedback || null
      };
    });

    res.json(assignmentsWithStatus);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/sms/assignments/submit/:id
router.post('/submit/:id', authMiddleware, async (req, res) => {
  try {
    const { submissionLink } = req.body;
    const assignmentId = req.params.id;
    
    if (!submissionLink) return res.status(400).json({ message: 'Submission link is required' });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    let submission = await AssignmentSubmission.findOne({ studentId: req.user.id, assignmentId });

    if (submission) {
      // Update existing submission
      submission.submissionLink = submissionLink;
      submission.status = 'submitted';
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      // Create new submission
      submission = new AssignmentSubmission({
        studentId: req.user.id,
        assignmentId,
        submissionLink,
        status: 'submitted'
      });
      await submission.save();
    }

    res.json({ message: 'Assignment submitted successfully', submission });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
