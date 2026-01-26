import { motion } from 'framer-motion';
import { Search, Eye, UserX, MoreVertical, Shield, Mail, Download, Plus, RefreshCw, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  joined: string;
  status: string;
}

export default function UserManagementTable({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Enhanced Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <Shield className="text-white" size={20} />
              </div>
              User Management
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                {filteredUsers.length}
              </span>
            </h2>
            <p className="text-slate-600">Manage user accounts, roles, and permissions</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
            >
              <RefreshCw size={16} />
              Refresh
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
            >
              <Download size={16} />
              Export
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Plus size={16} />
              Add User
            </motion.button>
          </div>
        </div>
        
        {/* Enhanced Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <motion.select 
              whileHover={{ scale: 1.02 }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            >
              <option>All Roles</option>
              <option>Clients</option>
              <option>Freelancers</option>
            </motion.select>
            
            <motion.select 
              whileHover={{ scale: 1.02 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </motion.select>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative flex-1 min-w-[250px]"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
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
                  ? 'bg-white text-blue-600 shadow-sm' 
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
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Bulk Edit
                </button>
                <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  Bulk Suspend
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content Area */}
      <div>
        {viewMode === 'table' ? (
          /* Enhanced Table View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left">
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length}
                      onChange={selectAllUsers}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      User
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Email</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Role</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">
                    <button 
                      onClick={() => handleSort('joined')}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      Joined
                      {sortField === 'joined' && (
                        sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className={`border-b border-slate-100/50 last:border-0 transition-colors ${
                      selectedUsers.includes(user.id) ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="relative"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {user.verified && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Shield size={8} className="text-white" />
                            </div>
                          )}
                        </motion.div>
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-slate-600 text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold capitalize shadow-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border shadow-sm ${
                          user.status === 'active' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200' 
                            : user.status === 'pending'
                            ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                        }`}
                      >
                        {user.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{user.joined}</td>
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
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Suspend User"
                        >
                          <UserX size={16} />
                        </motion.button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-6 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all ${
                    selectedUsers.includes(user.id) ? 'ring-2 ring-blue-500/50 bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {user.verified && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <Shield size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900 mb-1">{user.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{user.email}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                        {user.role}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' :
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Joined {user.joined}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={14} />
                      View
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Showing {filteredUsers.length} of {users.length} users</span>
            {selectedUsers.length > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                {selectedUsers.length} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm font-medium">1 of 10</span>
            <button className="px-3 py-1.5 bg-white/80 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
