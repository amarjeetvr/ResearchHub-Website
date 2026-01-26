import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, X, RefreshCw, Download, Tag, TrendingUp, Users, Star, Grid, List, Filter } from 'lucide-react';

interface Skill {
  id?: number;
  name: string;
  category?: string;
  usage?: number;
  trending?: boolean;
}

export default function SkillsManagement({ skills }: { skills: string[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'programming' });

  // Convert string array to enhanced skill objects
  const enhancedSkills: Skill[] = skills.map((skill, index) => ({
    id: index + 1,
    name: skill,
    category: getSkillCategory(skill),
    usage: Math.floor(Math.random() * 1000) + 50,
    trending: Math.random() > 0.8
  }));

  function getSkillCategory(skill: string): string {
    const categories = {
      programming: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'PHP'],
      design: ['Photoshop', 'Figma', 'Illustrator', 'UI/UX', 'Graphic Design'],
      marketing: ['SEO', 'Social Media', 'Content Marketing', 'Google Ads'],
      data: ['Data Analysis', 'Machine Learning', 'SQL', 'Excel'],
      writing: ['Content Writing', 'Copywriting', 'Technical Writing']
    };
    
    for (const [category, skillList] of Object.entries(categories)) {
      if (skillList.some(s => skill.toLowerCase().includes(s.toLowerCase()))) {
        return category;
      }
    }
    return 'other';
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setFilterCategory('all');
    setCurrentPage(1);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Category,Usage,Trending\n" +
      filteredSkills.map(s => 
        `${s.id},"${s.name}","${s.category}",${s.usage},${s.trending}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "skills.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      // In real implementation, this would call an API
      console.log('Adding skill:', newSkill);
      setNewSkill({ name: '', category: 'programming' });
      setShowAddModal(false);
    }
  };

  const handleDeleteSkill = (skillId: number) => {
    // In real implementation, this would call an API
    console.log('Deleting skill:', skillId);
  };

  const filteredSkills = enhancedSkills.filter((skill) => {
    const matchesSearch = searchTerm === '' || 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex);

  const getCategoryBadge = (category: string) => {
    const config = {
      programming: { bg: 'bg-gradient-to-r from-blue-100 to-indigo-100', text: 'text-blue-700', border: 'border-blue-200' },
      design: { bg: 'bg-gradient-to-r from-purple-100 to-violet-100', text: 'text-purple-700', border: 'border-purple-200' },
      marketing: { bg: 'bg-gradient-to-r from-green-100 to-emerald-100', text: 'text-green-700', border: 'border-green-200' },
      data: { bg: 'bg-gradient-to-r from-orange-100 to-amber-100', text: 'text-orange-700', border: 'border-orange-200' },
      writing: { bg: 'bg-gradient-to-r from-pink-100 to-rose-100', text: 'text-pink-700', border: 'border-pink-200' },
      other: { bg: 'bg-gradient-to-r from-gray-100 to-slate-100', text: 'text-gray-700', border: 'border-gray-200' }
    };
    const { bg, text, border } = config[category as keyof typeof config] || config.other;
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${bg} ${text} border ${border}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  const categories = ['all', 'programming', 'design', 'marketing', 'data', 'writing', 'other'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-purple-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl">
                <Tag className="text-white" size={20} />
              </div>
              Skills Management
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                {filteredSkills.length}
              </span>
            </h2>
            <p className="text-slate-600">Manage platform skills and categories</p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-all"
            >
              <Plus size={16} />
              Add Skill
            </motion.button>
            
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {paginatedSkills.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-lg">No skills found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/50 to-slate-50/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all relative"
                >
                  {skill.trending && (
                    <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                      <TrendingUp className="text-white" size={12} />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                      <Tag className="text-purple-600" size={16} />
                    </div>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id!)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{skill.name}</h3>
                  
                  <div className="space-y-2">
                    {getCategoryBadge(skill.category!)}
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Usage:</span>
                      <span className="font-semibold">{skill.usage}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Skill</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Category</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Usage</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSkills.map((skill, index) => (
                  <motion.tr 
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="border-b border-slate-100/50 last:border-0 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                          <Tag className="text-purple-600" size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            {skill.name}
                            {skill.trending && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-md text-xs flex items-center gap-1">
                                <TrendingUp size={10} />
                                Trending
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">ID: {skill.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryBadge(skill.category!)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-medium">{skill.usage}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDeleteSkill(skill.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-sm text-slate-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredSkills.length)} of {filteredSkills.length} skills
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
                        ? 'bg-purple-600 text-white'
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
          <div className="bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-xl">
                <Tag className="text-white" size={16} />
              </div>
              <div className="text-sm text-purple-700 font-medium">Total Skills</div>
            </div>
            <div className="text-2xl font-bold text-purple-800">{enhancedSkills.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-600 rounded-xl">
                <TrendingUp className="text-white" size={16} />
              </div>
              <div className="text-sm text-orange-700 font-medium">Trending</div>
            </div>
            <div className="text-2xl font-bold text-orange-800">
              {enhancedSkills.filter(s => s.trending).length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Users className="text-white" size={16} />
              </div>
              <div className="text-sm text-blue-700 font-medium">Avg Usage</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {Math.round(enhancedSkills.reduce((sum, s) => sum + (s.usage || 0), 0) / enhancedSkills.length)}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-xl">
                <Star className="text-white" size={16} />
              </div>
              <div className="text-sm text-green-700 font-medium">Categories</div>
            </div>
            <div className="text-2xl font-bold text-green-800">
              {new Set(enhancedSkills.map(s => s.category)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add New Skill</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter skill name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Add Skill
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
