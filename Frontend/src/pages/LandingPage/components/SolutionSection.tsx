import { CheckCircle } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="relative pt-0 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            The Global Marketplace for Research & Innovation
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-gray-300">
            A seamless platform where organizations can hire verified researchers, and experts can access high-impact projects—spanning science, engineering, business, healthcare, AI, supply chain, sustainability, and more.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">What You Can Do on the Platform</h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Hire researchers for short-term or long-term R&D projects',
              'Get support for thesis, publications, data analysis, and experiments',
              'Access domain experts for consulting, prototyping, and literature review',
              'Post challenges, innovation tasks, and research competitions',
              'Build research teams for large-scale projects',
              'Find proof-of-concept development expertise'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-sm sm:text-base text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
