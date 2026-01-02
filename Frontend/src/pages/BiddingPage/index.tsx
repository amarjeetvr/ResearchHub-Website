import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, MapPin, Clock, DollarSign, Users, X, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getProjectById, submitBid, getAllProjects } from '../../services/api';
import { ProjectCardSkeleton } from '../../components/shared/LoadingSkeletons';
import EmptyState, { NoSearchResults } from '../../components/shared/EmptyState';
import Footer from '../../components/layout/Footer';
import toast from 'react-hot-toast';

export default function BiddingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // Filters
  const [filters, setFilters] = useState({
    categories: [] as string[],
    budgetMin: '',
    budgetMax: '',
    projectLength: '',
    skills: [] as string[],
    location: '',
    proposals: '',
    clientHistory: '',
  });

  const categories = [
    'Web Development', 'Mobile Apps', 'Design & Creative', 'Writing & Content',
    'Data Entry', 'Marketing', 'Photography', 'Video & Audio', 'Translation', 'Business'
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'PHP', 'WordPress', 'SEO',
    'Content Writing', 'Graphic Design', 'Video Editing', 'Data Analysis'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  const filteredProjects = projects.filter(proj => {
    if (searchQuery && !proj.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !proj.introduction?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(proj.category)) {
      return false;
    }
    if (filters.budgetMin && proj.budgetMax < parseInt(filters.budgetMin)) {
      return false;
    }
    if (filters.budgetMax && proj.budgetMin > parseInt(filters.budgetMax)) {
      return false;
    }
    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'budget-low') return a.budgetMin - b.budgetMin;
    if (sortBy === 'budget-high') return b.budgetMax - a.budgetMax;
    if (sortBy === 'bids') return (b.bids?.length || 0) - (a.bids?.length || 0);
    return 0;
  });

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      budgetMin: '',
      budgetMax: '',
      projectLength: '',
      skills: [],
      location: '',
      proposals: '',
      clientHistory: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <div className="hidden lg:block w-80">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {[...Array(5)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629]">
      {/* Top Search Bar */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-cyan-500 cursor-pointer text-white"
              >
                <option value="newest" className="bg-[#1a1f3a]">Newest First</option>
                <option value="budget-low" className="bg-[#1a1f3a]">Budget: Low to High</option>
                <option value="budget-high" className="bg-[#1a1f3a]">Budget: High to Low</option>
                <option value="bids" className="bg-[#1a1f3a]">Most Bids</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg shadow-lg shadow-cyan-500/50"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-white">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-cyan-400 hover:text-cyan-300">
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Categories</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500 bg-white/5 border-white/20"
                      />
                      <span className="text-sm text-gray-300">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Budget Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.budgetMin}
                    onChange={(e) => setFilters({...filters, budgetMin: e.target.value})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.budgetMax}
                    onChange={(e) => setFilters({...filters, budgetMax: e.target.value})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Project Length */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Project Length</h4>
                <div className="space-y-2">
                  {['Less than 1 week', '1-4 weeks', '1-3 months', '3-6 months', '6+ months'].map(length => (
                    <label key={length} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded">
                      <input
                        type="radio"
                        name="projectLength"
                        checked={filters.projectLength === length}
                        onChange={() => setFilters({...filters, projectLength: length})}
                        className="w-4 h-4 text-cyan-500 bg-white/5 border-white/20"
                      />
                      <span className="text-sm text-gray-300">{length}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Proposals */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Number of Proposals</h4>
                <div className="space-y-2">
                  {['0-5', '5-10', '10-20', '20+'].map(range => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded">
                      <input
                        type="radio"
                        name="proposals"
                        checked={filters.proposals === range}
                        onChange={() => setFilters({...filters, proposals: range})}
                        className="w-4 h-4 text-cyan-500 bg-white/5 border-white/20"
                      />
                      <span className="text-sm text-gray-300">{range} proposals</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Project Cards */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {sortedProjects.length} projects found
              </h2>
              <p className="text-gray-300 mt-1">Browse and bid on projects that match your skills</p>
            </div>

            {/* Project Cards */}
            <div className="space-y-4">
              {sortedProjects.length === 0 ? (
                searchQuery || filters.categories.length > 0 ? (
                  <NoSearchResults />
                ) : (
                  <EmptyState
                    icon="folder"
                    title="No projects available"
                    description="Check back later for new opportunities or adjust your filters."
                    actionLabel="Clear Filters"
                    onAction={clearFilters}
                  />
                )
              ) : (
                sortedProjects.map(project => (
                  <div
                    key={project._id}
                    onClick={() => navigate(`/bidding/${project._id}`)}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all p-6 cursor-pointer hover:border-cyan-500/50 hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {getTimeAgo(project.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {project.bids?.length || 0} bids
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            Worldwide
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-400 mb-1">Budget</div>
                        <div className="text-2xl font-bold text-cyan-400">
                          ${project.budgetMin}-${project.budgetMax}
                        </div>
                        {project.bids?.length > 0 && (
                          <div className="text-xs text-gray-400 mt-1">
                            Avg bid: ${Math.round(project.bids.reduce((sum: number, bid: any) => sum + bid.amount, 0) / project.bids.length)}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {project.introduction}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills?.slice(0, 6).map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills?.length > 6 && (
                        <span className="text-gray-400 text-sm px-3 py-1">
                          +{project.skills.length - 6} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {project.clientId?.fullname?.substring(0, 2).toUpperCase() || 'CL'}
                        </div>
                        <span className="text-sm text-gray-300">
                          {project.clientId?.fullname || 'Client'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/bidding/${project._id}`);
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/50"
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {sortedProjects.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50 text-white">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg shadow-cyan-500/50">1</button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white">2</button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white">3</button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
