"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  EyeOff,
  Construction,
  Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  {
    title: "Financial Leakage",
    category: "ECONOMIC IMPACT",
    description: "Estimates suggest 15-20% of public infrastructure funds are lost to pilferage, sub-standard materials, and 'ghost' contracting.",
    stat: "₹40,000 Cr+",
    statLabel: "Est. Annual Loss",
    icon: Banknote,
    color: "bg-red-50 text-red-600 border-red-100",
    delay: 0.1,
    colSpan: "md:col-span-2"
  },
  {
    title: "Safety Compromised",
    category: "PUBLIC SAFETY",
    description: "The use of low-grade concrete (M20 instead of M40) directly correlates to structural fatigue and reduced lifespan of bridges and roads.",
    stat: "High Risk",
    statLabel: "Structural Integrity",
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    delay: 0.2,
    colSpan: "md:col-span-1"
  },
  {
    title: "Indefinite Delays",
    category: "EFFICIENCY",
    description: "Without real-time monitoring, projects suffer from lack of accountability, leading to average delays of 2-3 years per major project.",
    stat: "3.5 Years",
    statLabel: "Avg. Overrun",
    icon: Clock,
    color: "bg-slate-50 text-slate-600 border-slate-200",
    delay: 0.3,
    colSpan: "md:col-span-1"
  },
  {
    title: "The Transparency Gap",
    category: "GOVERNANCE",
    description: "Traditional audits happen 'post-mortem'—after the road is built and the money is spent. There is currently no mechanism for real-time citizen oversight.",
    stat: "Zero",
    statLabel: "Real-time Visibility",
    icon: EyeOff,
    color: "bg-slate-50 text-slate-600 border-slate-200",
    delay: 0.4,
    colSpan: "md:col-span-2"
  }
];

export const NeedSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background decoration: Subtle Construction Pattern */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -left-20 top-40 opacity-5 rotate-12">
        <Construction size={300} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <TrendingDown size={14} />
            The Reality Check
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            The Cost of <span className="text-red-600">Silence</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Infrastructure decay isn't just an inconvenience—it's a systemic failure. 
            When quality checks are manual and opaque, public funds vanish and public safety is compromised.
          </motion.p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className={cn(
                "group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                item.color,
                item.colSpan
              )}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                      {item.category}
                    </span>
                    <item.icon className="opacity-80 group-hover:scale-110 transition-transform duration-300" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-lg">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5">
                  <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">
                    {item.stat}
                  </div>
                  <div className="text-xs font-mono text-slate-500 uppercase">
                    {item.statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center border-t border-b border-slate-100 py-12"
        >
          <blockquote className="text-xl md:text-2xl font-serif italic text-slate-500 max-w-4xl mx-auto">
            "Sunlight is said to be the best of disinfectants; electric light the most efficient policeman."
          </blockquote>
          <cite className="block mt-4 text-sm font-bold text-slate-900 not-italic">
            — Louis Brandeis
          </cite>
        </motion.div>

      </div>
    </section>
  );
};