import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'News excerpt is required'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'News content is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'News category is required'],
    enum: [
      'company-news',
      'product-launch',
      'industry-updates',
      'health-tips',
      'regulatory-updates',
      'events',
      'partnerships',
      'awards',
      'research',
      'sustainability'
    ]
  },
  tags: [String],
  featuredImage: {
    url: String,
    publicId: String,
    altText: String
  },
  images: [{
    url: String,
    publicId: String,
    altText: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: Date,
  isFeatured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News'
  }],
  readingTime: {
    type: Number, // in minutes
    default: 0
  }
}, {
  timestamps: true
});

// Create slug before saving
newsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Calculate reading time (average 200 words per minute)
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  next();
});

// Index for search and filtering
newsSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
newsSchema.index({ status: 1, publishedAt: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ tags: 1 });
newsSchema.index({ isFeatured: 1 });
newsSchema.index({ slug: 1 });

export default mongoose.model('News', newsSchema);
