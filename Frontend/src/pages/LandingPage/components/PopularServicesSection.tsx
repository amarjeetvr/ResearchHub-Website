import { Code, Palette, Smartphone, TrendingUp, FileText, Video, Users, Headphones, Globe, Mic, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PopularServicesSection() {
  const navigate = useNavigate();
  
  const services = [
    { name: 'AI Development', icon: Code, color: 'from-blue-500 to-cyan-500', slug: 'ai-development' },
    { name: 'Data Analysis', icon: TrendingUp, color: 'from-green-500 to-emerald-500', slug: 'data-analysis' },
    { name: 'Clinical Research', icon: FileText, color: 'from-purple-500 to-indigo-500', slug: 'clinical-research' },
    { name: 'Supply Chain', icon: Box, color: 'from-cyan-500 to-blue-500', slug: 'supply-chain' },
    { name: 'Mobile App Development', icon: Smartphone, color: 'from-purple-500 to-indigo-500', slug: 'mobile-app-development' },
    { name: 'Content Writing', icon: FileText, color: 'from-orange-500 to-amber-500', slug: 'content-writing' },
    { name: 'Video Editing', icon: Video, color: 'from-red-500 to-pink-500', slug: 'video-editing' },
    { name: 'Social Media Marketing', icon: Users, color: 'from-blue-500 to-purple-500', slug: 'social-media-marketing' },
    { name: 'Virtual Assistant', icon: Headphones, color: 'from-teal-500 to-cyan-500', slug: 'virtual-assistant' },
    { name: 'Translation Services', icon: Globe, color: 'from-indigo-500 to-blue-500', slug: 'translation-services' },
    { name: 'Voice Over', icon: Mic, color: 'from-purple-500 to-pink-500', slug: 'voice-over' },
    { name: 'Design Services', icon: Palette, color: 'from-pink-500 to-rose-500', slug: 'design-services' },
  ];

  const handleServiceClick = (slug: string) => {
    navigate(`/services/${slug}`);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Popular Research Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            High-impact services with AI-verified experts ready to help
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleServiceClick(service.slug)}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${service.color} p-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={48} className="text-white" />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-center">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 text-center">Statistics & Insights</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
