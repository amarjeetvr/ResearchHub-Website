import { useState, useEffect } from 'react';
import { FolderOpen, Clock, CheckCircle, DollarSign, Plus, Search, TrendingUp, MessageSquare, Eye, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects, getProjectStats } from '../../../services/api';
import { StatCardSkeleton, ProjectCardSkeleton } from '../../../components/shared/LoadingSkeletons';
import { NoProjectsFound } from '../../../components/shared/EmptyState';
import Footer from '../../../components/layout/Footer';
import toast from 'react-hot-toast';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalSpent: 0,
    pendingProposals: 0,
    completedProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getMyProjects();
      if (response.success) {
        setProjects(response.projects || []);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getProjectStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statsCards = [
    { label: 'Active Projects', value: stats.activeProjects, icon: FolderOpen, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600', change: '+8%' },
    { label: 'Pending Proposals', value: stats.pendingProposals, icon: Clock, color: 'from-yellow-500 to-yellow-600', change: '5 new' },
    { label: 'Completed', value: stats.completedProjects, icon: CheckCircle, color: 'from-purple-500 to-purple-600', change: '+3' },
  ];

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'active') return p.status === 'open' || p.status === 'in-progress';
    if (activeTab === 'completed') return p.status === 'completed';
    return true;
  }).filter(p => 
    !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
      
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-300 mt-1">Manage your projects and Researchers</p>
            </div>
            <button
              onClick={() => navigate('/post-project')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/50 transition-all"
            >
              <Plus size={20} />
              Post a Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp size={14} />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/post-project')}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-2xl hover:scale-105 transition-all text-left"
          >
            <Plus size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Post New Project</h3>
            <p className="text-sm opacity-90">Get started with a new project</p>
          </button>
          <button
            onClick={() => navigate('/bidding')}
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-left"
          >
            <Search size={32} className="text-cyan-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Find Researchers</h3>
            <p className="text-sm text-gray-300">Browse talented professionals</p>
          </button>
          <button
            onClick={() => navigate('/messaging')}
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-left"
          >
            <MessageSquare size={32} className="text-cyan-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Messages</h3>
            <p className="text-sm text-gray-300">Chat with your Researchers</p>
          </button>
        </div>

        {/* Projects Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'all' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'completed' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                Completed
              </button>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 w-64 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <NoProjectsFound onPostProject={() => navigate('/post-project')} />
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'open' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {project.status.toUpperCase().replace('-', ' ')}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Budget</div>
                          <div className="font-bold text-cyan-400">${project.budgetMin}-${project.budgetMax}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Proposals</div>
                          <div className="font-semibold text-white">{project.bids?.length || 0}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Deadline</div>
                          <div className="font-semibold text-white">{new Date(project.deadline).toLocaleDateString()}</div>
                        </div>
                        {project.status === 'in-progress' && (
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Progress</div>
                            <div className="font-semibold text-cyan-400">{project.progress}%</div>
                          </div>
                        )}
                      </div>
                      {project.status === 'in-progress' && (
                        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => navigate(`/bidding/${project._id}`)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/50"
                      >
                        <Eye size={18} />
                        View
                      </button>
                      {project.status === 'in-progress' && (
                        <button
                          onClick={() => navigate('/messaging')}
                          className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                        >
                          <MessageSquare size={18} />
                          Chat
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
