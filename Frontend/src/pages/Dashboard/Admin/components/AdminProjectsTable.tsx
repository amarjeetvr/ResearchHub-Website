import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, User, Briefcase, Calendar, CheckCircle, Clock, AlertCircle, Search, Download, RefreshCw, Eye, MoreVertical, Grid, List, TrendingUp } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setFilterStatus('all');
    setCurrentPage(1);
    await fetchAdminProjects();
    setIsRefreshing(false);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Project,Client,Freelancer,Amount,Escrow,Commission,Payment Status,Project Status,Created\n" +
      filteredProjects.map(project => 
        `"${project.projectTitle}","${project.clientName}","${project.freelancerName}",${project.bidAmount},${project.escrowAmount},${project.platformCommission},"${project.paymentStatus}","${project.projectStatus}","${project.createdAt}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "admin-projects.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === 'all' || project.paymentStatus === filterStatus;
    const matchesSearch = searchTerm === '' || 
      project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.freelancerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string; icon: any }> = {
      pending: { bg: 'bg-gradient-to-r from-gray-100 to-slate-100', text: 'text-gray-700', border: 'border-gray-200', icon: Clock },
      escrow_deposited: { bg: 'bg-gradient-to-r from-blue-100 to-indigo-100', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
      released: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      refunded: { bg: 'bg-gradient-to-r from-red-100 to-rose-100', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <motion.span 
        whileHover={{ scale: 1.05 }}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${config.bg} ${config.text} border ${config.border} flex items-center gap-1.5 w-fit shadow-sm`}
      >
        <Icon size={14} />
        {status.replace('_', ' ').toUpperCase()}
      </motion.span>
    );
  };

  const getProjectStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string; icon?: any }> = {
      'in-progress': { bg: 'bg-gradient-to-r from-yellow-100 to-amber-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock },
      completed: { bg: 'bg-gradient-to-r from-blue-100 to-indigo-100', text: 'text-blue-700', border: 'border-blue-200', icon: CheckCircle },
      approved: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      disputed: { bg: 'bg-gradient-to-r from-red-100 to-rose-100', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
    };

    const config = statusConfig[status] || { bg: 'bg-gradient-to-r from-gray-100 to-slate-100', text: 'text-gray-700', border: 'border-gray-200' };
    const Icon = config.icon;

    return (
      <motion.span 
        whileHover={{ scale: 1.05 }}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${config.bg} ${config.text} border ${config.border} flex items-center gap-1.5 w-fit shadow-sm`}
      >
        {Icon && <Icon size={14} />}
        {status.replace('-', ' ').toUpperCase()}
      </motion.span>
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Enhanced Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-green-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                <DollarSign className="text-white" size={20} />
              </div>
              Payment Management
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                {filteredProjects.length}
              </span>
            </h2>
            <p className="text-slate-600">Manage escrow payments and project completions</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
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
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>
        </div>
        
        {/* Enhanced Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <motion.select
              whileHover={{ scale: 1.02 }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="escrow_deposited">Escrow Deposited</option>
              <option value="released">Released</option>
              <option value="refunded">Refunded</option>
            </motion.select>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative flex-1 min-w-[300px]"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search projects, clients, or freelancers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-sm"
              />
            </motion.div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {paginatedProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-lg">No projects found</p>
          </div>
        ) : viewMode === 'table' ? (
          /* Enhanced Table View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Project</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm hidden sm:table-cell">Client</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm hidden md:table-cell">Freelancer</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Amount</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm hidden lg:table-cell">Payment Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm hidden xl:table-cell">Created</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((project, index) => (
                  <motion.tr 
                    key={project._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="border-b border-slate-100/50 last:border-0 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl"
                        >
                          <Briefcase className="text-green-600" size={16} />
                        </motion.div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 mb-1 text-sm">{project.projectTitle}</div>
                          <div className="text-xs text-slate-500 sm:hidden">
                            {project.clientName} → {project.freelancerName}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            {project.emailNotifications.proposalAcceptedSent && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-md">✓ Email</span>
                            )}
                            {project.clientApproval.approved && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-md">✓ Approved</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-3">
                        {project.clientId?.profilePhoto ? (
                          <motion.img 
                            whileHover={{ scale: 1.1 }}
                            src={project.clientId.profilePhoto} 
                            alt={project.clientName}
                            className="w-8 h-8 rounded-xl object-cover shadow-sm"
                          />
                        ) : (
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center"
                          >
                            <User size={14} className="text-blue-600" />
                          </motion.div>
                        )}
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{project.clientName}</div>
                          <div className="text-xs text-slate-500">Client</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        {project.freelancerId?.profilePhoto ? (
                          <motion.img 
                            whileHover={{ scale: 1.1 }}
                            src={project.freelancerId.profilePhoto} 
                            alt={project.freelancerName}
                            className="w-8 h-8 rounded-xl object-cover shadow-sm"
                          />
                        ) : (
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center"
                          >
                            <User size={14} className="text-green-600" />
                          </motion.div>
                        )}
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 text-sm">{project.freelancerName}</div>
                          <div className="text-xs text-slate-500">Freelancer</div>
                          {project.freelancerId?.bankAccount?.accountNumber && (
                            <div className="text-xs text-slate-400 font-mono">Bank: ***{project.freelancerId.bankAccount.accountNumber.slice(-4)}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-green-600 flex items-center gap-1 text-sm">
                          <DollarSign size={14} />
                          ${project.bidAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">
                          Escrow: ${project.escrowAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">
                          Fee: ${project.platformCommission.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {getPaymentStatusBadge(project.paymentStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getProjectStatusBadge(project.projectStatus)}
                        <div className="lg:hidden">
                          {getPaymentStatusBadge(project.paymentStatus)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={14} />
                        <span className="text-sm">{formatDate(project.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </motion.button>
                        {project.clientApproval.approved && project.paymentStatus !== 'released' ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReleaseClick(project)}
                            className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 rounded-lg hover:from-green-200 hover:to-emerald-200 transition-all font-medium text-xs flex items-center gap-1 shadow-sm"
                          >
                            <DollarSign size={12} />
                            Release
                          </motion.button>
                        ) : project.paymentStatus === 'released' ? (
                          <span className="text-green-600 font-medium text-xs flex items-center gap-1">
                            <CheckCircle size={12} />
                            Released
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs">Pending</span>
                        )}
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          title="More Options"
                        >
                          <MoreVertical size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Enhanced Grid View */
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Project Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                      <Briefcase className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">{project.projectTitle}</h3>
                      <div className="flex items-center gap-2 text-xs">
                        {project.emailNotifications.proposalAcceptedSent && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-md">✓ Email</span>
                        )}
                        {project.clientApproval.approved && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-md">✓ Approved</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Client:</span>
                      <span className="text-sm font-medium text-slate-900">{project.clientName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Freelancer:</span>
                      <span className="text-sm font-medium text-slate-900">{project.freelancerName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Amount:</span>
                      <span className="text-sm font-bold text-green-600">${project.bidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Escrow:</span>
                      <span className="text-sm font-medium text-slate-900">${project.escrowAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getPaymentStatusBadge(project.paymentStatus)}
                    {getProjectStatusBadge(project.projectStatus)}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={14} />
                      View
                    </motion.button>
                    {project.clientApproval.approved && project.paymentStatus !== 'released' ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReleaseClick(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        <DollarSign size={14} />
                        Release
                      </motion.button>
                    ) : project.paymentStatus === 'released' ? (
                      <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium">
                        <CheckCircle size={14} />
                        Released
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center px-3 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm">
                        Pending
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'bg-white/80 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="p-6 border-t border-slate-200/50 bg-slate-50/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Briefcase className="text-white" size={16} />
              </div>
              <div className="text-sm text-blue-700 font-medium">Total Projects</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">{projects.length}</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-xl">
                <DollarSign className="text-white" size={16} />
              </div>
              <div className="text-sm text-green-700 font-medium">Total Escrow</div>
            </div>
            <div className="text-2xl font-bold text-green-800">
              ${projects.reduce((sum, p) => sum + p.escrowAmount, 0).toLocaleString()}
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-xl">
                <TrendingUp className="text-white" size={16} />
              </div>
              <div className="text-sm text-purple-700 font-medium">Platform Fees</div>
            </div>
            <div className="text-2xl font-bold text-purple-800">
              ${projects.reduce((sum, p) => sum + p.platformCommission, 0).toLocaleString()}
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-600 rounded-xl">
                <Clock className="text-white" size={16} />
              </div>
              <div className="text-sm text-amber-700 font-medium">Pending Release</div>
            </div>
            <div className="text-2xl font-bold text-amber-800">
              {projects.filter(p => p.clientApproval.approved && p.paymentStatus !== 'released').length}
            </div>
          </motion.div>
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
    </motion.div>
  );
}
