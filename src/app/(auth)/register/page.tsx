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
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface RegisterViewProps {
  onRegister: (email: string) => void;
  onNavigateToLogin: () => void;
}

const RegisterView = ({ onRegister, onNavigateToLogin }: RegisterViewProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user types
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!formData.agreed) {
      setError("You must agree to the Citizen Pledge.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onRegister(formData.email);
      setIsLoading(false);
    }, 1500);
  };

  // Visual Password Strength Logic
  const strength = Math.min(
    (formData.password.length > 5 ? 1 : 0) + 
    (formData.password.length > 8 ? 1 : 0) + 
    (/[A-Z]/.test(formData.password) ? 1 : 0) + 
    (/[0-9]/.test(formData.password) ? 1 : 0), 
    4
  );

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
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
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
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
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
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
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
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50 focus:bg-white ${
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreed" className="font-medium text-slate-700">Citizen Pledge</label>
                <p className="text-slate-500">I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 underline">Terms of Service</a> and confirm that all reports filed will be accurate to the best of my knowledge.</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

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

          {/* Login Link */}
          <div className="text-center pt-2">
             <p className="text-sm text-slate-500">
               Already have a Citizen ID?{' '}
               <button 
                 onClick={onNavigateToLogin}
                 className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
               >
                 Sign in here
               </button>
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