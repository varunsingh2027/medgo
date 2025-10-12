#!/usr/bin/env node

import dotenv from 'dotenv';
import connectDB, { getConnectionInfo } from './src/config/database.js';

// Load environment variables
dotenv.config();

const testMongoDBConnection = async () => {
  console.log('🔍 MongoDB Connection Test\n');
  
  try {
    console.log('1. Loading configuration...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmaexport-distributor';
    console.log(`   📍 Connection string: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}\n`);
    
    console.log('2. Attempting to connect to MongoDB...');
    const connection = await connectDB();
    
    if (connection) {
      console.log('3. Connection successful! ✅');
      const info = getConnectionInfo();
      console.log(`   🏠 Host: ${info.host}`);
      console.log(`   📊 Database: ${info.name}`);
      console.log(`   🔌 Status: ${info.state}\n`);
      
      console.log('4. Testing basic operations...');
      
      // Test a simple query
      const { default: mongoose } = await import('mongoose');
      const testCollection = mongoose.connection.db.collection('test');
      
      // Insert a test document
      await testCollection.insertOne({ test: true, timestamp: new Date() });
      console.log('   ✅ Insert test passed');
      
      // Find the test document
      const result = await testCollection.findOne({ test: true });
      console.log('   ✅ Query test passed');
      
      // Clean up test document
      await testCollection.deleteOne({ test: true });
      console.log('   ✅ Delete test passed\n');
      
      console.log('🎉 MongoDB is fully connected and operational!');
      console.log('✅ Your backend can now use the database for real data\n');
      
      // Close connection
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
      
    } else {
      console.log('3. Connection failed - using mock data mode ⚠️');
      console.log('   💡 This is okay for development - your app will still work');
      console.log('   📝 To use real database, please set up MongoDB\n');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions:');
      console.log('   1. Install and start MongoDB locally:');
      console.log('      - Download from: https://www.mongodb.com/try/download/community');
      console.log('      - Start with: mongod');
      console.log('   2. Use MongoDB Atlas (cloud):');
      console.log('      - Sign up at: https://www.mongodb.com/atlas');
      console.log('      - Update MONGODB_URI in backend/.env');
      console.log('   3. Use Docker:');
      console.log('      - Run: docker run -d -p 27017:27017 --name mongodb mongo');
    }
    
    console.log('\n🔄 Your app will continue to work with mock data');
  }
};

// Run the test
testMongoDBConnection();
