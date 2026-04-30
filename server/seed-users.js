import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/sms/Student.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atechskills';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    // Delete existing test users to avoid duplicates
    await Student.deleteMany({ email: { $in: ['admin@test.com', 'student@test.com'] } });

    const users = [
      {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin',
        phone: '1234567890',
        course: 'DEVSECAI Bootcamp',
        batch: 'Batch 1',
        enrollmentStatus: 'enrolled'
      },
      {
        name: 'Test Student',
        email: 'student@test.com',
        password: 'password123',
        role: 'student',
        phone: '0987654321',
        course: 'Short Bootcamp',
        batch: 'Batch 1',
        enrollmentStatus: 'enrolled'
      }
    ];

    for (const userData of users) {
      const user = new Student(userData);
      await user.save();
      console.log(`Created user: ${userData.email} (${userData.role})`);
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
