import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters']
  },
  genericName: {
    type: String,
    required: [true, 'Generic name is required'],
    trim: true
  },
  brandName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: [true, 'Manufacturer is required']
  },
  composition: {
    type: String,
    required: [true, 'Product composition is required']
  },
  strength: {
    type: String,
    required: [true, 'Product strength is required']
  },
  dosageForm: {
    type: String,
    required: [true, 'Dosage form is required'],
    enum: ['tablet', 'capsule', 'syrup', 'injection', 'ointment', 'drops', 'powder', 'gel', 'cream', 'inhaler', 'patch']
  },
  packSize: {
    type: String,
    required: [true, 'Pack size is required']
  },
  price: {
    mrp: {
      type: Number,
      required: [true, 'MRP is required'],
      min: [0, 'MRP cannot be negative']
    },
    distributorPrice: {
      type: Number,
      required: [true, 'Distributor price is required'],
      min: [0, 'Distributor price cannot be negative']
    },
    retailerPrice: {
      type: Number,
      required: [true, 'Retailer price is required'],
      min: [0, 'Retailer price cannot be negative']
    }
  },
  images: [{
    url: String,
    publicId: String,
    altText: String
  }],
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  stockStatus: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'limited-stock', 'discontinued'],
    default: 'in-stock'
  },
  availability: {
    type: String,
    enum: ['available', 'back-order', 'discontinued'],
    default: 'available'
  },
  minOrderQuantity: {
    type: Number,
    default: 1,
    min: [1, 'Minimum order quantity must be at least 1']
  },
  tags: [String],
  seoTitle: String,
  seoDescription: String,
  features: [String],
  sideEffects: [String],
  contraindications: [String],
  storageInstructions: String,
  expiryDate: Date,
  batchNumber: String,
  hsnCode: String,
  gstRate: {
    type: Number,
    default: 12,
    min: 0,
    max: 28
  },
  isActive: {
    type: Boolean,
    default: true
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({
  name: 'text',
  genericName: 'text',
  brandName: 'text',
  description: 'text',
  composition: 'text'
});

// Virtual for discounted price
productSchema.virtual('discountPercentage').get(function() {
  if (this.price.mrp && this.price.distributorPrice) {
    return Math.round(((this.price.mrp - this.price.distributorPrice) / this.price.mrp) * 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);
