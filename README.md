# 🔬 ResearchHub - AI-Powered Research Marketplace

> **Connecting Research Expertise with Real-World Innovation**

A next-generation research services marketplace that bridges the gap between complex real-world projects and certified research experts from across the globe.

![ResearchHub](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

### 🎨 **Modern Dark Theme UI**
- Stunning dark gradient design (`#0A0E27` → `#1a1f3a` → `#0f1629`)
- Glassmorphism effects throughout
- Canvas-based network animations (80 particles)
- Smooth 60fps animations
- Fully responsive (Mobile, Tablet, Desktop)

### 🔐 **Authentication & Security**
- JWT-based authentication
- Google OAuth integration
- Role-based access (Client/Freelancer/Admin)
- Secure cookie management
- Password encryption (bcrypt)

### 💼 **Project Management**
- Create and manage research projects
- AI-powered expert matching
- Advanced search and filtering
- Budget range selection
- Milestone-based tracking
- File upload (Cloudinary)

### 📊 **Dashboards**
- **Client Dashboard**: Project stats, active projects, proposals
- **Freelancer Dashboard**: Earnings, active work, proposals
- **Admin Dashboard**: User management, project oversight

### 🎯 **Bidding System**
- Submit proposals on projects
- Accept/Reject bids
- Real-time bid tracking
- Proposal management

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v7
- **State**: React Context API
- **HTTP**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + Google OAuth
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **Security**: bcrypt, CORS, cookie-parser

---

## 📁 Project Structure

```
ResearchHub-Website-main/
├── Back-End/
│   ├── controllers/
│   │   ├── project/
│   │   │   ├── project.crud.controller.js
│   │   │   ├── project.bidding.controller.js
│   │   │   ├── project.freelancer.controller.js
│   │   │   ├── project.payment.controller.js
│   │   │   └── project.stats.controller.js
│   │   ├── project.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js
│   │   └── mutler.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   └── adminProject.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   └── project.route.js
│   ├── utils/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   ├── email.js
│   │   └── pdfGenerator.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── render.yaml
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Footer/
│   │   │   │   └── AnimatedBackground/
│   │   │   └── shared/
│   │   ├── pages/
│   │   │   ├── LandingPage/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginPage/
│   │   │   │   └── SignupPage/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Client/
│   │   │   │   ├── Freelancer/
│   │   │   │   └── Admin/
│   │   │   ├── BiddingPage/
│   │   │   ├── AboutPage/
│   │   │   ├── PricingPage/
│   │   │   └── BlogPage/
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── config.ts
│   │   │   ├── authApi.ts
│   │   │   └── projectApi.ts
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── DEPLOYMENT.md
├── CHECKLIST.md
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Cloudinary account
- Google OAuth credentials

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/researchhub.git
cd researchhub
```

### 2. Backend Setup
```bash
cd Back-End
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Start backend
npm run dev
```

Backend runs on: `http://localhost:8000`

### 3. Frontend Setup
```bash
cd Frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env

# Start frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=your_mongodb_connection_string

# Server
PORT=8000
NODE_ENV=development

# Security
SECRET_KEY=your_jwt_secret_key_32_chars_minimum

# Admin
ADMIN_EMAIL=admin@researchhub.com
ADMIN_PASSWORD=strong_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email (Optional)
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 📦 Deployment

### Deploy to Render.com

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide**

#### Quick Steps:
1. Push code to GitHub
2. Create Render Web Service (Backend)
3. Add environment variables
4. Create Render Static Site (Frontend)
5. Update CORS settings
6. Test deployment

**Live URLs:**
- Frontend: `https://researchhub-frontend.onrender.com`
- Backend: `https://researchhub-backend.onrender.com`

---

## 🎯 API Endpoints

### Authentication
```
POST   /api/v1/user/register          - Register new user
POST   /api/v1/user/login             - Login user
POST   /api/v1/user/google-signup     - Google OAuth signup
POST   /api/v1/user/logout            - Logout user
GET    /api/v1/user/current           - Get current user
PUT    /api/v1/user/profile           - Update profile
POST   /api/v1/user/admin/login       - Admin login
```

### Projects
```
POST   /api/v1/project                - Create project
GET    /api/v1/project                - Get all projects
GET    /api/v1/project/my             - Get my projects
GET    /api/v1/project/:id            - Get project by ID
PUT    /api/v1/project/:id            - Update project
DELETE /api/v1/project/:id            - Delete project
```

### Bidding
```
POST   /api/v1/project/:id/bid        - Submit bid
PUT    /api/v1/project/:id/bid/accept - Accept bid
PUT    /api/v1/project/:id/bid/reject - Reject bid
GET    /api/v1/project/my/proposals   - Get my proposals
```

---

## 🎨 Design System

### Colors
```css
/* Background Gradient */
background: linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%);

/* Glassmorphism */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);

/* Primary Gradient */
background: linear-gradient(to right, #06b6d4, #3b82f6);

/* Accent Colors */
Cyan: #06b6d4 (#29B2FE)
Blue: #3b82f6
Purple: #a855f7
Green: #10b981
```

### Typography
- **Headings**: Bold, White
- **Body**: Regular, Gray-300
- **Labels**: Medium, Gray-400

### Spacing
- **Mobile**: py-8, px-4
- **Tablet**: py-12, px-6
- **Desktop**: py-16, px-8

---

## 🧪 Testing

### Run Tests
```bash
# Backend
cd Back-End
npm test

# Frontend
cd Frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration works
- [ ] Login returns JWT token
- [ ] Google OAuth functional
- [ ] Projects CRUD working
- [ ] Bidding system operational
- [ ] File upload works
- [ ] Responsive on all devices
- [ ] Dark theme consistent

---

## 📊 Performance

- ⚡ First Load: < 3s
- 🎨 60fps animations
- 📱 Mobile-first responsive
- 🔄 Lazy loading enabled
- ⚡ API Response: < 500ms

---

## 🔐 Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Input validation
- ✅ XSS protection
- ✅ HTTPS enforced (production)
- ⚠️ Rate limiting (recommended)
- ⚠️ Refresh tokens (recommended)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer**: Your Name
- **Designer**: Your Name
- **Project Manager**: Your Name

---

## 📞 Support

- **Email**: support@researchhub.com
- **Documentation**: [docs.researchhub.com](https://docs.researchhub.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/researchhub/issues)

---

## 🎉 Acknowledgments

- React Team for amazing framework
- Tailwind CSS for utility-first CSS
- MongoDB for database
- Render.com for hosting
- Cloudinary for file storage

---

**Made with ❤️ by ResearchHub Team**

🚀 **Ready for Production!**
