import { Users, FolderOpen, DollarSign, AlertCircle } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: any;
  color: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatsOverview({ stats }: { stats: StatCardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
          <div className="text-3xl font-bold text-[#1F1F1F] mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
