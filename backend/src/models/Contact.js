import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  service: {
    type: String,
    enum: [
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
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  responseMessage: {
    type: String,
    trim: true
  },
  responseDate: Date,
  ipAddress: String,
  userAgent: String,
  source: {
    type: String,
    enum: ['website', 'mobile-app', 'phone', 'email', 'whatsapp'],
    default: 'website'
  },
  tags: [String],
  attachments: [{
    filename: String,
    url: String,
    publicId: String,
    fileType: String,
    fileSize: Number
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  notes: [{
    message: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for search and filtering
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({
  name: 'text',
  email: 'text',
  subject: 'text',
  message: 'text'
});

export default mongoose.model('Contact', contactSchema);
