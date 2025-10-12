import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Manufacturer name is required'],
    unique: true,
    trim: true,
    maxlength: [200, 'Manufacturer name cannot be more than 200 characters']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  logo: {
    url: String,
    publicId: String,
    altText: String
  },
  establishedYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  headquarters: {
    country: String,
    state: String,
    city: String,
    address: String
  },
  contactInfo: {
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    phone: String,
    website: String
  },
  certifications: [{
    name: String,
    issuingBody: String,
    validFrom: Date,
    validTo: Date,
    certificateNumber: String
  }],
  licenses: [{
    type: String,
    number: String,
    issuedBy: String,
    validFrom: Date,
    validTo: Date
  }],
  specializations: [String],
  productCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
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
  productCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  seoTitle: String,
  seoDescription: String
}, {
  timestamps: true
});

// Index for search
manufacturerSchema.index({
  name: 'text',
  companyName: 'text',
  description: 'text'
});

export default mongoose.model('Manufacturer', manufacturerSchema);
