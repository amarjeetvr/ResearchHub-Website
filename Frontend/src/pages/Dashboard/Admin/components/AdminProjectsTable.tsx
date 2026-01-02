import { useState, useEffect } from 'react';
import { DollarSign, User, Briefcase, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getAdminProjects } from '../../../../services/projectApi';
import toast from 'react-hot-toast';
import PaymentReleaseModal from '../../../../components/shared/PaymentReleaseModal';

interface AdminProject {
  _id: string;
  projectId: any;
  clientId: any;
  freelancerId: any;
  clientName: string;
  freelancerName: string;
  projectTitle: string;
  bidAmount: number;
  escrowAmount: number;
  platformCommission: number;
  paymentStatus: string;
  projectStatus: string;
  clientApproval: {
    approved: boolean;
    approvedAt?: Date;
  };
  emailNotifications: {
    proposalAcceptedSent: boolean;
    paymentReleaseSent: boolean;
  };
  createdAt: string;
}

export default function AdminProjectsTable() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  const fetchAdminProjects = async () => {
    try {
      const response = await getAdminProjects();
      if (response.success) {
        setProjects(response.adminProjects);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch admin projects');
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseClick = (project: AdminProject) => {
    setSelectedProject(project);
    setShowReleaseModal(true);
  };

  const handleReleaseSuccess = () => {
    fetchAdminProjects();
    setShowReleaseModal(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    if (filterStatus === 'all') return true;
    return project.paymentStatus === filterStatus;
  });

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock },
      escrow_deposited: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
      released: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      refunded: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} flex items-center gap-1 w-fit`}>
        <Icon size={14} />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const getProjectStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700' },
      approved: { bg: 'bg-green-100', text: 'text-green-700' },
      disputed: { bg: 'bg-red-100', text: 'text-red-700' },
    };

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">Payment Management</h2>
          <p className="text-gray-600">Manage escrow payments and project completions</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="escrow_deposited">Escrow Deposited</option>
          <option value="released">Released</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No admin projects found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Project</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Freelancer</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Payment Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Project Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Created</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-[#2D6CDF] flex-shrink-0 mt-1" size={18} />
                      <div>
                        <div className="font-semibold text-[#1F1F1F] mb-1">{project.projectTitle}</div>
                        <div className="text-xs text-gray-500">
                          {project.emailNotifications.proposalAcceptedSent && (
                            <span className="mr-2">✓ Email Sent</span>
                          )}
                          {project.clientApproval.approved && (
                            <span>✓ Client Approved</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {project.clientId?.profilePhoto ? (
                        <img 
                          src={project.clientId.profilePhoto} 
                          alt={project.clientName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                      )}
                      <span className="font-medium text-gray-700">{project.clientName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {project.freelancerId?.profilePhoto ? (
                        <img 
                          src={project.freelancerId.profilePhoto} 
                          alt={project.freelancerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-green-600" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-700">{project.freelancerName}</div>
                        {project.freelancerId?.bankAccount?.accountNumber && (
                          <div className="text-xs text-gray-500 font-mono">Bank: {project.freelancerId.bankAccount.accountNumber}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-bold text-green-600 flex items-center gap-1">
                        <DollarSign size={16} />
                        ${project.bidAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Escrow: ${project.escrowAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: ${project.platformCommission.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getPaymentStatusBadge(project.paymentStatus)}
                  </td>
                  <td className="py-4 px-4">
                    {getProjectStatusBadge(project.projectStatus)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">{formatDate(project.createdAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {project.clientApproval.approved && project.paymentStatus !== 'released' ? (
                      <button
                        onClick={() => handleReleaseClick(project)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <DollarSign size={16} />
                        Release Payment
                      </button>
                    ) : project.paymentStatus === 'released' ? (
                      <span className="text-green-600 font-medium text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        Released
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Pending Approval</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-sm text-blue-600 mb-1">Total Projects</div>
          <div className="text-2xl font-bold text-blue-900">{projects.length}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="text-sm text-green-600 mb-1">Total Escrow</div>
          <div className="text-2xl font-bold text-green-900">
            ${projects.reduce((sum, p) => sum + p.escrowAmount, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-sm text-purple-600 mb-1">Platform Fees</div>
          <div className="text-2xl font-bold text-purple-900">
            ${projects.reduce((sum, p) => sum + p.platformCommission, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <div className="text-sm text-amber-600 mb-1">Pending Release</div>
          <div className="text-2xl font-bold text-amber-900">
            {projects.filter(p => p.clientApproval.approved && p.paymentStatus !== 'released').length}
          </div>
        </div>
      </div>

      {/* Payment Release Modal */}
      {selectedProject && (
        <PaymentReleaseModal
          isOpen={showReleaseModal}
          onClose={() => {
            setShowReleaseModal(false);
            setSelectedProject(null);
          }}
          adminProjectId={selectedProject._id}
          freelancer={{
            _id: selectedProject.freelancerId._id,
            fullname: selectedProject.freelancerName,
            email: selectedProject.freelancerId.email,
            bankAccount: selectedProject.freelancerId.bankAccount,
          }}
          projectTitle={selectedProject.projectTitle}
          amount={selectedProject.bidAmount}
          onSuccess={handleReleaseSuccess}
        />
      )}
    </div>
  );
}
