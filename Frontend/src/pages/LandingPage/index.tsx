import { useState, useEffect } from 'react';
import { ALL_FREELANCERS } from '../../utils/constants';
import HeroSection from './components/HeroSection';
import TrustedBySection from './components/TrustedBySection';
import PopularServicesSection from './components/PopularServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import BrowseCategoriesSection from './components/BrowseCategoriesSection';
import PlatformStatsSection from './components/PlatformStatsSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import SearchResultsSection from './components/SearchResultsSection';
import Footer from '../../components/layout/Footer';
import type { PageType } from '../../types';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  const filteredFreelancers = ALL_FREELANCERS.filter(freelancer => {
    const matchesCategory = !selectedCategory || freelancer.categories.includes(selectedCategory);
    const matchesSearch = !searchQuery ||
      freelancer.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      freelancer.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    console.log('Clear search clicked');
    setShowResults(false);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Navbar - Already in App.tsx */}
      
      {/* 2. Hero Section */}
      <HeroSection onNavigate={onNavigate} onShowResults={() => setShowResults(true)} />

      {showResults ? (
        <div className="bg-white">
          <SearchResultsSection
            filteredFreelancers={filteredFreelancers}
            selectedCategory={selectedCategory}
            onClearSearch={handleClearSearch}
            onClearCategory={handleClearCategory}
          />
        </div>
      ) : (
        <>
          {/* 3. Trusted By Section (Sponsors) */}
          <TrustedBySection />
          
          {/* 4. Popular Services */}
          <PopularServicesSection />
          
          {/* 5. How It Works */}
          <HowItWorksSection />
          
          {/* 6. Browse Categories (Browse talent by category) */}
          <BrowseCategoriesSection />
          
          {/* 7. Platform Stats (500+, 1.0M+, etc.) */}
          <PlatformStatsSection />
          
          {/* 8. Problem Section (For companies & universities) */}
          <ProblemSection />
          
          {/* 9. Solution Section (For researcher & scientist) */}
          <SolutionSection />
          
          {/* 10. Why Choose Us (What can you do on the platform) */}
          <WhyChooseUsSection />
          
          {/* 11. Success Stories */}
          <SuccessStoriesSection />
          
          {/* 12. Testimonials (What users say) */}
          <TestimonialsSection />
          
          {/* 13. CTA Section (Ready to innovate faster) */}
          <CTASection onNavigate={onNavigate} />
        </>
      )}

      {/* 14. Footer (Subscribe + links) */}
      <Footer />
    </div>
  );
}
