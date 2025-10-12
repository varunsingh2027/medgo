import mongoose from 'mongoose';
import logger from './logger';
import process from 'process';

const connectDB = async () => {
  try {
    // Modern connection options - removed buffermaxentries
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove any references to buffermaxentries if present
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;