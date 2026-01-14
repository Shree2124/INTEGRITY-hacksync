'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, RefreshCw, LogOut, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ErrorAlert } from '@/components/auth/ErrorAlert';
import { LoadingScreen } from '@/components/auth/LoadingScreen';
import { getCurrentUser } from '@/lib/firebase/auth';

const VerifyEmailView = () => {
  const router = useRouter();
  const { user, emailVerified, resendVerification, signOut, loading, error, clearError } = useAuth();
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(false);

  // Auto-redirect if already verified
  useEffect(() => {
    if (!loading && emailVerified) {
      router.push('/mapview');
    }
  }, [emailVerified, loading, router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || emailVerified) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  const handleResendEmail = async () => {
    setSendingEmail(true);
    setEmailSent(false);
    clearError();

    try {
      await resendVerification();
      setEmailSent(true);
    } catch (err) {
      // Error handled by context
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    clearError();

    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          router.push('/mapview');
        } else {
          clearError();
          // Show temporary message
          setEmailSent(false);
        }
      }
    } catch (err: any) {
      console.error('Error checking verification:', err);
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* LEFT SIDE: Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <motion.div
            animate={{ y: [0, 1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          />
        </div>

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
            Almost <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">There!</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Email verification helps us ensure the security and authenticity of all citizen auditors on the platform.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Verification Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Verify Your Email</h2>
            <p className="mt-2 text-slate-500">
              We've sent a verification link to
            </p>
            <p className="mt-1 text-blue-600 font-medium">{user.email}</p>
          </div>

          {error && <ErrorAlert error={error} onDismiss={clearError} />}

          {emailSent && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-green-800 font-medium">Email sent successfully!</p>
                  <p className="text-xs text-green-700 mt-1">Please check your inbox and spam folder.</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Next Steps:</h3>
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                  <span>Click the verification link in the email</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                  <span>Return here and click "I've Verified My Email"</span>
                </li>
              </ol>
            </div>

            <button
              onClick={handleCheckVerification}
              disabled={checking}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
            >
              {checking ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Checking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  I've Verified My Email <CheckCircle2 size={16} />
                </span>
              )}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={sendingEmail || emailSent}
              className="w-full flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {sendingEmail ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-600 rounded-full animate-spin"/>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  {emailSent ? 'Email Sent' : 'Resend Verification Email'}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign out and use different email
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmailView;
