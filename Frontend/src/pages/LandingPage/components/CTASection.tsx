import type { PageType } from '../../../types';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Ready to Innovate Faster?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
          Join the global research innovation economy. Connect with verified experts or find meaningful projects today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-900 hover:text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105">
            Hire a Researcher
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-900 hover:text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105"
          >
            Join as a Researcher
          </button>
        </div>
      </div>
    </section>
  );
}
