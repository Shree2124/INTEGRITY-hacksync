"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scan, 
  Map as MapIcon, 
  ShieldAlert, 
  FileText,
  ChevronRight,
  Activity
} from "lucide-react";

// Feature Data
const features = [
  {
    id: 0,
    title: "AI Anomaly Detection",
    description: "Our Computer Vision models automatically flag structural cracks, potholes, and material inconsistencies from user uploads.",
    icon: Scan,
    color: "text-blue-400",
    // Simulation: A scanning interface
    visual: (
      <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Scanning Box */}
        <div className="relative w-48 h-48 border-2 border-blue-500 rounded-lg flex items-center justify-center z-10">
           <div className="absolute top-0 left-0 border-t-4 border-l-4 border-blue-400 w-6 h-6 -mt-1 -ml-1"></div>
           <div className="absolute top-0 right-0 border-t-4 border-r-4 border-blue-400 w-6 h-6 -mt-1 -mr-1"></div>
           <div className="absolute bottom-0 left-0 border-b-4 border-l-4 border-blue-400 w-6 h-6 -mb-1 -ml-1"></div>
           <div className="absolute bottom-0 right-0 border-b-4 border-r-4 border-blue-400 w-6 h-6 -mb-1 -mr-1"></div>
           
           <motion.div 
             animate={{ height: ["0%", "100%", "0%"] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-full bg-blue-500/20 border-b border-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
           />
           <span className="font-mono text-blue-300 text-xs">ANALYZING...</span>
        </div>
        
        {/* Floating Data Tags */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-4 top-10 bg-slate-800 border border-red-500/50 p-2 rounded text-[10px] text-red-400 font-mono"
        >
          ⚠ CRACK DETECTED (98%)
        </motion.div>
      </div>
    )
  },
  {
    id: 1,
    title: "Geospatial Mapping",
    description: "Every audit is pinned to a live map. We overlay tender coordinates to ensure construction is happening exactly where promised.",
    icon: MapIcon,
    color: "text-emerald-400",
    // Simulation: A map radar
    visual: (
      <div className="relative w-full h-full bg-emerald-950/30 flex items-center justify-center overflow-hidden">
         {/* Radar Circles */}
         {[100, 200, 300].map((size, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              className="absolute border border-emerald-500 rounded-full"
              style={{ width: size, height: size }}
            />
         ))}
         {/* Center Point */}
         <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_#10b981]"></div>
         {/* Rotating Radar Line */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,0.2)_360deg)] rounded-full"
         />
         {/* Map Pins */}
         <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full"></div>
         <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full"></div>
      </div>
    )
  },
  {
    id: 2,
    title: "Smart Contract Logic",
    description: "Automated fund release. If the AI audit passes (>90%), the next tranche of funds is released via blockchain smart contract.",
    icon: FileText,
    color: "text-orange-400",
    // Simulation: Code/Block logic
    visual: (
      <div className="relative w-full h-full bg-slate-900 p-6 font-mono text-xs overflow-hidden flex flex-col justify-center">
        <div className="space-y-2 opacity-80">
          <div className="text-gray-500">{"// Executing Smart Contract..."}</div>
          <div className="flex gap-2">
             <span className="text-purple-400">if</span>
             <span className="text-blue-300">(auditScore {">"} 90)</span>
             <span className="text-yellow-300">{"{"}</span>
          </div>
          <div className="pl-4 flex gap-2">
             <span className="text-blue-300">releaseFunds</span>
             <span className="text-white">{`({amount: "₹50L"});`}</span>
          </div>
          <div className="pl-4 flex gap-2">
             <span className="text-blue-300">updateLedger</span>
             <span className="text-green-400">("SUCCESS");</span>
          </div>
          <div className="text-yellow-300">{"}"}</div>
          <div className="flex gap-2">
             <span className="text-purple-400">else</span>
             <span className="text-yellow-300">{"{"}</span>
          </div>
          <div className="pl-4 flex gap-2">
             <span className="text-red-400">flagViolation();</span>
          </div>
          <div className="text-yellow-300">{"}"}</div>
        </div>
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: "100%" }}
           transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
           className="h-1 bg-orange-500 mt-4 shadow-[0_0_10px_orange]"
        />
        <div className="text-orange-500 mt-1 text-[10px]">VERIFYING HASH...</div>
      </div>
    )
  },
];

const FeaturesCommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-rotate tabs every 5 seconds if user hasn't clicked
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,41,59,1),rgba(2,6,23,1))]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-xs text-slate-400 font-mono mb-4">
             <Activity size={12} className="text-green-500 animate-pulse" /> SYSTEM ONLINE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            The Integrity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Engine</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Switch between the modules below to see how our system processes infrastructure data in real-time.
          </p>
        </div>

        {/* The Interface */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Navigation */}
          <div className="flex flex-col gap-4 w-full lg:w-1/3">
            {features.map((feature, index) => {
              const isActive = activeTab === index;
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    relative p-6 text-left rounded-xl border transition-all duration-300 group overflow-hidden
                    ${isActive 
                      ? "bg-slate-900 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]" 
                      : "bg-slate-900/20 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
                    }
                  `}
                >
                  {/* Progress Bar Background for Active Tab */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-blue-500/5 -z-10"
                    />
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-slate-950 ${isActive ? feature.color : "text-slate-500"}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className={`font-semibold ${isActive ? "text-white" : "text-slate-400"}`}>
                        {feature.title}
                      </h3>
                    </div>
                    {isActive && <ChevronRight className="text-blue-500 animate-pulse" size={16} />}
                  </div>
                  
                  <p className={`text-sm leading-relaxed transition-colors ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                    {feature.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: The "Monitor" */}
          <div className="w-full lg:w-2/3">
            <div className="relative h-[400px] w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Monitor Frame UI */}
              <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Live Terminal Preview
                </div>
              </div>

              {/* Content Switching Area */}
              <div className="w-full h-full pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {features[activeTab].visual}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overlay Scanlines (Retro effect) */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] z-30 opacity-20"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const FeaturesSection: React.FC = () => {
  return <FeaturesCommandCenter />;
}