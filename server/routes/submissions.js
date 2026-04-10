import { Router } from 'express';
import Submission from '../models/Submission.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, track, source, message } = req.body;
    if (!name || !email || !phone || !track || !source) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const doc = await Submission.create({ name, email, phone, track, source, message });
    return res.status(201).json({ id: doc._id });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const docs = await Submission.find({}).sort({ createdAt: -1 }).limit(200).lean();
    return res.json({ items: docs });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
