import { useState, useEffect } from 'react';
import { FolderOpen, Clock, CheckCircle, MessageSquare, DollarSign, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectPostingWizard from '../../../components/ProjectPostingWizard';
import BidsList from './components/BidsList';
import ProjectDetails from './components/ProjectDetails';
import ProjectCompletionPopup from '../../../components/shared/ProjectCompletionPopup';
import { getMyProjects, getProjectStats } from '../../../services/api';
import { approveProjectCompletion } from '../../../services/projectApi';
import Footer from '../../../components/layout/Footer';
import toast from 'react-hot-toast';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [showPostProject, setShowPostProject] = useState(false);
  const [showBidsList, setShowBidsList] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [completedProject, setCompletedProject] = useState<any>(null);
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

  useEffect(() => {
    // Check for completed projects and show popup
    const completedProject = projects.find(
      (p) => p.status === 'completed' && p.progress === 100 && !p.clientApproved
    );
    
    if (completedProject) {
      setCompletedProject(completedProject);
      setShowCompletionPopup(true);
    }
  }, [projects]);

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
  };

  const handleViewBids = (project: any) => {
    setSelectedProject(project);
    setShowBidsList(true);
  };

  const handleBidAccepted = () => {
    fetchProjects();
    fetchStats();
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleApproveCompletion = async () => {
    if (!completedProject) return;

    try {
      const response = await approveProjectCompletion(completedProject._id);
      
      if (response.success) {
        toast.success('Project approved! Admin has been notified.');
        setShowCompletionPopup(false);
        
        // Navigate to freelancer account details page
        navigate('/freelancer-account-details', {
          state: {
            freelancerAccount: response.freelancerAccount,
            freelancerName: completedProject.assignedFreelancer?.fullname,
            projectTitle: completedProject.title,
            bidAmount: getAcceptedBidAmount(completedProject),
          },
        });
        
        // Refresh projects
        fetchProjects();
      }
    } catch (error: any) {
      console.error('Approval error:', error);
      toast.error(error.message || 'Failed to approve project');
    }
  };

  const maskName = (fullname: string): string => {
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '***';
    }).join(' ');
  };

  const getAcceptedBidAmount = (project: any): number | null => {
    if (!project.bids || project.bids.length === 0) return null;
    const acceptedBid = project.bids.find((bid: any) => bid.status === 'accepted');
    return acceptedBid ? acceptedBid.amount : null;
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629]">
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Client Dashboard</h1>
              <p className="text-gray-300">Manage your research projects and collaborations</p>
            </div>
            <button
              onClick={() => setShowPostProject(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2"
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
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'all' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'completed' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-gray-300 hover:bg-white/10'
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
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full md:w-64 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg">No projects found</p>
                <button
                  onClick={() => setShowPostProject(true)}
                  className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Post Your First Project
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-300">{project.category}</span>
                            {project.completedAt && (
                              <span className="text-sm text-gray-400">Completed: {formatDate(project.completedAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-gray-400">
                            {getAcceptedBidAmount(project) ? 'Fixed Budget' : 'Budget Range'}
                          </div>
                          <div className="font-bold text-cyan-400">
                            {getAcceptedBidAmount(project) 
                              ? `$${getAcceptedBidAmount(project)?.toLocaleString()}`
                              : `$${project.budgetMin} - ${project.budgetMax}`
                            }
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Deadline</div>
                          <div className="font-semibold text-white">{formatDate(project.deadline)}</div>
                        </div>
                        {project.status === 'open' && project.bids && (
                          <div>
                            <div className="text-xs text-gray-400">Bids Received</div>
                            <div className="font-semibold text-white">{project.bids.length}</div>
                          </div>
                        )}
                        {project.assignedFreelancer && (
                          <div>
                            <div className="text-xs text-gray-400">Researcher</div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{maskName(project.assignedFreelancer.fullname)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {project.status === 'in-progress' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-300">Progress</span>
                            <span className="text-sm font-semibold text-cyan-400">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
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
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap"
                      >
                        View {project.bids.length} Bids
                      </button>
                    )}
                    {project.status === 'in-progress' && (
                      <>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2">
                          <MessageSquare size={18} />
                          Chat
                        </button>
                        <button 
                          onClick={() => handleViewDetails(project)}
                          className="bg-white/10 border-2 border-cyan-400 text-cyan-400 px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-400 hover:text-white transition-all"
                        >
                          View Details
                        </button>
                      </>
                    )}
                    {project.status === 'completed' && (
                      <button 
                        onClick={() => handleViewDetails(project)}
                        className="bg-white/10 border-2 border-cyan-400 text-cyan-400 px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-400 hover:text-white transition-all"
                      >
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New bid received', project: 'Literature Review on Climate Change', time: '2 hours ago', type: 'bid' },
                { action: 'Milestone completed', project: 'Quantitative Analysis for Marketing', time: '5 hours ago', type: 'milestone' },
                { action: 'Message from researcher', project: 'Research Methodology Design', time: '1 day ago', type: 'message' },
                { action: 'Project completed', project: 'Statistical Data Analysis', time: '2 days ago', type: 'completed' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'bid' ? 'bg-blue-500' :
                    activity.type === 'milestone' ? 'bg-green-500' :
                    activity.type === 'message' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{activity.action}</div>
                    <div className="text-sm text-gray-300">{activity.project}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our support team is here to help you find the perfect researcher for your project and ensure smooth collaboration.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all">
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

      {showProjectDetails && selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => {
            setShowProjectDetails(false);
            setSelectedProject(null);
            fetchProjects();
            fetchStats();
          }}
        />
      )}

      {showCompletionPopup && completedProject && (
        <ProjectCompletionPopup
          projectTitle={completedProject.title}
          freelancerName={completedProject.assignedFreelancer?.fullname || 'Unknown'}
          onApprove={handleApproveCompletion}
          onClose={() => setShowCompletionPopup(false)}
        />
      )}

      <Footer />
    </div>
  );
}
