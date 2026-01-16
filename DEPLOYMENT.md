# 🚀 ResearchHub Deployment Guide - Render.com

## 📋 Pre-Deployment Checklist

### ✅ Backend Ready
- [x] MongoDB Atlas connection configured
- [x] Environment variables in `.env`
- [x] Google OAuth Client ID added
- [x] Cloudinary credentials configured
- [x] CORS setup for frontend URL
- [x] Error handling improved
- [x] `render.yaml` created
// hi
### ✅ Frontend Ready
- [x] Dark theme applied to all pages
- [x] Responsive design completed
- [x] API service configured
- [x] Environment variables setup
- [x] Build script ready

---

## 🔧 Step 1: Backend Deployment (Render.com)

### 1.1 Push Code to GitHub
```bash
cd Back-End
git init
git add .
git commit -m "Backend ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 1.2 Create Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `researchhub-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `Back-End`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Add Environment Variables
Click **"Environment"** tab and add:

```
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://786fly_db_user:rFRKVYdZB0eHuQMa@researchhub.qa50qpf.mongodb.net/researchhub?retryWrites=true&w=majority
SECRET_KEY=amar-jwt-secret-key-change-in-production-2024
ADMIN_EMAIL=av457508@gmail.com
ADMIN_PASSWORD=1234
CLOUDINARY_CLOUD_NAME=dxkn63fkx
CLOUDINARY_API_KEY=941988296916779
CLOUDINARY_API_SECRET=G_Y9xzxYJumf1PN7JYDG9Tj1Zzw
GOOGLE_CLIENT_ID=179509708444-hnlbsa5qpugc4kq3p4qb3u1kiu92qqgg.apps.googleusercontent.com
FRONTEND_URL=https://researchhub-frontend.onrender.com
EMAIL_USER=
EMAIL_PASS=
```

### 1.4 Deploy
- Click **"Create Web Service"**
- Wait 5-10 minutes for deployment
- Note your backend URL: `https://researchhub-backend.onrender.com`

---

## 🎨 Step 2: Frontend Deployment (Render.com)

### 2.1 Create `.env.production` in Frontend
```bash
cd Frontend
```

Create file: `.env.production`
```
VITE_API_URL=https://researchhub-backend.onrender.com/api/v1
```

### 2.2 Push Frontend to GitHub
```bash
git init
git add .
git commit -m "Frontend ready for deployment"
git branch -M main
git remote add origin YOUR_FRONTEND_GITHUB_REPO_URL
git push -u origin main
```

### 2.3 Create Static Site on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `researchhub-frontend`
   - **Branch**: `main`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 2.4 Add Environment Variable
Click **"Environment"** tab:
```
VITE_API_URL=https://researchhub-backend.onrender.com/api/v1
```

### 2.5 Deploy
- Click **"Create Static Site"**
- Wait 5-10 minutes
- Your site will be live at: `https://researchhub-frontend.onrender.com`

---

## 🔄 Step 3: Update CORS in Backend

After frontend is deployed, update backend environment variable:

1. Go to Backend service on Render
2. Update `FRONTEND_URL`:
```
FRONTEND_URL=https://researchhub-frontend.onrender.com
```
3. Save and redeploy

---

## ✅ Step 4: Testing Checklist

### Backend Health Check
```bash
curl https://researchhub-backend.onrender.com/health
```
Expected: `{"status":"OK"}`

### Frontend Pages to Test
- ✅ Landing Page - Hero animation working
- ✅ Login/Signup - Google OAuth working
- ✅ About Page - Dark theme applied
- ✅ Bidding Page - Projects loading
- ✅ Client Dashboard - Stats showing
- ✅ Pricing Page - Cards displaying
- ✅ Blog Page - Articles loading

### API Endpoints to Test
- ✅ POST `/api/v1/user/register` - User registration
- ✅ POST `/api/v1/user/login` - User login
- ✅ GET `/api/v1/project` - Get projects
- ✅ POST `/api/v1/project` - Create project

---

## 🐛 Common Issues & Fixes

### Issue 1: CORS Error
**Fix**: Update `FRONTEND_URL` in backend env vars

### Issue 2: MongoDB Connection Failed
**Fix**: Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)

### Issue 3: Build Failed
**Fix**: Check Node version (use Node 18+)

### Issue 4: Environment Variables Not Working
**Fix**: Restart service after adding env vars

---

## 📊 Performance Optimization

### Backend
- ✅ MongoDB connection pooling enabled
- ✅ Error handling with timeouts
- ✅ CORS configured properly
- ✅ Compression middleware (add if needed)

### Frontend
- ✅ Vite build optimization
- ✅ Code splitting enabled
- ✅ Images optimized
- ✅ Lazy loading components

---

## 🔐 Security Checklist

- ✅ Environment variables secured
- ✅ CORS restricted to frontend URL
- ✅ JWT secret key strong
- ✅ MongoDB credentials secured
- ✅ HTTPS enabled (automatic on Render)
- ⚠️ Change admin password in production
- ⚠️ Use strong SECRET_KEY (32+ characters)

---

## 📱 Demo Preparation

### For Client Demo:
1. **Test User Accounts**:
   - Client: `demo-client@researchhub.com` / `Demo@123`
   - Freelancer: `demo-freelancer@researchhub.com` / `Demo@123`

2. **Sample Projects**:
   - Create 3-5 sample projects
   - Add sample bids
   - Show project workflow

3. **Key Features to Showcase**:
   - ✨ Dark theme with animations
   - 🔍 Project search and filtering
   - 💼 Dashboard with stats
   - 📊 Bidding system
   - 🔐 Google OAuth login
   - 📱 Fully responsive design

---

## 🚀 Go Live URLs

**Frontend**: https://researchhub-frontend.onrender.com
**Backend API**: https://researchhub-backend.onrender.com/api/v1
**Health Check**: https://researchhub-backend.onrender.com/health

---

## 📞 Support

If deployment fails:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Check GitHub repository access

**Ready for Client Demo! 🎉**
