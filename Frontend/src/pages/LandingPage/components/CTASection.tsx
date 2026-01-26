import { ArrowRight } from 'lucide-react';
import type { PageType } from '../../../types';
import { motion } from 'framer-motion';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Ready to get started?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 mb-8"
        >
          Join thousands of satisfied clients and find your perfect research expert today
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => onNavigate('signup')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => onNavigate('bidding')}
            className="bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            Post a Job
            <ArrowRight size={20} />
          </button>
        </motion.div>

        <p className="text-sm text-blue-100 mt-6">
          No credit card required • Free to join • Cancel anytime
        </p>
      </div>
    </section>
  );
}
