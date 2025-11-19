import { useState } from 'react';
import { ALL_FREELANCERS } from '../../utils/constants';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import TrustedBySection from './components/TrustedBySection';
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

  const filteredFreelancers = ALL_FREELANCERS.filter(freelancer => {
    const matchesCategory = !selectedCategory || freelancer.categories.includes(selectedCategory);
    const matchesSearch = !searchQuery ||
      freelancer.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      freelancer.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    setShowResults(false);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  return (
    <div className="bg-white">
      <HeroSection onNavigate={onNavigate} onShowResults={() => setShowResults(true)}>
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </HeroSection>

      {showResults ? (
        <SearchResultsSection
          filteredFreelancers={filteredFreelancers}
          selectedCategory={selectedCategory}
          onClearSearch={handleClearSearch}
          onClearCategory={handleClearCategory}
        />
      ) : (
        <>
          <TrustedBySection />
          <PlatformStatsSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <SuccessStoriesSection />
          <TestimonialsSection />
          <CTASection onNavigate={onNavigate} />
        </>
      )}

      <Footer />
    </div>
  );
}
