import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Download, Eye, CheckCircle, XCircle, Clock, AlertTriangle, FileText, User, Calendar, Grid, List, TrendingUp } from 'lucide-react';

interface Verification {
  id: number;
  freelancer: string;
  type: string;
  submittedDate: string;
  documents: number;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'under_review' | 'approved' | 'rejected';
}

export default function VerificationWorkflow({ verifications }: { verifications: Verification[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Add default values for missing properties
  const enhancedVerifications = verifications.map(v => ({
    ...v,
    priority: v.priority || (Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low'),
    status: v.status || 'pending'
  }));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
    setCurrentPage(1);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Freelancer,Type,Status,Priority,Submitted Date,Documents\n" +
      filteredVerifications.map(v => 
        `${v.id},"${v.freelancer}","${v.type}","${v.status}","${v.priority}","${v.submittedDate}",${v.documents}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "verifications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVerifications = enhancedVerifications.filter((verification) => {
    const matchesSearch = searchTerm === '' || 
      verification.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || verification.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = filterStatus === 'all' || verification.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVerifications = filteredVerifications.slice(startIndex, endIndex);

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { bg: 'bg-gradient-to-r from-red-100 to-rose-100', text: 'text-red-700', border: 'border-red-200', icon: AlertTriangle },
      medium: { bg: 'bg-gradient-to-r from-yellow-100 to-amber-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock },
      low: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle }
    };
    const { bg, text, border, icon: Icon } = config[priority as keyof typeof config] || config.low;
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${bg} ${text} border ${border} flex items-center gap-1`}>
        <Icon size={12} />
        {priority.toUpperCase()}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { bg: 'bg-gradient-to-r from-gray-100 to-slate-100', text: 'text-gray-700', border: 'border-gray-200', icon: Clock },
      under_review: { bg: 'bg-gradient-to-r from-blue-100 to-indigo-100', text: 'text-blue-700', border: 'border-blue-200', icon: Eye },
      approved: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      rejected: { bg: 'bg-gradient-to-r from-red-100 to-rose-100', text: 'text-red-700', border: 'border-red-200', icon: XCircle }
    };
    const { bg, text, border, icon: Icon } = config[status as keyof typeof config] || config.pending;
    return (
      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${bg} ${text} border ${border} flex items-center gap-1.5`}>
        <Icon size={14} />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <FileText className="text-white" size={20} />
              </div>
              Verification Requests
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                {filteredVerifications.length}
              </span>
            </h2>
            <p className="text-slate-600">Review and approve user verification requests</p>
          </div>
          
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
        
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            >
              <option value="all">All Types</option>
              <option value="identity">Identity</option>
              <option value="education">Education</option>
              <option value="professional">Professional</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search verifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {paginatedVerifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-lg">No verifications found</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Freelancer</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Type</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Priority</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Documents</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Submitted</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVerifications.map((verification, index) => (
                  <motion.tr 
                    key={verification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="border-b border-slate-100/50 last:border-0 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <User className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{verification.freelancer}</div>
                          <div className="text-xs text-slate-500">ID: {verification.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                        {verification.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(verification.status)}
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(verification.priority)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        <span className="font-medium">{verification.documents}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={14} />
                        <span className="text-sm">{verification.submittedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Review
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                        >
                          Approve
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedVerifications.map((verification, index) => (
                <motion.div
                  key={verification.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{verification.type} Verification</h3>
                      <p className="text-sm text-slate-600">{verification.freelancer}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Status:</span>
                      {getStatusBadge(verification.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Priority:</span>
                      {getPriorityBadge(verification.priority)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Documents:</span>
                      <span className="text-sm font-medium">{verification.documents}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Submitted:</span>
                      <span className="text-sm font-medium">{verification.submittedDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      Review
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-sm text-slate-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredVerifications.length)} of {filteredVerifications.length} verifications
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/80 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="p-6 border-t border-slate-200/50 bg-slate-50/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Clock className="text-white" size={16} />
              </div>
              <div className="text-sm text-blue-700 font-medium">Pending</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {enhancedVerifications.filter(v => v.status === 'pending').length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-600 rounded-xl">
                <Eye className="text-white" size={16} />
              </div>
              <div className="text-sm text-yellow-700 font-medium">Under Review</div>
            </div>
            <div className="text-2xl font-bold text-yellow-800">
              {enhancedVerifications.filter(v => v.status === 'under_review').length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-xl">
                <CheckCircle className="text-white" size={16} />
              </div>
              <div className="text-sm text-green-700 font-medium">Approved</div>
            </div>
            <div className="text-2xl font-bold text-green-800">
              {enhancedVerifications.filter(v => v.status === 'approved').length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-100 to-rose-100 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-600 rounded-xl">
                <XCircle className="text-white" size={16} />
              </div>
              <div className="text-sm text-red-700 font-medium">Rejected</div>
            </div>
            <div className="text-2xl font-bold text-red-800">
              {enhancedVerifications.filter(v => v.status === 'rejected').length}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
