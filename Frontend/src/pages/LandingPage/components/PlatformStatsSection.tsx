import { PLATFORM_STATS } from '../../../utils/constants';

export default function PlatformStatsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {PLATFORM_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <stat.icon className="mx-auto mb-3 sm:mb-4" size={32} />
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
