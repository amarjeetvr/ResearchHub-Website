import { Users, FolderOpen, DollarSign, AlertCircle, Shield, Settings, BarChart3, FileText, Award, Wrench, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../../services/authApi';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState } from 'react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export default function AdminSidebar({ activeTab, onTabChange, isMobileMenuOpen, onMobileMenuToggle }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  const handleSignOut = async () => {
    try {
      console.log('Sign out clicked');
      await adminLogout();
      setUser(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate to login page even if API call fails
      setUser(null);
      navigate('/admin/login');
    }
  };

  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'verifications', icon: Shield, label: 'Verifications' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'payments', icon: DollarSign, label: 'Payments & Escrow' },
    { id: 'disputes', icon: AlertCircle, label: 'Disputes' },
    { id: 'skills', icon: Wrench, label: 'Skills Management' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg text-white"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 min-w-[288px] flex-shrink-0 text-white p-4 sm:p-6 flex flex-col
        lg:relative lg:translate-x-0
        fixed top-0 left-0 h-full z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ background: 'linear-gradient(to-br, #0A0E27, #1a1f3a, #0f1629)' }}>
      {/* Glow orbs for sidebar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="flex items-center gap-3 mb-8 lg:mb-12 relative z-10 mt-16 lg:mt-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl sm:text-2xl">R</span>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold text-white">ResearchHub</div>
          <div className="text-xs sm:text-sm text-gray-300">Admin Panel</div>
        </div>
      </div>

      <nav className="space-y-2 flex-1 relative z-10">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              if (onMobileMenuToggle) onMobileMenuToggle();
            }}
            className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
              activeTab === item.id ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400' : 'hover:bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <item.icon size={18} className="sm:w-5 sm:h-5" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/20 relative z-10">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm sm:text-base"
        >
          <LogOut size={18} className="sm:w-5 sm:h-5" />
          <span>Sign Out</span>
        </button>
      </div>
      </aside>
    </>
  );
}
