"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ScanLine, 
  Database, 
  FileSignature, 
  Cpu, 
  MapPin, 
  CheckCheck,
  AlertOctagon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const timelineData = [
  {
    step: "01",
    title: "Cryptographic Capture",
    description: "The citizen app captures the image and embeds a tamper-proof digital signature containing GPS, device telemetry, and timestamp.",
    tech: ["Geo-fencing", "SHA-256 Hashing", "Device Fingerprint"],
    metric: "Latency: < 0.5s",
    color: "bg-blue-500",
    icon: ScanLine,
    // Visual Mockup for Step 1
    Visual: () => (
      <div className="bg-slate-900 rounded-xl p-4 w-full h-48 relative overflow-hidden flex flex-col items-center justify-center border border-slate-700 shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        {/* Scanning Animation */}
        <motion.div 
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10"
        />
        <MapPin className="text-blue-500 w-8 h-8 mb-2" />
        <div className="font-mono text-xs text-blue-200">
          LAT: 19.0760° N<br/>LONG: 72.8777° E
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-blue-900/50 rounded text-[10px] text-blue-300 border border-blue-700">
          VERIFIED
        </div>
      </div>
    )
  },
  {
    step: "02",
    title: "VLM Analysis & Matching",
    description: "Our Vision-Language Model (VLM) compares the site photo against the specific tender BOQ (Bill of Quantities) to identify material discrepancies.",
    tech: ["Computer Vision", "LLM Agents", "Vector Database"],
    metric: "Accuracy: 98.4%",
    color: "bg-purple-500",
    icon: Cpu,
    // Visual Mockup for Step 2
    Visual: () => (
      <div className="bg-white rounded-xl p-4 w-full h-48 border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="flex gap-2 mb-3 border-b border-slate-100 pb-2">
          <div className="h-2 w-2 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
        </div>
        <div className="space-y-2 font-mono text-[10px]">
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="text-slate-500">Target:</span>
            <span className="font-bold text-slate-800">Grade M40 Concrete</span>
          </div>
          <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
            <span className="text-slate-500">Detected:</span>
            <span className="font-bold text-red-600">Grade M20 (Low Quality)</span>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            className="h-1.5 bg-slate-200 rounded-full overflow-hidden mt-4"
          >
            <div className="h-full bg-red-500 w-[85%]"></div>
          </motion.div>
          <div className="text-right text-red-500 font-bold">Risk: High</div>
        </div>
      </div>
    )
  },
  {
    step: "03",
    title: "Blockchain Verdict",
    description: "The audit result is written to a public permissioned ledger. If violations exceed threshold, a digital Notice is auto-dispatched.",
    tech: ["Smart Contracts", "Hyperledger", "Auto-Mailer"],
    metric: "Processing: Instant",
    color: "bg-orange-500",
    icon: FileSignature,
    // Visual Mockup for Step 3
    Visual: () => (
      <div className="bg-orange-50 rounded-xl p-4 w-full h-48 border-2 border-orange-100 border-dashed flex flex-col items-center justify-center text-center relative">
         <div className="absolute top-2 right-2">
            <Database className="text-orange-200 w-12 h-12 opacity-50" />
         </div>
         <div className="bg-white p-3 rounded-full shadow-sm mb-2">
            <AlertOctagon className="text-orange-600 w-6 h-6" />
         </div>
         <h4 className="font-bold text-slate-800 text-sm">Action Triggered</h4>
         <p className="text-[10px] text-slate-500 mt-1 max-w-[150px]">
           Official Complaint #9921 lodged with BMC Engineering Dept.
         </p>
         <Badge variant="outline" className="mt-3 bg-orange-100 text-orange-700 border-orange-200 text-[10px]">
           Block #881920 Verified
         </Badge>
      </div>
    )
  }
];

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Badge className="mb-4 bg-slate-900 text-white hover:bg-slate-800">System Architecture</Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Black Box</span>
          </h2>
          <p className="text-slate-600 text-lg">
            How we turn a single pixel into a policy action using military-grade verification.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block rounded-full">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "" : "md:flex-row-reverse"}`}>
                  
                  {/* Text Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} text-center md:text-left`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`inline-flex items-center gap-2 mb-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <span className={`text-4xl font-black text-slate-200`}>{item.step}</span>
                        <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                      </div>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 mb-4 ${isEven ? "md:justify-end justify-center" : "md:justify-start justify-center"}`}>
                        {item.tech.map((t) => (
                          <span key={t} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className={`text-xs font-mono text-slate-400 ${isEven ? "md:text-right" : "md:text-left"}`}>
                        {item.metric}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg ring-4 ring-white`}>
                      <item.icon size={20} />
                    </div>
                  </div>

                  {/* Visual Mockup */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      <item.Visual />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export const ProcessSection: React.FC = () => {
  return <ProcessTimeline />;
}