import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Save, CreditCard, Building, Hash, Code, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, getBankAccount, updateBankAccount } from '../../services/api';
import toast from 'react-hot-toast';

interface ProfileViewPopupProps {
  onClose: () => void;
}

export default function ProfileViewPopup({ onClose }: ProfileViewPopupProps) {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [loading, setLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [bankData, setBankData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    upiId: '',
  });

  const [hasBankAccount, setHasBankAccount] = useState(false);

  useEffect(() => {
    if (user?.role === 'freelancer' && activeTab === 'account') {
      fetchBankAccount();
    }
  }, [activeTab]);

  const fetchBankAccount = async () => {
    setBankLoading(true);
    try {
      const response = await getBankAccount();
      if (response.success && response.bankAccount) {
        const account = response.bankAccount;
        setBankData({
          accountHolderName: account.accountHolderName || '',
          bankName: account.bankName || '',
          accountNumber: account.accountNumber || '',
          ifscCode: account.ifscCode || '',
          accountType: account.accountType || '',
          upiId: account.upiId || '',
        });
        setHasBankAccount(!!(account.accountNumber || account.upiId));
      }
    } catch (error: any) {
      console.error('Failed to fetch bank account:', error);
    } finally {
      setBankLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', profileData.fullname);
      formData.append('email', profileData.email);
      formData.append('phoneNumber', profileData.phoneNumber);

      const response = await updateProfile(formData);
      if (response.success) {
        toast.success('Profile updated successfully!');
        await refreshUser();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBankAccountUpdate = async () => {
    // Check if at least some payment information is provided
    if (!bankData.accountHolderName && !bankData.bankName && !bankData.accountNumber && !bankData.upiId) {
      toast.error('Please provide at least some payment details');
      return;
    }

    setBankLoading(true);
    try {
      const response = await updateBankAccount(bankData);
      if (response.success) {
        toast.success('Payment details updated successfully!');
        setHasBankAccount(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment details');
    } finally {
      setBankLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-[#2D6CDF]">
                    {user?.fullname.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.fullname}</h2>
                <p className="text-blue-100 capitalize">{user?.role}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Tabs - Only show for Researchers */}
        {user?.role === 'freelancer' && (
          <div className="border-b border-gray-200 px-8">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 font-semibold transition-all relative ${
                  activeTab === 'profile'
                    ? 'text-[#2D6CDF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="inline-block mr-2" size={18} />
                Profile Details
                {activeTab === 'profile' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6CDF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-6 py-3 font-semibold transition-all relative ${
                  activeTab === 'account'
                    ? 'text-[#2D6CDF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="inline-block mr-2" size={18} />
                Account Details
                {activeTab === 'account' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6CDF]"></div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <User className="inline-block mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullname}
                  onChange={(e) => setProfileData({ ...profileData, fullname: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Mail className="inline-block mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Phone className="inline-block mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {!hasBankAccount && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Payment Information</strong>
                    <br />
                    Add your preferred payment details to receive payments from clients worldwide.
                    All fields are optional - provide the information that works best for you.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-600 italic">
                  <strong>Note:</strong> All fields are optional. Provide the payment method that works for your country.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <User className="inline-block mr-2" size={16} />
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankData.accountHolderName}
                  onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="John Doe"
                />
                <p className="text-xs text-gray-500 mt-1">Your full name as registered with your bank</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Building className="inline-block mr-2" size={16} />
                  Bank Name / Payment Service
                </label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="e.g., State Bank, PayPal, Payoneer, Wise"
                />
                <p className="text-xs text-gray-500 mt-1">Bank name or payment service provider</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Hash className="inline-block mr-2" size={16} />
                    Account Number / IBAN
                  </label>
                  <input
                    type="text"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="1234567890 or IBAN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Code className="inline-block mr-2" size={16} />
                    IFSC / SWIFT / Routing Code
                  </label>
                  <input
                    type="text"
                    value={bankData.ifscCode}
                    onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="SBIN0001234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Account Type
                </label>
                <select
                  value={bankData.accountType}
                  onChange={(e) => setBankData({ ...bankData, accountType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                >
                  <option value="">Select Account Type (Optional)</option>
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700 font-semibold mb-3">Alternative Payment Methods</p>
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Wallet className="inline-block mr-2" size={16} />
                    UPI ID / PayPal Email / Other
                  </label>
                  <input
                    type="text"
                    value={bankData.upiId}
                    onChange={(e) => setBankData({ ...bankData, upiId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="yourname@paytm, email@paypal.com, or other ID"
                  />
                  <p className="text-xs text-gray-500 mt-1">UPI ID, PayPal email, Payoneer, Wise, or any payment ID</p>
                </div>
              </div>

              <button
                onClick={handleBankAccountUpdate}
                disabled={bankLoading}
                className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bankLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    {hasBankAccount ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {hasBankAccount ? 'Update Payment Details' : 'Save Payment Details'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
