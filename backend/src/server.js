import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB, { isConnected, getConnectionInfo } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import mockProductRoutes from './routes/mockProducts.js';
import categoryRoutes from './routes/categories.js';
import contactRoutes from './routes/contact.js';
import manufacturerRoutes from './routes/manufacturers.js';
import quoteRoutes from './routes/quotes.js';
import newsRoutes from './routes/news.js';
import userRoutes from './routes/users.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (non-blocking for development)
connectDB().catch((error) => {
  console.log('⚠️  Database connection failed, continuing with limited functionality');
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://varunsingh2027.github.io',
        'https://pharmaexport-distributor.netlify.app',
        'https://pharmaexport-distributor.vercel.app',
        process.env.FRONTEND_URL
      ].filter(Boolean)
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', mockProductRoutes); // Use mock products for development
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbInfo = getConnectionInfo();
  res.status(200).json({
    success: true,
    message: 'PharmaExport-Distributor API is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbInfo.connected,
      status: dbInfo.state,
      host: dbInfo.host || 'Not connected',
      name: dbInfo.name || 'Not connected'
    },
    server: {
      port: PORT,
      uptime: process.uptime()
    }
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to PharmaExport-Distributor API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      contact: '/api/contact',
      manufacturers: '/api/manufacturers',
      quotes: '/api/quotes',
      news: '/api/news',
      users: '/api/users',
      health: '/api/health'
    },
    documentation: 'Please refer to the API documentation for detailed usage'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('\n====================================');
  console.log('🚀 PharmaExport-Distributor API Server');
  console.log('====================================');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  const dbInfo = getConnectionInfo();
  if (dbInfo.connected) {
    console.log(`✅ Database: Connected to ${dbInfo.name} at ${dbInfo.host}`);
    console.log('📊 Using real database for all operations');
  } else {
    console.log('⚠️  Database: Not connected');
    console.log('🔄 Using mock data for development');
    console.log('💡 To connect to MongoDB, see MONGODB_SETUP.md');
  }
  
  console.log('\n🔗 Available Endpoints:');
  console.log('   GET  /api/health              - Server health check');
  console.log('   GET  /api/products/search     - Search medicines');
  console.log('   GET  /api/products/salt/:name - Search by generic name');
  console.log('   GET  /api/products/manufacturer/:name - Search by manufacturer');
  console.log('   POST /api/contact             - Contact form');
  console.log('   POST /api/quotes              - Quote requests');
  console.log('\n🌐 Frontend URL: http://localhost:5173');
  console.log('====================================\n');
});

export default app;
