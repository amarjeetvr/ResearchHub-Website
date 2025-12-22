import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ProfileDropdown from '../../ProfileDropdown';

type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'admin-login' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'freelancer-account-details' | 'client-dashboard' | 'freelancer-dashboard' | 'admin-dashboard';

interface NavbarProps {
  onNavigate: (page: PageType) => void;
  onViewProfile: () => void;
  onLogout: () => void;
}

export default function Navbar({ onNavigate, onViewProfile, onLogout }: NavbarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2D6CDF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1F1F1F]">ResearchHub</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {isAuthenticated && user ? (
              <>
                {user.role === 'client' && (
                  <button
                    onClick={() => onNavigate('client-dashboard')}
                    className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role === 'freelancer' && (
                  <button
                    onClick={() => onNavigate('freelancer-dashboard')}
                    className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role !== 'client' && (
                  <button
                    onClick={() => onNavigate('bidding')}
                    className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                  >
                    Projects
                  </button>
                )}
                <button
                  onClick={() => onNavigate('messaging')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Messages
                </button>
                {user.role === 'freelancer' && (
                  <button
                    onClick={() => onNavigate('verification')}
                    className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                  >
                    Verification
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('bidding')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Find Projects
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Post Projects
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-[#1F1F1F] hover:text-[#2D6CDF] font-medium transition-colors"
                >
                  Blog
                </button>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {isAuthenticated && user ? (
              <ProfileDropdown
                onViewProfile={onViewProfile}
                onLogout={onLogout}
              />
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-[#2D6CDF] font-semibold hover:text-[#1F1F1F] transition-colors text-sm lg:text-base"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-[#0284C7] to-[#0B3C9D] text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-semibold text-sm lg:text-base shadow-md transition-all hover:opacity-90"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1F1F1F]"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {isAuthenticated && user ? (
            <>
              {/* User Profile Card */}
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

              {/* Authenticated User Menu Items */}
              {user.role === 'client' && (
                <button
                  onClick={() => handleMobileNavigate('client-dashboard')}
                  className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                >
                  Dashboard
                </button>
              )}
              {user.role === 'freelancer' && (
                <button
                  onClick={() => handleMobileNavigate('freelancer-dashboard')}
                  className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                >
                  Dashboard
                </button>
              )}
              {user.role !== 'client' && (
                <button
                  onClick={() => handleMobileNavigate('bidding')}
                  className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
                >
                  Projects
                </button>
              )}
              <button
                onClick={() => handleMobileNavigate('messaging')}
                className="block w-full text-left py-3 text-[#1F1F1F] hover:text-[#2D6CDF] font-medium"
              >
                Messages
              </button>

              <div className="border-t border-slate-200 my-3"></div>

              <button
                onClick={() => { 
                  onViewProfile();
                  setMobileMenuOpen(false); 
                }}
                className="block w-full text-left py-3 text-[#1F1F1F] hover:text-blue-600 font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => { 
                  onLogout(); 
                  setMobileMenuOpen(false); 
                }}
                className="block w-full text-left py-3 text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Guest User Menu Items */}
              <button
                onClick={() => handleMobileNavigate('home')}
                className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleMobileNavigate('blog')}
                className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => handleMobileNavigate('pricing')}
                className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
              >
                Pricing
              </button>
              <button
                onClick={() => handleMobileNavigate('bidding')}
                className="block w-full text-left py-3 text-[#1F1F1F] font-medium"
              >
                Find Projects
              </button>
              <button
                onClick={() => handleMobileNavigate('login')}
                className="block w-full text-left py-3 text-[#2D6CDF] font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => handleMobileNavigate('signup')}
                className="block w-full text-left py-3 text-[#2D6CDF] font-semibold"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
