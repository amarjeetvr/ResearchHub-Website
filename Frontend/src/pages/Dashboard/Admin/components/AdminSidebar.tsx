import { Users, FolderOpen, DollarSign, AlertCircle, Shield, Settings, BarChart3, FileText, Award, Wrench } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
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
    <aside className="w-72 bg-[#1F1F1F] text-white p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-[#2D6CDF] rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-2xl">R</span>
        </div>
        <div>
          <div className="text-xl font-bold">ResearchHub</div>
          <div className="text-sm text-gray-400">Admin Panel</div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id ? 'bg-[#2D6CDF]' : 'hover:bg-white/10'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-700">
        <button className="w-full text-left text-gray-400 hover:text-white transition-colors">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
