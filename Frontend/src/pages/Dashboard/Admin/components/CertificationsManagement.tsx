import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Download, Award, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Calendar, User, Grid, List, TrendingUp } from 'lucide-react';
// import { getCertifications } from '../../../../services/certificationApi'; // Add this API service

interface Certification {
  id: number;
  freelancer: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  status: 'pending' | 'verified' | 'expired' | 'rejected';
  credentialId?: string;
  verificationUrl?: string;
}

export default function CertificationsManagement() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      // const response = await getCertifications(); // Replace with actual API call
      // setCertifications(response.certifications);
      
      // Mock data for now - replace with actual API call
      const mockData: Certification[] = [
        {
          id: 1,
          freelancer: 'John Doe',
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          issueDate: '2024-01-15',
          expiryDate: '2027-01-15',
          status: 'verified',
          credentialId: 'AWS-CSA-2024-001',
          verificationUrl: 'https://aws.amazon.com/verification'
        },
        {
          id: 2,
          freelancer: 'Jane Smith',
          title: 'Google Cloud Professional',
          issuer: 'Google Cloud',
          issueDate: '2023-12-10',
          expiryDate: '2025-12-10',
          status: 'pending',
          credentialId: 'GCP-PRO-2023-045'
        },
        {
          id: 3,
          freelancer: 'Mike Johnson',
          title: 'Certified Scrum Master',
          issuer: 'Scrum Alliance',
          issueDate: '2023-08-20',
          expiryDate: '2025-08-20',
          status: 'verified',
          credentialId: 'CSM-2023-789'
        },
        {
          id: 4,
          freelancer: 'Sarah Wilson',
          title: 'Adobe Certified Expert',
          issuer: 'Adobe',
          issueDate: '2024-02-01',
          status: 'expired',
          credentialId: 'ACE-2024-123'
        },
        {
          id: 5,
          freelancer: 'David Brown',
          title: 'Microsoft Azure Fundamentals',
          issuer: 'Microsoft',
          issueDate: '2024-01-30',
          expiryDate: '2026-01-30',
          status: 'rejected',
          credentialId: 'AZ-900-2024-456'
        }
      ];
      setCertifications(mockData);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setFilterStatus('all');
    setCurrentPage(1);
    await fetchCertifications();
    setIsRefreshing(false);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Freelancer,Title,Issuer,Issue Date,Expiry Date,Status,Credential ID\n" +
      filteredCertifications.map(c => 
        `${c.id},"${c.freelancer}","${c.title}","${c.issuer}","${c.issueDate}","${c.expiryDate || 'N/A'}","${c.status}","${c.credentialId}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "certifications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVerify = async (certId: number) => {
    try {
      // await verifyCertification(certId); // Replace with actual API call
      console.log('Verifying certification:', certId);
      // Refresh data after verification
      await fetchCertifications();
    } catch (error) {
      console.error('Failed to verify certification:', error);
    }
  };

  const handleReject = async (certId: number) => {
    try {
      // await rejectCertification(certId); // Replace with actual API call
      console.log('Rejecting certification:', certId);
      // Refresh data after rejection
      await fetchCertifications();
    } catch (error) {
      console.error('Failed to reject certification:', error);
    }
  };

  const filteredCertifications = certifications.filter((cert) => {
    const matchesSearch = searchTerm === '' || 
      cert.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCertifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCertifications = filteredCertifications.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { bg: 'bg-gradient-to-r from-yellow-100 to-amber-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock },
      verified: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      expired: { bg: 'bg-gradient-to-r from-gray-100 to-slate-100', text: 'text-gray-700', border: 'border-gray-200', icon: AlertTriangle },
      rejected: { bg: 'bg-gradient-to-r from-red-100 to-rose-100', text: 'text-red-700', border: 'border-red-200', icon: XCircle }
    };
    const { bg, text, border, icon: Icon } = config[status as keyof typeof config] || config.pending;
    return (
      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${bg} ${text} border ${border} flex items-center gap-1.5`}>
        <Icon size={14} />
        {status.toUpperCase()}
      </span>
    );
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
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
          className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full"
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
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-yellow-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl">
                <Award className="text-white" size={20} />
              </div>
              Certifications Management
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
                {filteredCertifications.length}
              </span>
            </h2>
            <p className="text-slate-600">Manage and verify freelancer certifications</p>
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
              className="flex items-center gap-2 px-4 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl font-semibold hover:bg-yellow-200 transition-all"
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-yellow-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-yellow-600 shadow-sm' 
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
        {paginatedCertifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-lg">No certifications found</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Freelancer</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Certification</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Issuer</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Dates</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCertifications.map((cert, index) => (
                  <motion.tr 
                    key={cert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="border-b border-slate-100/50 last:border-0 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                          <User className="text-yellow-600" size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{cert.freelancer}</div>
                          <div className="text-xs text-slate-500">ID: {cert.credentialId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-900">{cert.title}</div>
                        {isExpiringSoon(cert.expiryDate) && (
                          <div className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                            <AlertTriangle size={12} />
                            Expires soon
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900">{cert.issuer}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(cert.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar size={12} />
                          <span>Issued: {cert.issueDate}</span>
                        </div>
                        {cert.expiryDate && (
                          <div className="flex items-center gap-2 text-slate-600 mt-1">
                            <Calendar size={12} />
                            <span>Expires: {cert.expiryDate}</span>
                          </div>
                        )}
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
                        {cert.status === 'pending' && (
                          <>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleVerify(cert.id)}
                              className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                            >
                              Verify
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReject(cert.id)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                            >
                              Reject
                            </motion.button>
                          </>
                        )}
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
              {paginatedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
                      <Award className="text-yellow-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{cert.title}</h3>
                      <p className="text-sm text-slate-600">{cert.freelancer}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Issuer:</span>
                      <span className="text-sm font-medium">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Status:</span>
                      {getStatusBadge(cert.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Issued:</span>
                      <span className="text-sm font-medium">{cert.issueDate}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Expires:</span>
                        <span className={`text-sm font-medium ${isExpiringSoon(cert.expiryDate) ? 'text-orange-600' : ''}`}>
                          {cert.expiryDate}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      View
                    </button>
                    {cert.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleVerify(cert.id)}
                          className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleReject(cert.id)}
                          className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
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
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCertifications.length)} of {filteredCertifications.length} certifications
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
                        ? 'bg-yellow-600 text-white'
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
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-600 rounded-xl">
                <Clock className="text-white" size={16} />
              </div>
              <div className="text-sm text-yellow-700 font-medium">Pending</div>
            </div>
            <div className="text-2xl font-bold text-yellow-800">
              {certifications.filter(c => c.status === 'pending').length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-xl">
                <CheckCircle className="text-white" size={16} />
              </div>
              <div className="text-sm text-green-700 font-medium">Verified</div>
            </div>
            <div className="text-2xl font-bold text-green-800">
              {certifications.filter(c => c.status === 'verified').length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-600 rounded-xl">
                <AlertTriangle className="text-white" size={16} />
              </div>
              <div className="text-sm text-orange-700 font-medium">Expiring Soon</div>
            </div>
            <div className="text-2xl font-bold text-orange-800">
              {certifications.filter(c => isExpiringSoon(c.expiryDate)).length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Award className="text-white" size={16} />
              </div>
              <div className="text-sm text-blue-700 font-medium">Total</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">{certifications.length}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}