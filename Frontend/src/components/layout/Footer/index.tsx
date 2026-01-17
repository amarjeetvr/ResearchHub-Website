import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Facebook, Twitter, Linkedin, FileText, CreditCard } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccessStoriesClick = () => {
    // Navigate to home page first if not already there
    navigate('/');
    // Wait for navigation to complete, then scroll to success stories section
    setTimeout(() => {
      const successSection = document.querySelector('[data-section="success-stories"]');
      if (successSection) {
        successSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <footer className="relative z-10" style={{ background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Experts by Service */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">Experts by Service</h3>
            <ul className="space-y-3 text-gray-300">
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">AI Development</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Data Analysis</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Clinical Research</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Supply Chain</button></li>
            </ul>
          </div>

          {/* Experts by Subject */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">Experts by Subject</h3>
            <ul className="space-y-3 text-gray-300">
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Computer Science</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Medicine</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Engineering</button></li>
              <li><button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm">Business</button></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">Platform</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => handleNavigation('/')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/blog')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/pricing')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/bidding')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Find Project
                </button>
              </li>
            </ul>
          </div>

          {/* For Researchers */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">For Researchers</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Join as Expert
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Get Verified
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Become Certified
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSuccessStoriesClick} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Contact Support</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Commission Policy</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 text-white">Legal</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <button 
                  onClick={() => handleNavigation('/terms-and-conditions')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/privacy-policy')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/academic-integrity-policy')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Academic Integrity Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/escrow-service-terms')} 
                  className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm"
                >
                  Escrow Service Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <button onClick={() => handleNavigation('/')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Home</button>
            <button onClick={handleSuccessStoriesClick} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Success Stories</button>
            <button onClick={() => handleNavigation('/pricing')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">How it Works</button>
            <button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Browse Experts</button>
            <button onClick={() => handleNavigation('/bidding')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Browse Projects</button>
            <button onClick={handleSuccessStoriesClick} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Testimonials</button>
            <button onClick={() => handleNavigation('/')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Sitemap</button>
            <button onClick={() => handleNavigation('/terms-and-conditions')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Client Terms & Conditions</button>
            <button onClick={() => handleNavigation('/terms-and-conditions')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Freelancer Terms & Conditions</button>
            <button onClick={() => handleNavigation('/privacy-policy')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Privacy Policy</button>
            <button onClick={() => handleNavigation('/privacy-policy')} className="hover:text-cyan-400 transition-colors text-left bg-transparent border-none p-0 text-sm text-gray-300">Cookie Policy</button>
          </div>
        </div>

        {/* Contact & Address + Follow Us + Payment Partners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
          {/* Contact & Address */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>ResearchHub Inc.</p>
                  <p>123 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400" />
                <a href="mailto:support@researchhub.com" className="text-sm hover:text-cyan-400 transition-colors">
                  support@researchhub.com
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="/blog" className="w-10 h-10 bg-white/10 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <FileText size={20} className="text-gray-300 hover:text-cyan-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Twitter size={20} className="text-gray-300 hover:text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-600/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Facebook size={20} className="text-gray-300 hover:text-blue-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-700/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Linkedin size={20} className="text-gray-300 hover:text-blue-600" />
              </a>
            </div>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Our Payment Partners</h3>
            <div className="flex flex-wrap gap-4 justify-start">
              {/* VISA Logo */}
              <a 
                href="#" 
                className="bg-white rounded-lg p-3 flex items-center justify-center w-16 h-10 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Navigate to VISA payment');
                }}
              >
                <svg width="40" height="13" viewBox="0 0 40 13" fill="none">
                  <path d="M15.39 1.6h-2.76L10.83 11.2h2.76L15.39 1.6zm-4.57 0L8.32 8.23 7.09 2.74c-.09-.46-.42-1.14-.83-1.14H0l-.05.23c.91.18 1.97.46 2.61.82.36.23.46.46.55.82L5.49 11.2h2.88L12.74 1.6H8.82zm16.46 6.4c0-2.51-3.43-2.65-3.43-3.75 0-.37.37-.55 1.1-.55.68 0 1.37.14 1.97.37l.36-1.65c-.55-.23-1.28-.37-2.15-.37-2.29 0-3.89 1.19-3.89 2.88 0 1.23 1.1 1.92 1.97 2.47.87.55 1.19.91 1.19 1.42 0 .78-.96 1.1-1.83 1.1-.78 0-1.65-.18-2.38-.46l-.36 1.74c.55.23 1.56.41 2.61.41 2.47 0 4.07-1.19 4.07-3.02l.14.05zm6.03-6.4h-2.15c-.55 0-.96.32-1.19.78L25.14 11.2h2.88s.46-1.28.55-1.56h3.43c.09.37.37 1.56.37 1.56h2.56L31.28 1.6zm-2.38 6.17c.23-.59 1.1-2.88 1.1-2.88s.23-.59.37-.96l.18.91s.55 2.56.64 2.93h-2.29z" fill="#1434CB"/>
                </svg>
              </a>
              
              {/* PayPal Logo */}
              <a 
                href="#" 
                className="bg-white rounded-lg p-3 flex items-center justify-center w-16 h-10 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Navigate to PayPal payment');
                }}
              >
                <svg width="40" height="13" viewBox="0 0 40 13" fill="none">
                  <path d="M7.266 2.047c.165-.863.69-1.156 1.565-1.156h4.839c2.889 0 4.839 1.156 4.839 3.467 0 3.467-2.315 5.778-5.204 5.778h-1.565c-.365 0-.69.293-.79.658l-.365 2.311c-.1.365-.365.658-.69.658H7.631c-.2 0-.365-.158-.325-.365L8.856 2.047h-1.59z" fill="#003087"/>
                  <path d="M19.266 2.047c.165-.863.69-1.156 1.565-1.156h4.839c2.889 0 4.839 1.156 4.839 3.467 0 3.467-2.315 5.778-5.204 5.778h-1.565c-.365 0-.69.293-.79.658l-.365 2.311c-.1.365-.365.658-.69.658h-2.264c-.2 0-.365-.158-.325-.365L20.856 2.047h-1.59z" fill="#0070BA"/>
                  <path d="M31.266 2.047c.165-.863.69-1.156 1.565-1.156h2.274c1.565 0 2.564.658 2.564 1.823 0 1.823-1.299 2.481-2.864 2.481h-1.299c-.2 0-.365.158-.4.365l-.2 1.316c-.035.2-.2.365-.4.365h-1.099c-.2 0-.365-.158-.325-.365l1.184-4.829z" fill="#0070BA"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex justify-center items-center">
          <p className="text-gray-400 text-sm text-center">
            © 2025 ResearchHub. The World's First Research Innovation Economy.
          </p>
        </div>
      </div>
    </footer>
  );
}
