import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, DollarSign, TrendingUp, Search, Send, X, Eye, MessageCircle } from 'lucide-react';
import { getAllProjects, submitBid, getMyProposals, getMyActiveProjects, getMyCompletedProjects, getFreelancerStats } from '../../../services/api';
import FreelancerProjectDetails from './components/FreelancerProjectDetails';
import ProfileViewPopup from '../../../components/shared/ProfileViewPopup';
import toast from 'react-hot-toast';

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [projects, setProjects] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [completedProjects, setCompletedProjects] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingProposals: 0,
    completedProjects: 0,
    totalEarned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProjects(),
        fetchProposals(),
        fetchActiveProjects(),
        fetchCompletedProjects(),
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
        setProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await getMyProposals();
      if (response.success) {
        setProposals(response.proposals);
      }
    } catch (error: any) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const fetchActiveProjects = async () => {
    try {
      const response = await getMyActiveProjects();
      if (response.success) {
        setActiveProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch active projects:', error);
    }
  };

  const fetchCompletedProjects = async () => {
    try {
      const response = await getMyCompletedProjects();
      if (response.success) {
        setCompletedProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch completed projects:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getFreelancerStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
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

  const getInitials = (name: string) => {
    if (!name) return 'AN';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const maskName = (fullname: string): string => {
    if (!fullname) return 'Anonymous';
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '***';
    }).join(' ');
  };

  const handleSubmitProposalClick = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowProposalModal(true);
  };

  const handleViewProjectDetails = (project: any, proposal?: any) => {
    setSelectedProject(project);
    setSelectedProposal(proposal || null);
    setShowProjectDetails(true);
  };

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
    setSelectedProposal(null);
  };

  const handleSubmitProposal = async () => {
    if (!proposalData.proposedFees || !proposalData.timeline || !proposalData.coverLetter) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    setSubmittingProposal(true);
    try {
      const response = await submitBid(selectedProject._id, {
        amount: parseFloat(proposalData.proposedFees),
        proposal: `Timeline: ${proposalData.timeline} days\n\n${proposalData.coverLetter}`
      });

      if (response.success) {
        toast.success('Proposal submitted successfully! Client will be notified.');
        setShowProposalModal(false);
        setProposalData({ proposedFees: '', timeline: '', coverLetter: '' });
        setSelectedProject(null);
        fetchAllData(); // Refresh all data
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmittingProposal(false);
    }
  };

  const statsDisplay = [
    { label: 'Active Projects', value: stats.activeProjects.toString(), icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Pending Proposals', value: stats.pendingProposals.toString(), icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed Projects', value: stats.completedProjects.toString(), icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Earned', value: `$${stats.totalEarned.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' }
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
     

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat, idx) => (
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] w-full md:w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === 'active' && (
              activeProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No active projects yet</p>
                  <p className="text-gray-400 text-sm mt-2">Browse available projects and submit proposals to get started</p>
                </div>
              ) : (
                activeProjects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">Client: {maskName(project.clientId?.fullname || 'Anonymous')}</span>
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700">
                            IN PROGRESS
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.introduction}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Progress</div>
                        <div className="text-2xl font-bold text-[#2D6CDF]">{project.progress}%</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleViewProjectDetails(project)}
                        className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all inline-flex items-center gap-2"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                      <button 
                        onClick={() => navigate('/messages', { state: { projectId: project._id, clientId: project.clientId?._id } })}
                        className="bg-white border-2 border-[#2D6CDF] text-[#2D6CDF] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#2D6CDF] hover:text-white transition-all inline-flex items-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Chat
                      </button>
                    </div>
                  </div>
                ))
              )
            )}

            {activeTab === 'proposals' && (
              proposals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No pending proposals yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start submitting proposals to available projects</p>
                </div>
              ) : (
                proposals.map((proposal) => (
                  <div key={proposal._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{proposal.project.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">
                            Submitted {formatDate(proposal.submittedAt)}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {proposal.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-600">Client: {maskName(proposal.project.clientId?.fullname || 'Anonymous')}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proposal.project.introduction}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Your Bid</div>
                        <div className="text-2xl font-bold text-[#2D6CDF]">${proposal.amount}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleViewProjectDetails(proposal.project, proposal)}
                      className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all inline-flex items-center gap-2"
                    >
                      <Eye size={18} />
                      View Project
                    </button>
                  </div>
                ))
              )
            )}

            {activeTab === 'completed' && (
              completedProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No completed projects yet</p>
                  <p className="text-gray-400 text-sm mt-2">Complete projects to build your portfolio</p>
                </div>
              ) : (
                completedProjects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{project.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">
                            Completed {formatDate(project.completedAt)}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700">
                            COMPLETED
                          </span>
                          {project.clientApproved && (
                            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1">
                              <CheckCircle size={14} />
                              CLIENT APPROVED
                            </span>
                          )}
                          {project.paymentReleased && (
                            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                              <DollarSign size={14} />
                              PAYMENT RELEASED
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.introduction}</p>
                        
                        {/* Payment Status Info */}
                        {project.clientApproved && !project.paymentReleased && (
                          <div className="mt-3 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                            <p className="text-sm text-amber-800 font-medium">
                              ⏳ Payment in process - Admin will release payment soon
                            </p>
                          </div>
                        )}
                        {project.paymentReleased && (
                          <div className="mt-3 bg-emerald-50 border-l-4 border-emerald-400 p-3 rounded">
                            <p className="text-sm text-emerald-800 font-medium">
                              ✓ Payment has been released to your account
                            </p>
                            <p className="text-xs text-emerald-700 mt-1">
                              Funds should arrive in 3-5 business days
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500">Earned</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${project.bids?.find((b: any) => b.status === 'accepted')?.amount || 0}
                        </div>
                        {project.paymentReleased && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">
                              <CheckCircle size={12} className="mr-1" />
                              Paid
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )
            )}

            {activeTab === 'available' && (() => {
              const filteredProjects = projects.filter(proj => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  proj.title?.toLowerCase().includes(query) ||
                  proj.introduction?.toLowerCase().includes(query) ||
                  proj.skills?.some((skill: string) => skill.toLowerCase().includes(query))
                );
              });

              return filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No projects found</p>
                  <p className="text-gray-400 text-sm mt-2">{searchQuery ? 'Try adjusting your search' : 'Check back later for new opportunities'}</p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#2D6CDF] transition-all cursor-pointer" onClick={() => navigate(`/bidding/${project._id}`)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-[#1F1F1F] hover:text-[#2D6CDF] transition-colors">{project.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">Posted {getTimeAgo(project.createdAt)}</span>
                          <span className="text-sm text-[#2D6CDF] font-semibold">{project.bids?.length || 0} bids</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-gray-600">by</span>
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2D6CDF] text-white text-xs font-bold">
                              {getInitials(project.clientId?.fullname || 'Anonymous')}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">
                              {maskName(project.clientId?.fullname || 'Anonymous')}
                            </span>
                          </div>
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
                    <button 
                      onClick={(e) => handleSubmitProposalClick(e, project)}
                      className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all inline-flex items-center gap-2"
                    >
                      <Send size={18} />
                      Submit Proposal
                    </button>
                  </div>
                ))
              );
            })()}
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowProposalModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1F1F1F]">Submit Your Proposal</h2>
                <p className="text-sm text-gray-600 mt-1">Project: {selectedProject.title}</p>
              </div>
              <button onClick={() => setShowProposalModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                      Proposed Fees (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={proposalData.proposedFees}
                        onChange={(e) => setProposalData({ ...proposalData, proposedFees: e.target.value })}
                        placeholder="950"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">You'll receive 90% after platform commission</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                      Delivery Timeline (Days) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={proposalData.timeline}
                      onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                      placeholder="14"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={proposalData.coverLetter}
                    onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                    placeholder="Explain why you're the best fit for this project. Include:
- Your relevant experience
- Similar projects you've completed
- Your approach to this specific project
- Any questions you have for the client"
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] resize-none"
                  />
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Fee:</span>
                      <span className="font-semibold">${proposalData.proposedFees || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Commission (10%):</span>
                      <span className="font-semibold text-red-600">-${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.1).toFixed(2) : '0'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span className="font-bold text-[#1F1F1F]">You'll Receive:</span>
                      <span className="font-bold text-green-600">${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.9).toFixed(2) : '0'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitProposal}
                  disabled={submittingProposal}
                  className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingProposal ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Proposal
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <FreelancerProjectDetails
          project={selectedProject}
          proposal={selectedProposal}
          onClose={handleCloseProjectDetails}
          onProjectUpdate={fetchAllData}
        />
      )}

      {/* Profile View Popup */}
      {showProfilePopup && (
        <ProfileViewPopup onClose={() => setShowProfilePopup(false)} />
      )}
    </div>
  );
}
