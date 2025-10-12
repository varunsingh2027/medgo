import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Manufacturer from '../models/Manufacturer.js';
import { mockProducts } from '../data/mockData.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || '-createdAt';
    const search = req.query.search;
    const category = req.query.category;
    const manufacturer = req.query.manufacturer;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const prescriptionRequired = req.query.prescriptionRequired;
    const stockStatus = req.query.stockStatus;
    const dosageForm = req.query.dosageForm;

    // Build filter object
    const filter = { isActive: true };

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Manufacturer filter
    if (manufacturer) {
      filter.manufacturer = manufacturer;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter['price.distributorPrice'] = {};
      if (minPrice) filter['price.distributorPrice'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['price.distributorPrice'].$lte = parseFloat(maxPrice);
    }

    // Prescription filter
    if (prescriptionRequired !== undefined) {
      filter.prescriptionRequired = prescriptionRequired === 'true';
    }

    // Stock status filter
    if (stockStatus) {
      filter.stockStatus = stockStatus;
    }

    // Dosage form filter
    if (dosageForm) {
      filter.dosageForm = dosageForm;
    }

    const skip = (page - 1) * limit;

    // Execute query with population
    const products = await Product.find(filter)
      .populate('category', 'name slug icon')
      .populate('manufacturer', 'name companyName logo')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(filter);

    // Get aggregated data for filters
    const aggregations = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price.distributorPrice' },
          maxPrice: { $max: '$price.distributorPrice' },
          dosageForms: { $addToSet: '$dosageForm' },
          stockStatuses: { $addToSet: '$stockStatus' }
        }
      }
    ]);

    const filters = aggregations[0] || {
      minPrice: 0,
      maxPrice: 10000,
      dosageForms: [],
      stockStatuses: []
    };

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        },
        filters
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug description icon')
      .populate('manufacturer', 'name companyName description logo establishedYear')
      .populate('reviews.user', 'name email');

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get related products (same category, different product)
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      isActive: true
    })
      .populate('category', 'name')
      .populate('manufacturer', 'name')
      .limit(6)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Check if database is connected by attempting a simple query
    let products = [];
    let alternativeSearch = [];
    
    try {
      // Text search with score
      products = await Product.find(
        { 
          $text: { $search: q },
          isActive: true 
        },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(parseInt(limit))
        .populate('category', 'name')
        .populate('manufacturer', 'name')
        .lean();

      // Also search by generic name and brand name (case insensitive)
      alternativeSearch = await Product.find({
        $or: [
          { genericName: { $regex: q, $options: 'i' } },
          { brandName: { $regex: q, $options: 'i' } },
          { name: { $regex: q, $options: 'i' } }
        ],
        isActive: true
      })
        .limit(parseInt(limit))
        .populate('category', 'name')
        .populate('manufacturer', 'name')
        .lean();
    } catch (dbError) {
      console.log('Database not available, using mock data for search');
      // Use mock data when database is not available
      const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(q.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(q.toLowerCase())) ||
        (product.genericName && product.genericName.toLowerCase().includes(q.toLowerCase())) ||
        product.manufacturer.toLowerCase().includes(q.toLowerCase())
      );
      
      return res.status(200).json({
        success: true,
        data: filtered.slice(0, parseInt(limit))
      });
    }

    // Combine and deduplicate results
    const allResults = [...products, ...alternativeSearch];
    const uniqueResults = allResults.filter((product, index, self) => 
      index === self.findIndex(p => p._id.toString() === product._id.toString())
    );

    res.status(200).json({
      success: true,
      data: uniqueResults.slice(0, parseInt(limit))
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products'
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:categoryId
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || '-createdAt';

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const skip = (page - 1) * limit;

    const products = await Product.find({
      category: categoryId,
      isActive: true
    })
      .populate('category', 'name slug icon')
      .populate('manufacturer', 'name companyName')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments({
      category: categoryId,
      isActive: true
    });

    res.status(200).json({
      success: true,
      data: {
        products,
        category: {
          id: category._id,
          name: category.name,
          description: category.description,
          icon: category.icon
        },
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category'
    });
  }
};

// @desc    Get products by manufacturer
// @route   GET /api/products/manufacturer/:manufacturerId
// @access  Public
export const getProductsByManufacturer = async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || '-createdAt';

    // Check if manufacturer exists
    const manufacturer = await Manufacturer.findById(manufacturerId);
    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: 'Manufacturer not found'
      });
    }

    const skip = (page - 1) * limit;

    const products = await Product.find({
      manufacturer: manufacturerId,
      isActive: true
    })
      .populate('category', 'name slug icon')
      .populate('manufacturer', 'name companyName logo')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments({
      manufacturer: manufacturerId,
      isActive: true
    });

    res.status(200).json({
      success: true,
      data: {
        products,
        manufacturer: {
          id: manufacturer._id,
          name: manufacturer.name,
          companyName: manufacturer.companyName,
          description: manufacturer.description,
          logo: manufacturer.logo
        },
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get products by manufacturer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by manufacturer'
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    // Get products with high ratings or featured tags
    const products = await Product.find({
      isActive: true,
      $or: [
        { 'ratings.average': { $gte: 4 } },
        { tags: { $in: ['featured', 'bestseller', 'popular'] } }
      ]
    })
      .populate('category', 'name icon')
      .populate('manufacturer', 'name')
      .sort({ 'ratings.average': -1, createdAt: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products'
    });
  }
};

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      review => review.user.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Add review
    const review = {
      user: userId,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);

    // Update ratings
    product.ratings.count = product.reviews.length;
    product.ratings.average = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        review,
        ratings: product.ratings
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding review'
    });
  }
};
