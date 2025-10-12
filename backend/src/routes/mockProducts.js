import express from 'express';
import mongoose from 'mongoose';
import { mockProducts, mockManufacturers, mockCategories } from '../data/mockData.js';
import Product from '../models/Product.js';
import Manufacturer from '../models/Manufacturer.js';
import Category from '../models/Category.js';

const router = express.Router();

// Helper function to check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Search products
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    let results = [];
    let dataSource = 'mock';

    if (isDatabaseConnected()) {
      try {
        // Try to search in database first
        results = await Product.find({
          $and: [
            { isActive: true },
            {
              $or: [
                { name: { $regex: q, $options: 'i' } },
                { brand: { $regex: q, $options: 'i' } },
                { genericName: { $regex: q, $options: 'i' } },
                { manufacturer: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
              ]
            }
          ]
        }).populate('manufacturer', 'name').populate('category', 'name').limit(20);
        
        dataSource = 'database';
        console.log(`🔍 Database search for "${q}": ${results.length} results`);
      } catch (dbError) {
        console.error('Database search failed, using mock data:', dbError.message);
        results = [];
      }
    }

    // Fallback to mock data if database search failed or returned no results
    if (results.length === 0) {
      const searchTerm = q.toLowerCase();
      results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.genericName.toLowerCase().includes(searchTerm) ||
        product.manufacturer.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
      dataSource = 'mock';
      console.log(`🔍 Mock search for "${q}": ${results.length} results`);
    }

    res.json({
      success: true,
      data: results,
      count: results.length,
      message: `Found ${results.length} product(s) matching "${q}"`,
      dataSource,
      databaseConnected: isDatabaseConnected()
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

// Get products by salt/generic name
router.get('/salt/:saltName', async (req, res) => {
  try {
    const { saltName } = req.params;
    
    if (isDatabaseConnected()) {
      // Use database logic here when available
    }

    // Mock data search by salt
    const results = mockProducts.filter(product => 
      product.genericName.toLowerCase() === saltName.toLowerCase()
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found for salt: ${saltName}`
      });
    }

    // Group by salt with brands and manufacturers
    const saltInfo = {
      name: results[0].genericName,
      brands: [...new Set(results.map(p => p.brand))],
      manufacturers: [...new Set(results.map(p => p.manufacturer))],
      products: results
    };

    res.json({
      success: true,
      data: [saltInfo],
      message: `Found information for ${saltName}`
    });

  } catch (error) {
    console.error('Salt search error:', error);
    res.status(500).json({
      success: false,
      message: 'Salt search failed',
      error: error.message
    });
  }
});

// Get products by manufacturer
router.get('/manufacturer/:manufacturerName', async (req, res) => {
  try {
    const { manufacturerName } = req.params;
    
    if (isDatabaseConnected()) {
      // Use database logic here when available
    }

    // Mock data search by manufacturer
    const manufacturerInfo = mockManufacturers.find(m => 
      m.name.toLowerCase() === manufacturerName.toLowerCase()
    );

    if (!manufacturerInfo) {
      return res.status(404).json({
        success: false,
        message: `No information found for manufacturer: ${manufacturerName}`
      });
    }

    // Get products from this manufacturer
    const products = mockProducts.filter(product => 
      product.manufacturer.toLowerCase() === manufacturerName.toLowerCase()
    );

    const result = {
      ...manufacturerInfo,
      productList: products
    };

    res.json({
      success: true,
      data: [result],
      message: `Found information for ${manufacturerName}`
    });

  } catch (error) {
    console.error('Manufacturer search error:', error);
    res.status(500).json({
      success: false,
      message: 'Manufacturer search failed',
      error: error.message
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    
    if (isDatabaseConnected()) {
      // Use database logic here when available
    }

    let results = [...mockProducts];

    // Filter by category if provided
    if (category) {
      results = results.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedResults,
      count: paginatedResults.length,
      total: results.length,
      page,
      pages: Math.ceil(results.length / limit),
      hasNextPage: endIndex < results.length,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isDatabaseConnected()) {
      // Use database logic here when available
    }

    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

export default router;
