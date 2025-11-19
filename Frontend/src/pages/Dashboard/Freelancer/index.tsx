import { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle, DollarSign, TrendingUp, Search, Send } from 'lucide-react';
import { getAllProjects } from '../../../services/api';
import toast from 'react-hot-toast';

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState('available');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  const stats = [
    { label: 'Active Projects', value: '0', icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Pending Proposals', value: '0', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed Projects', value: '0', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Earned', value: '$0', icon: DollarSign, color: 'bg-purple-500' }
  ];



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200">
        {/* <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">Freelancer Dashboard</h1>
              <p className="text-gray-600">Manage your projects and grow your research career</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2 border-[#2D6CDF] text-[#2D6CDF] px-6 py-3 rounded-xl font-semibold hover:bg-[#2D6CDF] hover:text-white transition-all">
                Browse Projects
              </button>
              <button className="bg-[#2D6CDF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all shadow-md">
                Update Profile
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-[#1F1F1F] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active Projects
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'proposals' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Proposals
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'completed' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'available' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Browse Projects
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] w-full md:w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === 'active' && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No active projects yet</p>
                <p className="text-gray-400 text-sm mt-2">Browse available projects and submit proposals to get started</p>
              </div>
            )}

            {activeTab === 'proposals' && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No pending proposals yet</p>
              </div>
            )}



            {activeTab === 'completed' && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No completed projects yet</p>
              </div>
            )}

            {activeTab === 'available' && (
              projects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No projects available at the moment</p>
                  <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="border border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">Posted {getTimeAgo(project.createdAt)}</span>
                          <span className="text-sm text-[#2D6CDF] font-semibold">{project.bids?.length || 0} bids</span>
                          <span className="text-sm text-gray-600">by {project.clientId?.fullname || 'Anonymous'}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.introduction}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.skills?.slice(0, 5).map((skill: string, idx: number) => (
                            <span key={idx} className="bg-[#F5F7FA] text-[#1F1F1F] px-3 py-1 rounded-lg text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                          {project.skills?.length > 5 && (
                            <span className="bg-[#F5F7FA] text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">
                              +{project.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="text-xl font-bold text-[#2D6CDF]">${project.budgetMin} - ${project.budgetMax}</div>
                        <div className="text-sm text-gray-500 mt-1">Due: {formatDate(project.deadline)}</div>
                      </div>
                    </div>
                    <button className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all flex items-center gap-2">
                      <Send size={18} />
                      Submit Proposal
                    </button>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
