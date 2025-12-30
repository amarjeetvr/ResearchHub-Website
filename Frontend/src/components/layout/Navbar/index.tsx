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
  const [showHireDropdown, setShowHireDropdown] = useState(false);
  const [showWorkDropdown, setShowWorkDropdown] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);

  const handleMobileNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#0E1724] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
            >
              <div className="w-10 h-10 bg-[#29B2FE] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold text-white hidden sm:block">ResearchHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
            {/* Hire Researchers Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowHireDropdown(true)}
                onMouseLeave={() => setShowHireDropdown(false)}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-2 font-medium"
              >
                Hire Researchers
                <ChevronDown size={16} />
              </button>
              {showHireDropdown && (
                <div
                  onMouseEnter={() => setShowHireDropdown(true)}
                  onMouseLeave={() => setShowHireDropdown(false)}
                  className="absolute top-full left-0 mt-1 w-[900px] bg-[#1A1F2E] rounded-lg shadow-2xl py-6 px-6 text-gray-200 border border-gray-700/50"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Options */}
                    <div className="col-span-4 space-y-4">
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">By skill</div>
                          <div className="text-sm text-gray-400">Looking for a freelancer with a specific skill? Start here.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">By location</div>
                          <div className="text-sm text-gray-400">Search for Researchers based on their location and timezone.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">By category</div>
                          <div className="text-sm text-gray-400">Find Researchers that suit a certain project category.</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle Section - Popular Skills with Images */}
                    <div className="col-span-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">🎨</div>
                          <div className="font-semibold text-white">Graphic designers</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">💻</div>
                          <div className="font-semibold text-white">Website designers</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">📱</div>
                          <div className="font-semibold text-white">Mobile app developers</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">⚙️</div>
                          <div className="font-semibold text-white">Software developers</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">🎭</div>
                          <div className="font-semibold text-white">3D artists</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">✨</div>
                          <div className="font-semibold text-white">Illustration</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Section - Other Skills */}
                    <div className="col-span-3">
                      <div className="text-sm font-semibold text-gray-400 mb-3">Other popular skills</div>
                      <div className="space-y-2">
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Web developers</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Writers</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Marketing specialists</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">SEO specialists</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Data entry clerks</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Virtual assistants</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Translators</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">View more →</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Find Work Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowWorkDropdown(true)}
                onMouseLeave={() => setShowWorkDropdown(false)}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-2 font-medium"
              >
                Find Work
                <ChevronDown size={16} />
              </button>
              {showWorkDropdown && (
                <div
                  onMouseEnter={() => setShowWorkDropdown(true)}
                  onMouseLeave={() => setShowWorkDropdown(false)}
                  className="absolute top-full left-0 mt-1 w-[900px] bg-[#1A1F2E] rounded-lg shadow-2xl py-6 px-6 text-gray-200 border border-gray-700/50"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Options */}
                    <div className="col-span-4 space-y-4">
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">By skill</div>
                          <div className="text-sm text-gray-400">Search for work that requires a particular skill.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">By language</div>
                          <div className="text-sm text-gray-400">Find projects that are in your language.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Featured jobs</div>
                          <div className="text-sm text-gray-400">Explore our current list of excited top featured projects.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Find contests</div>
                          <div className="text-sm text-gray-400">Unleash your talent and find freelancer contests to enter.</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle Section - Popular Jobs with Images */}
                    <div className="col-span-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">🌐</div>
                          <div className="font-semibold text-white">Website jobs</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">🎨</div>
                          <div className="font-semibold text-white">Graphic design jobs</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">📊</div>
                          <div className="font-semibold text-white">Data entry jobs</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">📱</div>
                          <div className="font-semibold text-white">Mobile app development</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">💻</div>
                          <div className="font-semibold text-white">Internet marketing jobs</div>
                        </div>
                        <div onClick={() => onNavigate('bidding')} className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-4xl mb-2">📦</div>
                          <div className="font-semibold text-white">Local jobs</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Section - Other Jobs */}
                    <div className="col-span-3">
                      <div className="text-sm font-semibold text-gray-400 mb-3">Other popular jobs</div>
                      <div className="space-y-2">
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Software development jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Internet marketing jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Data entry jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">SEO jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Writing jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Legal jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Finance jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Manufacturing jobs</button>
                        <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">View more →</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowSolutionsDropdown(true)}
                onMouseLeave={() => setShowSolutionsDropdown(false)}
                onClick={() => onNavigate('about')}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium"
              >
                Solutions
                <ChevronDown size={16} />
              </button>
              {showSolutionsDropdown && (
                <div
                  onMouseEnter={() => setShowSolutionsDropdown(true)}
                  onMouseLeave={() => setShowSolutionsDropdown(false)}
                  className="absolute top-[calc(100%+10px)] left-0 -translate-x-1/4 mt-1 w-[1000px] bg-[#1A1F2E] rounded-lg shadow-2xl py-6 px-6 text-gray-200 border border-gray-700/50"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Enterprise Solutions */}
                    <div className="col-span-3 space-y-4">
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Enterprise</div>
                          <div className="text-xs text-gray-400">Power your competitive advantage with Freelancer Enterprise.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 7H7v6h6V7z" />
                            <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Innovation Challenges</div>
                          <div className="text-xs text-gray-400">Turn challenges into breakthroughs with the largest innovation hub.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Field Services</div>
                          <div className="text-xs text-gray-400">Deliver expertise anywhere in the world at scale - on demand.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Freelancer API</div>
                          <div className="text-xs text-gray-400">Use the Freelancer API to access a cloud workforce of skilled Researchers.</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">Local jobs</div>
                          <div className="text-xs text-gray-400">Get help in any location, anywhere in the world.</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle Left - Products & Services */}
                    <div className="col-span-3 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          <div className="text-sm font-semibold text-white">Freelancer products</div>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">How it works</button>
                          <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Contests</button>
                          <button onClick={() => onNavigate('pricing')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Quotes</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Photo Anywhere</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Showcase</button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          <div className="text-sm font-semibold text-white">Freelancer services</div>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Preferred Freelancer Program</button>
                          <button onClick={() => onNavigate('verification')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Verified by Freelancer</button>
                          <button onClick={() => onNavigate('bidding')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Project management</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Recruiter</button>
                          <button onClick={() => onNavigate('pricing')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Memberships</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle Right - How it works with Images */}
                    <div className="col-span-3">
                      <div className="text-sm font-semibold text-gray-400 mb-3">How it works</div>
                      <div className="space-y-3">
                        <div onClick={() => onNavigate('about')} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-3xl mb-2">👥</div>
                          <div className="font-semibold text-white text-sm mb-1">How to hire the perfect freelancer</div>
                          <div className="text-blue-400 text-xs">Find out more →</div>
                        </div>
                        <div onClick={() => onNavigate('about')} className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-3 cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-3xl mb-2">💰</div>
                          <div className="font-semibold text-white text-sm mb-1">How to get started earning money</div>
                          <div className="text-blue-400 text-xs">Find out more →</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Section - Get Ideas & Resources */}
                    <div className="col-span-3 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                          <div className="text-sm font-semibold text-white">Get ideas</div>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Get Web Design Ideas</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Get Mobile App Ideas</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Get Graphic Design Ideas</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">Get Logo Design Ideas</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 transition-colors">View all →</button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                          </svg>
                          <div className="text-sm font-semibold text-white">Resources</div>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">What Is Adobe Photoshop</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">What Is Android App Development</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-300 hover:text-white transition-colors">What Is Article Writing</button>
                          <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 transition-colors">View all →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <ProfileDropdown onViewProfile={onViewProfile} onLogout={onLogout} />
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-white/90 hover:text-white font-medium transition-colors px-3"
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-white/90 hover:text-white font-medium transition-colors px-3"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onNavigate('bidding')}
                  className="bg-[#FF006B] hover:bg-[#E6005F] text-white px-6 py-2.5 rounded-md font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Post a Project
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E1724] border-t border-gray-700/50">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated && user ? (
              <>
                <div className="bg-gray-800 rounded-lg px-4 py-3 mb-4">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.fullname} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-[#0084FF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white text-sm">{user.fullname}</p>
                      <p className="text-xs text-gray-400">{user.role === 'client' ? 'Client' : 'Freelancer'}</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => handleMobileNavigate(user.role === 'client' ? 'client-dashboard' : 'freelancer-dashboard')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Dashboard
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Browse Projects
                </button>
                <button onClick={() => handleMobileNavigate('messaging')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Messages
                </button>
                <div className="border-t border-gray-700/50 my-3"></div>
                <button onClick={() => { onViewProfile(); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  View Profile
                </button>
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-red-400 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Hire Researchers
                </button>
                <button onClick={() => handleMobileNavigate('bidding')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Find Work
                </button>
                <button onClick={() => handleMobileNavigate('about')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Why Us
                </button>
                <button onClick={() => handleMobileNavigate('pricing')} className="block w-full text-left py-3 text-white/90 hover:text-white font-medium">
                  Pricing
                </button>
                <div className="border-t border-gray-700/50 my-3"></div>
                <button onClick={() => handleMobileNavigate('login')} className="block w-full text-left py-3 text-white/90 hover:text-white font-semibold">
                  Log In
                </button>
                <button onClick={() => handleMobileNavigate('signup')} className="block w-full bg-[#FF006B] hover:bg-[#E6005F] text-white py-3 rounded-md font-semibold text-center transition-all shadow-lg">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
