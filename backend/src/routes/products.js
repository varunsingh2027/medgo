import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getProductsByManufacturer,
  getFeaturedProducts,
  addProductReview
} from '../controllers/productController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Comment cannot exceed 1000 characters')
];

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/manufacturer/:manufacturerId', getProductsByManufacturer);
router.get('/:id', optionalAuth, getProductById);

// Protected routes
router.post('/:id/reviews', protect, reviewValidation, validateRequest, addProductReview);

export default router;
