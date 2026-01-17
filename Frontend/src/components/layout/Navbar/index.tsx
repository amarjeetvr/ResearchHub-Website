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
    <nav className="sticky top-0 z-50 relative overflow-hidden">
      {/* Background with gradient matching homepage */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%)' }}></div>
      
      {/* Animated glow orbs */}
      <div className="absolute top-0 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-0 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-b border-white/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer group transition-all"
              onClick={() => onNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/70 transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg sm:text-xl">R</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">ResearchHub</span>
            </div>

            {/* Desktop Navigation Links - Left Side */}
            <div className="hidden lg:flex items-center gap-6">
              {isAuthenticated && user ? (
                <>
                  {user.role === 'client' && (
                    <button
                      onClick={() => onNavigate('client-dashboard')}
                      className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role === 'freelancer' && (
                    <button
                      onClick={() => onNavigate('freelancer-dashboard')}
                      className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                    >
                      Dashboard
                    </button>
                  )}
                  {user.role !== 'client' && (
                    <button
                      onClick={() => onNavigate('bidding')}
                      className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                    >
                      Projects
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('messaging')}
                    className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                  >
                    Messages
                  </button>
                  {user.role === 'freelancer' && (
                    <button
                      onClick={() => onNavigate('verification')}
                      className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                    >
                      Verification
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('bidding')}
                    className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                  >
                    Find Projects
                  </button>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                  >
                    Post Projects
                  </button>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => onNavigate('blog')}
                    className="text-gray-300 hover:text-cyan-400 font-semibold transition-all text-sm"
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
                  className="text-gray-300 hover:text-white font-semibold transition-all px-4 py-2 rounded-lg hover:bg-white/10 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-10" style={{ background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%)' }}>
          <div className="px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10">
            {isAuthenticated && user ? (
              <>
                {/* User Profile Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-4 mb-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt={user.fullname}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{user.fullname}</p>
                      <p className="text-sm text-gray-300">{user.role === 'client' ? 'Client' : 'Researcher'}</p>
                    </div>
                  </div>
                </div>

                {/* Authenticated User Menu Items */}
                {user.role === 'client' && (
                  <button
                    onClick={() => handleMobileNavigate('client-dashboard')}
                    className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role === 'freelancer' && (
                  <button
                    onClick={() => handleMobileNavigate('freelancer-dashboard')}
                    className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {user.role !== 'client' && (
                  <button
                    onClick={() => handleMobileNavigate('bidding')}
                    className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                  >
                    Projects
                  </button>
                )}
                <button
                  onClick={() => handleMobileNavigate('messaging')}
                  className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  Messages
                </button>

                <div className="border-t border-white/10 my-3"></div>

                <button
                  onClick={() => { 
                    onViewProfile();
                    setMobileMenuOpen(false); 
                  }}
                  className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => { 
                    onLogout(); 
                    setMobileMenuOpen(false); 
                  }}
                  className="block w-full text-left py-3 text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest User Menu Items */}
                <button
                  onClick={() => handleMobileNavigate('blog')}
                  className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  Blog
                </button>
                <button
                  onClick={() => handleMobileNavigate('pricing')}
                  className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleMobileNavigate('bidding')}
                  className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 font-semibold transition-colors"
                >
                  Find Projects
                </button>
                <button
                  onClick={() => handleMobileNavigate('login')}
                  className="block w-full text-left py-3 text-gray-300 hover:text-white font-semibold transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleMobileNavigate('signup')}
                  className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-lg font-bold text-center transition-all shadow-lg shadow-cyan-500/50 mt-2"
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
