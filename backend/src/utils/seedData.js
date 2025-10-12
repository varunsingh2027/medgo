import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Manufacturer from '../models/Manufacturer.js';
import Product from '../models/Product.js';
import News from '../models/News.js';
import connectDB from '../config/database.js';
import { mockProducts, mockManufacturers, mockCategories } from '../data/mockData.js';

// Load environment variables
dotenv.config();

// Sample pharmaceutical categories
const categories = [
  {
    name: 'Pain Relief',
    description: 'Analgesics and anti-inflammatory medications',
    icon: '💊'
  },
  {
    name: 'Antibiotics',
    description: 'Bacterial infection treatments',
    icon: '�'
  },
  {
    name: 'Diabetes',
    description: 'Blood sugar management medications',
    icon: '🩸'
  },
  {
    name: 'Cardiovascular',
    description: 'Heart and blood pressure medications',
    icon: '❤️'
  },
  {
    name: 'Gastroenterology',
    description: 'Digestive system medications',
    icon: '🫁'
  },
  {
    name: 'Respiratory',
    description: 'Breathing and lung medications',
    icon: '🫁'
  }
];

// Sample pharmaceutical manufacturers
const manufacturers = [
  {
    name: 'Sun Pharma',
    country: 'India',
    founded: 1983,
    specialties: ['Generic Medicines', 'Oncology'],
    website: 'https://www.sunpharma.com',
    description: 'Leading pharmaceutical company in India'
  },
  {
    name: 'Cipla',
    country: 'India',
    founded: 1935,
    specialties: ['Respiratory', 'HIV/AIDS'],
    website: 'https://www.cipla.com',
    description: 'Global pharmaceutical company with focus on respiratory care'
  },
  {
    name: "Dr. Reddy's",
    country: 'India',
    founded: 1984,
    specialties: ['Generic Drugs', 'Biosimilars'],
    website: 'https://www.drreddys.com',
    description: 'Leading generic pharmaceutical company'
  },
  {
    name: 'GSK',
    country: 'UK',
    founded: 2000,
    specialties: ['Vaccines', 'Respiratory'],
    website: 'https://www.gsk.com',
    description: 'Global healthcare company'
  },
  {
    name: 'Abbott',
    country: 'USA',
    founded: 1888,
    specialties: ['Nutrition', 'Diagnostics'],
    website: 'https://www.abbott.com',
    description: 'Healthcare technology company'
  },
  {
    name: 'Pfizer',
    country: 'USA',
    founded: 1849,
    specialties: ['Cardiovascular', 'Oncology'],
    website: 'https://www.pfizer.com',
    description: 'Leading biopharmaceutical company'
  },
  // Added extra manufacturers from below
  {
    name: 'Sun Pharma',
    companyName: 'Sun Pharmaceutical Industries Ltd.',
    description: 'Leading pharmaceutical company in India',
    establishedYear: 1983,
    headquarters: {
      country: 'India',
      state: 'Gujarat',
      city: 'Mumbai'
    },
    specializations: ['Generic Medicines', 'Branded Formulations', 'Active Pharmaceutical Ingredients'],
    isVerified: true
  },
  {
    name: 'Cipla',
    companyName: 'Cipla Limited',
    description: 'Global pharmaceutical company focused on respiratory and HIV/AIDS treatments',
    establishedYear: 1935,
    headquarters: {
      country: 'India',
      state: 'Maharashtra',
      city: 'Mumbai'
    },
    specializations: ['Respiratory Care', 'HIV/AIDS Treatment', 'Oncology'],
    isVerified: true
  },
  {
    name: "Dr. Reddy's",
    companyName: "Dr. Reddy's Laboratories Ltd.",
    description: 'Indian multinational pharmaceutical company',
    establishedYear: 1984,
    headquarters: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad'
    },
    specializations: ['Generic Drugs', 'Biosimilars', 'Active Pharmaceutical Ingredients'],
    isVerified: true
  }
];

const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'varunsingh04.online@gmail.com',
    phone: '+919311459973',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
    isVerified: true
  },
  {
    name: 'John Pharmacist',
    email: 'john.pharmacist@example.com',
    phone: '+911234567890',
    password: 'password123',
    role: 'pharmacist',
    companyName: 'City Pharmacy',
    licenseNumber: 'PH123456',
    isVerified: true
  },
  {
    name: 'Medical Distributor',
    email: 'distributor@example.com',
    phone: '+919876543210',
    password: 'password123',
    role: 'distributor',
    companyName: 'MedDistrib Co.',
    licenseNumber: 'DL789012',
    isVerified: true
  }
];

const newsArticles = [
  {
    title: 'New Partnership with Leading Pharmaceutical Manufacturers',
    slug: 'new-partnership-leading-pharmaceutical-manufacturers',
    excerpt: 'We are excited to announce new partnerships with top pharmaceutical manufacturers to expand our product portfolio.',
    content: `
      <p>We are thrilled to announce strategic partnerships with several leading pharmaceutical manufacturers that will significantly expand our product portfolio and enhance our service offerings.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Access to a wider range of high-quality pharmaceutical products</li>
        <li>Competitive pricing for our customers</li>
        <li>Improved supply chain reliability</li>
        <li>Enhanced product availability</li>
      </ul>
      
      <p>These partnerships align with our commitment to providing healthcare professionals and institutions with reliable access to essential medications and medical supplies.</p>
    `,
    category: 'partnerships',
    status: 'published',
    publishedAt: new Date(),
    isFeatured: true,
    tags: ['partnerships', 'expansion', 'pharmaceutical']
  },
  {
    title: 'Quality Assurance in Pharmaceutical Distribution',
    slug: 'quality-assurance-pharmaceutical-distribution',
    excerpt: 'Learn about our comprehensive quality assurance processes that ensure the safety and efficacy of all distributed products.',
    content: `
      <p>Quality assurance is at the heart of everything we do at PharmaExport-Distributor. Our comprehensive quality management system ensures that every product we distribute meets the highest standards of safety and efficacy.</p>
      
      <h3>Our Quality Standards</h3>
      <ul>
        <li>WHO-GMP certified facilities and processes</li>
        <li>Cold chain management for temperature-sensitive products</li>
        <li>Regular quality audits and inspections</li>
        <li>Batch tracking and traceability systems</li>
      </ul>
      
      <p>We work closely with regulatory authorities and maintain all necessary certifications to ensure compliance with international quality standards.</p>
    `,
    category: 'company-news',
    status: 'published',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    tags: ['quality', 'standards', 'compliance']
  },
  {
    title: 'Healthcare Tips: Proper Medication Storage',
    slug: 'healthcare-tips-proper-medication-storage',
    excerpt: 'Essential guidelines for proper medication storage to maintain drug efficacy and safety.',
    content: `
      <p>Proper medication storage is crucial for maintaining drug efficacy and ensuring patient safety. Here are essential guidelines for healthcare professionals and patients.</p>
      
      <h3>Storage Guidelines</h3>
      <h4>Temperature Control</h4>
      <ul>
        <li>Store most medications at room temperature (15-25°C)</li>
        <li>Refrigerate temperature-sensitive medications (2-8°C)</li>
        <li>Never freeze medications unless specifically indicated</li>
      </ul>
      
      <h4>Environmental Factors</h4>
      <ul>
        <li>Keep medications in dry environments</li>
        <li>Protect from direct sunlight</li>
        <li>Maintain proper ventilation</li>
      </ul>
      
      <p>Always check medication labels for specific storage requirements and expiration dates.</p>
    `,
    category: 'health-tips',
    status: 'published',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    tags: ['healthcare', 'medication', 'storage', 'safety']
  }
];

// Function to create sample products
const createSampleProducts = async (categories, manufacturers) => {
  const products = [
    {
      name: 'Paracetamol 500mg Tablets',
      genericName: 'Paracetamol',
      brandName: 'Crocin',
      description: 'Effective pain reliever and fever reducer for adults and children',
      category: categories.find(c => c.name === 'Medicines')._id,
      manufacturer: manufacturers.find(m => m.name === 'Sun Pharma')._id,
      composition: 'Paracetamol 500mg',
      strength: '500mg',
      dosageForm: 'tablet',
      packSize: '10 tablets',
      price: {
        mrp: 25,
        distributorPrice: 20,
        retailerPrice: 22
      },
      prescriptionRequired: false,
      stockStatus: 'in-stock',
      tags: ['pain-relief', 'fever', 'paracetamol'],
      features: ['Fast acting', 'Safe for all ages', 'No side effects when used as directed']
    },
    {
      name: 'Amoxicillin 250mg Capsules',
      genericName: 'Amoxicillin',
      brandName: 'Amoxil',
      description: 'Broad-spectrum antibiotic for bacterial infections',
      category: categories.find(c => c.name === 'Medicines')._id,
      manufacturer: manufacturers.find(m => m.name === 'Cipla')._id,
      composition: 'Amoxicillin Trihydrate 250mg',
      strength: '250mg',
      dosageForm: 'capsule',
      packSize: '10 capsules',
      price: {
        mrp: 80,
        distributorPrice: 65,
        retailerPrice: 72
      },
      prescriptionRequired: true,
      stockStatus: 'in-stock',
      tags: ['antibiotic', 'bacterial-infection', 'amoxicillin']
    },
    {
      name: 'Vitamin D3 Tablets',
      genericName: 'Cholecalciferol',
      brandName: 'D-Rise',
      description: 'Essential vitamin D3 supplement for bone health',
      category: categories.find(c => c.name === 'Supplements')._id,
      manufacturer: manufacturers.find(m => m.name === 'Dr. Reddy\'s')._id,
      composition: 'Cholecalciferol 1000 IU',
      strength: '1000 IU',
      dosageForm: 'tablet',
      packSize: '30 tablets',
      price: {
        mrp: 150,
        distributorPrice: 120,
        retailerPrice: 135
      },
      prescriptionRequired: false,
      stockStatus: 'in-stock',
      tags: ['vitamin-d', 'bone-health', 'supplement']
    },
    {
      name: 'Digital Thermometer',
      genericName: 'Digital Thermometer',
      description: 'Accurate digital thermometer for body temperature measurement',
      category: categories.find(c => c.name === 'Medical Equipment')._id,
      manufacturer: manufacturers.find(m => m.name === 'Sun Pharma')._id,
      composition: 'Digital Temperature Sensor',
      strength: 'N/A',
      dosageForm: 'device',
      packSize: '1 unit',
      price: {
        mrp: 200,
        distributorPrice: 160,
        retailerPrice: 180
      },
      prescriptionRequired: false,
      stockStatus: 'in-stock',
      tags: ['thermometer', 'medical-device', 'temperature']
    }
  ];

  return products;
};

// Seed function
const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany();
    await Category.deleteMany();
    await Manufacturer.deleteMany();
    await Product.deleteMany();
    await News.deleteMany();

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create manufacturers
    console.log('🏭 Creating manufacturers...');
    const createdManufacturers = await Manufacturer.insertMany(manufacturers);
    console.log(`✅ Created ${createdManufacturers.length} manufacturers`);

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create products
    console.log('💊 Creating products...');
    const sampleProducts = await createSampleProducts(createdCategories, createdManufacturers);
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create news articles
    console.log('📰 Creating news articles...');
    const newsWithAuthor = newsArticles.map(article => ({
      ...article,
      author: createdUsers.find(user => user.role === 'admin')._id
    }));
    const createdNews = await News.insertMany(newsWithAuthor);
    console.log(`✅ Created ${createdNews.length} news articles`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Manufacturers: ${createdManufacturers.length}`);
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Products: ${createdProducts.length}`);
    console.log(`News Articles: ${createdNews.length}`);

    console.log('\n🔐 Admin Credentials:');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'varunsingh04.online@gmail.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding
seedData();
