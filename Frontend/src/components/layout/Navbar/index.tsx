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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer group transition-all"
              onClick={() => onNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg sm:text-xl">R</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">ResearchHub</span>
            </div>

            {/* Desktop Navigation Links - Left Side */}
            <div className="hidden lg:flex items-center gap-6">
              {isAuthenticated && user ? (
                <>
                  {user.role === 'client' && (
                    <button
                      onClick={() => onNavigate('client-dashboard')}
                      className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role === 'freelancer' && (
                    <button
                      onClick={() => onNavigate('freelancer-dashboard')}
                      className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role !== 'client' && (
                    <button
                      onClick={() => onNavigate('bidding')}
                      className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                    >
                      Projects
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('messaging')}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                  >
                    Messages
                  </button>
                  {user.role === 'freelancer' && (
                    <button
                      onClick={() => onNavigate('verification')}
                      className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                    >
                      Verification
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('bidding')}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                  >
                    Find Projects
                  </button>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                  >
                    Post Projects
                  </button>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => onNavigate('blog')}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-all text-sm"
                  >
                    Blog
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons - Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <ProfileDropdown
                onViewProfile={onViewProfile}
                onLogout={onLogout}
              />
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-all px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-900"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {isAuthenticated && user ? (
              <>
                {/* User Profile Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-4 mb-4">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt={user.fullname}
                        className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-blue-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.fullname}</p>
                      <p className="text-sm text-gray-600">{user.role === 'client' ? 'Client' : 'Researcher'}</p>
                    </div>
                  </div>
                </div>

                {/* Authenticated User Menu Items */}
                {user.role === 'client' && (
                  <button
                    onClick={() => handleMobileNavigate('client-dashboard')}
                    className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role === 'freelancer' && (
                  <button
                    onClick={() => handleMobileNavigate('freelancer-dashboard')}
                    className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role !== 'client' && (
                  <button
                    onClick={() => handleMobileNavigate('bidding')}
                    className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                  >
                    Projects
                  </button>
                )}
                <button
                  onClick={() => handleMobileNavigate('messaging')}
                  className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Messages
                </button>

                <div className="border-t border-gray-200 my-3"></div>

                <button
                  onClick={() => { 
                    onViewProfile();
                    setMobileMenuOpen(false); 
                  }}
                  className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => { 
                    onLogout(); 
                    setMobileMenuOpen(false); 
                  }}
                  className="block w-full text-left py-3 text-red-600 hover:text-red-700 font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest User Menu Items */}
                <button
                  onClick={() => handleMobileNavigate('blog')}
                  className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Blog
                </button>
                <button
                  onClick={() => handleMobileNavigate('pricing')}
                  className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleMobileNavigate('bidding')}
                  className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  Find Projects
                </button>
                <button
                  onClick={() => handleMobileNavigate('login')}
                  className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleMobileNavigate('signup')}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-bold text-center transition-all shadow-lg mt-2"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
