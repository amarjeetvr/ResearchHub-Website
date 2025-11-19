# ResearchHub Role Mapping Guide

## Role Architecture Overview

ResearchHub uses different role names across UI, Frontend, and Backend layers for clarity and semantic meaning.

---

## 🎨 **UI Layer (User-Facing)**
What users see in the interface:

| UI Display | Description | Icon |
|------------|-------------|------|
| **Post Projects** | "I need research help" | 💼 Briefcase |
| **Offer Services** | "I'm a researcher" | 🎓 Graduation Cap |

---

## 💻 **Frontend Layer (React/TypeScript)**
Internal frontend representation:

```typescript
type UserRole = 'client' | 'freelancer' | 'admin' | null;
```

- **`client`** = Users who post projects (need research help)
- **`freelancer`** = Researchers who offer services
- **`admin`** = Platform administrators

---

## 🔧 **Backend Layer (Node.js/MongoDB)**
Database and API representation:

```javascript
role: {
  type: String,
  enum: ["student", "recruiter"],
  required: true
}
```

- **`student`** = Maps to frontend `client` (Posts Projects)
- **`recruiter`** = Maps to frontend `freelancer` (Offers Services)

---

## 🔄 **Automatic Role Conversion**

### Frontend → Backend (API Requests)
```typescript
// SignupPage / LoginPage
role: 'student' | 'recruiter'  // Sent directly to backend
```

### Backend → Frontend (API Responses)
```typescript
// App.tsx handles conversion
const frontendRole = data.role === 'student' ? 'client' 
                   : data.role === 'recruiter' ? 'freelancer' 
                   : data.role;
```

---

## 📂 **Files Updated**

### Backend Files:
- ✅ `controllers/user.controller.js` - Cleaned up, added role validation
- ✅ `models/user.model.js` - Removed unused company field
- ✅ `middlewares/isAuthenticated.js` - Fixed JWT secret key consistency

### Frontend Files:
- ✅ `services/api.ts` - API integration with role documentation
- ✅ `pages/Auth/SignupPage/index.tsx` - Backend role integration
- ✅ `pages/Auth/LoginPage/index.tsx` - Backend role integration
- ✅ `App.tsx` - Role conversion logic
- ✅ `types/index.ts` - Added role mapping helpers
- ✅ `index.html` - Added Google Sign-In script

---

## 🔑 **Key Changes Made**

### Backend Cleanup:
1. ❌ Removed unused `jwtDecode` import
2. ❌ Removed `authProvider` field (not in schema)
3. ❌ Removed `company` reference from user model
4. ✅ Fixed JWT token key consistency (`userId` everywhere)
5. ✅ Fixed JWT secret (`SECRET_KEY` not `JWT_SECRET`)
6. ✅ Added role validation in register endpoint
7. ✅ Added proper error handling to logout
8. ✅ Cleaned up console.logs in production code
9. ✅ Excluded password from API responses

### Frontend Updates:
1. ✅ UI shows "Post Projects" / "Offer Services"
2. ✅ API sends `student` / `recruiter` to backend
3. ✅ App converts backend roles to frontend roles
4. ✅ Type-safe role mapping helpers added
5. ✅ Google OAuth integration working
6. ✅ Phone number field added (required by backend)

---

## 🧪 **Testing the Integration**

### Registration Flow:
1. User clicks **"Post Projects"** → sends `role: 'student'` to backend
2. Backend creates user with `role: 'student'`
3. Backend returns user data with `role: 'student'`
4. Frontend converts to `'client'` → redirects to Client Dashboard

### Login Flow:
1. User selects **"Post Projects"** → sends `role: 'student'` to backend
2. Backend validates email + password + role match
3. Returns JWT token + user data
4. Frontend converts role → navigates to appropriate dashboard

---

## 📊 **Complete Role Table**

| UI Display | Frontend Type | Backend Value | Dashboard Route | User Type |
|------------|---------------|---------------|-----------------|-----------|
| Post Projects | `client` | `student` | `/client-dashboard` | Needs research help |
| Offer Services | `freelancer` | `recruiter` | `/bidding` | Provides research services |
| Admin (internal) | `admin` | N/A | `/admin-dashboard` | Platform admin |

---

## ✅ **Validation Rules**

### Backend Validation:
```javascript
const ALLOWED_ROLES = ["student", "recruiter"];

// Register endpoint checks:
if (!ALLOWED_ROLES.includes(role)) {
  return res.status(400).json({
    message: "Invalid role. Must be 'student' or 'recruiter'",
    success: false
  });
}
```

### Frontend Display:
```tsx
// SignupPage & LoginPage both show:
<button onClick={() => setRole('student')}>
  <Briefcase />
  <div>Post Projects</div>
  <div>I need research help</div>
</button>

<button onClick={() => setRole('recruiter')}>
  <GraduationCap />
  <div>Offer Services</div>
  <div>I'm a researcher</div>
</button>
```

---

## 🚀 **API Endpoints Summary**

| Endpoint | Method | Role Field | Returns |
|----------|--------|------------|---------|
| `/api/v1/user/register` | POST | `student` \| `recruiter` | Success message |
| `/api/v1/user/login` | POST | `student` \| `recruiter` | User data + token |
| `/api/v1/user/google-signup` | POST | `student` \| `recruiter` | User data + token |
| `/api/v1/user/logout` | GET | N/A | Success message |
| `/api/v1/user/profile/update` | POST | N/A | Updated user data |

---

## 🎯 **Why This Architecture?**

1. **User-Friendly UI**: "Post Projects" and "Offer Services" are clear actions
2. **Semantic Frontend**: `client` and `freelancer` describe the relationship
3. **Academic Backend**: `student` and `recruiter` align with research context
4. **Flexible**: Easy to add new roles without changing UI

---

## 🔐 **Security Notes**

- JWT tokens use consistent `userId` key
- Tokens stored in httpOnly cookies
- Password excluded from all API responses
- Role validation on both frontend and backend
- Google OAuth properly integrated with role selection

---

*Last Updated: November 18, 2025*
