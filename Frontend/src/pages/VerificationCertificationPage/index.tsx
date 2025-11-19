import { CheckCircle, Award, Upload, ExternalLink, BookOpen, FileCheck, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function VerificationCertificationPage() {
  const [activeTab, setActiveTab] = useState<'verification' | 'certification'>('verification');

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-4">
            Build Your Research Credibility
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get verified and certified to unlock premium projects and increase your earning potential
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'verification'
                  ? 'bg-[#2D6CDF] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Verification
            </button>
            <button
              onClick={() => setActiveTab('certification')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'certification'
                  ? 'bg-[#2D6CDF] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Certification
            </button>
          </div>
        </div>

        {activeTab === 'verification' && (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: CheckCircle,
                  title: 'Verified Badge',
                  desc: 'Display a verified badge on your profile'
                },
                {
                  icon: Trophy,
                  title: 'Priority Listing',
                  desc: 'Appear higher in search results'
                },
                {
                  icon: Award,
                  title: 'Client Trust',
                  desc: 'Increase client confidence by 300%'
                }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-bold text-[#1F1F1F] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Apply for Verification</h2>
              <p className="text-gray-600 mb-8">
                Complete all three verification steps to receive your Verified Researcher badge
              </p>

              <div className="space-y-6">
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#2D6CDF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileCheck className="text-[#2D6CDF]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">1. Identity Verification</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Upload a government-issued ID (Passport, Driver's License, or National ID Card)
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-300" size={24} />
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#2D6CDF] transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 font-medium mb-1">Upload ID Document</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#2D6CDF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="text-[#2D6CDF]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">2. Educational Credentials</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Upload your highest degree certificate (Bachelor's, Master's, or PhD)
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-300" size={24} />
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#2D6CDF] transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 font-medium mb-1">Upload Degree Certificate</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#2D6CDF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="text-[#2D6CDF]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">3. Research Publications</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Link to your Google Scholar, ResearchGate, or publication portfolio
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-300" size={24} />
                  </div>
                  <input
                    type="url"
                    placeholder="https://scholar.google.com/citations?user=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] mb-3"
                  />
                  <button className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all">
                    Verify Link
                  </button>
                </div>
              </div>

              <div className="mt-8 bg-[#F5F7FA] rounded-xl p-6">
                <h4 className="font-bold text-[#1F1F1F] mb-3">What happens after submission?</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <span>Our team will review your documents within 2-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <span>You'll receive an email notification about the verification status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <span>Once approved, the Verified badge will appear on your profile immediately</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-[#2D6CDF] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1F1F1F] transition-all mt-6">
                Submit Verification Application
              </button>
            </div>
          </div>
        )}

        {activeTab === 'certification' && (
          <div>
            <div className="bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-2xl p-12 text-white text-center mb-12">
              <Award size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Become a Certified Researcher</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Complete our comprehensive training program and exam to earn the prestigious Certified Researcher badge and access exclusive high-value projects
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xs">
                  <div className="text-3xl font-bold mb-2">$50+</div>
                  <div className="opacity-90">Higher average project value</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xs">
                  <div className="text-3xl font-bold mb-2">3x</div>
                  <div className="opacity-90">More project invitations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xs">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="opacity-90">Client preference rate</div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
                <h3 className="text-2xl font-bold text-[#1F1F1F] mb-6">Certification Program</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Module 1: Research Ethics & Academic Integrity',
                      duration: '2 hours',
                      topics: 'Plagiarism prevention, citation standards, ethical research practices'
                    },
                    {
                      title: 'Module 2: Research Methodology',
                      duration: '3 hours',
                      topics: 'Quantitative and qualitative methods, mixed methods, research design'
                    },
                    {
                      title: 'Module 3: Data Analysis Techniques',
                      duration: '4 hours',
                      topics: 'Statistical analysis, SPSS, R, Python, data visualization'
                    },
                    {
                      title: 'Module 4: Academic Writing & Publication',
                      duration: '2 hours',
                      topics: 'Manuscript preparation, journal selection, peer review process'
                    },
                    {
                      title: 'Module 5: Client Communication & Project Management',
                      duration: '1 hour',
                      topics: 'Professional communication, deadline management, quality assurance'
                    }
                  ].map((module, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#2D6CDF] transition-all">
                      <div className="w-10 h-10 bg-[#2D6CDF] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-[#1F1F1F]">{module.title}</h4>
                          <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{module.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600">{module.topics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
                <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4">Certification Exam</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="font-semibold text-[#1F1F1F] mb-2">Exam Format</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 100 multiple-choice questions</li>
                      <li>• 2 hours duration</li>
                      <li>• Online proctored exam</li>
                      <li>• Pass mark: 70%</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="font-semibold text-[#1F1F1F] mb-2">After Certification</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Certified badge on profile</li>
                      <li>• Access to premium projects</li>
                      <li>• Priority in AI matching</li>
                      <li>• Certificate valid for 2 years</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="text-blue-600" size={20} />
                    <span className="font-bold text-blue-800">Exam Fee: $99</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    One-time fee includes training materials, exam attempt, and 2-year certification. Retake available for $49.
                  </p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg">
                Enroll in Certification Program - $99
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
