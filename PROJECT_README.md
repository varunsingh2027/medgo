# PharmaExport-Distributor - Full Stack Application

A comprehensive full-stack pharmaceutical distribution platform built with React.js frontend and Express.js backend. This application provides a complete solution for pharmaceutical companies, distributors, pharmacists, and healthcare professionals.

## 🌟 Features

### Frontend (React.js)
- **Responsive Design** - Mobile-first approach with comprehensive breakpoints
- **Modern UI/UX** - Professional pharmaceutical industry design
- **Three-Part Header** - Advanced navigation with selective sticky behavior
- **Product Catalog** - Browse pharmaceutical products with advanced filtering
- **Contact System** - Professional contact forms with email integration
- **Search Functionality** - Google-style search with autocomplete
- **Mobile Optimization** - Hamburger menu with click-to-expand dropdowns
- **Floating Action Buttons** - WhatsApp and Contact integration
- **Responsive Components** - All components optimized for multiple screen sizes

### Backend (Express.js + MongoDB)
- **RESTful API** - Complete API with authentication and authorization
- **User Management** - Role-based access control (Admin, Pharmacist, Distributor, User)
- **Product Management** - CRUD operations for pharmaceutical products
- **Category & Manufacturer Management** - Hierarchical organization
- **Contact System** - Email notifications and admin management
- **Quote Requests** - Customer quote management system
- **News & Content Management** - Health tips and company updates
- **Search & Filtering** - Advanced product search with multiple criteria
- **Email Integration** - Automated email notifications
- **Security** - JWT authentication, rate limiting, input validation

## 🏗️ Project Structure

```
PharmaExport-Distributor/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── assets/          # Static assets
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   └── translations/    # Internationalization
│   ├── public/              # Public assets
│   └── package.json
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   └── package.json
├── README.md               # This file
└── package.json           # Root package.json with full-stack scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/varunsingh2027/PharmaExport-Distributor.git
   cd PharmaExport-Distributor
   ```

2. **Install all dependencies:**
   ```bash
   npm run setup
   ```

3. **Configure Backend Environment:**
   ```bash
   cd backend
   cp src/config/.env .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pharmaexport-distributor
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=varunsingh04.online@gmail.com
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Seed Database (Optional):**
   ```bash
   npm run backend:seed
   ```

6. **Run Full Stack Application:**
   ```bash
   npm run fullstack:dev
   ```

This will start:
- Frontend development server on `http://localhost:5173`
- Backend API server on `http://localhost:5000`

## 📋 Available Scripts

### Root Level Scripts
- `npm run setup` - Install dependencies for both frontend and backend
- `npm run fullstack:dev` - Run both frontend and backend in development mode
- `npm run dev` - Run frontend development server
- `npm run build` - Build frontend for production
- `npm run deploy` - Deploy frontend to GitHub Pages

### Backend Scripts
- `npm run backend:install` - Install backend dependencies
- `npm run backend:dev` - Run backend in development mode
- `npm run backend:start` - Run backend in production mode
- `npm run backend:seed` - Seed database with sample data

## 🔧 Development

### Frontend Development
The frontend is built with:
- **React 19.1.0** - Latest React with functional components
- **Vite 7.0.4** - Fast build tool and development server
- **Modern CSS3** - Responsive design with comprehensive breakpoints
- **Component Architecture** - Modular, reusable components

### Backend Development
The backend is built with:
- **Express.js** - Web application framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT Authentication** - Secure token-based authentication
- **Nodemailer** - Email integration
- **Express Validator** - Input validation and sanitization

### Development Workflow

1. **Frontend Changes:**
   - Components are in `src/components/`
   - Styles use CSS modules with responsive breakpoints
   - All changes are hot-reloaded during development

2. **Backend Changes:**
   - API routes in `backend/src/routes/`
   - Controllers in `backend/src/controllers/`
   - Models in `backend/src/models/`
   - Server restarts automatically with nodemon

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin only)

### Categories & Manufacturers
- `GET /api/categories` - Get all categories
- `GET /api/manufacturers` - Get all manufacturers

For complete API documentation, see `backend/README.md`

## 🚀 Deployment

### Frontend Deployment (GitHub Pages)
```bash
npm run build
npm run deploy
```

### Backend Deployment
The backend can be deployed to various platforms:

1. **Heroku:**
   - Set environment variables
   - Deploy using Git or GitHub integration

2. **DigitalOcean/AWS:**
   - Set up MongoDB instance
   - Configure environment variables
   - Use PM2 for process management

3. **Vercel/Netlify:**
   - Configure serverless functions
   - Set up MongoDB Atlas

## 🗃️ Database Models

- **User** - Authentication and user profiles
- **Product** - Pharmaceutical product information
- **Category** - Product categorization
- **Manufacturer** - Company information
- **Contact** - Contact form submissions
- **Quote** - Customer quote requests
- **News** - News articles and health tips

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control** - Different user roles and permissions
- **Input Validation** - Comprehensive validation using express-validator
- **Rate Limiting** - Prevent abuse and DDoS attacks
- **CORS Configuration** - Secure cross-origin requests
- **Password Hashing** - bcryptjs for secure password storage
- **Security Headers** - Helmet middleware for security headers

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints at:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile Large:** 480px - 767px
- **Mobile Medium:** 360px - 479px
- **Mobile Small:** 320px - 359px

## 🎨 UI/UX Features

- **Professional Medical Theme** - Blue/teal color scheme
- **Sticky Header** - Selective sticky behavior during scroll
- **Hamburger Menu** - Mobile navigation with click-to-expand dropdowns
- **Floating Action Buttons** - WhatsApp and Contact integration
- **Google-Style Search** - Familiar search interface
- **Loading States** - User feedback during API calls
- **Error Handling** - User-friendly error messages

## 📞 Contact & Support

- **Website:** [https://varunsingh2027.github.io/PharmaExport-Distributor/](https://varunsingh2027.github.io/PharmaExport-Distributor/)
- **Email:** varunsingh04.online@gmail.com
- **Phone:** +91-9311459973
- **WhatsApp:** +91-9311459973

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution
- All contributors and supporters of this project

---

**Note:** This is a complete full-stack application. The frontend remains exactly as it was, with all existing functionality preserved. The backend adds comprehensive API capabilities while maintaining the original frontend design and user experience.
