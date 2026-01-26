import { FileText, Users, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Complete your research project in three simple steps
          </motion.p>
        </div>
  
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8 pt-12 h-full group-hover:border-blue-300 group-hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon size={32} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.number < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-blue-600" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg">
            Get Started Now
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Free to post projects • Secure payments • 24/7 support
          </p>
        </motion.div>
      </div>
    </section>
  );
}
