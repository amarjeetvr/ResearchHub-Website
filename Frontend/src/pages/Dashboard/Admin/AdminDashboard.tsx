import { useState } from 'react';
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsOverview stats={ADMIN_STATS} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentUsersCard users={RECENT_USERS} />
              <PlatformActivityCard />
            </div>
            <RecentProjectsTable projects={RECENT_PROJECTS} />
          </div>
        );

      case 'users':
        return <UserManagementTable users={RECENT_USERS} />;

      case 'projects':
        return <AdminProjectsTable />;

      case 'verifications':
        return <VerificationWorkflow verifications={PENDING_VERIFICATIONS} />;

      case 'disputes':
        return <DisputeResolution disputes={ACTIVE_DISPUTES} />;

      case 'skills':
        return <SkillsManagement skills={SKILLS_DATABASE} />;

      case 'settings':
        return <PlatformSettings />;

      default:
        return <div className="text-center text-gray-600 py-12">Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%)' }}>
      {/* Glow orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 relative z-10 overflow-x-auto lg:ml-0">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 mt-16 lg:mt-0">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'projects' && 'Payment Management'}
            {activeTab === 'verifications' && 'Verification Requests'}
            {activeTab === 'disputes' && 'Dispute Resolution'}
            {activeTab === 'skills' && 'Skills Management'}
            {activeTab === 'settings' && 'Platform Settings'}
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
