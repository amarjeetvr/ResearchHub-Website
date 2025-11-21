# 🚀 Production Deployment Checklist

## ✅ Fixed Issues (Completed)

### Critical Fixes
- [x] Fixed TypeScript type error - Added 'admin' role to User interface
- [x] Fixed admin route mapping inconsistency (`/admin/login` paths now consistent)
- [x] Removed duplicate "Pricing" button in mobile menu
- [x] Added environment variable support for API URL
- [x] Created `.env.example` files for both frontend and backend
- [x] Added health check endpoints (`/health` and `/api/v1/health`)
- [x] Improved CORS configuration to support environment-based origins
- [x] Added environment variable validation on server startup
- [x] Added database name to MongoDB connection string
- [x] Updated build scripts for production

## ⚠️ Important: Before Production Deployment

### 1. Security - CRITICAL
- [ ] **Change SECRET_KEY** in `.env` to a strong random string (minimum 32 characters)
  - Current: `amar-jwt-secret-key-change-in-production-2024`
  - Generate with: `openssl rand -base64 32` or similar
  
- [ ] **Change ADMIN_PASSWORD** to a strong password
  - Current: `1234` (VERY WEAK!)
  - Use strong password with uppercase, lowercase, numbers, and special characters

- [ ] **Update MONGO_URI** with production database
  - Add IP whitelist in MongoDB Atlas
  - Use environment-specific database names

### 2. Environment Variables

#### Backend (.env)
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/researchhub_prod?retryWrites=true&w=majority
PORT=8000
SECRET_KEY=<your-strong-secret-key-min-32-chars>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-strong-password>
FRONTEND_URL=https://your-domain.com
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
```

#### Frontend (.env.production)
```bash
VITE_API_BASE_URL=https://api.your-domain.com/api/v1
```

### 3. Code Quality
- [ ] Remove or disable console.log statements in production
  - 20+ console statements found in backend controllers
  - Consider using a logging library (winston, pino, etc.)

- [ ] Add error boundaries in React app
- [ ] Add request rate limiting middleware
- [ ] Add input validation/sanitization
- [ ] Add CSRF protection

### 4. Performance
- [ ] Enable compression middleware
- [ ] Add caching strategy (Redis recommended)
- [ ] Optimize database queries (add indexes)
- [ ] Enable CDN for static assets
- [ ] Minify and bundle frontend assets

### 5. Monitoring & Logging
- [ ] Set up application monitoring (e.g., PM2, New Relic, Datadog)
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Set up log aggregation
- [ ] Configure uptime monitoring

### 6. Database
- [ ] Set up database backups
- [ ] Configure database indexes
- [ ] Set up database connection pooling
- [ ] Review and optimize queries

### 7. Infrastructure
- [ ] Set up SSL/TLS certificates (HTTPS)
- [ ] Configure reverse proxy (Nginx, Apache)
- [ ] Set up firewall rules
- [ ] Configure auto-restart on crash (PM2, systemd)
- [ ] Set up CI/CD pipeline

### 8. Testing
- [ ] Test all authentication flows
- [ ] Test admin login with new credentials
- [ ] Test file uploads
- [ ] Test all API endpoints
- [ ] Load testing
- [ ] Security testing

## 🏃 Running in Production

### Backend
```bash
cd Back-End
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd Frontend
npm install
npm run build:prod
# Serve the dist folder with a static file server
```

## 📊 Health Check URLs

- Backend Health: `http://your-domain:8000/health`
- API Health: `http://your-domain:8000/api/v1/health`

## 🔐 Security Headers to Add

Consider adding these security headers via Nginx/Apache:
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`
- `Content-Security-Policy`

## 📝 Notes

- All TypeScript errors have been resolved
- Admin authentication now works correctly
- Environment variables are properly configured
- Health check endpoints are available for monitoring
- CORS is configured to work with environment-specific origins

## 🚨 Immediate Actions Required

1. **Generate strong SECRET_KEY**
2. **Change ADMIN_PASSWORD**
3. **Update production MongoDB connection**
4. **Configure production environment variables**
5. **Test admin login thoroughly**
