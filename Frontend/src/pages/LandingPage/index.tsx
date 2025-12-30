import { useState, useEffect } from 'react';
import { ALL_Researchers } from '../../utils/constants';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import TrustedBySection from './components/TrustedBySection';
import PopularServicesSection from './components/PopularServicesSection';
import BrowseCategoriesSection from './components/BrowseCategoriesSection';
import PlatformStatsSection from './components/PlatformStatsSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
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

  const handleSearch = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults) {
      // Scroll to results section smoothly
      window.scrollTo({ top: 600, behavior: 'smooth' });
    } else {
      // Scroll back to top when results are cleared
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  const filteredResearchers = ALL_Researchers.filter(freelancer => {
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
    <div className="bg-gradient-to-br from-[#0E1724] via-[#1a2332] to-[#0E1724] min-h-screen">
      <HeroSection onNavigate={onNavigate} onShowResults={() => setShowResults(true)}>
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </HeroSection>

      {showResults ? (
        <div className="bg-white">
          <SearchResultsSection
            filteredResearchers={filteredResearchers}
            selectedCategory={selectedCategory}
            onClearSearch={handleClearSearch}
            onClearCategory={handleClearCategory}
          />
        </div>
      ) : (
        <div className="bg-white">
          <TrustedBySection />
          <PopularServicesSection />
          <HowItWorksSection />
          <BrowseCategoriesSection />
          <PlatformStatsSection />
          <ProblemSection />
          <SolutionSection />
          <WhyChooseUsSection />
          <SuccessStoriesSection />
          <TestimonialsSection />
          <CTASection onNavigate={onNavigate} />
        </div>
      )}

      <Footer />
    </div>
  );
}
