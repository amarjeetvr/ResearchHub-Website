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
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1F1F1F] mb-8">
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
