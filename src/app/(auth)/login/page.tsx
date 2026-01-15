"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Building2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ErrorAlert } from "@/components/auth/ErrorAlert";
import Link from "next/link";

const LoginView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirect") || "/dashboard";

  const { signIn, signInWithGoogle, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      await signIn(email, password);
      // Check if user is admin after sign in
      const currentUser = await new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              JSON.parse(localStorage.getItem("admin_session") || "null")
            ),
          100
        );
      });

      if (currentUser && (currentUser as any).isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    clearError();

    try {
      await signInWithGoogle();
      // Google OAuth will never be admin, so just redirect normally
      router.push(redirectTo);
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
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
            <span className="font-serif font-bold text-xl tracking-wide">
              Project INTEGRITY
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
            Verify the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
              Public Promise.
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Join 1.2 Million citizens securing national infrastructure through
            transparency. Your audit is the first line of defense against
            corruption.
          </p>

          <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">
              DIGITAL INDIA
            </div>
            <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">
              G20
            </div>
            <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">
              NIC
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Project INTEGRITY
            </h2>
            <p className="text-slate-500 text-sm">Citizen Audit Portal</p>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-slate-500">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          {error && <ErrorAlert error={error} onDismiss={clearError} />}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="citizen@integrity.gov.in"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/reset-password"
                    className="text-xs font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
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
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Secure Login <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-600">
              Sign in with Google
            </span>
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Sign up now
              </Link>
            </p>
          </div>

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
