"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileCheck, ArrowRight, Activity, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative bg-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      
      {/* 1. Background: Technical Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(to right, #0f172a 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}
      ></div>
      
      {/* Background Gradient Spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 2. Left Content: Text & CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-blue-200 bg-blue-50 text-blue-800 rounded-full text-xs font-bold tracking-wide uppercase gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Live in Mumbai & Pune
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 leading-[1.15] mb-6">
                Bridging the Gap Between <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">Public Promises</span> 
                {" & "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">Ground Reality</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Project INTEGRITY harnesses <strong>AI Agents</strong> and <strong>Geospatial Tech</strong> to empower citizens. Verify public spending, audit infrastructure quality, and ensure every Rupee counts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={onGetStarted} 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 h-12 px-8 text-base group"
                >
                  <MapPin className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Report an Issue
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 h-12 px-8 text-base"
                >
                  View Public Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 font-medium">
                <span>Trusted by civic bodies in:</span>
                <div className="flex gap-4 grayscale opacity-70">
                   {/* Placeholders for logos, using text for now */}
                   <span className="font-bold text-slate-800">MUMBAI</span>
                   <span className="font-bold text-slate-800">DELHI</span>
                   <span className="font-bold text-slate-800">BANGALORE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Right Content: Visual Representation (Glassmorphism Cards) */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
            
            {/* The "Main" Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              {/* Fake Browser Header */}
              <div className="bg-slate-50 border-b border-slate-100 p-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              
              {/* Fake Map Content */}
              <div className="relative h-64 bg-slate-200 w-full overflow-hidden">
                {/* Abstract Map Grid */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Map Pins */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/3 left-1/4 text-orange-500"
                >
                  <MapPin size={32} fill="currentColor" className="drop-shadow-lg" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/3 right-1/3 text-blue-600"
                >
                  <MapPin size={32} fill="currentColor" className="drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">Bridge Construction - Sector 4</h4>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">On Track</Badge>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                  <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progress: 75%</span>
                  <span>Budget Utilized: ₹4.2 Cr</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1: AI Verification */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -right-4 top-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 z-20 w-48 hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Status</div>
                  <div className="text-sm font-bold text-slate-800">Verified by AI</div>
                </div>
              </div>
              <div className="text-xs text-slate-600">
                Material quality matches tender specs (98% match).
              </div>
            </motion.div>

            {/* Floating Element 2: Report Ticket */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-4 bottom-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 z-20 w-52 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <FileCheck size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Recent Audit</div>
                  <div className="text-sm font-bold text-slate-800">Road Pothole Fix</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* 4. Bottom Stats Bar */}
      <div className="absolute bottom-0 w-full border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-around items-center gap-4 text-center">
            <div>
                <p className="text-2xl font-bold text-slate-900">₹1,240 Cr</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Funds Audited</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
            <div>
                <p className="text-2xl font-bold text-slate-900">8,400+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Projects</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
            <div>
                <p className="text-2xl font-bold text-slate-900">120k</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Citizen Reports</p>
            </div>
        </div>
      </div>
    </section>
  );
};