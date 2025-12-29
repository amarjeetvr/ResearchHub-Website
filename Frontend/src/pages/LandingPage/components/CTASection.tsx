import type { PageType } from '../../../types';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Ready to Innovate Faster?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
          Join the global research innovation economy. Connect with verified experts or find meaningful projects today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-30">
          <button
            onClick={() => onNavigate('signup')}
            className="bg-gradient-to-r text-white from-[#0284C7] to-[#0B3C9D] px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#F5F7FA] transition-all shadow-xl cursor-pointer pointer-events-auto"
            type="button"
          >
            Hire a Researcher
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-[#2D6CDF] transition-all cursor-pointer pointer-events-auto"
            type="button"
          >
            Join as a Researcher
          </button>
        </div>
      </div>
    </section>
  );
}
