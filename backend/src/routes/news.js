import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const featured = req.query.featured;

    const filter = { status: 'published' };
    
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const skip = (page - 1) * limit;

    const news = await News.find(filter)
      .populate('author', 'name email')
      .select('-content') // Exclude full content for list view
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await News.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        news,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalArticles: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching news'
    });
  }
});

// @desc    Get single news article
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name email')
      .populate('relatedArticles', 'title slug excerpt featuredImage');

    if (!news || news.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.status(200).json({
      success: true,
      data: { news }
    });
  } catch (error) {
    console.error('Get news article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching article'
    });
  }
});

export default router;
