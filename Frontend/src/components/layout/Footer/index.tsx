import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Globe, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  const footerLinks = {
    categories: [
      { name: 'Graphics & Design', path: '/bidding' },
      { name: 'Digital Marketing', path: '/bidding' },
      { name: 'Writing & Translation', path: '/bidding' },
      { name: 'Video & Animation', path: '/bidding' },
      { name: 'Programming & Tech', path: '/bidding' },
    ],
    about: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/about' },
      { name: 'Press & News', path: '/blog' },
      { name: 'Partnerships', path: '/about' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
    support: [
      { name: 'Help & Support', path: '/about' },
      { name: 'Trust & Safety', path: '/about' },
      { name: 'Contact Us', path: '/about' },
      { name: 'Terms of Service', path: '/terms-and-conditions' },
      { name: 'Escrow Terms', path: '/escrow-service-terms' },
    ],
    community: [
      { name: 'Events', path: '/blog' },
      { name: 'Blog', path: '/blog' },
      { name: 'Forum', path: '/blog' },
      { name: 'Affiliates', path: '/about' },
      { name: 'Invite a Friend', path: '/about' },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-bold text-xl mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates, tips, and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <span className="text-xl font-bold">ResearchHub</span>
                <p className="text-xs text-gray-400">The World's Work Marketplace</p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
            </div>

            {/* Language & Currency */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                <Globe size={16} />
                <span className="text-sm">English</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                <DollarSign size={16} />
                <span className="text-sm">USD</span>
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © 2025 ResearchHub. All rights reserved. The World's First Research Innovation Economy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
