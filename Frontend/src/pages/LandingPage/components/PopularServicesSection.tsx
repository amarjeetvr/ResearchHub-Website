import { Code, Palette, Smartphone, TrendingUp, FileText, Video, Camera, Globe, Headphones, Box, Mic, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PopularServicesSection() {
  const navigate = useNavigate();

  const services = [
    { name: 'Logo Design', icon: Palette, price: 50, color: 'from-pink-500 to-rose-500' },
    { name: 'Website Development', icon: Code, price: 200, color: 'from-blue-500 to-cyan-500' },
    { name: 'Mobile App Development', icon: Smartphone, price: 500, color: 'from-purple-500 to-indigo-500' },
    { name: 'SEO Services', icon: TrendingUp, price: 100, color: 'from-green-500 to-emerald-500' },
    { name: 'Content Writing', icon: FileText, price: 30, color: 'from-orange-500 to-amber-500' },
    { name: 'Video Editing', icon: Video, price: 80, color: 'from-red-500 to-pink-500' },
    { name: 'Social Media Marketing', icon: Users, price: 150, color: 'from-blue-500 to-purple-500' },
    { name: 'Virtual Assistant', icon: Headphones, price: 25, color: 'from-teal-500 to-cyan-500' },
    { name: 'Data Entry', icon: FileText, price: 20, color: 'from-gray-500 to-slate-500' },
    { name: 'Translation Services', icon: Globe, price: 40, color: 'from-indigo-500 to-blue-500' },
    { name: 'Voice Over', icon: Mic, price: 60, color: 'from-purple-500 to-pink-500' },
    { name: '3D Modeling', icon: Box, price: 120, color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Popular Services
          </h2>
          <p className="text-lg text-gray-300">
            Most requested services by our clients
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                onClick={() => navigate('/bidding')}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Icon Section */}
                <div className={`bg-gradient-to-br ${service.color} p-8 flex items-center justify-center`}>
                  <Icon size={48} className="text-white" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
