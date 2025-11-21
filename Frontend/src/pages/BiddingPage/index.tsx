import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, MessageSquare, Send, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getProjectById, submitBid, getAllProjects, acceptBid } from '../../services/api';
import toast from 'react-hot-toast';

export default function BiddingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [acceptingBid, setAcceptingBid] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });

  useEffect(() => {
    // Wait for auth to load before making decisions
    if (authLoading) return;
    
    if (id) {
      fetchProject();
    } else {
      fetchAllProjects();
    }
  }, [id, authLoading, isAuthenticated]);

  const fetchProject = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login', { state: { from: `/bidding/${id}` } });
      setLoading(false);
      return;
    }
    
    try {
      const response = await getProjectById(id!);
      if (response.success) {
        setProject(response.project);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
      // Don't show error toast for unauthenticated users viewing project list
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login first to submit a proposal');
      navigate('/login', { state: { from: `/bidding/${id || ''}` } });
      return;
    }

    if (user?.role !== 'freelancer') {
      toast.error('Only freelancers can submit proposals');
      return;
    }

    setShowProposalModal(true);
  };

  const handleAcceptProposal = async (bidId: string) => {
    if (!window.confirm('Are you sure you want to accept this proposal? All other proposals will be rejected.')) {
      return;
    }

    setAcceptingBid(bidId);
    try {
      const response = await acceptBid(id!, bidId);
      if (response.success) {
        toast.success(response.message || 'Proposal accepted successfully! Notification sent to freelancer.');
        fetchProject(); // Refresh project data
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to accept proposal');
    } finally {
      setAcceptingBid(null);
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

  const filteredProjects = projects.filter(proj => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      proj.title?.toLowerCase().includes(query) ||
      proj.introduction?.toLowerCase().includes(query) ||
      proj.skills?.some((skill: string) => skill.toLowerCase().includes(query))
    );
  });

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

  const handleViewProject = (projectId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login', { state: { from: `/bidding/${projectId}` } });
      return;
    }
    navigate(`/bidding/${projectId}`);
  };

  const handleSubmitProposal = async () => {
    if (!proposalData.proposedFees || !proposalData.timeline || !proposalData.coverLetter) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmittingProposal(true);
    try {
      const response = await submitBid(id!, {
        amount: parseFloat(proposalData.proposedFees),
        proposal: `Timeline: ${proposalData.timeline} days\n\n${proposalData.coverLetter}`
      });

      if (response.success) {
        toast.success('Proposal submitted successfully! Client will be notified.');
        setShowProposalModal(false);
        setProposalData({ proposedFees: '', timeline: '', coverLetter: '' });
        fetchProject();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  // Show project list if no ID
  if (!id) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-[#1F1F1F] mb-6">Find Projects</h1>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, description, or skills..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No projects found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search query</p>
              </div>
            ) : (
              filteredProjects.map((proj) => (
                <div key={proj._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => handleViewProject(proj._id)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#1F1F1F] hover:text-[#2D6CDF] transition-colors">{proj.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-gray-600">Posted {getTimeAgo(proj.createdAt)}</span>
                        <span className="text-sm text-[#2D6CDF] font-semibold">{proj.bids?.length || 0} bids</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-gray-600">by</span>
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2D6CDF] text-white text-xs font-bold">
                            {getInitials(proj.clientId?.fullname || 'Anonymous')}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {maskName(proj.clientId?.fullname || 'Anonymous')}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proj.introduction}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {proj.skills?.slice(0, 5).map((skill: string, idx: number) => (
                          <span key={idx} className="bg-[#F5F7FA] text-[#1F1F1F] px-3 py-1 rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                        {proj.skills?.length > 5 && (
                          <span className="bg-[#F5F7FA] text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">
                            +{proj.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-500">Budget</div>
                      <div className="text-xl font-bold text-[#2D6CDF]">${proj.budgetMin} - ${proj.budgetMax}</div>
                      <div className="text-sm text-gray-500 mt-1">Due: {formatDate(proj.deadline)}</div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleViewProject(proj._id); }}
                    className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all inline-flex items-center gap-2"
                  >
                    View Project
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">{project.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>Posted by <span className="font-semibold text-[#2D6CDF]">{maskName(project.clientId?.fullname || 'Anonymous')}</span></span>
                    <span>•</span>
                    <span>{getTimeAgo(project.createdAt)}</span>
                    <span>•</span>
                    <span className="text-[#2D6CDF] font-semibold">{project.bids?.length || 0} bids</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Budget</div>
                  <div className="text-xl font-bold text-[#2D6CDF]">${project.budgetMin} - ${project.budgetMax}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Deadline</div>
                  <div className="text-lg font-semibold text-[#1F1F1F]">{formatDate(project.deadline)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    {project.status === 'open' ? 'Open for Bids' : project.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Project Introduction</h3>
                <p className="text-gray-700 leading-relaxed">{project.introduction}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Detailed Requirements</h3>
                <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans bg-[#F5F7FA] p-4 rounded-xl">
                  {project.detailedRequirements}
                </pre>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-[#2D6CDF]/10 text-[#2D6CDF] px-4 py-2 rounded-lg text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProposalClick}
                className="w-full bg-[#2D6CDF] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1F1F1F] transition-all shadow-lg"
              >
                {isAuthenticated ? 'Submit Your Proposal' : 'Login to Submit Proposal'}
              </button>
            </div>

            {showProposalModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowProposalModal(false)}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#1F1F1F]">Submit Your Proposal</h2>
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

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">
                Proposals ({project.bids?.length || 0})
              </h2>

              <div className="space-y-6">
                {project.bids && project.bids.length > 0 ? (
                  project.bids.map((bid: any) => (
                    <div key={bid._id} className="border border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                            {bid.freelancerId?.fullname?.substring(0, 2).toUpperCase() || 'FR'}
                          </div>
                          <div>
                            <div className="font-bold text-xl text-[#1F1F1F] mb-1">{bid.freelancerId?.fullname || 'Researcher'}</div>
                            <div className="text-sm text-gray-600 mb-2">{bid.freelancerId?.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#2D6CDF]">${bid.amount}</div>
                          <div className="text-xs text-gray-400 mt-1">{getTimeAgo(bid.createdAt)}</div>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{bid.proposal}</p>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-[#2D6CDF] text-white py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2">
                          <MessageSquare size={18} />
                          Message
                        </button>
                        {user?._id === project.clientId?._id && bid.status === 'pending' && (
                          <button 
                            onClick={() => handleAcceptProposal(bid._id)}
                            disabled={acceptingBid === bid._id}
                            className="flex-1 border-2 border-[#2D6CDF] text-[#2D6CDF] py-2.5 rounded-xl font-semibold hover:bg-[#2D6CDF] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {acceptingBid === bid._id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#2D6CDF]"></div>
                                Accepting...
                              </>
                            ) : (
                              'Accept Proposal'
                            )}
                          </button>
                        )}
                        {bid.status === 'accepted' && (
                          <div className="flex-1 bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold text-center">
                            ✓ Accepted
                          </div>
                        )}
                        {bid.status === 'rejected' && (
                          <div className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-xl font-semibold text-center">
                            Rejected
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No proposals yet</p>
                    <p className="text-gray-400 text-sm mt-2">Be the first to submit a proposal!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-[#1F1F1F] text-lg mb-4">About the Client</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white font-bold">
                  {project.clientId?.fullname?.substring(0, 2).toUpperCase() || 'CL'}
                </div>
                <div>
                  <div className="font-semibold text-[#1F1F1F]">{maskName(project.clientId?.fullname || 'Client')}</div>
                  <div className="text-sm text-gray-500">Member since 2024</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects Posted</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">$12,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="font-semibold text-[#1F1F1F] mb-2">Payment Method</div>
                <div className="text-sm text-gray-700">Secure Escrow Payment</div>
                <div className="text-xs text-gray-500 mt-2">Funds held safely until project completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}