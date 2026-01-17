import { Shield, CreditCard, Headphones, Award, Zap, Globe } from 'lucide-react';

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
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-300">
            The best platform for research collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
