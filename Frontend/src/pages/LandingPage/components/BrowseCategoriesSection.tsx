import { Brain, Database, Microscope, Package, Dna, Leaf, Users, Wrench, DollarSign, TrendingUp } from 'lucide-react';

export default function BrowseCategoriesSection() {
  const categories = [
    { name: 'AI & Machine Learning', icon: Brain, count: '2,500+' },
    { name: 'Data Science & Analytics', icon: Database, count: '3,200+' },
    { name: 'Clinical Research', icon: Microscope, count: '1,800+' },
    { name: 'Supply Chain Management', icon: Package, count: '1,500+' },
    { name: 'Biotechnology', icon: Dna, count: '1,200+' },
    { name: 'Environmental Science', icon: Leaf, count: '900+' },
    { name: 'Social Sciences', icon: Users, count: '1,600+' },
    { name: 'Engineering', icon: Wrench, count: '2,800+' },
    { name: 'Finance & Economics', icon: DollarSign, count: '2,100+' },
    { name: 'Marketing Research', icon: TrendingUp, count: '1,400+' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-300">
            Find experts in your field
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} experts</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
