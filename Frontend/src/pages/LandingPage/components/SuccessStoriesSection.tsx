import { Star, TrendingUp, Award, DollarSign } from 'lucide-react';

export default function SuccessStoriesSection() {
  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Freelancer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      title: 'From Zero to $50K in 6 Months',
      metric: 'Earned $50,000',
      quote: 'ResearchHub changed my life. I went from struggling to find clients to having a steady stream of high-quality projects.',
      rating: 5,
      icon: DollarSign,
    },
    {
      name: 'Michael Chen',
      role: 'Client',
      avatar: 'https://i.pravatar.cc/150?img=12',
      title: 'Found the Perfect Developer',
      metric: '10+ Projects Completed',
      quote: 'I found an amazing developer who understood my vision perfectly. The quality of work exceeded my expectations.',
      rating: 5,
      icon: Award,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelancer',
      avatar: 'https://i.pravatar.cc/150?img=5',
      title: 'Built a Thriving Business',
      metric: '200+ Happy Clients',
      quote: 'Started as a side hustle, now it\'s my full-time career. The platform made it so easy to connect with clients worldwide.',
      rating: 5,
      icon: TrendingUp,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Success stories from our community
          </h2>
          <p className="text-lg text-gray-300">
            Real people, real results
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => {
            const Icon = story.icon;
            return (
              <div
                key={story.name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-cyan-500/30"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">{story.name}</h3>
                    <p className="text-sm text-gray-400">{story.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Title */}
                <h4 className="font-bold text-xl text-white mb-3">{story.title}</h4>

                {/* Metric */}
                <div className="flex items-center gap-2 mb-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                  <Icon size={20} className="text-cyan-400" />
                  <span className="font-semibold text-cyan-400">{story.metric}</span>
                </div>

                {/* Quote */}
                <p className="text-gray-300 italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
