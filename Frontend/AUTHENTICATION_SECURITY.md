# Secure Authentication Implementation

## Overview
This application uses **JWT-based authentication with HTTP-only cookies** for secure user session management. User roles and authentication state are managed entirely by the backend - no localStorage is used.

## Architecture

### Backend Security (Node.js + Express)

#### JWT Token Management
- **Token Storage**: HTTP-only cookies (cannot be accessed by JavaScript)
- **Token Expiration**: 24 hours (login), 7 days (Google OAuth)
- **Cookie Configuration**:
  ```javascript
  {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,           // Prevents XSS attacks
    sameSite: "Lax",          // CSRF protection
    secure: NODE_ENV === "production" // HTTPS only in production
  }
  ```

#### Authentication Middleware (`isAuthenticated.js`)
```javascript
- Reads JWT from `req.cookies.token`
- Verifies token with SECRET_KEY
- Extracts userId and attaches to `req.id`
- Returns 401 if token is missing/invalid
```

#### API Endpoints

##### `/api/v1/user/register` (POST)
- **Body**: `{ fullname, email, phoneNumber, password, role }`
- **Role Validation**: Only accepts 'client' or 'freelancer'
- **Response**: Success message (no token - requires separate login)

##### `/api/v1/user/login` (POST)
- **Body**: `{ email, password }`
- **Security**: Password hashed with bcrypt
- **Response**: Sets HTTP-only cookie + returns user object
  ```json
  {
    "success": true,
    "user": {
      "_id": "...",
      "fullname": "...",
      "email": "...",
      "phoneNumber": "...",
      "role": "client|freelancer",
      "profilePhoto": "..."
    },
    "token": "..."
  }
  ```

##### `/api/v1/user/me` (GET) - **Protected**
- **Authentication**: Requires valid JWT cookie
- **Purpose**: Fetch current user details from backend session
- **Response**: User object without password
- **Usage**: Called on app initialization and after login/signup

##### `/api/v1/user/logout` (GET)
- **Action**: Clears HTTP-only cookie
- **Response**: Success message

##### `/api/v1/user/google-signup` (POST)
- **Body**: `{ token, role }`
- **Verification**: Validates Google ID token with Google OAuth2Client
- **Response**: Sets HTTP-only cookie + returns user object

### Frontend Security (React + TypeScript)

#### AuthContext (`contexts/AuthContext.tsx`)
```typescript
// Centralized authentication state management
- user: User | null          // Current user from backend
- loading: boolean            // Initial auth check
- isAuthenticated: boolean    // Computed from user state
- setUser(user)              // Update user state
- refreshUser()              // Fetch user from /me endpoint
```

**Key Features**:
- No localStorage/sessionStorage
- User state synced with backend on mount
- Automatic token validation via HTTP-only cookies

#### API Service (`services/api.ts`)
```typescript
// All requests include credentials: 'include'
// This ensures cookies are sent with every request

getCurrentUser() → GET /api/v1/user/me
loginUser(credentials) → POST /api/v1/user/login
registerUser(userData) → POST /api/v1/user/register
logoutUser() → GET /api/v1/user/logout
```

#### Authentication Flow

**1. App Initialization**
```
User opens app
  ↓
AuthProvider mounts
  ↓
Call getCurrentUser() via /me endpoint
  ↓
Backend validates JWT cookie
  ↓
If valid → setUser(userData)
If invalid → setUser(null)
  ↓
Render app with isAuthenticated state
```

**2. Login Flow**
```
User submits email/password
  ↓
LoginPage calls onLogin(email, password)
  ↓
App.tsx → apiLoginUser({ email, password })
  ↓
Backend validates credentials
  ↓
Backend sets HTTP-only cookie with JWT
  ↓
Backend returns user object
  ↓
setUser(response.user)
  ↓
Auto-redirect based on role:
  - client → /client-dashboard
  - freelancer → /freelancer-dashboard
```

**3. Signup Flow**
```
User fills registration form
  ↓
SignupPage calls onSignup(userData)
  ↓
App.tsx → registerUser(userData)
  ↓
Backend creates user account
  ↓
Frontend calls refreshUser() to fetch user details
  ↓
Backend reads JWT from cookie and returns user
  ↓
Auto-redirect based on role
```

**4. Profile Display**
```
ProfileDropdown component
  ↓
useAuth() hook
  ↓
Get user from AuthContext
  ↓
Display:
  - user.fullname
  - user.role (displayed as "Client" or "Researcher")
  - user.profilePhoto (if available)
  ↓
"View Details" → Navigate to role-specific dashboard
```

**5. Logout Flow**
```
User clicks Logout
  ↓
App.tsx → logoutUser()
  ↓
Backend clears HTTP-only cookie
  ↓
setUser(null)
  ↓
Navigate to home page
```

## Security Benefits

### Why HTTP-Only Cookies?
✅ **XSS Protection**: JavaScript cannot access the token
✅ **Automatic Handling**: Browser sends cookie with every request
✅ **CSRF Protection**: SameSite=Lax prevents cross-site attacks
✅ **Secure in Production**: HTTPS-only flag for production

### Why No localStorage?
❌ **XSS Vulnerable**: Malicious scripts can read localStorage
❌ **No Expiration**: Data persists indefinitely
❌ **Manual Management**: Must handle token refresh manually

## Role-Based Routing

### Automatic Redirection
After successful authentication, users are redirected based on their **backend-verified role**:

| Role | Redirect URL | Dashboard |
|------|-------------|-----------|
| `client` | `/client-dashboard` | Project management, post projects, review bids |
| `freelancer` | `/freelancer-dashboard` | Browse projects, submit proposals, track earnings |

### Protected Routes
- Dashboard pages check `isAuthenticated` state
- If not authenticated, show loading spinner or redirect to login
- User role controls which dashboard component renders

## UI Components

### ProfileDropdown
```tsx
// No props needed - fetches user from AuthContext
<ProfileDropdown 
  onViewProfile={() => navigate to role dashboard}
  onLogout={handleLogout}
/>

// Displays:
- Profile photo or initials
- Full name
- Role (Client/Researcher)
- "View Details" button
- Logout button
```

### Navigation
- **Authenticated Users**: Show Dashboard link (role-specific)
- **Guests**: Show Sign In / Get Started buttons
- **Mobile Menu**: Includes profile section with user details

## Testing the Implementation

### 1. Start Backend
```bash
cd Back-End
npm start
```

### 2. Start Frontend
```bash
cd Frontend/ResearchHub
npm run dev
```

### 3. Test Scenarios

**A. New User Registration**
1. Go to `/signup`
2. Fill form with role selection (Client/Freelancer)
3. Submit → Backend creates account + sets cookie
4. Frontend fetches user via `/me`
5. Auto-redirect to role dashboard

**B. Existing User Login**
1. Go to `/login`
2. Enter credentials
3. Submit → Backend validates + sets cookie
4. Auto-redirect based on backend role

**C. Profile Display**
1. Click profile avatar in navbar
2. Dropdown shows: Name, Role, View Details, Logout
3. All data fetched from backend via AuthContext

**D. Session Persistence**
1. Login successfully
2. Refresh page
3. AuthContext calls `/me` on mount
4. User stays authenticated (cookie still valid)

**E. Logout**
1. Click Logout
2. Backend clears cookie
3. AuthContext sets user to null
4. Redirect to home page

**F. Invalid Token**
1. Login successfully
2. Manually delete cookie in DevTools
3. Refresh page
4. `/me` returns 401
5. User set to null → Show login

## DevTools Verification

### Check HTTP-Only Cookie
1. Open Chrome DevTools → Application tab
2. Go to Cookies → http://localhost:5173
3. Look for `token` cookie
4. ✅ **HttpOnly** flag should be checked
5. Try accessing in Console: `document.cookie` → Token won't appear

### Check Network Requests
1. Open DevTools → Network tab
2. Login/Signup
3. Check `/login` or `/register` response
4. Look for `Set-Cookie` header
5. Subsequent requests should include `Cookie` header with token

### Verify Role Redirection
1. Signup as Client → Redirects to `/client-dashboard`
2. Signup as Freelancer → Redirects to `/freelancer-dashboard`
3. Logout → Redirects to `/`

## Production Deployment

### Environment Variables
```env
# Backend (.env)
SECRET_KEY=your-secret-key-here
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id

# Frontend
VITE_API_URL=https://api.yourdomain.com
```

### Security Checklist
- [ ] Set `NODE_ENV=production` (enables secure cookie flag)
- [ ] Use strong SECRET_KEY (minimum 32 characters)
- [ ] Enable HTTPS for both frontend and backend
- [ ] Configure CORS to allow only production domain
- [ ] Set shorter token expiration for sensitive data
- [ ] Implement refresh token mechanism
- [ ] Add rate limiting to login/signup endpoints
- [ ] Monitor failed authentication attempts

## Troubleshooting

### "Unauthorized" on every request
- **Cause**: Cookie not being sent with requests
- **Fix**: Ensure `credentials: 'include'` in all fetch calls
- **Fix**: Check CORS configuration allows credentials

### User state resets on refresh
- **Cause**: `/me` endpoint failing
- **Fix**: Check backend isAuthenticated middleware
- **Fix**: Verify JWT secret matches in middleware

### Auto-redirect not working
- **Cause**: User object missing role property
- **Fix**: Ensure backend returns complete user object
- **Fix**: Check AuthContext setUser() is called

### Profile dropdown shows no data
- **Cause**: useAuth() hook called outside AuthProvider
- **Fix**: Ensure App is wrapped in AuthProvider (main.tsx)
- **Fix**: Check AuthContext refreshUser() completes successfully
