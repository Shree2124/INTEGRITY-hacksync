'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Smartphone, 
  Fingerprint, 
  ShieldCheck,
  Building2
} from 'lucide-react';

interface LoginViewProps {
  onLogin: (email: string) => void;
}

const LoginView = ({ onLogin }: LoginViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      onLogin(email || 'citizen@integrity.app');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* LEFT SIDE: Visual Brand Story */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        
        {/* Background Animation (Abstract Map) */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           <motion.div 
             animate={{ y: [0, 1000] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
           />
        </div>

        {/* Content */}
        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-md">
                 <Building2 className="text-blue-400" />
              </div>
              <span className="font-serif font-bold text-xl tracking-wide">Project INTEGRITY</span>
           </div>
        </div>

        <div className="relative z-10 max-w-lg">
           <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
             Verify the <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Public Promise.</span>
           </h1>
           <p className="text-slate-400 text-lg leading-relaxed mb-8">
             Join 1.2 Million citizens securing national infrastructure through transparency. Your audit is the first line of defense against corruption.
           </p>
           
           {/* Trust Badges */}
           <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">DIGITAL INDIA</div>
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">G20</div>
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">NIC</div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden text-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">Project INTEGRITY</h2>
             <p className="text-slate-500 text-sm">Citizen Audit Portal</p>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-slate-500">Please enter your credentials to access the dashboard.</p>
          </div>

          {/* Login Method Tabs */}
       
          <form className="space-y-6" onSubmit={handleSubmit}>
            

              <div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                      placeholder="citizen@integrity.gov.in"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex justify-end">
                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                  </div>
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
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Secure Login <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">Or continue via</span>
            </div>
          </div>

          {/* Alternative Logins */}
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => onLogin("parichay@gov.in")} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                <Fingerprint size={18} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                <span className="text-sm font-semibold text-slate-600">Parichay</span>
             </button>
             <button onClick={() => onLogin("guest@integrity.app")} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                <span className="text-sm font-semibold text-slate-600">Guest User</span>
             </button>
          </div>

          {/* Footer Security Note */}
          <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
             <ShieldCheck size={14} className="text-green-500" />
             <span>256-bit End-to-End Encrypted Session</span>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;