import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const handleMobileNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">ResearchHub</span>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('about')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              How it works
            </button>
            
            <button
              onClick={() => onNavigate('bidding')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Find Expert
            </button>
            
            <button
              onClick={() => onNavigate('bidding')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Projects
            </button>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowSolutionsDropdown(true)}
                onMouseLeave={() => setShowSolutionsDropdown(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Solutions
                <ChevronDown size={16} />
              </button>
              {showSolutionsDropdown && (
                <div
                  onMouseEnter={() => setShowSolutionsDropdown(true)}
                  onMouseLeave={() => setShowSolutionsDropdown(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <button onClick={() => onNavigate('about')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Enterprise Solutions
                  </button>
                  <button onClick={() => onNavigate('pricing')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    API Integration
                  </button>
                  <button onClick={() => onNavigate('about')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Custom Solutions
                  </button>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Services
                <ChevronDown size={16} />
              </button>
              {showServicesDropdown && (
                <div
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <button onClick={() => onNavigate('bidding')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Research Services
                  </button>
                  <button onClick={() => onNavigate('verification')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Expert Verification
                  </button>
                  <button onClick={() => onNavigate('escrow')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Secure Payments
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Concierge
            </button>
          </div>

          {/* Right Section - Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {isAuthenticated && user ? (
              <>
                {user.role === 'freelancer' ? (
                  <button
                    onClick={() => onNavigate('freelancer-dashboard')}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Expert Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('bidding')}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Join as Expert
                  </button>
                )}
                <ProfileDropdown onViewProfile={onViewProfile} onLogout={onLogout} />
                {user.role === 'client' && (
                  <button
                    onClick={() => onNavigate('bidding')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Request Service
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Join as Expert
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('bidding')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Request Service
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated && user ? (
              <>
                <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.fullname} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user.fullname}</p>
                      <p className="text-xs text-gray-500">{user.role === 'client' ? 'Client' : user.role === 'freelancer' ? 'Expert' : 'Admin'}</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => handleMobileNavigate(user.role === 'client' ? 'client-dashboard' : user.role === 'freelancer' ? 'freelancer-dashboard' : 'admin-dashboard')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </button>
                <button onClick={() => handleMobileNavigate('about')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  How it works
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Find Expert
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Projects
                </button>
                <button onClick={() => handleMobileNavigate('messaging')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Messages
                </button>
                <div className="border-t border-gray-200 my-3"></div>
                <button onClick={() => { onViewProfile(); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  View Profile
                </button>
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-red-600 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleMobileNavigate('about')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  How it works
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Find Expert
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Projects
                </button>
                <button onClick={() => handleMobileNavigate('about')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Solutions
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Services
                </button>
                <button onClick={() => handleMobileNavigate('about')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium">
                  Concierge
                </button>
                <div className="border-t border-gray-200 my-3"></div>
                <button onClick={() => handleMobileNavigate('signup')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-semibold">
                  Join as Expert
                </button>
                <button onClick={() => handleMobileNavigate('login')} className="block w-full text-left py-3 text-gray-700 hover:text-gray-900 font-semibold">
                  Login
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold text-center transition-all shadow-lg">
                  Request Service
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}  