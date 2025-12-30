import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#0084FF] mb-4">404</h1>
          <div className="w-32 h-1 bg-[#0084FF] mx-auto rounded-full"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#0084FF] text-[#0084FF] rounded-lg font-semibold hover:bg-[#0084FF] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-[#0084FF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-colors"
          >
            <Home size={20} />
            Go Home
          </button>
          <button
            onClick={() => navigate('/bidding')}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-[#0084FF] hover:text-[#0084FF] transition-colors"
          >
            <Search size={20} />
            Browse Projects
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">Popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/about')} className="text-[#0084FF] hover:underline text-sm">
              About Us
            </button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/pricing')} className="text-[#0084FF] hover:underline text-sm">
              Pricing
            </button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/blog')} className="text-[#0084FF] hover:underline text-sm">
              Blog
            </button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/login')} className="text-[#0084FF] hover:underline text-sm">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
