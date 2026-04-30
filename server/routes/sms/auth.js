import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import Student from '../../models/sms/Student.js';
import Affiliate from '../../models/sms/Affiliate.js';
import ReferralClick from '../../models/sms/ReferralClick.js';
import authMiddleware from '../../middleware/authMiddleware.js';
import { generateReferralCode } from '../../utils/referralUtils.js';
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, course, batch, role, profilePic } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Handle Referral
    let referredBy = null;
    const refCode = req.cookies.atech_ref;
    if (refCode) {
      const referrer = await Student.findOne({ referralCode: refCode });
      if (referrer) referredBy = referrer._id;
    }

    // Generate unique referral code for new user
    const referralCode = await generateReferralCode(name.split(' ')[0]);

    const student = new Student({ 
      name, email, password, phone, course, batch, role, profilePic,
      referralCode,
      referredBy
    });
    
    await student.save();

    // Create Affiliate Profile
    const affiliate = new Affiliate({
      userId: student._id,
      referralCode: student.referralCode,
      referralLink: `http://localhost:5173/sms/signup?ref=${student.referralCode}`
    });
    await affiliate.save();

    // Log Conversion in ReferralClick
    if (refCode) {
      const click = await ReferralClick.findOne({ referralCode: refCode, ipAddress: req.ip }).sort({ clickedAt: -1 });
      if (click) {
        click.convertedToSignup = true;
        await click.save();

        // Increment conversions for the referrer
        const referrerAffiliate = await Affiliate.findOne({ referralCode: refCode });
        if (referrerAffiliate) {
          referrerAffiliate.totalConversions += 1;
          await referrerAffiliate.save();
        }
      }
    }

    // Clear referral cookie after successful registration
    res.clearCookie('atech_ref');

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {

    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await student.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: student._id, name: student.name, role: student.role, studentId: student.studentId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: student._id, name: student.name, role: student.role, studentId: student.studentId } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) return res.status(404).json({ message: 'User not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
