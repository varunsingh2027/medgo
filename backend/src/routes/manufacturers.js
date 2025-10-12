import express from 'express';
import Manufacturer from '../models/Manufacturer.js';

const router = express.Router();

// @desc    Get all manufacturers
// @route   GET /api/manufacturers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search;

    const filter = { isActive: true };
    
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const manufacturers = await Manufacturer.find(filter)
      .populate('productCategories', 'name icon')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Manufacturer.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        manufacturers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalManufacturers: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get manufacturers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching manufacturers'
    });
  }
});

// @desc    Get single manufacturer
// @route   GET /api/manufacturers/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id)
      .populate('productCategories', 'name slug icon');

    if (!manufacturer || !manufacturer.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Manufacturer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { manufacturer }
    });
  } catch (error) {
    console.error('Get manufacturer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching manufacturer'
    });
  }
});

export default router;
