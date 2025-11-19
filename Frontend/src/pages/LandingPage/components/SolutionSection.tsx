import { CheckCircle } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="pt-0 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            The Global Marketplace for Research & Innovation
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            A seamless platform where organizations can hire verified researchers, and experts can access high-impact projects—spanning science, engineering, business, healthcare, AI, supply chain, sustainability, and more.
          </p>
        </div>

        <div className="bg-[#F5F7FA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F] mb-6 sm:mb-8 text-center">What You Can Do on the Platform</h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Hire researchers for short-term or long-term R&D projects',
              'Get support for thesis, publications, data analysis, and experiments',
              'Access domain experts for consulting, prototyping, and literature review',
              'Post challenges, innovation tasks, and research competitions',
              'Build research teams for large-scale projects',
              'Find proof-of-concept development expertise'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-sm sm:text-base text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
