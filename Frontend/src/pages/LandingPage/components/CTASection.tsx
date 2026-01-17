import { ArrowRight } from 'lucide-react';
import type { PageType } from '../../../types';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of satisfied clients and find your perfect research expert today
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('signup')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => onNavigate('bidding')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            Post a Job
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          No credit card required • Free to join • Cancel anytime
        </p>
      </div>
    </section>
  );
}
