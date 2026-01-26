import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Download, Calendar, Filter, RefreshCw, Users, DollarSign, Briefcase, Clock, Eye, FileText, PieChart } from 'lucide-react';

interface ReportData {
  period: string;
  users: number;
  projects: number;
  revenue: number;
  disputes: number;
}

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - in real implementation, this would come from API
  const reportData: ReportData[] = [
    { period: 'Week 1', users: 45, projects: 23, revenue: 12500, disputes: 2 },
    { period: 'Week 2', users: 52, projects: 31, revenue: 18750, disputes: 1 },
    { period: 'Week 3', users: 38, projects: 19, revenue: 9800, disputes: 3 },
    { period: 'Week 4', users: 61, projects: 42, revenue: 25600, disputes: 0 }
  ];

  const summaryStats = {
    totalUsers: 1247,
    totalProjects: 856,
    totalRevenue: 425600,
    activeDisputes: 12,
    completionRate: 94.2,
    avgProjectValue: 497
  };

  const topFreelancers = [
    { name: 'John Doe', projects: 15, revenue: 12500, rating: 4.9 },
    { name: 'Jane Smith', projects: 12, revenue: 9800, rating: 4.8 },
    { name: 'Mike Johnson', projects: 10, revenue: 8200, rating: 4.7 },
    { name: 'Sarah Wilson', projects: 9, revenue: 7500, rating: 4.9 },
    { name: 'David Brown', projects: 8, revenue: 6900, rating: 4.6 }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Period,Users,Projects,Revenue,Disputes\n" +
      reportData.map(d => 
        `"${d.period}",${d.users},${d.projects},${d.revenue},${d.disputes}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `platform-report-${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxRevenue = Math.max(...reportData.map(d => d.revenue));
  const maxProjects = Math.max(...reportData.map(d => d.projects));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                <BarChart3 className="text-white" size={20} />
              </div>
              Reports & Analytics
            </h2>
            <p className="text-slate-600">Platform performance insights and analytics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="last_year">Last Year</option>
            </select>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-100 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-200 transition-all"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Users className="text-white" size={16} />
            </div>
            <div className="text-sm text-blue-700 font-medium">Total Users</div>
          </div>
          <div className="text-2xl font-bold text-blue-800">{summaryStats.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-blue-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            +12% this month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-xl">
              <Briefcase className="text-white" size={16} />
            </div>
            <div className="text-sm text-green-700 font-medium">Projects</div>
          </div>
          <div className="text-2xl font-bold text-green-800">{summaryStats.totalProjects.toLocaleString()}</div>
          <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            +8% this month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-xl">
              <DollarSign className="text-white" size={16} />
            </div>
            <div className="text-sm text-purple-700 font-medium">Revenue</div>
          </div>
          <div className="text-2xl font-bold text-purple-800">${summaryStats.totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-purple-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            +15% this month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-xl">
              <Clock className="text-white" size={16} />
            </div>
            <div className="text-sm text-orange-700 font-medium">Disputes</div>
          </div>
          <div className="text-2xl font-bold text-orange-800">{summaryStats.activeDisputes}</div>
          <div className="text-xs text-orange-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            -3% this month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-600 rounded-xl">
              <PieChart className="text-white" size={16} />
            </div>
            <div className="text-sm text-teal-700 font-medium">Completion</div>
          </div>
          <div className="text-2xl font-bold text-teal-800">{summaryStats.completionRate}%</div>
          <div className="text-xs text-teal-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            +2% this month
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-600 rounded-xl">
              <DollarSign className="text-white" size={16} />
            </div>
            <div className="text-sm text-rose-700 font-medium">Avg Value</div>
          </div>
          <div className="text-2xl font-bold text-rose-800">${summaryStats.avgProjectValue}</div>
          <div className="text-xs text-rose-600 flex items-center gap-1 mt-1">
            <TrendingUp size={10} />
            +5% this month
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={20} />
              Revenue Trends
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                Revenue
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Projects
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {reportData.map((data, index) => (
              <motion.div 
                key={data.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 text-sm font-medium text-slate-700">{data.period}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Revenue</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">${data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Projects</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{data.projects}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.projects / maxProjects) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Freelancers */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="text-green-600" size={20} />
            Top Freelancers
          </h3>
          
          <div className="space-y-4">
            {topFreelancers.map((freelancer, index) => (
              <motion.div 
                key={freelancer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center font-bold text-green-700">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{freelancer.name}</div>
                  <div className="text-xs text-slate-600">{freelancer.projects} projects • ${freelancer.revenue.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <span>★</span>
                  <span>{freelancer.rating}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Reports */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Detailed Reports
          </h3>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-4 py-2 bg-white/80 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="overview">Platform Overview</option>
            <option value="financial">Financial Report</option>
            <option value="user_activity">User Activity</option>
            <option value="project_analytics">Project Analytics</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="text-white" size={16} />
              </div>
              <div className="text-sm font-medium text-blue-700">User Growth</div>
            </div>
            <div className="text-lg font-bold text-blue-800 mb-1">+24.5%</div>
            <div className="text-xs text-blue-600">vs last period</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Briefcase className="text-white" size={16} />
              </div>
              <div className="text-sm font-medium text-green-700">Project Success</div>
            </div>
            <div className="text-lg font-bold text-green-800 mb-1">94.2%</div>
            <div className="text-xs text-green-600">completion rate</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="text-white" size={16} />
              </div>
              <div className="text-sm font-medium text-purple-700">Revenue Growth</div>
            </div>
            <div className="text-lg font-bold text-purple-800 mb-1">+18.7%</div>
            <div className="text-xs text-purple-600">monthly increase</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Clock className="text-white" size={16} />
              </div>
              <div className="text-sm font-medium text-orange-700">Avg Response</div>
            </div>
            <div className="text-lg font-bold text-orange-800 mb-1">2.4h</div>
            <div className="text-xs text-orange-600">support tickets</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}