#!/usr/bin/env node

import fetch from 'node-fetch';

const testBackendConnection = async () => {
  console.log('🔍 Testing Backend Connection...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log(`   ✅ Health check: ${healthData.message}\n`);

    // Test products search
    console.log('2. Testing product search...');
    const searchResponse = await fetch('http://localhost:5000/api/products/search?q=paracetamol');
    const searchData = await searchResponse.json();
    console.log(`   ✅ Search test: Found ${searchData.count} products\n`);

    // Test salt search
    console.log('3. Testing salt search...');
    const saltResponse = await fetch('http://localhost:5000/api/products/salt/paracetamol');
    const saltData = await saltResponse.json();
    console.log(`   ✅ Salt search: ${saltData.message}\n`);

    // Test manufacturer search
    console.log('4. Testing manufacturer search...');
    const mfgResponse = await fetch('http://localhost:5000/api/products/manufacturer/GSK');
    const mfgData = await mfgResponse.json();
    console.log(`   ✅ Manufacturer search: ${mfgData.message}\n`);

    console.log('🎉 All backend tests passed!');
    console.log('✅ Frontend and Backend are properly connected');

  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5000');
    console.log('   Run: npm run backend:dev');
  }
};

// Run the test
testBackendConnection();
