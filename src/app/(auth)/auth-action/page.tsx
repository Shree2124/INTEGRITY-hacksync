"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Building2, Loader2 } from "lucide-react";

const AuthActionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAuthAction = async () => {
      const mode = searchParams?.get("mode");
      const actionCode = searchParams?.get("oobCode");

      if (!actionCode) {
        setStatus("error");
        setMessage("Invalid or missing action code.");
        return;
      }

      try {
        switch (mode) {
          case "verifyEmail":
            // Apply the email verification code
            await applyActionCode(auth, actionCode);
            setStatus("success");
            setMessage(
              "Email verified successfully! Redirecting to dashboard..."
            );

            // Wait 2 seconds before redirecting
            setTimeout(() => {
              router.push("/dashboard");
            }, 2000);
            break;

          case "resetPassword":
            // Redirect to reset password page with the action code
            router.push(`/reset-password?oobCode=${actionCode}`);
            break;

          default:
            setStatus("error");
            setMessage("Invalid action mode.");
        }
      } catch (error: any) {
        console.error("Error handling auth action:", error);
        setStatus("error");

        // Provide user-friendly error messages
        if (error.code === "auth/invalid-action-code") {
          setMessage(
            "This verification link is invalid or has already been used."
          );
        } else if (error.code === "auth/expired-action-code") {
          setMessage(
            "This verification link has expired. Please request a new one."
          );
        } else {
          setMessage(
            "An error occurred while verifying your email. Please try again."
          );
        }
      }
    };

    handleAuthAction();
  }, [searchParams, router]);

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
            <span className="font-serif font-bold text-xl tracking-wide">
              Project INTEGRITY
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
            Verifying Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Identity
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We're confirming your email address to ensure secure access to the
            platform.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Status Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            {status === "loading" && (
              <>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Verifying Email
                </h2>
                <p className="mt-2 text-slate-500">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Email Verified!
                </h2>
                <p className="mt-2 text-slate-500">{message}</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecting to dashboard...</span>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Verification Failed
                </h2>
                <p className="mt-2 text-slate-500">{message}</p>
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => router.push("/verify-email")}
                    className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-[0.98]"
                  >
                    Request New Verification Email
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthActionPage;
