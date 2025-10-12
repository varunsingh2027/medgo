# PharmaExport-Distributor Deployment Guide

## 🚀 Deployment Options

### Option 1: Frontend (Netlify) + Backend (Render) - Recommended

#### Frontend Deployment (Netlify)
1. **Connect to GitHub:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `PharmaExport-Distributor` repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

#### Backend Deployment (Render)
1. **Create New Web Service:**
   - Go to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Service Configuration:**
   - Name: `pharmaexport-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free tier

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pharmaexport-distributor
   JWT_SECRET=your-super-secret-jwt-key-here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM="PharmaExport-Distributor <your-email@gmail.com>"
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

### Option 2: Full Stack on Render

1. **Backend Service (Primary):**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Frontend Service (Static Site):**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Option 3: Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

## 📋 Pre-Deployment Checklist

### ✅ Database Setup (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Update environment variables

### ✅ Email Service Setup
1. Enable 2FA on Gmail
2. Generate App Password
3. Update email environment variables

### ✅ Environment Variables
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] EMAIL credentials
- [ ] FRONTEND_URL
- [ ] NODE_ENV=production

### ✅ Code Updates
- [ ] Update CORS origins in backend
- [ ] Update API base URL in frontend
- [ ] Test all API endpoints

## 🔧 Production Optimizations

### Backend (backend/src/server.js)
```javascript
// Update CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-netlify-site.netlify.app'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Frontend (src/services/api.js)
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com/api' 
  : 'http://localhost:5000/api';
```

## 🚦 Deployment Steps

### Step 1: Prepare for Production
```bash
# Update dependencies
npm audit fix

# Test build locally
npm run build

# Test backend locally
cd backend && npm test
```

### Step 2: Deploy Backend First
1. Deploy to Render/Railway/Heroku
2. Test all API endpoints
3. Verify database connection

### Step 3: Deploy Frontend
1. Update API_BASE_URL to backend URL
2. Deploy to Netlify/Vercel
3. Test frontend-backend connection

### Step 4: Configure Domain (Optional)
1. Purchase domain
2. Update DNS settings
3. Configure SSL certificates

## 🔍 Post-Deployment Testing

- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database operations work
- [ ] Email service functional
- [ ] Search functionality works
- [ ] Contact form submissions
- [ ] Quote requests work
- [ ] Mobile responsiveness

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors:** Update backend CORS configuration
2. **Build Failures:** Check Node.js version compatibility
3. **Database Connection:** Verify MongoDB URI and network access
4. **API 404 Errors:** Ensure correct API base URL

### Useful Commands:
```bash
# Check deployment logs
netlify dev
render logs

# Test API endpoints
curl https://your-backend-url/api/health

# Debug build issues
npm run build --verbose
```

## 📊 Monitoring & Maintenance

### Set up monitoring for:
- [ ] Uptime monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database backups
- [ ] SSL certificate renewal

---

**Need Help?** Check the logs and ensure all environment variables are properly set!
