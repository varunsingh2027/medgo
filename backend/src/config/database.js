import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';
import logger from './logger.js';

const connectDB = async () => {
  // Load environment variables first
  dotenv.config();
  
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmaexport-distributor';
    
    // Connect to MongoDB with modern options
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering
    });
    
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed due to app termination');
        process.exit(0);
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

    return conn;

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Provide helpful error messages based on error type
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 MongoDB server is not running. Please start MongoDB or use MongoDB Atlas.');
      console.log('   Local MongoDB: Make sure MongoDB is installed and running');
      console.log('   MongoDB Atlas: Update MONGODB_URI in .env with your Atlas connection string');
    } else if (error.message.includes('authentication failed')) {
      console.log('💡 Authentication failed. Check your username and password in the connection string.');
    } else if (error.message.includes('timeout')) {
      console.log('💡 Connection timeout. Check your network connection and MongoDB server status.');
    }
    
    // In development, continue without database
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Development mode: Server will continue with mock data functionality');
      console.log('📝 To use full database features, please set up MongoDB connection');
      return null;
    }
    
    // In production, exit on database connection failure
    console.log('🚫 Production mode: Cannot start without database connection');
    process.exit(1);
  }
};

// Helper function to check database connection status
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Helper function to get connection info
export const getConnectionInfo = () => {
  if (mongoose.connection.readyState === 1) {
    return {
      connected: true,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      state: 'Connected'
    };
  }
  return {
    connected: false,
    state: 'Disconnected'
  };
};

export default connectDB;
