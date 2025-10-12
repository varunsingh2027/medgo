# 🏥 PharmaExport-Distributor

A comprehensive pharmaceutical distribution platform built with React.js frontend and Express.js backend, designed for medical distributors, pharmacies, and healthcare institutions.

## 🌟 Features

### 🔍 Core Functionality
- **Advanced Medicine Search** - Search by name, generic name, manufacturer
- **Product Catalog** - Comprehensive pharmaceutical product database
- **Category Management** - Organized product categories and filters
- **Manufacturer Directory** - Verified pharmaceutical manufacturers
- **Quote System** - Request quotes for bulk orders
- **Contact Management** - Professional inquiry handling

### 🔐 User Management
- **Role-based Access** - Admin, Pharmacist, Distributor roles
- **Secure Authentication** - JWT-based authentication system
- **User Profiles** - Complete user profile management
- **Company Verification** - Verified business accounts

### 📊 Admin Features
- **Dashboard** - Comprehensive admin dashboard
- **User Management** - Manage all system users
- **Product Management** - Add, edit, remove products
- **Order Tracking** - Monitor quotes and orders
- **Analytics** - System usage analytics

## 🚀 Live Demo

- **Frontend**: [https://varunsingh2027.github.io/PharmaExport-Distributor](https://varunsingh2027.github.io/PharmaExport-Distributor)
- **Backend API**: `https://your-backend-url.onrender.com/api`

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Vite** - Fast build tool
- **CSS Modules** - Scoped styling
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or Atlas)
- **Git** for version control
- **Gmail** account (for email service)

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/varunsingh2027/PharmaExport-Distributor.git
cd PharmaExport-Distributor
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 3. Environment Setup
```bash
# Copy environment template
cp backend/.env.production.template backend/.env

# Edit backend/.env with your values:
# - MongoDB connection string
# - JWT secret key
# - Email credentials
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run fullstack:dev

# Or start individually:
npm run dev          # Frontend only (port 5173)
npm run backend:dev  # Backend only (port 5000)
```

### 5. Seed Database (Optional)
```bash
npm run backend:seed
```

## 🚀 Deployment

### Quick Deploy (Recommended)
1. **Backend to Render:**
   - Connect GitHub repository
   - Set environment variables
   - Deploy backend service

2. **Frontend to Netlify:**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Database on MongoDB Atlas:**
   - Create free cluster
   - Configure network access
   - Get connection string

### Detailed Guide
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions.

### MongoDB Setup
See [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) for database setup guide.

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend && npm test

# Test database connection
cd backend && node test-mongodb.js
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- 📱 **Mobile devices** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktops** (1024px+)
- 🖥️ **Large screens** (1440px+)

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt password encryption
- **Input Validation** - Comprehensive input sanitization
- **Rate Limiting** - API request rate limiting
- **CORS Protection** - Cross-origin request security
- **Helmet.js** - Security headers
- **Data Validation** - Schema-based validation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Varun Singh**
- GitHub: [@varunsingh2027](https://github.com/varunsingh2027)
- Email: varunsingh04.online@gmail.com
- LinkedIn: [Varun Singh](https://linkedin.com/in/varunsingh2027)

## 🆘 Support

- 📖 **Documentation**: Check the deployment guides
- 🐛 **Bug Reports**: Create an issue on GitHub
- 💬 **Questions**: Open a discussion on GitHub
- 📧 **Email**: varunsingh04.online@gmail.com

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Express.js team for the robust backend framework
- MongoDB for the flexible database solution
- All open-source contributors who made this possible

---

**⭐ Star this repository if you find it helpful!**
# NewPharma
# NewPharma
