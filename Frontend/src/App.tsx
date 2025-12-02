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
import ProfileDropdown from './components/ProfileDropdown';
import ProfileViewPopup from './components/shared/ProfileViewPopup';
import { Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'admin-login' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'freelancer-account-details' | 'client-dashboard' | 'freelancer-dashboard' | 'admin-dashboard';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, setUser, refreshUser, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      'admin-dashboard': '/admin-dashboard'
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
      '/admin-dashboard': 'admin-dashboard'
    };
    
    // Handle dynamic routes
    if (location.pathname.startsWith('/bidding')) {
      setCurrentPage('bidding');
    } else {
      const page = pathToPage[location.pathname] || 'home';
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
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  const showNavigation = currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'admin-login' && currentPage !== 'admin-dashboard';

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
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2D6CDF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">R</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#1F1F1F]">ResearchHub</span>
              </div>

              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                {isAuthenticated && user ? (
                  <>
                    {user.role === 'client' && (
                      <button
                        onClick={() => handleNavigate('client-dashboard')}
                        className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                      >
                        Dashboard
                      </button>
                    )}
                    {user.role === 'freelancer' && (
                      <button
                        onClick={() => handleNavigate('freelancer-dashboard')}
                        className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                      >
                        Dashboard
                      </button>
                    )}
                    {user.role !== 'client' && (
                      <button
                        onClick={() => handleNavigate('bidding')}
                        className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                      >
                        Projects
                      </button>
                    )}
                    <button
                      onClick={() => handleNavigate('messaging')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Messages
                    </button>
                    {user.role === 'freelancer' && (
                      <button
                        onClick={() => handleNavigate('verification')}
                        className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                      >
                        Verification
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigate('home')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Home
                    </button>

                    <button
                      onClick={() => handleNavigate('bidding')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Find Projects
                    </button>
                     <button
                 onClick={() => handleNavigate('login')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Post Projects
                    </button>
                     <button
                      onClick={() => handleNavigate('pricing')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Pricing
                    </button>
                    <button
                      onClick={() => handleNavigate('blog')}
                      className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                    >
                      Blog
                    </button>
                   

                  </>
                )}
              </div>

              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                {isAuthenticated && user ? (
                  <ProfileDropdown
                    onViewProfile={() => setShowProfilePopup(true)}
                    onLogout={handleLogout}
                  />
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigate('login')}
                      className="text-[#2D6CDF] font-semibold hover:text-[#1F1F1F] transition-colors text-sm lg:text-base"
                    >
                      Sign In
                    </button>
                <button
  onClick={() => handleNavigate('signup')}
  className="bg-gradient-to-r from-[#0284C7] to-[#0B3C9D] text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-semibold text-sm lg:text-base shadow-md transition-all hover:opacity-90"
>
  Get Started
</button>

                  </>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#1F1F1F]"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {isAuthenticated && user ? (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg px-4 py-4 mb-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      {user.profilePhoto ? (
                        <img 
                          src={user.profilePhoto} 
                          alt={user.fullname}
                          className="w-12 h-12 rounded-full object-cover shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{user.fullname}</p>
                        <p className="text-sm text-slate-600">{user.role === 'client' ? 'Client' : 'Researcher'}</p>
                      </div>
                    </div>
                  </div>

                  {user.role === 'client' && (
                    <button
                      onClick={() => { handleNavigate('client-dashboard'); setMobileMenuOpen(false); }}
                      className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role === 'freelancer' && (
                    <button
                      onClick={() => { handleNavigate('freelancer-dashboard'); setMobileMenuOpen(false); }}
                      className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role !== 'client' && (
                    <button
                      onClick={() => { handleNavigate('bidding'); setMobileMenuOpen(false); }}
                      className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                    >
                      Projects
                    </button>
                  )}
                  <button
                    onClick={() => { handleNavigate('messaging'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                  >
                    Messages
                  </button>

                  <div className="border-t border-slate-200 my-3"></div>

                  <button
                    onClick={() => { 
                      setShowProfilePopup(true);
                      setMobileMenuOpen(false); 
                    }}
                    className="block w-full text-left py-3 text-[#1F1F1F] hover:text-blue-600 font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { handleNavigate('home'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => { handleNavigate('blog'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => { handleNavigate('pricing'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => { handleNavigate('bidding'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
                  >
                    Find Projects
                  </button>
                  <button
                    onClick={() => { handleNavigate('login'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#2D6CDF] font-semibold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { handleNavigate('signup'); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 text-[#2D6CDF] font-semibold"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
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
