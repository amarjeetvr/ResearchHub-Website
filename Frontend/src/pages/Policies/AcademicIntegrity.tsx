import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AcademicIntegrity() {
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
          <h1 className="text-4xl font-bold text-[#1F1F1F] mb-6">Academic Integrity Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              Our platform strictly follows academic integrity principles:
            </p>

            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Services are provided for guidance, mentoring, and reference purposes only.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Users must not submit provided material as their own without proper citation.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Plagiarism, academic dishonesty, or policy violations are strictly prohibited.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Responsibility for academic submissions lies solely with the user.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>Violations may result in permanent account termination.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-[#2D6CDF] font-bold text-xl">•</span>
                <p>We promote ethical learning and responsible academic conduct.</p>
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
