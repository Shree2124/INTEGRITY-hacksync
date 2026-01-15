"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the browser mockup
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-slate-950 text-white perspective-[1000px]"
    >
      {/* --- Background Elements --- */}
      
      {/* Topographic Map Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM22.485 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 22.485l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 22.485l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 54.627l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 54.627l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM54.627 60l.83-.828-1.415-1.415-.828.828-.828-.828-1.415 1.415.828.828-.828.828 1.415 1.415-.828-.828.828.828 1.415-1.415-.828-.828zM22.485 60l.83-.828-1.415-1.415-.828.828-.828-.828-1.415 1.415.828.828-.828.828 1.415 1.415-.828-.828.828.828 1.415-1.415-.828-.828zM0 22.485l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 22.485l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 54.627l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 54.627l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Tricolor Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* --- Left Column: Copy & CTA --- */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
                <Globe size={12} />
                Browser-Based Access
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Be the <span className="text-blue-400">Eyes</span> of <br />
                the Nation.
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Corruption thrives in the dark. Shine a light on infrastructure
                gaps using the Project INTEGRITY web portal. No downloads required—just snap, upload, and verify instantly from any device.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={onGetStarted}
                  className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
                >
                  Access Portal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button
                  variant="outline"
                  className="h-14 px-8 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200 text-lg"
                >
                  View Public Audit Log
                  <ExternalLink className="ml-2 w-4 h-4 text-slate-500" />
                </Button>
              </div>

              {/* Stats/Trust */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white">12k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    Reports Filed
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    Verification Rate
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- Right Column: Browser Mockup --- */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end relative">
            <motion.div 
              style={{ y, rotateX }} 
              className="relative z-10 w-full max-w-lg"
            >
              
              {/* Browser Window Container */}
              <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-90">
                
                {/* Browser Toolbar (Traffic Lights & Address) */}
                <div className="bg-slate-800/80 p-3 flex items-center gap-4 border-b border-slate-700">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                   </div>
                   <div className="flex-1 bg-slate-950/50 rounded-md py-1 px-3 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                      <ShieldCheck size={10} className="mr-2 text-green-500" />
                      https://integrity.gov.in/portal/dashboard
                   </div>
                </div>

                {/* Dashboard UI Mockup */}
                <div className="p-6 bg-slate-950 relative min-h-[320px] flex flex-col">
                   
                   {/* Grid Background inside browser */}
                   <div className="absolute inset-0 opacity-20 bg-[size:20px_20px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>

                   <div className="relative z-10 flex gap-4 mb-4">
                      {/* Sidebar Mock */}
                      <div className="w-1/4 space-y-2 hidden sm:block">
                         <div className="h-2 w-12 bg-slate-800 rounded mb-4" />
                         <div className="h-8 w-full bg-blue-600/20 border border-blue-500/30 rounded flex items-center px-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                         </div>
                         <div className="h-8 w-full bg-slate-900 rounded border border-slate-800" />
                         <div className="h-8 w-full bg-slate-900 rounded border border-slate-800" />
                      </div>

                      {/* Main Content Mock */}
                      <div className="flex-1 space-y-4">
                         {/* Header Mock */}
                         <div className="flex justify-between items-center mb-6">
                            <div className="h-4 w-32 bg-slate-800 rounded" />
                            <div className="h-8 w-24 bg-blue-600 rounded text-[10px] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                               + NEW REPORT
                            </div>
                         </div>

                         {/* Success Card Animation */}
                         <motion.div
                           initial={{ scale: 0.9, opacity: 0, y: 20 }}
                           whileInView={{ scale: 1, opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                           className="bg-slate-900 border border-slate-700 p-5 rounded-lg shadow-xl relative overflow-hidden"
                         >
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                               <CheckCircle2 size={64} />
                            </div>
                            <div className="flex items-start gap-3">
                               <div className="mt-1 bg-green-500/20 p-2 rounded-full">
                                  <CheckCircle2 size={20} className="text-green-500" />
                               </div>
                               <div>
                                  <h4 className="text-sm font-semibold text-white">Submission Verified</h4>
                                  <p className="text-[10px] text-slate-400 mt-1">
                                    Project ID: <span className="font-mono text-blue-400">#RD-2024-Mum-A7</span><br/>
                                    Timestamp: 10:42 AM IST
                                  </p>
                                  <div className="mt-3 flex gap-2">
                                     <div className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-300 border border-slate-700">Geo-Tagged</div>
                                     <div className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-300 border border-slate-700">Encrypted</div>
                                  </div>
                               </div>
                            </div>
                         </motion.div>

                         {/* List Items Mock */}
                         <div className="space-y-2 mt-4 opacity-50">
                            <div className="h-10 w-full bg-slate-900 border border-slate-800 rounded" />
                            <div className="h-10 w-full bg-slate-900 border border-slate-800 rounded" />
                         </div>
                      </div>
                   </div>

                </div>
              </div>

              {/* Decorative Glow behind the browser */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-500/20 blur-[60px] -z-10"></div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};  