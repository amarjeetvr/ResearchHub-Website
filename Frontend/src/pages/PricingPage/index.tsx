import { Check, Sparkles, Zap, Building2, GraduationCap, Rocket, HelpCircle, ChevronDown, ArrowRight, Shield, Clock, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import Footer from '../../components/layout/Footer';

interface PricingPageProps {
  onNavigate: (page: 'home' | 'about' | 'blog' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard') => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      icon: GraduationCap,
      tagline: 'Perfect for Students & Academic Beginners',
      price: '$299',
      period: 'per project',
      description: 'Ideal for undergraduate students, master\'s candidates, and individual researchers working on thesis projects, literature reviews, or small-scale research assignments.',
      popular: false,
      features: [
        'Access to verified researchers in 200+ domains',
        'AI-powered expert matching in under 2 minutes',
        'Up to 2 rounds of revisions included',
        'Basic literature review (up to 20 sources)',
        'Data analysis for small datasets (up to 500 entries)',
        'Research report delivery in Word/PDF format',
        'Standard turnaround time: 5-7 business days',
        'Email support with 24-hour response time',
        'Secure milestone-based payment protection',
        'Confidential anonymous collaboration option'
      ],
      cta: 'Start Your Research',
      color: 'blue'
    },
    {
      name: 'Professional',
      icon: Rocket,
      tagline: 'For Scholars, Institutes & Startups',
      price: '$899',
      period: 'per project',
      description: 'Designed for PhD scholars, post-doctoral researchers, research institutes, and innovative startups requiring advanced research methodologies and expert-level analysis.',
      popular: true,
      features: [
        'Priority access to top-tier certified researchers',
        'AI-enhanced project matching with domain specialists',
        'Unlimited revisions within project scope',
        'Comprehensive literature review (50+ sources)',
        'Advanced quantitative & qualitative analysis',
        'Statistical modeling and data visualization',
        'Machine learning model prototyping (basic)',
        'Publication-ready research reports (APA/IEEE/Harvard)',
        'Expedited turnaround: 3-5 business days',
        'Priority support with 12-hour response time',
        'Dedicated project manager assigned',
        'Video consultation sessions (up to 2 hours)',
        'Citation management and bibliography formatting',
        'Secure file sharing with encrypted collaboration'
      ],
      cta: 'Get Started Now',
      color: 'purple'
    },
    {
      name: 'Enterprise R&D',
      icon: Building2,
      tagline: 'For Universities, Labs & Corporations',
      price: 'Custom',
      period: 'tailored pricing',
      description: 'Built for universities, corporate R&D teams, pharmaceutical companies, and deep-tech organizations requiring large-scale, mission-critical research with compliance and IP protection.',
      popular: false,
      features: [
        'Dedicated team of expert researchers (5-20 specialists)',
        'Custom AI research workflows and automation',
        'Unlimited revisions and iterative collaboration',
        'Extensive systematic reviews (100+ sources)',
        'Advanced machine learning & AI model development',
        'Clinical trial design and biostatistical analysis',
        'Bioinformatics, genomics, and computational biology',
        'Drug discovery and molecular modeling support',
        'White-glove project management and reporting',
        'Same-day response with 24/7 dedicated support',
        'On-demand video consultations (unlimited)',
        'Multi-project dashboard and analytics',
        'Enterprise-grade security and NDA protection',
        'Custom API integration with internal systems',
        'Annual retainer options with discounted rates',
        'Compliance with HIPAA, GDPR, and ISO standards'
      ],
      cta: 'Request Custom Quote',
      color: 'orange'
    }
  ];

  const faqs = [
    {
      question: 'How does the ResearchHub commission work?',
      answer: 'ResearchHub operates on a transparent commission model. We retain only 10% of the project fee to maintain the platform, provide AI-powered matching, secure payments, dispute resolution, and ongoing support. This means 90% of your payment goes directly to the verified researcher working on your project. Unlike traditional agencies that charge 30-50% commissions, we believe in fair compensation for research professionals while keeping costs low for clients.'
    },
    {
      question: 'Are revisions included in the pricing?',
      answer: 'Yes, all plans include revisions to ensure complete satisfaction. The Starter Plan includes up to 2 rounds of revisions for minor adjustments and clarifications. The Professional Plan offers unlimited revisions within the agreed project scope, ensuring your research meets your exact requirements. The Enterprise R&D Plan provides unlimited iterative collaboration throughout the project lifecycle. Revisions must be requested within 14 days of final delivery and should align with the original project brief.'
    },
    {
      question: 'Is pricing fixed or dynamic? How are custom projects priced?',
      answer: 'Standard projects (literature reviews, data analysis, academic writing) follow our transparent fixed pricing structure shown above. However, complex or specialized research—such as advanced machine learning models, clinical trials, drug discovery, bioinformatics pipelines, or multi-phase R&D projects—require custom quotes. Our AI system analyzes project complexity, required expertise level, estimated time commitment, specialized tools needed, and deliverable expectations to generate fair, competitive pricing. You\'ll receive a detailed cost breakdown before any work begins, with no hidden fees.'
    },
    {
      question: 'Do I get a refund if my project is not completed?',
      answer: 'Your satisfaction and financial security are guaranteed through our milestone-based escrow system. Payment is held securely and only released as milestones are completed and approved by you. If a researcher fails to deliver according to the agreed timeline or quality standards, you can dispute the milestone and receive a full refund for incomplete work. For projects terminated before completion, you only pay for milestones that have been satisfactorily delivered. We also offer a 7-day money-back guarantee if you\'re not satisfied with the initial project scoping and researcher match.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'ResearchHub accepts all major payment methods for global accessibility: credit cards (Visa, Mastercard, American Express), debit cards, PayPal, bank transfers (ACH/SEPA), and wire transfers for enterprise clients. For international transactions, we support multi-currency payments in USD, EUR, GBP, CAD, AUD, and 40+ other currencies. All payments are processed through enterprise-grade encrypted gateways with PCI DSS compliance. Enterprise clients can also arrange invoicing with Net-30 or Net-60 payment terms.'
    },
    {
      question: 'Can I hire the same researcher for multiple projects?',
      answer: 'Absolutely! Once you find a researcher whose work style and expertise match your needs, you can request to work with them again for future projects. Many of our clients build long-term relationships with specific researchers, leading to better collaboration, faster turnaround times, and deeper understanding of your research goals. Professional and Enterprise clients can also create "preferred researcher" lists and receive priority access to their availability. We encourage these partnerships as they lead to higher quality outcomes and more efficient research workflows.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: 'bg-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        border: 'border-blue-200 hover:border-blue-400',
        popular: 'bg-blue-600'
      },
      purple: {
        badge: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: 'bg-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        border: 'border-purple-300 hover:border-purple-500',
        popular: 'bg-purple-600'
      },
      orange: {
        badge: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: 'bg-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700 text-white',
        border: 'border-orange-200 hover:border-orange-400',
        popular: 'bg-orange-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] min-h-screen">
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-cyan-300 text-sm font-semibold mb-6 border border-cyan-400/30">
            <Sparkles size={16} />
            <span>Transparent, Fair & Affordable</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pricing Built for Researchers
          </h1>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            AI-powered matching reduces costs by 40% while delivering expert-quality research faster than traditional consulting firms
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-3 mx-auto shadow-lg shadow-green-500/50">
                <TrendingDown className="text-white" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">40% Lower Costs</h3>
              <p className="text-gray-300 text-sm">AI matching eliminates overhead, passing savings to you</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-3 mx-auto shadow-lg shadow-cyan-500/50">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">3x Faster Delivery</h3>
              <p className="text-gray-300 text-sm">Instant expert matching accelerates project timelines</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-3 mx-auto shadow-lg shadow-purple-500/50">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">100% Protected</h3>
              <p className="text-gray-300 text-sm">Escrow payments and milestone-based approval system</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Flexible Pricing for Every Research Need</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            ResearchHub offers transparent, competitive pricing designed to make world-class research expertise accessible to everyone—from students conducting thesis work to Fortune 500 companies driving R&D innovation. Our AI-powered platform eliminates traditional agency markups and administrative overhead, allowing us to connect you with verified researchers at fair market rates. Standard projects follow our clear pricing tiers below, while complex, multi-phase, or specialized deep-tech research (such as clinical trials, advanced machine learning systems, drug discovery, and large-scale bioinformatics) may require custom quotes tailored to your unique requirements. Every project includes milestone-based payments, secure escrow protection, and our commitment to quality—because breakthrough research should be accessible, not exclusive.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const colors = getColorClasses(plan.color);

            return (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105 overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-2 text-sm font-bold shadow-lg">
                     MOST POPULAR
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                  <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={32} />
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 font-medium mb-4">{plan.tagline}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                      {plan.period !== 'tailored pricing' && (
                        <span className="text-slate-500">/ {plan.period.replace('per ', '')}</span>
                      )}
                    </div>
                    {plan.period === 'tailored pricing' && (
                      <p className="text-slate-500 text-sm mt-1">Based on project scope and complexity</p>
                    )}
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {plan.description}
                  </p>

                  <button
                    onClick={() => onNavigate('signup')}
                    className={`w-full ${colors.button} px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 mb-6`}
                  >
                    {plan.cta}
                    <ArrowRight size={20} />
                  </button>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">What's Included:</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="text-green-600" size={20} />
                        </div>
                        <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="text-blue-600" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Need a Custom Research Quote?</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  For specialized, high-complexity, or mission-critical research projects
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
              <p className="text-white leading-relaxed mb-6 text-lg">
                Complex research initiatives require tailored pricing to ensure you receive the exact expertise, tools, and support needed for success. If your project involves any of the following domains, our team will work with you to create a custom proposal:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Advanced Machine Learning & AI</p>
                    <p className="text-blue-200 text-sm">Custom neural networks, deep learning models, NLP systems, computer vision applications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Clinical Research & Trials</p>
                    <p className="text-blue-200 text-sm">Trial design, biostatistics, patient recruitment, regulatory compliance, data monitoring</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Drug Discovery & Development</p>
                    <p className="text-blue-200 text-sm">Molecular modeling, compound screening, pharmacology, toxicology assessments</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Bioinformatics & Genomics</p>
                    <p className="text-blue-200 text-sm">Genome sequencing, variant analysis, proteomics, metabolomics, CRISPR studies</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Multi-Phase R&D Programs</p>
                    <p className="text-blue-200 text-sm">Long-term research initiatives spanning 6-24 months with multiple deliverables</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Proprietary Research Tools</p>
                    <p className="text-blue-200 text-sm">Custom software development, specialized equipment, licensed databases</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Large-Scale Data Projects</p>
                    <p className="text-blue-200 text-sm">Big data analytics, IoT sensor analysis, satellite imagery processing</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Regulatory & Compliance Research</p>
                    <p className="text-blue-200 text-sm">FDA/EMA submissions, GLP/GMP studies, environmental impact assessments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <h3 className="text-white font-bold text-xl mb-4">What's Included in Your Custom Quote:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>Detailed project scope and timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>Dedicated research team assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>Cost breakdown by phase/milestone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>Risk assessment and mitigation plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>Quality assurance protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={18} />
                  <span>IP protection and NDA agreements</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Request Custom Quote
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <HelpCircle size={16} />
              <span>Common Questions</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pricing FAQs</h2>
            <p className="text-lg text-slate-600">Everything you need to know about ResearchHub pricing and payments</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden hover:border-blue-300 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`flex-shrink-0 text-slate-600 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your Research Project?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Join thousands of researchers, students, and organizations accelerating innovation with ResearchHub. Get matched with verified experts in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => onNavigate('bidding')}
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center gap-2"
                >
                  Browse Researchers
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold text-white mb-2">90%</p>
                  <p className="text-blue-200">Goes to researchers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">200+</p>
                  <p className="text-blue-200">Research domains</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">24/7</p>
                  <p className="text-blue-200">Support available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
