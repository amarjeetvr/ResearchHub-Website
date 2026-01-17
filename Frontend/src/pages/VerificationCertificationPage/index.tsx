import { CheckCircle, Award, Upload, ExternalLink, BookOpen, FileCheck, Trophy } from 'lucide-react';
import { useState } from 'react';
import Footer from '../../components/layout/Footer';

export default function VerificationCertificationPage() {
  const [activeTab, setActiveTab] = useState<'verification' | 'certification'>('verification');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build Your Research Credibility
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get verified and certified to unlock premium projects and increase your earning potential
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'verification'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              Verification
            </button>
            <button
              onClick={() => setActiveTab('certification')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'certification'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:bg-white/10'
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
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-green-400" size={32} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Apply for Verification</h2>
              <p className="text-gray-300 mb-8">
                Complete all three verification steps to receive your Verified Researcher badge
              </p>

              <div className="space-y-6">
                <div className="border-2 border-white/20 rounded-xl p-6 hover:border-cyan-400 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileCheck className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">1. Identity Verification</h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Upload a government-issued ID (Passport, Driver's License, or National ID Card)
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-400" size={24} />
                  </div>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-300 font-medium mb-1">Upload ID Document</p>
                    <p className="text-sm text-gray-400">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="border-2 border-white/20 rounded-xl p-6 hover:border-cyan-400 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">2. Educational Credentials</h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Upload your highest degree certificate (Bachelor's, Master's, or PhD)
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-400" size={24} />
                  </div>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-300 font-medium mb-1">Upload Degree Certificate</p>
                    <p className="text-sm text-gray-400">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>

                <div className="border-2 border-white/20 rounded-xl p-6 hover:border-cyan-400 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">3. Research Publications</h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Link to your Google Scholar, ResearchGate, or publication portfolio
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-gray-400" size={24} />
                  </div>
                  <input
                    type="url"
                    placeholder="https://scholar.google.com/citations?user=..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-3 text-white placeholder-gray-400"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all">
                    Verify Link
                  </button>
                </div>
              </div>

              <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="font-bold text-white mb-3">What happens after submission?</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                    <span>Our team will review your documents within 2-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                    <span>You'll receive an email notification about the verification status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                    <span>Once approved, the Verified badge will appear on your profile immediately</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-4 rounded-xl font-bold text-lg transition-all mt-6">
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
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">Certification Program</h3>
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
                    <div key={idx} className="flex items-start gap-4 p-4 border border-white/20 rounded-xl hover:border-cyan-400 transition-all">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white">{module.title}</h4>
                          <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{module.duration}</span>
                        </div>
                        <p className="text-sm text-gray-300">{module.topics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Certification Exam</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-white/20 rounded-xl p-4">
                    <div className="font-semibold text-white mb-2">Exam Format</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 100 multiple-choice questions</li>
                      <li>• 2 hours duration</li>
                      <li>• Online proctored exam</li>
                      <li>• Pass mark: 70%</li>
                    </ul>
                  </div>
                  <div className="border border-white/20 rounded-xl p-4">
                    <div className="font-semibold text-white mb-2">After Certification</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Certified badge on profile</li>
                      <li>• Access to premium projects</li>
                      <li>• Priority in AI matching</li>
                      <li>• Certificate valid for 2 years</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="text-blue-400" size={20} />
                    <span className="font-bold text-blue-300">Exam Fee: $99</span>
                  </div>
                  <p className="text-sm text-blue-200">
                    One-time fee includes training materials, exam attempt, and 2-year certification. Retake available for $49.
                  </p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg">
                Enroll in Certification Program - $99
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
