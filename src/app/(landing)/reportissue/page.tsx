"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  Monitor,
  Zap,
  AlertCircle,
  Paperclip,
  X,
  ChevronRight,
  CheckCircle,
  Terminal,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = "type" | "details" | "evidence" | "success";
type BugType = "ui" | "functional" | "performance" | "security";

interface BugData {
  type: BugType;
  title: string;
  steps: string;
  severity: "low" | "medium" | "high" | "critical";
  files: File[];
  systemInfo: string;
}

export default function BugReportPage() {
  const [step, setStep] = useState<Step>("type");
  const [data, setData] = useState<BugData>({
    type: "ui",
    title: "",
    steps: "",
    severity: "medium",
    files: [],
    systemInfo: "Chrome 120.0 / Windows 11 (Auto-detected)",
  });

  // Mock submission
  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setStep("success");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setData({
        ...data,
        files: [...data.files, ...Array.from(e.target.files)],
      });
    }
  };

  const categories = [
    {
      id: "ui",
      label: "UI / Visual",
      icon: Monitor,
      desc: "Misaligned elements, wrong colors, broken layout.",
    },
    {
      id: "functional",
      label: "Functionality",
      icon: Bug,
      desc: "Buttons not working, form errors, crashes.",
    },
    {
      id: "performance",
      label: "Performance",
      icon: Zap,
      desc: "Slow loading, laggy animations, high latency.",
    },
    {
      id: "security",
      label: "Security",
      icon: AlertCircle,
      desc: "Auth issues, exposed data, vulnerabilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-5 pb-12 px-4 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
     
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <Terminal size={20} />
            </div>
            <h1 className="text-2xl font-bold">Report a Bug</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Found a glitch? Help us squash it. Please provide as much detail as
            possible.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative min-h-[500px] flex flex-col">
          {/* Progress Steps */}
          <div className="flex border-b border-slate-100">
            {["Category", "Details", "Evidence"].map((label, idx) => {
              const stepIdx = [
                "type",
                "details",
                "evidence",
                "success",
              ].indexOf(step);
              return (
                <div
                  key={label}
                  className={cn(
                    "flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors",
                    stepIdx >= idx
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-400"
                  )}
                >
                  0{idx + 1} {label}
                </div>
              );
            })}
          </div>

          <div className="p-8 flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {/* STEP 1: CATEGORY */}
              {step === "type" && (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                  <h3 className="font-bold text-lg mb-6">
                    What kind of issue is it?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setData({ ...data, type: cat.id as BugType });
                          setStep("details");
                        }}
                        className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-left"
                      >
                        <cat.icon className="w-8 h-8 mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        <span className="font-bold text-sm text-slate-800">
                          {cat.label}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          {cat.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DETAILS */}
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Issue Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., unexpected crash when clicking 'Save'"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                      value={data.title}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Severity
                      </label>
                      <select
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        value={data.severity}
                        onChange={(e) =>
                          setData({ ...data, severity: e.target.value as any })
                        }
                      >
                        <option value="low">Low (Cosmetic)</option>
                        <option value="medium">Medium (Annoyance)</option>
                        <option value="high">High (Feature Broken)</option>
                        <option value="critical">Critical (App Down)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        System Info
                      </label>
                      <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-500 truncate flex items-center gap-2">
                        <Cpu size={14} />
                        {data.systemInfo}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Steps to Reproduce
                    </label>
                    <textarea
                      placeholder={`1. Go to settings page\n2. Click on 'Profile'\n3. Upload avatar...`}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[120px] font-mono"
                      value={data.steps}
                      onChange={(e) =>
                        setData({ ...data, steps: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={() => setStep("type")}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep("evidence")}
                      disabled={!data.title || !data.steps}
                      className="bg-slate-900 text-white"
                    >
                      Next Step <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: EVIDENCE */}
              {step === "evidence" && (
                <motion.div
                  key="evidence"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="font-bold text-lg">Screenshots or Logs</h3>
                    <p className="text-slate-500 text-xs">
                      Optional, but highly recommended for faster resolution.
                    </p>
                  </div>

                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="bg-blue-50 p-3 rounded-full mb-3">
                        <Paperclip className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="mb-1 text-sm text-slate-700 font-medium">
                        Click to attach files
                      </p>
                      <p className="text-xs text-slate-400">
                        LOG, JPG, PNG, MP4
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {/* File List */}
                  {data.files.length > 0 && (
                    <div className="space-y-2">
                      {data.files.map((file, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200 text-xs"
                        >
                          <span className="font-medium truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <button
                            onClick={() => {
                              const newFiles = [...data.files];
                              newFiles.splice(i, 1);
                              setData({ ...data, files: newFiles });
                            }}
                          >
                            <X
                              size={14}
                              className="text-slate-400 hover:text-red-500"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={() => setStep("details")}>
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700 w-full ml-4"
                    >
                      Submit Bug Report
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SUCCESS */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col justify-center items-center text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Bug Recorded
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 mb-6">
                    Thanks for spotting that. Our engineering team has been
                    notified.
                  </p>

                  <div className="bg-slate-100 p-4 rounded-lg font-mono text-xs text-slate-600 mb-8 border border-slate-200">
                    ISSUE ID:{" "}
                    <span className="font-bold text-slate-900">#BUG-9921</span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    Submit Another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
