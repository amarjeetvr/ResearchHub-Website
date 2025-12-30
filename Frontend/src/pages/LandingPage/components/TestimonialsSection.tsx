import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      rating: 5,
      quote: 'ResearchHub has been a game-changer for my business. The quality of Researchers is outstanding, and the platform is incredibly easy to use.',
      name: 'David Miller',
      company: 'Tech Startup CEO',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    {
      rating: 5,
      quote: 'I\'ve tried many freelance platforms, but ResearchHub stands out. The payment protection and dispute resolution are top-notch.',
      name: 'Lisa Anderson',
      company: 'Marketing Director',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    {
      rating: 5,
      quote: 'As a freelancer, this platform has given me access to clients I never would have reached otherwise. Highly recommended!',
      name: 'James Wilson',
      company: 'Full Stack Developer',
      avatar: 'https://i.pravatar.cc/150?img=14',
    },
    {
      rating: 5,
      quote: 'The escrow system gives me peace of mind. I know my money is safe until the work is completed to my satisfaction.',
      name: 'Rachel Green',
      company: 'E-commerce Owner',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What our users say
          </h2>
          <p className="text-lg text-gray-300">
            Trusted by thousands of clients and Researchers worldwide
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Quote Icon */}
            <Quote size={48} className="text-cyan-400 opacity-30 mb-4" />

            {/* Rating */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-gray-200 text-center mb-8 leading-relaxed italic">
              "{testimonials[currentIndex].quote}"
            </p>

            {/* User Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-4 border-cyan-500/50 shadow-lg"
              />
              <div className="text-center">
                <h4 className="font-bold text-lg text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-300">{testimonials[currentIndex].company}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg transition-all"
          >
            <ChevronLeft size={24} className="text-cyan-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg transition-all"
          >
            <ChevronRight size={24} className="text-cyan-400" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
