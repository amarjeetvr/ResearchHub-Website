import { useState, useEffect } from 'react';
import { FolderOpen, Clock, CheckCircle, MessageSquare, DollarSign, Plus, Search } from 'lucide-react';
import ProjectPostingWizard from '../../../components/ProjectPostingWizard';
import BidsList from './components/BidsList';
import { getMyProjects, getProjectStats } from '../../../services/api';
import toast from 'react-hot-toast';

export default function ClientDashboard() {
  const [showPostProject, setShowPostProject] = useState(false);
  const [showBidsList, setShowBidsList] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('active');
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    activeProjects: 0,
    inProgressProjects: 0,
    completedProjects: 0,
    totalSpent: 0,
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
        setProjects(response.projects);
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

  const handleProjectPosted = () => {
    setShowPostProject(false);
    fetchProjects();
    fetchStats();
    toast.success('Project posted successfully!');
  };

  const handleViewBids = (project: any) => {
    setSelectedProject(project);
    setShowBidsList(true);
  };

  const handleBidAccepted = () => {
    fetchProjects();
    fetchStats();
  };

  const statsDisplay = [
    { label: 'Active Projects', value: stats.activeProjects.toString(), icon: FolderOpen, color: 'bg-blue-500' },
    { label: 'In Progress', value: stats.inProgressProjects.toString(), icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed', value: stats.completedProjects.toString(), icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' }
  ];

  const filteredProjects = projects.filter(p => {
    // Filter by tab
    let matchesTab = true;
    if (activeTab === 'active') matchesTab = p.status === 'open' || p.status === 'in-progress';
    if (activeTab === 'completed') matchesTab = p.status === 'completed';
    
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.introduction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills?.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

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
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">Client Dashboard</h1>
              <p className="text-gray-600">Manage your research projects and collaborations</p>
            </div>
            <button
              onClick={() => setShowPostProject(true)}
              className="bg-[#2D6CDF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all shadow-md flex items-center gap-2"
            >
              <Plus size={20} />
              Post New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
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
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'all' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'completed' ? 'bg-[#2D6CDF] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] w-full md:w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No projects found</p>
                <button
                  onClick={() => setShowPostProject(true)}
                  className="mt-4 bg-[#2D6CDF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all"
                >
                  Post Your First Project
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project._id} className="border border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">{project.category}</span>
                            {project.completedAt && (
                              <span className="text-sm text-gray-500">Completed: {formatDate(project.completedAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Budget</div>
                          <div className="font-bold text-[#2D6CDF]">${project.budgetMin} - ${project.budgetMax}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Deadline</div>
                          <div className="font-semibold text-[#1F1F1F]">{formatDate(project.deadline)}</div>
                        </div>
                        {project.status === 'open' && project.bids && (
                          <div>
                            <div className="text-xs text-gray-500">Bids Received</div>
                            <div className="font-semibold text-[#1F1F1F]">{project.bids.length}</div>
                          </div>
                        )}
                        {project.assignedFreelancer && (
                          <div>
                            <div className="text-xs text-gray-500">Researcher</div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#1F1F1F]">{project.assignedFreelancer.fullname}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {project.status === 'in-progress' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-semibold text-[#2D6CDF]">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#2D6CDF] h-2 rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    {project.status === 'open' && project.bids && (
                      <button 
                        onClick={() => handleViewBids(project)}
                        className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all whitespace-nowrap"
                      >
                        View {project.bids.length} Bids
                      </button>
                    )}
                    {project.status === 'in-progress' && (
                      <>
                        <button className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all flex items-center gap-2">
                          <MessageSquare size={18} />
                          Chat
                        </button>
                        <button className="border-2 border-[#2D6CDF] text-[#2D6CDF] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#2D6CDF] hover:text-white transition-all">
                          View Details
                        </button>
                      </>
                    )}
                    {project.status === 'completed' && (
                      <button className="border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New bid received', project: 'Literature Review on Climate Change', time: '2 hours ago', type: 'bid' },
                { action: 'Milestone completed', project: 'Quantitative Analysis for Marketing', time: '5 hours ago', type: 'milestone' },
                { action: 'Message from researcher', project: 'Research Methodology Design', time: '1 day ago', type: 'message' },
                { action: 'Project completed', project: 'Statistical Data Analysis', time: '2 days ago', type: 'completed' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'bid' ? 'bg-blue-500' :
                    activity.type === 'milestone' ? 'bg-green-500' :
                    activity.type === 'message' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1F1F1F]">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.project}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-2xl shadow-md p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="opacity-90 mb-6 leading-relaxed">
              Our support team is here to help you find the perfect researcher for your project and ensure smooth collaboration.
            </p>
            <button className="bg-white text-[#2D6CDF] px-6 py-3 rounded-xl font-semibold hover:bg-[#F5F7FA] transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {showPostProject && (
        <ProjectPostingWizard
          onClose={() => setShowPostProject(false)}
          onComplete={handleProjectPosted}
        />
      )}

      {showBidsList && selectedProject && (
        <BidsList
          projectId={selectedProject._id}
          projectTitle={selectedProject.title}
          onClose={() => {
            setShowBidsList(false);
            setSelectedProject(null);
          }}
          onBidAccepted={handleBidAccepted}
        />
      )}
    </div>
  );
}
