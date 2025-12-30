import { Briefcase, GraduationCap } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Briefcase className="text-red-400 flex-shrink-0" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-white">For Companies & Universities</h3>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-3 sm:mb-4">R&D is slow, expensive, and talent is hard to find.</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Top researchers are scattered across labs, universities, and countries—with no unified global platform to hire them quickly and reliably.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <GraduationCap className="text-blue-400 flex-shrink-0" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-white">For Researchers & Scientists</h3>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 sm:mb-4">Your expertise is valuable—but opportunities are limited.</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Opportunities are scattered and often underpaid. You deserve global visibility, meaningful projects, and fair compensation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
