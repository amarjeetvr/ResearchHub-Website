import { Code, Palette, FileText, Video, Music, Briefcase, Heart, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BrowseCategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Graphics & Design', icon: Palette, count: '500K+', color: 'from-pink-500 to-rose-500' },
    { name: 'Digital Marketing', icon: TrendingUp, count: '300K+', color: 'from-green-500 to-emerald-500' },
    { name: 'Writing & Translation', icon: FileText, count: '400K+', color: 'from-blue-500 to-cyan-500' },
    { name: 'Video & Animation', icon: Video, count: '200K+', color: 'from-purple-500 to-indigo-500' },
    { name: 'Music & Audio', icon: Music, count: '150K+', color: 'from-orange-500 to-amber-500' },
    { name: 'Programming & Tech', icon: Code, count: '600K+', color: 'from-indigo-500 to-blue-500' },
    { name: 'Business', icon: Briefcase, count: '250K+', color: 'from-gray-400 to-slate-400' },
    { name: 'Lifestyle', icon: Heart, count: '100K+', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse talent by category
          </h2>
          <p className="text-lg text-gray-300">
            Looking for work in a different field? We've got you covered.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                onClick={() => navigate('/bidding')}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-pointer group hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {category.count} Researchers
                </p>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/bidding')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg flex items-center gap-2 mx-auto group"
          >
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
