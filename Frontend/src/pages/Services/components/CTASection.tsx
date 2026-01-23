interface CTASectionProps {
  serviceName: string;
  onHireClick: () => void;
}

export default function CTASection({ serviceName, onHireClick }: CTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          So what are you waiting for?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of satisfied clients who have found success with our {serviceName.toLowerCase()} experts.
        </p>
        <button
          onClick={onHireClick}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Hire a Top {serviceName} Now
        </button>
      </div>
    </section>
  );
}