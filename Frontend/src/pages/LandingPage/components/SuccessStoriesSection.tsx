export default function SuccessStoriesSection() {
  const stories = [
    {
      company: 'TechCorp',
      project: 'AI Model Development',
      result: '40% efficiency increase',
      quote: 'ResearchHub connected us with the perfect AI expert. Project delivered ahead of schedule!',
    },
    {
      company: 'BioMed Inc',
      project: 'Clinical Trial Analysis',
      result: '3 months saved',
      quote: 'Found a certified researcher who understood our complex requirements perfectly.',
    },
    {
      company: 'LogiChain',
      project: 'Supply Chain Optimization',
      result: '$2M cost reduction',
      quote: 'The expertise we found here transformed our entire logistics operation.',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-300">
            Real results from real clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.company}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <div className="text-cyan-400 font-bold text-lg mb-2">{story.company}</div>
              <div className="text-white font-semibold mb-2">{story.project}</div>
              <div className="text-green-400 font-bold text-xl mb-4">{story.result}</div>
              <p className="text-gray-300 italic">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
