import { Users, FolderOpen, DollarSign, AlertCircle, Shield, Settings, BarChart3, FileText, Award, Wrench, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl text-white"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          w-64 min-w-[256px] flex-shrink-0 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 p-3 sm:p-4 lg:p-6 flex flex-col shadow-2xl
          lg:relative lg:translate-x-0
          fixed top-0 left-0 h-full z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
      
      <div className="flex items-center gap-3 mb-6 sm:mb-8 mt-16 lg:mt-0">
        <div className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-lg sm:text-2xl">R</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">ResearchHub</div>
          <div className="text-xs sm:text-sm text-slate-600 font-medium">Admin Panel</div>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            data-testid={`menu-${item.id}`}
            onClick={() => {
              onTabChange(item.id);
              if (onMobileMenuToggle && window.innerWidth < 1024) onMobileMenuToggle();
            }}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-colors duration-200 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-white/20' 
                  : 'bg-slate-100'
              }`}>
                <item.icon size={16} className={activeTab === item.id ? 'text-white' : 'text-slate-600'} />
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-slate-200/50 bg-slate-50/50 -mx-3 px-3">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 group"
        >
          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-100 transition-colors">
            <LogOut size={16} className="group-hover:text-red-600" />
          </div>
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
      </aside>
    </>
  );
}
