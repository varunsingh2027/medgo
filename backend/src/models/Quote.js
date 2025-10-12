import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  quoteNumber: {
    type: String,
    unique: true,
    required: true
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
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
      required: [true, 'Phone number is required']
    },
    companyName: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String,
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    unitPrice: Number,
    totalPrice: Number,
    specifications: String
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    amount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  tax: {
    percentage: {
      type: Number,
      default: 12,
      min: 0
    },
    amount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  finalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'accepted', 'rejected', 'expired', 'converted'],
    default: 'pending'
  },
  validUntil: {
    type: Date,
    required: true
  },
  notes: String,
  termsAndConditions: String,
  paymentTerms: String,
  deliveryTerms: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sentDate: Date,
  responseDate: Date,
  followUpDates: [Date],
  attachments: [{
    filename: String,
    url: String,
    publicId: String
  }]
}, {
  timestamps: true
});

// Generate quote number before saving
quoteSchema.pre('save', async function(next) {
  if (!this.quoteNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Find the last quote number for this month
    const lastQuote = await this.constructor
      .findOne({ quoteNumber: new RegExp(`^QT${year}${month}`) })
      .sort({ quoteNumber: -1 });
    
    let sequenceNumber = 1;
    if (lastQuote) {
      const lastSequence = parseInt(lastQuote.quoteNumber.slice(-4));
      sequenceNumber = lastSequence + 1;
    }
    
    this.quoteNumber = `QT${year}${month}${String(sequenceNumber).padStart(4, '0')}`;
  }
  next();
});

// Index for search and filtering
quoteSchema.index({ quoteNumber: 1 });
quoteSchema.index({ 'customerInfo.email': 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ createdAt: -1 });

export default mongoose.model('Quote', quoteSchema);
