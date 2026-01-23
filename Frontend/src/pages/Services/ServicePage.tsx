import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceData, getServiceBySlug } from '../../data/servicesData';
import Navbar from '../../components/layout/Navbar';
import HeroSection from './components/HeroSection';
import ServiceDescription from './components/ServiceDescription';
import ServiceCards from './components/ServiceCards';
import HowItWorks from './components/HowItWorks';
import ExpertsList from './components/ExpertsList';
import CTASection from './components/CTASection';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/api';
import toast from 'react-hot-toast';

export default function ServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceSlug) {
      const serviceData = getServiceBySlug(serviceSlug);
      if (serviceData) {
        setService(serviceData);
      } else {
        // Redirect to home if service not found
        navigate('/');
      }
    }
    setLoading(false);
  }, [serviceSlug, navigate]);

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      'home': '/',
      'about': '/about',
      'blog': '/blog',
      'pricing': '/pricing',
      'login': '/login',
      'signup': '/signup'
    };
    navigate(routes[page] || '/');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const handleHireClick = () => {
    // Navigate to project posting or login
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
        onNavigate={handleNavigate}
        onViewProfile={() => {}}
        onLogout={handleLogout}
      />
      
      <HeroSection
        serviceName={service.name}
        description={service.heroDescription}
        onHireClick={handleHireClick}
      />
      
      <ServiceDescription
        title={service.whatIsService.title}
        content={service.whatIsService.content}
      />
      
      <ServiceCards
        subServices={service.subServices}
        serviceName={service.name}
      />
      
      <HowItWorks />
      
      <ExpertsList
        experts={service.experts}
        serviceName={service.name}
      />
      
      <CTASection
        serviceName={service.name}
        onHireClick={handleHireClick}
      />
      
      <Footer />
    </div>
  );
}