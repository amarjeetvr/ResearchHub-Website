import { Shield, CreditCard, Headphones, Award, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUsSection() {
  const features = [
    { icon: Shield, title: 'Verified Experts', description: 'All researchers are verified and certified professionals' },
    { icon: CreditCard, title: 'Secure Payments', description: 'Your payments are protected with escrow system' },
    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer support for your needs' },
    { icon: Award, title: 'Quality Guarantee', description: '100% satisfaction or your money back' },
    { icon: Zap, title: 'Fast Delivery', description: 'Get your projects completed on time, every time' },
    { icon: Globe, title: 'Global Talent Pool', description: 'Access experts from 190+ countries worldwide' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-purple-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            The best platform for research collaboration
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
