import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import submissionsRouter from './routes/submissions.js';
import smsAuthRouter from './routes/sms/auth.js';
import smsAdminRouter from './routes/sms/admin.js';
import smsEnrollmentRouter from './routes/sms/enrollment.js';
import smsDashboardRouter from './routes/sms/dashboard.js';
import affiliateRouter from './routes/sms/affiliate.js';
import smsAssignmentsRouter from './routes/sms/assignments.js';
import smsResultsRouter from './routes/sms/results.js';
import process from 'node:process';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cookieParser from 'cookie-parser';
import referralMiddleware from './middleware/referralMiddleware.js';

import Student from './models/sms/Student.js';

dotenv.config();

import instructorRouter from './routes/sms/instructor.js';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(referralMiddleware);

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const createTestAccounts = async () => {
  try {
    const StudentModel = mongoose.model('Student');
    const CourseModel = mongoose.model('Course');
    const AssignmentModel = mongoose.model('Assignment');
    const ResultModel = mongoose.model('Result');
    
    // Create Courses if they don't exist
    const initialCourses = [
      { name: "Short Bootcamp AI Automation", bootcampType: "short", track: "AI & Automation (n8n & Zapier)", duration: "4 Weeks", fee: 5000 },
      { name: "AtechSkills DevSecAI Bootcamp - AI Track", bootcampType: "complete", track: "AI Track", duration: "6 Months", fee: 15000 },
      { name: "AtechSkills DevSecAI Bootcamp - Development Track", bootcampType: "complete", track: "Development Track", duration: "6 Months", fee: 15000 },
      { name: "AtechSkills DevSecAI Bootcamp - Cybersecurity Track", bootcampType: "complete", track: "Cybersecurity Track", duration: "6 Months", fee: 15000 },
      { name: "(QES)Quick Earning Skills Bootcamp - QES Track", bootcampType: "complete", track: "QA/QES Track", duration: "6 Months", fee: 10000 }
    ];

    for (const c of initialCourses) {
      const existing = await CourseModel.findOne({ name: c.name });
      if (!existing) {
        await new CourseModel(c).save();
      }
    }
    console.log('Courses synchronized');

    // Create Test Admin... (rest of the code)
    const adminEmail = 'admin@atechskills.com';
    const existingAdmin = await StudentModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new StudentModel({
        name: 'Super Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        enrollmentStatus: 'enrolled'
      });
      await admin.save();
      console.log('Test Admin created: admin@atechskills.com / admin123');
    }

    const studentEmail = 'student@atechskills.com';
    const existingStudent = await StudentModel.findOne({ email: studentEmail });
    if (!existingStudent) {
      const testCourse = await CourseModel.findOne({ name: "AtechSkills DevSecAI Bootcamp - AI Track" });
      const student = new StudentModel({
        name: 'Test Student',
        email: studentEmail,
        password: 'student123',
        role: 'student',
        batch: 'Batch-01',
        enrollmentStatus: 'enrolled',
        selectedCourses: testCourse ? [testCourse._id] : []
      });
      await student.save();
      console.log('Test Student created: student@atechskills.com / student123');

      if (testCourse) {
        // Create an Assignment
        const asm = new AssignmentModel({
          title: "Introduction to AI & Automation",
          description: "Complete the initial setup and write a brief report.",
          courseId: testCourse._id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        await asm.save();

        // Create a Result
        const res = new ResultModel({
          studentId: student._id,
          courseId: testCourse._id,
          examTitle: "Mid-Term Evaluation",
          marksObtained: 85,
          totalMarks: 100,
          grade: "A",
          status: "Passed"
        });
        await res.save();
        console.log('Seeded test assignment and result');
      }
    }
  } catch (err) {
    console.error('Error creating test accounts:', err.message);
  }
};

app.use('/api/submissions', submissionsRouter);
app.use('/api/sms/auth', smsAuthRouter);
app.use('/api/sms/admin', smsAdminRouter);
app.use('/api/sms/enrollment', smsEnrollmentRouter);
app.use('/api/sms/dashboard', smsDashboardRouter);
app.use('/api/sms/affiliate', affiliateRouter);
app.use('/api/sms/instructor', instructorRouter);
app.use('/api/sms/assignments', smsAssignmentsRouter);
app.use('/api/sms/results', smsResultsRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

const start = async () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running at http://0.0.0.0:${PORT}`);
  });
  try {
    let uri = MONGODB_URI;
    if (uri) {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
      await createTestAccounts();
    } else {
      const mem = await MongoMemoryServer.create();
      uri = mem.getUri();
      await mongoose.connect(uri);
      await createTestAccounts();
      console.log('Using in-memory MongoDB');
    }
  } catch (err) {
    try {
      const mem = await MongoMemoryServer.create();
      const uri = mem.getUri();
      await mongoose.connect(uri);
      await createTestAccounts();
      console.log('Using in-memory MongoDB');
    } catch (e) {
      console.error('Startup error:', e.message);
      console.error('Continuing without database connection');
    }
  }
};

start();
