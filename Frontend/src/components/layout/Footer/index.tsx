import { useNavigate } from 'react-router-dom';

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
    <footer className="bg-[#1F1F1F] text-white py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Platform</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Home
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/blog')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Blog
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/pricing')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Pricing
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/bidding')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Find Project
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">For Researchers</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Join as Expert
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Get Verified
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Become Certified
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={handleSuccessStoriesClick} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Commission Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/terms-and-conditions')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Terms & Conditions
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/privacy-policy')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Privacy Policy
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/academic-integrity-policy')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Academic Integrity Policy
                </button>
              </li>
              <li className="relative z-30">
                <button 
                  onClick={() => handleNavigation('/escrow-service-terms')} 
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 underline-offset-2 hover:underline block w-full pointer-events-auto"
                  type="button"
                  style={{ font: 'inherit', color: 'inherit' }}
                >
                  Escrow Service Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2D6CDF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold">ResearchHub</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            © 2025 ResearchHub. The World's First Research Innovation Economy.
          </p>
        </div>
      </div>
    </footer>
  );
}
