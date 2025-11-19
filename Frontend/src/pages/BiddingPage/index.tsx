import { useState } from 'react';
import { Clock, DollarSign, MessageSquare, Star, CheckCircle, Award, Send } from 'lucide-react';

export default function BiddingPage() {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });

  const project = {
    id: 1,
    title: 'Statistical Analysis for Healthcare Outcomes Study',
    client: 'BN',
    postedDate: '2 days ago',
    budget: '$800 - $1,200',
    deadline: '2025-12-20',
    introduction: 'Need comprehensive statistical analysis for a healthcare outcomes research study involving patient data from multiple hospitals.',
    requirements: `Required Analysis:
- Descriptive statistics for all variables
- Regression analysis (multiple linear and logistic)
- Survival analysis using Kaplan-Meier curves
- Subgroup analysis by demographics
- Power analysis and sample size justification

Data:
- Dataset: 500+ patient records
- Variables: 30+ clinical and demographic variables
- Format: Excel/CSV

Deliverables:
- Complete SPSS syntax file
- Results tables (publication-ready)
- Statistical report with interpretation
- Visualizations (graphs, charts)`,
    skills: ['SPSS', 'Statistical Analysis', 'Healthcare Research', 'Regression Analysis'],
    deliverables: 'SPSS syntax, statistical report, tables, visualizations',
    status: 'open',
    bidsCount: 8
  };

  const bids = [
    {
      id: 1,
      freelancer: 'RM',
      rating: 4.9,
      reviews: 127,
      projectsCompleted: 247,
      verified: true,
      certified: true,
      proposedFee: 950,
      timeline: 14,
      coverLetter: 'I have over 8 years of experience in healthcare statistics and have published 15+ papers in peer-reviewed journals. I specialize in SPSS and have worked extensively with clinical trial data and patient outcomes analysis. I can complete this project with high accuracy and provide publication-ready outputs.',
      skills: ['SPSS', 'Statistical Analysis', 'Healthcare Research', 'SAS'],
      submittedDate: '1 day ago'
    },
    {
      id: 2,
      freelancer: 'SK',
      rating: 4.8,
      reviews: 93,
      projectsCompleted: 186,
      verified: true,
      certified: false,
      proposedFee: 850,
      timeline: 18,
      coverLetter: 'As a biostatistician with PhD in Public Health, I have conducted similar analyses for multiple healthcare research projects. My expertise includes survival analysis, logistic regression, and healthcare outcome studies. I will ensure all statistical assumptions are met and provide detailed interpretation.',
      skills: ['SPSS', 'R Programming', 'Biostatistics', 'Survival Analysis'],
      submittedDate: '2 days ago'
    },
    {
      id: 3,
      freelancer: 'TJ',
      rating: 5.0,
      reviews: 64,
      projectsCompleted: 142,
      verified: true,
      certified: true,
      proposedFee: 1100,
      timeline: 10,
      coverLetter: 'I am a certified research statistician with extensive experience in healthcare analytics. I have completed 50+ similar projects with 100% client satisfaction. I offer expedited delivery and free revisions. My analysis includes comprehensive quality checks and publication-standard reporting.',
      skills: ['SPSS', 'Statistical Analysis', 'Data Visualization', 'Academic Writing'],
      submittedDate: '3 hours ago'
    }
  ];

  const handleSubmitProposal = () => {
    console.log('Proposal submitted:', proposalData);
    setShowProposalForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">{project.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>Posted by <span className="font-semibold text-[#2D6CDF]">{project.client}</span></span>
                    <span>•</span>
                    <span>{project.postedDate}</span>
                    <span>•</span>
                    <span className="text-[#2D6CDF] font-semibold">{project.bidsCount} bids</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Budget</div>
                  <div className="text-xl font-bold text-[#2D6CDF]">{project.budget}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Deadline</div>
                  <div className="text-lg font-semibold text-[#1F1F1F]">{project.deadline}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    Open for Bids
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Project Introduction</h3>
                <p className="text-gray-700 leading-relaxed">{project.introduction}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Detailed Requirements</h3>
                <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans bg-[#F5F7FA] p-4 rounded-xl">
                  {project.requirements}
                </pre>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1F1F1F] text-lg mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="bg-[#2D6CDF]/10 text-[#2D6CDF] px-4 py-2 rounded-lg text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowProposalForm(!showProposalForm)}
                className="w-full bg-[#2D6CDF] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1F1F1F] transition-all shadow-lg"
              >
                Submit Your Proposal
              </button>
            </div>

            {showProposalForm && (
              <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Submit Your Proposal</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                        Proposed Fees (USD) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={proposalData.proposedFees}
                          onChange={(e) => setProposalData({ ...proposalData, proposedFees: e.target.value })}
                          placeholder="950"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">You'll receive 90% after platform commission</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                        Delivery Timeline (Days) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={proposalData.timeline}
                        onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                        placeholder="14"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                      Cover Letter <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={proposalData.coverLetter}
                      onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                      placeholder="Explain why you're the best fit for this project. Include:
- Your relevant experience
- Similar projects you've completed
- Your approach to this specific project
- Any questions you have for the client"
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] resize-none"
                    />
                  </div>

                  <div className="bg-[#F5F7FA] rounded-xl p-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Fee:</span>
                        <span className="font-semibold">${proposalData.proposedFees || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Commission (10%):</span>
                        <span className="font-semibold text-red-600">-${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.1).toFixed(2) : '0'}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-bold text-[#1F1F1F]">You'll Receive:</span>
                        <span className="font-bold text-green-600">${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.9).toFixed(2) : '0'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitProposal}
                    className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Submit Proposal
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">
                Proposals ({bids.length})
              </h2>

              <div className="space-y-6">
                {bids.map((bid) => (
                  <div key={bid.id} className="border border-gray-200 rounded-xl p-6 hover:border-[#2D6CDF] transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                          {bid.freelancer}
                        </div>
                        <div>
                          <div className="font-bold text-xl text-[#1F1F1F] mb-1">Researcher {bid.freelancer}</div>
                          <div className="flex items-center gap-3 text-sm mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-400 fill-yellow-400" size={16} />
                              <span className="font-bold">{bid.rating}</span>
                              <span className="text-gray-500">({bid.reviews} reviews)</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{bid.projectsCompleted} projects</span>
                          </div>
                          <div className="flex gap-2">
                            {bid.verified && (
                              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                                <CheckCircle size={12} />
                                Verified
                              </span>
                            )}
                            {bid.certified && (
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                <Award size={12} />
                                Certified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#2D6CDF]">${bid.proposedFee}</div>
                        <div className="text-sm text-gray-500">in {bid.timeline} days</div>
                        <div className="text-xs text-gray-400 mt-1">{bid.submittedDate}</div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">{bid.coverLetter}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {bid.skills.map((skill, idx) => (
                        <span key={idx} className="bg-[#F5F7FA] text-[#1F1F1F] px-3 py-1 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#2D6CDF] text-white py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2">
                        <MessageSquare size={18} />
                        Message
                      </button>
                      <button className="flex-1 border-2 border-[#2D6CDF] text-[#2D6CDF] py-2.5 rounded-xl font-semibold hover:bg-[#2D6CDF] hover:text-white transition-all">
                        Accept Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-[#1F1F1F] text-lg mb-4">About the Client</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white font-bold">
                  {project.client}
                </div>
                <div>
                  <div className="font-semibold text-[#1F1F1F]">Client {project.client}</div>
                  <div className="text-sm text-gray-500">Member since 2024</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects Posted</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">$12,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="font-semibold text-[#1F1F1F] mb-2">Payment Method</div>
                <div className="text-sm text-gray-700">Secure Escrow Payment</div>
                <div className="text-xs text-gray-500 mt-2">Funds held safely until project completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
