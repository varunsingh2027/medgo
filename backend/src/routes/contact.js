import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('service')
    .optional()
    .isIn([
      'general',
      'general-medicine',
      'vaccination',
      'laboratory',
      'laboratory-tests',
      'specialized',
      'specialized-care',
      'emergency',
      'emergency-care',
      'pharmacy',
      'pharmacy-services',
      'bulk-order',
      'distribution',
      'partnership',
      'complaint',
      'feedback'
    ])
    .withMessage('Invalid service type')
];

const updateContactValidation = [
  body('status')
    .optional()
    .isIn(['new', 'in-progress', 'resolved', 'closed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  body('responseMessage')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Response message cannot exceed 2000 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

// Public routes
router.post('/', contactValidation, validateRequest, submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContactById);
router.put('/:id', protect, authorize('admin'), updateContactValidation, validateRequest, updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
