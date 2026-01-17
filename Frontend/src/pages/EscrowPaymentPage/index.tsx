import { Shield, Lock, CreditCard, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { processEscrowPayment } from '../../services/projectApi';
import toast from 'react-hot-toast';

export default function EscrowPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');
  const [agreed, setAgreed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Get project and bid details from navigation state
  const { projectId, bidId, projectDetails } = location.state || {};

  const project = projectDetails || {
    title: 'Statistical Analysis for Healthcare Outcomes Study',
    freelancer: 'RM',
    agreedAmount: 950,
    timeline: '14 days',
    startDate: '2025-11-15',
    expectedCompletion: '2025-11-29'
  };

  const platformCommission = project.agreedAmount * 0.1;
  const totalAmount = project.agreedAmount + platformCommission;

  // Function to mask freelancer name
  const maskName = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => {
        if (word.length === 0) return '';
        return word[0].toLowerCase() + '*'.repeat(word.length - 1);
      })
      .join(' ');
  };

  const handlePayment = async () => {
    if (!projectId || !bidId) {
      toast.error('Missing project or bid information');
      return;
    }

    setProcessing(true);
    
    try {
      // Call backend API to process payment
      await processEscrowPayment({ projectId, bidId });
      
      // Show success
      setPaymentSuccess(true);
      toast.success('Payment processed successfully!');
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast.error(error.message || 'Failed to process payment');
      setProcessing(false);
    }
  };

  // Show success screen after payment
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <div className="w-24 h-24 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-400" size={60} />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Your payment of <span className="font-bold text-cyan-400">${totalAmount.toFixed(2)}</span> has been securely deposited into escrow.
          </p>
          
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div className="text-left">
                <h3 className="font-bold text-blue-300 mb-2">What Happens Next?</h3>
                <ul className="text-sm text-blue-200 space-y-2">
                  <li>✓ The freelancer has been notified to begin work</li>
                  <li>✓ You can track progress in your dashboard</li>
                  <li>✓ Funds will be released after you approve the completed work</li>
                  <li>✓ Full refund protection if deliverables are not met</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/client-dashboard')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/messaging')}
              className="w-full bg-white/10 border-2 border-cyan-400 text-cyan-400 px-6 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-white transition-all"
            >
              Message Freelancer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Secure Escrow Payment</h1>
          <p className="text-xl text-gray-300">Your payment is held safely until project completion</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">How Escrow Works</h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Deposit Funds',
                    desc: 'You deposit the agreed project amount plus platform commission into secure escrow'
                  },
                  {
                    step: '2',
                    title: 'Work Begins',
                    desc: 'The freelancer starts working on your project knowing payment is secured'
                  },
                  {
                    step: '3',
                    title: 'Review Deliverables',
                    desc: 'Freelancer submits completed work for your review and approval'
                  },
                  {
                    step: '4',
                    title: 'Release Payment',
                    desc: 'Upon approval, funds are released to freelancer (minus 10% platform fee)'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-gray-300">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Select Payment Method</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-white mb-1">Stripe</div>
                  <div className="text-sm text-gray-300">International Payments</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-white mb-1">Razorpay</div>
                  <div className="text-sm text-gray-300">India Payments</div>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-cyan-400 border-white/20 rounded focus:ring-cyan-400 bg-white/10"
                  />
                  <span className="ml-3 text-sm text-gray-300">
                    I agree to the <Link to="/escrow-service-terms" className="text-cyan-400 font-semibold hover:underline">Escrow Service Terms</Link> and understand that funds will be held securely until I approve the completed work.
                  </span>
                </label>
              </div>

              <button
                disabled={!agreed || processing}
                onClick={handlePayment}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  agreed && !processing
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg'
                    : 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/30'
                }`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Pay Now - ${totalAmount.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-white text-lg mb-4">Project Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Project</div>
                  <div className="font-semibold text-white">{project.title}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Freelancer</div>
                  <div className="font-semibold text-white">Researcher {maskName(project.freelancer)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Timeline</div>
                  <div className="font-semibold text-white">{project.timeline}</div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Agreed Amount</span>
                    <span className="font-semibold text-white">${project.agreedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Platform Commission (10%)</span>
                    <span className="font-semibold text-cyan-400">+${platformCommission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/20">
                    <span className="font-bold text-white">Total to Pay</span>
                    <span className="text-2xl font-bold text-cyan-400">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-green-400" size={20} />
                  <span className="font-bold text-green-300">100% Secure</span>
                </div>
                <ul className="text-sm text-green-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Funds held in escrow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Released only on approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Full refund protection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-blue-400" size={20} />
                  <span className="font-bold text-blue-300">What happens next?</span>
                </div>
                <p className="text-sm text-blue-200">
                  After payment, the freelancer will be notified to begin work. You can track progress and communicate through secure messaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
