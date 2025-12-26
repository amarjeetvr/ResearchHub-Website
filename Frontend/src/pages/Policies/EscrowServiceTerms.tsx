import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, CheckCircle } from 'lucide-react';

export default function EscrowServiceTerms() {
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#2D6CDF] rounded-full flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-[#1F1F1F]">Escrow Service Terms</h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              Last Updated: December 26, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">1. Escrow Service Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ResearchHub's Escrow Service provides a secure payment mechanism that protects both clients and freelancers. 
                When you use our escrow service, funds are held securely by ResearchHub until project deliverables are 
                approved by the client.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
                <div className="flex items-start gap-3">
                  <Lock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-blue-900 text-sm">
                    All payments are processed through secure payment gateways and held in a dedicated escrow account 
                    until project completion is verified.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">2. How Escrow Works</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-[#2D6CDF] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] mb-2">Payment Deposit</h3>
                    <p className="text-gray-700">
                      Client deposits the agreed project amount plus 10% platform commission into escrow. 
                      This payment is processed immediately but held securely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-[#2D6CDF] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] mb-2">Work Commencement</h3>
                    <p className="text-gray-700">
                      Once funds are in escrow, the freelancer is notified to begin work. The freelancer 
                      has assurance that payment is secured.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-[#2D6CDF] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] mb-2">Delivery & Review</h3>
                    <p className="text-gray-700">
                      Freelancer submits completed work for client review. Client has the right to request 
                      revisions or approve the deliverables.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-[#2D6CDF] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] mb-2">Payment Release</h3>
                    <p className="text-gray-700">
                      Upon client approval, funds are released to the freelancer's account (minus 10% platform fee). 
                      Payment is typically processed within 2-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">3. Platform Commission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ResearchHub charges a 10% platform commission on all transactions. This fee covers:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Secure escrow account management and payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Platform maintenance, security, and customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Dispute resolution services and fraud protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Transaction monitoring and compliance</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">4. Client Responsibilities</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Ensure sufficient funds are available before initiating payment
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Review deliverables within 7 days of submission
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Provide clear feedback if revisions are required
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Release payment promptly once satisfied with deliverables
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Communicate any issues through the platform's messaging system
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">5. Freelancer Responsibilities</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Deliver work according to agreed specifications and timeline
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Maintain professional communication with the client
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Address revision requests within reasonable timeframes
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Ensure all work is original and does not violate academic integrity
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Provide valid banking information for payment release
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">6. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In case of disputes between clients and freelancers:
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                  <li>Both parties should attempt to resolve issues through direct communication</li>
                  <li>If unresolved, either party may escalate to ResearchHub support</li>
                  <li>ResearchHub will review project details, communications, and deliverables</li>
                  <li>A decision will be made within 5-10 business days</li>
                  <li>Escrow funds will be released based on the resolution outcome</li>
                </ol>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">7. Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Clients may be eligible for a full or partial refund in the following circumstances:
              </p>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Freelancer fails to deliver work within agreed timeline without valid reason
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Deliverables do not meet the agreed specifications
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Work is found to be plagiarized or violates academic integrity
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Freelancer becomes unresponsive after payment is deposited
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                The platform commission is non-refundable except in cases of platform error or fraud.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">8. Security & Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All escrow transactions are protected by:
              </p>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  256-bit SSL encryption for all payment data
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  PCI DSS compliant payment processing
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Secure, segregated escrow accounts
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Regular security audits and monitoring
                </p>
                <p className="flex gap-3">
                  <span className="text-[#2D6CDF] font-bold">•</span>
                  Anonymized user identities to protect privacy
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">9. Payment Timeline</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Escrow Deposit:</strong> Processed immediately upon payment confirmation</li>
                  <li><strong>Client Review Period:</strong> Up to 7 days from delivery submission</li>
                  <li><strong>Payment Release:</strong> 2-5 business days after client approval</li>
                  <li><strong>Dispute Resolution:</strong> 5-10 business days for investigation and decision</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">10. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using the ResearchHub Escrow Service, you acknowledge that you have read, understood, and 
                agree to be bound by these Escrow Service Terms. If you do not agree to these terms, you should 
                not use the escrow service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ResearchHub reserves the right to modify these terms at any time. Users will be notified of 
                significant changes, and continued use of the service constitutes acceptance of modified terms.
              </p>
            </section>

            <div className="bg-[#2D6CDF]/10 border border-[#2D6CDF] rounded-xl p-6 mt-8">
              <h3 className="font-bold text-[#1F1F1F] mb-3">Questions or Concerns?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our Escrow Service Terms, please contact our support team:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> escrow@researchhub.com</p>
                <p><strong>Support:</strong> Available 24/7 through the platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
