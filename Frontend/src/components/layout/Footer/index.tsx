import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F1F1F] text-white py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Platform</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Domains</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">For Researchers</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Join as Expert</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Get Verified</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become Certified</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
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
              <li><a href="#" className="hover:text-white transition-colors cursor-pointer hover:underline">Escrow Terms</a></li>
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
