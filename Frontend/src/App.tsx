import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { logoutUser, loginUser as apiLoginUser, registerUser, adminLogin as apiAdminLogin } from './services/api';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AdminLoginPage from './pages/Auth/AdminLoginPage';
import BiddingPage from './pages/BiddingPage';
import MessagingPage from './pages/MessagingPage';
import EscrowPaymentPage from './pages/EscrowPaymentPage';
import VerificationCertificationPage from './pages/VerificationCertificationPage';
import FreelancerAccountDetailsPage from './pages/FreelancerAccountDetailsPage';
import ClientDashboard from './pages/Dashboard/Client';
import FreelancerDashboard from './pages/Dashboard/Freelancer';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import TermsAndConditions from './pages/Policies/TermsAndConditions';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy';
import AcademicIntegrity from './pages/Policies/AcademicIntegrity';
import EscrowServiceTerms from './pages/Policies/EscrowServiceTerms';
import Navbar from './components/layout/Navbar';
import ProfileViewPopup from './components/shared/ProfileViewPopup';
import toast from 'react-hot-toast';

type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'admin-login' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'freelancer-account-details' | 'client-dashboard' | 'freelancer-dashboard' | 'admin-dashboard' | 'terms-and-conditions' | 'privacy-policy' | 'academic-integrity-policy' | 'escrow-service-terms' | 'not-found';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, setUser, refreshUser, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  // Handle navigation with URL updates
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    const routes: Record<PageType, string> = {
      'home': '/',
      'about': '/about',
      'blog': '/blog',
      'pricing': '/pricing',
      'login': '/login',
      'signup': '/signup',
      'admin-login': '/admin/login',
      'bidding': '/bidding',
      'messaging': '/messaging',
      'escrow': '/escrow',
      'verification': '/verification',
      'freelancer-account-details': '/freelancer-account-details',
      'client-dashboard': '/client-dashboard',
      'freelancer-dashboard': '/freelancer-dashboard',
      'admin-dashboard': '/admin-dashboard',
      'terms-and-conditions': '/terms-and-conditions',
      'privacy-policy': '/privacy-policy',
      'academic-integrity-policy': '/academic-integrity-policy',
      'escrow-service-terms': '/escrow-service-terms',
      'not-found': '/404'
    };
    navigate(routes[page]);
  };

  // Sync currentPage with URL changes
  useEffect(() => {
    const pathToPage: Record<string, PageType> = {
      '/': 'home',
      '/about': 'about',
      '/blog': 'blog',
      '/pricing': 'pricing',
      '/login': 'login',
      '/signup': 'signup',
      '/admin': 'admin-login',
      '/bidding': 'bidding',
      '/messaging': 'messaging',
      '/escrow': 'escrow',
      '/verification': 'verification',
      '/freelancer-account-details': 'freelancer-account-details',
      '/client-dashboard': 'client-dashboard',
      '/freelancer-dashboard': 'freelancer-dashboard',
      '/admin-dashboard': 'admin-dashboard',
      '/terms-and-conditions': 'terms-and-conditions',
      '/privacy-policy': 'privacy-policy',
      '/academic-integrity-policy': 'academic-integrity-policy',
      '/escrow-service-terms': 'escrow-service-terms',
      '/404': 'not-found'
    };
    
    // Handle dynamic routes
    if (location.pathname.startsWith('/bidding')) {
      setCurrentPage('bidding');
    } else {
      const page = pathToPage[location.pathname] || 'not-found';
      setCurrentPage(page);
    }
  }, [location.pathname]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiLoginUser({ email, password });
      if (response.success && response.user) {
        setUser(response.user);
        // Redirect based on role from backend
        if (response.user.role === 'client') {
          navigate('/client-dashboard');
        } else if (response.user.role === 'freelancer') {
          navigate('/freelancer-dashboard');
        }
      }
    } catch (error: any) {
      throw error; // Let LoginPage handle the error
    }
  };

  const handleSignup = async (data: any) => {
    try {
      await registerUser(data);
      // After successful registration, fetch user details from backend
      await refreshUser();
      // User state will be updated by refreshUser, then redirect
      if (data.role === 'client') {
      
        navigate('/login');
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      throw error; // Let SignupPage handle the error
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const handleAdminLogin = async (email: string, password: string) => {
    try {
      const response = await apiAdminLogin({ email, password });
      if (response.success && response.user) {
        setUser(response.user);
        navigate('/admin-dashboard');
      }
    } catch (error: any) {
      throw error; // Let AdminLoginPage handle the error
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => handleNavigate('signup')} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => handleNavigate('login')} />;
      case 'admin-login':
        return <AdminLoginPage onAdminLogin={handleAdminLogin} />;
      case 'bidding':
        return <BiddingPage />;
      case 'messaging':
        return <MessagingPage />;
      case 'escrow':
        return <EscrowPaymentPage />;
      case 'verification':
        return <VerificationCertificationPage />;
      case 'freelancer-account-details':
        return <FreelancerAccountDetailsPage />;
      case 'client-dashboard':
        return <ClientDashboard />;
      case 'freelancer-dashboard':
        return <FreelancerDashboard />;
      case 'admin-dashboard':
        // Protect admin dashboard - only allow access if logged in as admin
        if (!isAuthenticated || user?.role !== 'admin') {
          navigate('/admin/login');
          return <AdminLoginPage onAdminLogin={handleAdminLogin} />;
        }
        return <AdminDashboard />;
      case 'terms-and-conditions':
        return <TermsAndConditions />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'academic-integrity-policy':
        return <AcademicIntegrity />;
      case 'escrow-service-terms':
        return <EscrowServiceTerms />;
      case 'not-found':
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  const showNavigation = currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'admin-login' && currentPage !== 'admin-dashboard' && currentPage !== 'terms-and-conditions' && currentPage !== 'privacy-policy' && currentPage !== 'academic-integrity-policy' && currentPage !== 'escrow-service-terms';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  return (
    <>
      {showNavigation && (
        <Navbar
          onNavigate={handleNavigate}
          onViewProfile={() => setShowProfilePopup(true)}
          onLogout={handleLogout}
        />
      )}

      {renderPage()}

      {/* Profile View Popup */}
      {showProfilePopup && (
        <ProfileViewPopup onClose={() => setShowProfilePopup(false)} />
      )}
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
