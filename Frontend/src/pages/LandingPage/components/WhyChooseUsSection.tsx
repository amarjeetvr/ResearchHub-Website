import { WHY_US_ITEMS, RESEARCH_DOMAINS } from '../../../utils/constants';

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
            This is not another freelancing website.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-8 sm:mb-12">
            This is the world's first research innovation economy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {WHY_US_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <item.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Unlike regular freelancing platforms...</h3>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-300">We are built exclusively for research, science, and innovation.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {RESEARCH_DOMAINS.map((domain, idx) => (
              <span key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base text-white">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
