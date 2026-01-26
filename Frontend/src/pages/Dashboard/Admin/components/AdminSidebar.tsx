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
    { id: 'overview', icon: BarChart3, label: 'Overview', badge: null },
    { id: 'users', icon: Users, label: 'User Management', badge: '24' },
    { id: 'projects', icon: FolderOpen, label: 'Projects', badge: '12' },
    { id: 'verifications', icon: Shield, label: 'Verifications', badge: '5' },
    { id: 'certifications', icon: Award, label: 'Certifications', badge: null },
    { id: 'payments', icon: DollarSign, label: 'Payments & Escrow', badge: '3' },
    { id: 'disputes', icon: AlertCircle, label: 'Disputes', badge: '2' },
    { id: 'skills', icon: Wrench, label: 'Skills Management', badge: null },
    { id: 'reports', icon: FileText, label: 'Reports', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={onMobileMenuToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-6 left-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl text-white"
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          w-80 min-w-[320px] flex-shrink-0 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 p-6 flex flex-col shadow-2xl
          lg:relative lg:translate-x-0
          fixed top-0 left-0 h-full z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
      
      <div className="flex items-center gap-4 mb-8 mt-16 lg:mt-0">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <div className="text-xl font-bold text-slate-900">ResearchHub</div>
          <div className="text-sm text-slate-600 font-medium">Admin Panel</div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            data-testid={`menu-${item.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onTabChange(item.id);
              if (onMobileMenuToggle && window.innerWidth < 1024) onMobileMenuToggle();
            }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-white/20' 
                  : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-600'} />
                </motion.div>
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                activeTab === item.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200/50 bg-slate-50/50 -mx-6 px-6">
        <motion.button 
          onClick={handleSignOut}
          whileHover={{ x: 4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group"
        >
          <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-red-100 transition-colors">
            <LogOut size={18} className="group-hover:text-red-600" />
          </div>
          <span className="font-medium">Sign Out</span>
        </motion.button>
      </div>
      </motion.aside>
    </>
  );
}
