import { Briefcase, GraduationCap } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Challenge
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Briefcase className="text-red-400 flex-shrink-0" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-white">For Companies & Universities</h3>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-3 sm:mb-4">R&D is slow, expensive, and talent is hard to find.</h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Top researchers are scattered across labs, universities, and countries—with no unified global platform to hire them quickly and reliably.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-white/10 transition-all">
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
