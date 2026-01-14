"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Apple, Play, CheckCircle2 } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-slate-950 text-white"
    >
      {/* 1. Background: Topographic Map Pattern */}
      <div className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM22.485 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 22.485l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 22.485l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 54.627l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 54.627l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM54.627 60l.83-.828-1.415-1.415-.828.828-.828-.828-1.415 1.415.828.828-.828.828 1.415 1.415-.828-.828.828.828 1.415-1.415-.828-.828zM22.485 60l.83-.828-1.415-1.415-.828.828-.828-.828-1.415 1.415.828.828-.828.828 1.415 1.415-.828-.828.828.828 1.415-1.415-.828-.828zM0 22.485l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 22.485l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 54.627l.828.83-1.415 1.415-.828-.828-.828.828L-3.657 54.627l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` 
        }} 
      ></div>

      {/* Tricolor Glow (Ambient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Be the <span className="text-blue-400">Eyes</span> of <br/>
                the Nation.
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Corruption thrives in the dark. Shine a light on infrastructure gaps using the Project INTEGRITY app. Your single photo triggers an immutable audit chain.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={onGetStarted}
                  className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  Start Reporting Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                {/* App Store Badges (Visual Only) */}
                <div className="flex gap-3 items-center justify-center sm:justify-start pt-4 sm:pt-0">
                  <button className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 flex items-center justify-center transition-colors">
                     <Apple className="w-6 h-6 text-white" />
                  </button>
                  <button className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 flex items-center justify-center transition-colors">
                     <Play className="w-6 h-6 text-white fill-current" />
                  </button>
                  <div className="text-xs text-slate-500 text-left leading-tight">
                    <span className="block font-bold text-slate-300">Download App</span>
                    iOS & Android
                  </div>
                </div>
              </div>

              {/* Stats/Trust */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-800 pt-8">
                <div>
                   <div className="text-3xl font-bold text-white">12k+</div>
                   <div className="text-xs text-slate-500 uppercase tracking-wider">Reports Filed</div>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div>
                   <div className="text-3xl font-bold text-white">94%</div>
                   <div className="text-xs text-slate-500 uppercase tracking-wider">Resolution Rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Phone Mockup Animation */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
             <motion.div 
               style={{ y }}
               className="relative z-10"
             >
                {/* CSS Phone Mockup */}
                <div className="relative w-[280px] h-[560px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
                   {/* Notch */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                   
                   {/* Screen Content */}
                   <div className="w-full h-full bg-slate-950 flex flex-col relative">
                      
                      {/* App Header */}
                      <div className="h-20 bg-blue-900/20 w-full flex items-end p-4 pb-2 border-b border-blue-900/30">
                        <span className="font-bold text-blue-400">INTEGRITY APP</span>
                      </div>

                      {/* Map Area */}
                      <div className="flex-1 bg-slate-800/50 relative overflow-hidden p-6 flex flex-col items-center justify-center">
                         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                         
                         {/* Success Card Animation */}
                         <motion.div 
                           initial={{ scale: 0.8, opacity: 0 }}
                           whileInView={{ scale: 1, opacity: 1 }}
                           transition={{ delay: 0.5, type: "spring" }}
                           className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full text-center shadow-2xl relative z-10"
                         >
                            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Report Verified</h3>
                            <p className="text-slate-400 text-xs mb-4">Hash: #8x99a... verified on ledger.</p>
                            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-3/4"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                               <span>Sending to BMC...</span>
                               <span>75%</span>
                            </div>
                         </motion.div>

                         {/* Background Elements */}
                         <div className="absolute top-10 right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                      </div>

                      {/* App Tab Bar */}
                      <div className="h-16 bg-slate-900 border-t border-slate-800 flex justify-around items-center px-4">
                         <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                         <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                         <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      </div>
                   </div>
                </div>

                {/* Back Glow behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[60px] -z-10"></div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};