import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TRUST_BADGES } from '../../../utils/constants';
import type { PageType } from '../../../types';
import ParticlesBackground from './ParticlesBackground';
import AnimatedHeroHeading from './AnimatedHeroHeading';
import AnimatedCTAButtons from './AnimatedCTAButtons';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
  onShowResults: () => void;
  children?: React.ReactNode;
}

export default function HeroSection({ onNavigate, onShowResults, children }: HeroSectionProps) {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
    });
  }, []);
  return (
    <section className="relative pt-12 sm:pt-16 md:pt-10 pb-6 sm:pb-8 md:pb-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mx-auto mb-8 sm:mb-12 md:mb-16">
          <AnimatedHeroHeading />

          <motion.p 
            className="text-base sm:text-lg text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Connect with the world's best verified and certified researchers and breakthrough research projects instantly.<br /> */}
            AI matches you instantly with the right expertise, so you save time and innovate faster.
          </motion.p>

          <div data-aos="fade-up" data-aos-delay="200">
            {children}
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <AnimatedCTAButtons onShowResults={onShowResults} onNavigate={onNavigate} />
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {TRUST_BADGES.map((badge, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-slate-200"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <badge.icon className="text-blue-600 mx-auto mb-2 sm:mb-3" size={24} />
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
}
