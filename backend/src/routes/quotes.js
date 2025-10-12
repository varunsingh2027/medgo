import express from 'express';
import Quote from '../models/Quote.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create quote request
// @route   POST /api/quotes
// @access  Public
router.post('/', async (req, res) => {
  try {
    const quote = await Quote.create({
      ...req.body,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: { quote }
    });
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quote request'
    });
  }
});

// @desc    Get all quotes (Admin only)
// @route   GET /api/quotes
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate('items.product', 'name genericName')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: { quotes }
    });
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quotes'
    });
  }
});

export default router;
