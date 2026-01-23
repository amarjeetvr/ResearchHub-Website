interface HeroSectionProps {
  serviceName: string;
  description: string;
  onHireClick: () => void;
}

export default function HeroSection({ serviceName, description, onHireClick }: HeroSectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Hire Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{serviceName}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          <button
            onClick={onHireClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Hire {serviceName} Expert
          </button>
        </div>
      </div>
    </section>
  );
}