import { Briefcase, GraduationCap } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-red-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Briefcase className="text-red-600 flex-shrink-0" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1F1F]">For Companies & Universities</h3>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-red-900 mb-3 sm:mb-4">R&D is slow, expensive, and talent is hard to find.</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Top researchers are scattered across labs, universities, and countries—with no unified global platform to hire them quickly and reliably.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <GraduationCap className="text-blue-600 flex-shrink-0" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1F1F]">For Researchers & Scientists</h3>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">Your expertise is valuable—but opportunities are limited.</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Opportunities are scattered and often underpaid. You deserve global visibility, meaningful projects, and fair compensation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
