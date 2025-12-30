import { useState, useEffect } from 'react';
import { DollarSign, Briefcase, Clock, CheckCircle, TrendingUp, Search, Eye, Send, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, getMyProposals, getMyActiveProjects, getResearcherstats } from '../../../services/api';
import { StatCardSkeleton, ProjectCardSkeleton } from '../../../components/shared/LoadingSkeletons';
import EmptyState, { NoProposals } from '../../../components/shared/EmptyState';
import Footer from '../../../components/layout/Footer';
import toast from 'react-hot-toast';

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommended');
  const [projects, setProjects] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeProjects: 0,
    pendingProposals: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchProjects(),
        fetchProposals(),
        fetchActiveProjects(),
        fetchStats(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await getMyProposals();
      if (response.success) {
        setProposals(response.proposals || []);
      }
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const fetchActiveProjects = async () => {
    try {
      const response = await getMyActiveProjects();
      if (response.success) {
        setActiveProjects(response.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch active projects:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getResearcherstats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statsCards = [
    { label: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600', change: '+15%' },
    { label: 'Active Projects', value: stats.activeProjects, icon: Briefcase, color: 'from-blue-500 to-blue-600', change: '3 ongoing' },
    { label: 'Pending Proposals', value: stats.pendingProposals, icon: Clock, color: 'from-yellow-500 to-yellow-600', change: '5 waiting' },
    { label: 'Success Rate', value: `${stats.successRate}%`, icon: CheckCircle, color: 'from-purple-500 to-purple-600', change: '+5%' },
  ];

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  };

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
              <p className="text-gray-300 mt-1">Track your projects and earnings</p>
            </div>
            <button
              onClick={() => navigate('/bidding')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/50 transition-all"
            >
              <Search size={20} />
              Browse Projects
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
            onClick={() => navigate('/bidding')}
            className="bg-gradient-to-br from-[#0084FF] to-[#0066CC] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-left"
          >
            <Search size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Browse Projects</h3>
            <p className="text-sm opacity-90">Find new opportunities</p>
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className="bg-white border-2 border-gray-200 hover:border-[#0084FF] p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left"
          >
            <Clock size={32} className="text-[#0084FF] mb-3" />
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">My Proposals</h3>
            <p className="text-sm text-gray-600">{proposals.length} pending</p>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="bg-white border-2 border-gray-200 hover:border-[#0084FF] p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left"
          >
            <Star size={32} className="text-[#0084FF] mb-3" />
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">Update Profile</h3>
            <p className="text-sm text-gray-600">Boost your visibility</p>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'recommended' ? 'bg-[#0084FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Recommended
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-[#0084FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active Projects
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'proposals' ? 'bg-[#0084FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Proposals
              </button>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0084FF] w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Recommended Projects */}
            {activeTab === 'recommended' && (
              projects.length === 0 ? (
                <EmptyState
                  icon="folder"
                  title="No projects available"
                  description="Check back later for new opportunities that match your skills."
                  actionLabel="Browse All Projects"
                  onAction={() => navigate('/bidding')}
                />
              ) : (
                projects.slice(0, 10).map((project) => (
                  <div
                    key={project._id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-[#0084FF] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{project.introduction}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>{getTimeAgo(project.createdAt)}</span>
                          <span>•</span>
                          <span>{project.bids?.length || 0} proposals</span>
                          <span>•</span>
                          <span>Budget: ${project.budgetMin}-${project.budgetMax}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.skills?.slice(0, 5).map((skill: string, idx: number) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/bidding/${project._id}`)}
                        className="bg-[#0084FF] hover:bg-[#0066CC] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 ml-4 transition-colors"
                      >
                        <Send size={18} />
                        Apply
                      </button>
                    </div>
                  </div>
                ))
              )
            )}

            {/* Active Projects */}
            {activeTab === 'active' && (
              activeProjects.length === 0 ? (
                <EmptyState
                  icon="briefcase"
                  title="No active projects"
                  description="Browse available projects and submit proposals to start earning."
                  actionLabel="Browse Projects"
                  onAction={() => setActiveTab('recommended')}
                />
              ) : (
                activeProjects.map((project) => (
                  <div
                    key={project._id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-[#0084FF] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                            IN PROGRESS
                          </span>
                          <span className="text-sm text-gray-600">Progress: {project.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Earning</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${project.bids?.find((b: any) => b.status === 'accepted')?.amount || 0}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-[#0084FF] h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <button
                      onClick={() => navigate(`/bidding/${project._id}`)}
                      className="bg-[#0084FF] hover:bg-[#0066CC] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                ))
              )
            )}

            {/* My Proposals */}
            {activeTab === 'proposals' && (
              proposals.length === 0 ? (
                <NoProposals onBrowseProjects={() => setActiveTab('recommended')} />
              ) : (
                proposals.map((proposal) => (
                  <div
                    key={proposal._id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-[#0084FF] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{proposal.project?.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {proposal.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-600">
                            Submitted {getTimeAgo(proposal.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Your Bid</div>
                        <div className="text-2xl font-bold text-[#0084FF]">${proposal.amount}</div>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
