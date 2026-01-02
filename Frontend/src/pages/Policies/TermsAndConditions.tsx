import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2D6CDF] hover:text-[#1F1F1F] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-[#1F1F1F] mb-6">Terms & Conditions</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              Welcome to our platform. By creating an account and using our services, you agree to the following terms:
            </p>

            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>You must provide accurate and complete information during registration.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>You are responsible for maintaining the confidentiality of your account.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>The platform is intended for academic and professional assistance only.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Any misuse, fraudulent activity, or violation of policies may result in account suspension.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>We reserve the right to update these terms at any time without prior notice.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Continued use of the platform indicates acceptance of updated terms.</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#F5F7FA] rounded-xl border-l-4 border-[#2D6CDF]">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> December 22, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
