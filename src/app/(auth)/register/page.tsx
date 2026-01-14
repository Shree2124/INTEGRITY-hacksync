'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import Link from 'next/link';

const RegisterView = () => {
  const router = useRouter();
  const { signUp, signInWithGoogle, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (localError) setLocalError(null);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
    if (!formData.agreed) {
      setLocalError("You must agree to the Citizen Pledge.");
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      // Redirect to verify email page
      router.push('/verify-email');
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    clearError();
    setLocalError(null);

    try {
      await signInWithGoogle();
      // Google accounts are pre-verified, go straight to dashboard
      router.push('/mapview');
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  // Visual Password Strength Logic
  const strength = Math.min(
    (formData.password.length > 5 ? 1 : 0) +
    (formData.password.length > 8 ? 1 : 0) +
    (/[A-Z]/.test(formData.password) ? 1 : 0) +
    (/[0-9]/.test(formData.password) ? 1 : 0),
    4
  );

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">

      {/* LEFT SIDE: Visual Brand Story (Orange/Saffron Theme for "New Beginnings") */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white overflow-hidden">

        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           <motion.div
             animate={{ x: [0, 100], opacity: [0, 0.5, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/30 blur-[100px] rounded-full"
           />
        </div>

        {/* Content */}
        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-md">
                 <Building2 className="text-orange-400" />
              </div>
              <span className="font-serif font-bold text-xl tracking-wide">Project INTEGRITY</span>
           </div>
        </div>

        <div className="relative z-10 max-w-lg">
           <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
             Become a <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Guardian of Truth.</span>
           </h1>
           <p className="text-slate-400 text-lg leading-relaxed mb-8">
             Create your immutable citizen identity. Contribute to the national infrastructure audit ledger and help build a corruption-free India.
           </p>

           {/* Step Indicators */}
           <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                 <CheckCircle2 size={18} className="text-green-500" />
                 <span>Secure Email Verification</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                 <CheckCircle2 size={18} className="text-green-500" />
                 <span>Role-Based Access Control</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                 <CheckCircle2 size={18} className="text-green-500" />
                 <span>Zero-Knowledge Proof Identity</span>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
             <h2 className="text-2xl font-bold text-slate-900">Project INTEGRITY</h2>
             <p className="text-slate-500 text-sm">Citizen Registration</p>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="mt-2 text-slate-500">Enter your details to generate your Citizen ID.</p>
          </div>

          {displayError && (
            <ErrorAlert error={displayError} onDismiss={() => { setLocalError(null); clearError(); }} />
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ravi Kumar"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="citizen@integrity.gov.in"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Create a strong password"
                />
              </div>
              {/* Strength Meter */}
              {formData.password && (
                <div className="flex gap-1 mt-2 h-1 px-1">
                   {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-full flex-1 rounded-full transition-colors duration-300 ${i <= strength ? (strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-200'}`} />
                   ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreed"
                  name="agreed"
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer disabled:opacity-50"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreed" className="font-medium text-slate-700">Citizen Pledge</label>
                <p className="text-slate-500">I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 underline">Terms of Service</a> and confirm that all reports filed will be accurate to the best of my knowledge.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Generating ID...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">Or sign up with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-semibold text-slate-600">Sign up with Google</span>
          </button>

          {/* Login Link */}
          <div className="text-center pt-2">
             <p className="text-sm text-slate-500">
               Already have a Citizen ID?{' '}
               <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">
                 Sign in here
               </Link>
             </p>
          </div>

          {/* Footer Security Note */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
             <ShieldCheck size={14} className="text-orange-500" />
             <span>Data stored on Government Private Blockchain</span>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default RegisterView;
