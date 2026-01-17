import { FileText, Users, Shield, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'Post a Job',
      description: 'Tell us what you need done in seconds. It\'s free to post and you\'ll get bids within minutes.',
    },
    {
      number: 2,
      icon: Users,
      title: 'Choose Researchers',
      description: 'Get your first bid in seconds and choose from the best. Compare profiles, reviews, and portfolios.',
    },
    {
      number: 3,
      icon: Shield,
      title: 'Pay Safely',
      description: 'Only pay when you\'re 100% happy with the work. Our secure payment system protects you.',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>
  
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/50">
                  {step.number}
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 pt-12 h-full group-hover:bg-white/10 group-hover:border-cyan-400/50 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30">
                    <Icon size={32} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.number < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105">
            Get Started Now
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Join millions of people who use ResearchHub
          </p>
        </div>
      </div>
    </section>
  );
}
