import { useState } from 'react';
import { motion } from 'framer-motion';
import { Transition } from '@headlessui/react';
import AdminSidebar from './components/AdminSidebar';
import StatsOverview from './components/StatsOverview';
import RecentUsersCard from './components/RecentUsersCard';
import PlatformActivityCard from './components/PlatformActivityCard';
import RecentProjectsTable from './components/RecentProjectsTable';
import AdminProjectsTable from './components/AdminProjectsTable';
import UserManagementTable from './components/UserManagementTable';
import VerificationWorkflow from './components/VerificationWorkflow';
import DisputeResolution from './components/DisputeResolution';
import SkillsManagement from './components/SkillsManagement';
import PlatformSettings from './components/PlatformSettings';
import ThreeBackground from '../../../components/ThreeBackground';
import {
  ADMIN_STATS,
  RECENT_USERS,
  RECENT_PROJECTS,
  PENDING_VERIFICATIONS,
  ACTIVE_DISPUTES,
  SKILLS_DATABASE
} from '../../../utils/adminConstants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 150);
  };

  const getPageTitle = () => {
    const titles = {
      'overview': 'Dashboard Overview',
      'users': 'User Management',
      'projects': 'Payment Management',
      'verifications': 'Verification Requests',
      'disputes': 'Dispute Resolution',
      'skills': 'Skills Management',
      'settings': 'Platform Settings'
    };
    return titles[activeTab as keyof typeof titles] || 'Dashboard';
  };

  const getPageDescription = () => {
    const descriptions = {
      'overview': 'Monitor platform performance and key metrics',
      'users': 'Manage user accounts, roles, and permissions',
      'projects': 'Handle escrow payments and project completions',
      'verifications': 'Review and approve user verification requests',
      'disputes': 'Resolve conflicts between clients and freelancers',
      'skills': 'Manage platform skills and categories',
      'settings': 'Configure platform settings and preferences'
    };
    return descriptions[activeTab as keyof typeof descriptions] || 'Select a section from the sidebar';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <StatsOverview stats={ADMIN_STATS} />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              <RecentUsersCard users={RECENT_USERS} />
              <PlatformActivityCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <RecentProjectsTable projects={RECENT_PROJECTS} />
            </motion.div>
          </motion.div>
        );

      case 'users':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <UserManagementTable users={RECENT_USERS} />
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AdminProjectsTable />
          </motion.div>
        );

      case 'verifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <VerificationWorkflow verifications={PENDING_VERIFICATIONS} />
          </motion.div>
        );

      case 'disputes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <DisputeResolution disputes={ACTIVE_DISPUTES} />
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <SkillsManagement skills={SKILLS_DATABASE} />
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <PlatformSettings />
          </motion.div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📊</span>
              </div>
              <p className="text-gray-500 text-lg">Select a section from the sidebar</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <ThreeBackground />
      
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <main className="flex-1 min-w-0 relative z-10 overflow-x-auto lg:ml-0">
        <div className="min-h-screen bg-white/40 backdrop-blur-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Enhanced Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 mt-16 lg:mt-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                      {getPageTitle()}
                    </h1>
                    <p className="text-slate-600 text-lg">
                      {getPageDescription()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm">
                      <span className="text-sm text-slate-600">Last updated: </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></div>
              </motion.div>
              
              {/* Content with smooth transitions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="pb-10"
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
