# PharmaExport-Distributor Backend API

A comprehensive Express.js backend API for the PharmaExport-Distributor pharmaceutical website, providing authentication, product management, contact handling, and more.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization** - JWT-based auth with role management
- **Product Management** - Complete CRUD operations for pharmaceutical products
- **Category Management** - Hierarchical product categorization
- **Manufacturer Management** - Pharmaceutical company profiles
- **Contact System** - Contact form handling with email notifications
- **Quote Requests** - Customer quote management system
- **News & Articles** - Content management for health tips and company news
- **Search & Filtering** - Advanced product search with multiple filters

### Technical Features
- **MongoDB Integration** - Complete database models and relationships
- **Email System** - Automated email notifications using Nodemailer
- **Security** - Helmet, CORS, rate limiting, input validation
- **Performance** - Compression, caching headers, optimized queries
- **Validation** - Express-validator for request validation
- **Error Handling** - Comprehensive error handling and logging
- **API Documentation** - Well-documented endpoints with examples

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Copy the `.env` file from `src/config/.env` to the backend root directory and update the values:
   ```bash
   cp src/config/.env .env
   ```

4. **Configure Environment Variables:**
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/pharmaexport-distributor

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d

   # Email Configuration (Gmail SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=varunsingh04.online@gmail.com
   EMAIL_PASS=your-app-specific-password
   EMAIL_FROM=PharmaExport-Distributor <varunsingh04.online@gmail.com>

   # Admin Configuration
   ADMIN_EMAIL=varunsingh04.online@gmail.com
   ADMIN_PASSWORD=admin123
   ```

5. **Start MongoDB:**
   Make sure MongoDB is running on your system.

6. **Seed Database (Optional):**
   ```bash
   npm run seed
   ```

7. **Start Development Server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /logout` - User logout

### Products (`/api/products`)
- `GET /` - Get all products (with filters, search, pagination)
- `GET /search` - Search products
- `GET /featured` - Get featured products
- `GET /category/:categoryId` - Get products by category
- `GET /manufacturer/:manufacturerId` - Get products by manufacturer
- `GET /:id` - Get single product
- `POST /:id/reviews` - Add product review (Protected)

### Categories (`/api/categories`)
- `GET /` - Get all categories
- `GET /:id` - Get single category

### Manufacturers (`/api/manufacturers`)
- `GET /` - Get all manufacturers
- `GET /:id` - Get single manufacturer

### Contact (`/api/contact`)
- `POST /` - Submit contact form
- `GET /` - Get all contacts (Admin only)
- `GET /:id` - Get single contact (Admin only)
- `PUT /:id` - Update contact (Admin only)
- `DELETE /:id` - Delete contact (Admin only)

### Quotes (`/api/quotes`)
- `POST /` - Create quote request
- `GET /` - Get all quotes (Admin only)

### News (`/api/news`)
- `GET /` - Get all news articles
- `GET /:id` - Get single news article

### Users (`/api/users`)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID (Admin only)

### Utility
- `GET /api/health` - Health check endpoint
- `GET /api` - API documentation endpoint

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user** - Regular customers
- **pharmacist** - Licensed pharmacists
- **distributor** - Medical distributors
- **admin** - System administrators

## 📧 Email Configuration

The system uses Nodemailer with Gmail SMTP. To configure:

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password** in Google Account settings
3. **Use App Password** as `EMAIL_PASS` in environment variables

## 🗃️ Database Models

### User
- Authentication and profile information
- Role-based access control
- Company and license details for business users

### Product
- Complete pharmaceutical product information
- Pricing, stock status, and availability
- Reviews and ratings system
- Search indexing

### Category
- Hierarchical category structure
- SEO-friendly slugs and metadata

### Manufacturer
- Company profiles and certifications
- Product category relationships

### Contact
- Contact form submissions
- Status tracking and admin management
- Email notification system

### Quote
- Customer quote requests
- Automatic quote number generation
- Status tracking

### News
- Content management system
- SEO optimization
- Category and tag system

## 🔧 Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run seed` - Seed database with sample data

### Code Structure
```
backend/
├── src/
│   ├── config/         # Database and environment configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── package.json
└── README.md
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
EMAIL_PASS=your-production-email-password
```

### Production Considerations
- Use environment variables for all sensitive data
- Set up proper MongoDB replica set
- Configure email service (Gmail, SendGrid, etc.)
- Set up logging and monitoring
- Use reverse proxy (nginx)
- Enable SSL/TLS

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request rate limiting
- **Input Validation** - Express-validator
- **Password Hashing** - bcryptjs
- **JWT Authentication** - Secure token-based auth

## 📝 API Usage Examples

### Register User
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123",
  "role": "pharmacist",
  "companyName": "City Pharmacy"
}
```

### Submit Contact Form
```javascript
POST /api/contact
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+0987654321",
  "service": "general-medicine",
  "message": "I need information about bulk orders."
}
```

### Search Products
```javascript
GET /api/products/search?q=paracetamol&limit=10
```

### Get Products with Filters
```javascript
GET /api/products?category=medicines&manufacturer=sun-pharma&minPrice=10&maxPrice=100&page=1&limit=12
```

## 🐛 Error Handling

The API provides consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    }
  ]
}
```

## 📞 Support

For technical support or questions:
- **Email**: varunsingh04.online@gmail.com
- **Phone**: +91-9311459973

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This backend is designed to work seamlessly with the existing React.js frontend. The frontend remains unchanged and will integrate with these API endpoints for full-stack functionality.
