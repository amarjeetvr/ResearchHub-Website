import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, DollarSign, TrendingUp, Search, Send, X } from 'lucide-react';
import { getAllProjects, submitBid } from '../../../services/api';
import toast from 'react-hot-toast';

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });

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

  const getInitials = (name: string) => {
    if (!name) return 'AN';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const handleSubmitProposalClick = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowProposalModal(true);
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
        fetchProjects(); // Refresh projects to update bid count
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmittingProposal(false);
    }
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
    </div>
  );
}
