import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, CheckCircle2, Star } from 'lucide-react';
import type { PageType } from '../../../types';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
  onShowResults: () => void;
  children?: React.ReactNode;
}

const popularSearches = ['AI Development', 'Data Analysis', 'Clinical Research', 'Supply Chain'];

const researcherImages = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop',
];

export default function HeroSection({ onNavigate, onShowResults }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % researcherImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onShowResults();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          <div className="text-left flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="text-gray-900">Get a Verified Researcher</span>
              <br />
              <span className="text-gray-900">Matched to Your Project</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold">Instantly with AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl"
            >
              Connect with the world's most trusted and AI-vetted researchers. Our AI instantly matches you project with the right expertise so you can interview faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4 sm:mb-6"
            >
              <div
                className={`bg-white rounded-2xl p-1.5 flex flex-row items-center gap-2 border-2 transition-all duration-300 shadow-xl ${
                  isFocused 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/30' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                <div className="flex-1 flex items-center px-4 py-2.5">
                  <div className="relative mr-2">
                    <Search size={18} className={`transition-colors ${
                      isFocused ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    {isFocused && (
                      <Sparkles size={10} className="absolute -top-1 -right-1 text-blue-600 animate-pulse" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Search for AI, Data Analysis, Clinical Research..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 outline-none text-sm sm:text-base text-gray-900 placeholder-gray-400 bg-transparent font-medium"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:scale-105 text-sm whitespace-nowrap"
                >
                  Search
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-gray-500 text-xs font-medium">Popular:</span>
                {popularSearches.map((term, i) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch();
                    }}
                    className="text-gray-700 hover:text-blue-600 text-xs bg-white hover:bg-blue-50 px-3 py-1 rounded-full transition-all font-medium border border-gray-200 hover:border-blue-300 shadow-sm"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-8"
            >
              <button
                onClick={() => onNavigate('signup')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base flex items-center gap-2"
              >
                Hire a Researcher
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate('bidding')}
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 text-base flex items-center gap-2 shadow-md"
              >
                Get as a Researcher
                <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center h-full"
          >
            <div className="relative w-full max-w-md">
              {researcherImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: idx === currentImageIndex ? 1 : 0,
                    scale: idx === currentImageIndex ? 1 : 0.9,
                    zIndex: idx === currentImageIndex ? 10 : 0
                  }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 p-6">
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={img}
                        alt={`Researcher ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Dr. David Chen</h3>
                          <p className="text-sm text-gray-600">Senior Researcher</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold text-gray-900">5.0</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Verified Professional</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
