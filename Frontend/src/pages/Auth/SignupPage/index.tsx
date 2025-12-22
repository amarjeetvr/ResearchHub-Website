import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, GraduationCap, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { googleSignup } from '../../../services/api';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4"/>
    <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
    <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
    <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
  </svg>
);

interface SignupPageProps {
  onSignup: (data: any) => void;
  onSwitchToLogin: () => void;
}

export default function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'client' as 'client' | 'freelancer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullname: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role
      };

      await onSignup(userData);
      toast.success('Account created successfully! Redirecting...');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const clientId = '179509708444-hnlbsa5qpugc4kq3p4qb3u1kiu92qqgg.apps.googleusercontent.com';
    
    // @ts-ignore - Google OAuth library
    if (window.google) {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback
      });
      // @ts-ignore
      window.google.accounts.id.prompt();
    } else {
      toast.error('Google Sign-In is not available. Please try again later.');
    }
  };

  const handleGoogleCallback = async (response: any) => {
    setLoading(true);

    try {
      const result = await googleSignup(response.credential, formData.role);
      
      if (result.success) {
        toast.success('Google signup successful! Redirecting...');
        setTimeout(() => {
          onSignup({ 
            fullname: result.user.fullname,
            email: result.user.email,
            role: result.user.role // Pass backend role (client/freelancer)
          });
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.message || 'Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2D6CDF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join ResearchHub and connect with verified researchers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#1F1F1F] mb-3">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'client' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.role === 'client'
                    ? 'border-[#2D6CDF] bg-[#2D6CDF]/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Briefcase className="mx-auto mb-2 text-[#2D6CDF]" size={32} />
                <div className="font-bold text-[#1F1F1F] mb-1">Post Projects</div>
                <div className="text-sm text-gray-600">I need research help</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'freelancer' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.role === 'freelancer'
                    ? 'border-[#2D6CDF] bg-[#2D6CDF]/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <GraduationCap className="mx-auto mb-2 text-[#2D6CDF]" size={32} />
                <div className="font-bold text-[#1F1F1F] mb-1">Offer Services</div>
                <div className="text-sm text-gray-600">I'm a researcher</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="1234567890"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="bg-[#F5F7FA] rounded-xl p-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#2D6CDF] border-gray-300 rounded focus:ring-[#2D6CDF]"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <Link 
                    to="/terms-and-conditions" 
                    className="text-[#2D6CDF] font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </Link>
                  ,{' '}
                  <Link 
                    to="/privacy-policy" 
                    className="text-[#2D6CDF] font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                  , and{' '}
                  <Link 
                    to="/academic-integrity-policy" 
                    className="text-[#2D6CDF] font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Academic Integrity Policy
                  </Link>
                  . I understand that my identity will be anonymized on the platform.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              {loading ? 'Signing up...' : 'Sign up with Google'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-[#2D6CDF] font-bold hover:text-[#1F1F1F] transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
