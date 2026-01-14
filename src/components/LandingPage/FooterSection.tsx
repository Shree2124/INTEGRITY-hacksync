"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto relative overflow-hidden font-sans">
      
      {/* 1. National Tricolor Strip */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-[#FF9933]"></div> {/* Saffron */}
        <div className="w-1/3 bg-white"></div>     {/* White */}
        <div className="w-1/3 bg-[#138808]"></div> {/* Green */}
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        
        {/* 2. Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Identity Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                   alt="Emblem" 
                   className="w-6 h-6 invert opacity-90"
                />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-xl tracking-wide">Project INTEGRITY</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Ministry of Urban Development</p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              An open-source initiative to foster transparency in public infrastructure through 
              Citizen Audits and AI Verification. Ensuring every rupee builds the nation.
            </p>

            <div className="flex gap-4 pt-2">
               {[Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
                 <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all">
                   <Icon size={16} />
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider border-l-2 border-orange-500 pl-3">
              Citizen Corner
            </h4>
            <ul className="space-y-3 text-sm">
              {['File an Audit', 'Track Application', 'Public Dashboard', 'Download App', 'Whistleblower Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300">
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Compliance */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider border-l-2 border-white pl-3">
              Compliance
            </h4>
            <ul className="space-y-3 text-sm">
              {['RTI Act', 'Terms of Use', 'Privacy Policy', 'Hyperlinking Policy', 'Copyright Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300">
                     <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Helpline */}
          <div className="lg:col-span-4 bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <Phone size={16} className="text-green-500" /> Helpline
            </h4>
            
            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Toll Free Number (24x7)</p>
              <h2 className="text-3xl font-mono font-bold text-white tracking-wider hover:text-green-400 cursor-pointer transition-colors">
                1800-11-2025
              </h2>
            </div>

            <div className="space-y-4">
               <div className="flex items-start gap-3 text-sm">
                  <MapPin className="text-slate-500 mt-1 shrink-0" size={16} />
                  <p>Room No. 404, A-Wing, Nirman Bhawan,<br/>New Delhi - 110011</p>
               </div>
               <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-slate-500 shrink-0" size={16} />
                  <a href="mailto:support@integrity.gov.in" className="hover:text-white transition-colors">support@integrity.gov.in</a>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Partner Logos (Gray Scale) */}
        <div className="border-t border-slate-900 pt-8 pb-8">
           <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using Text placeholders for logos to avoid broken images, but styled like images */}
              <div className="text-xl font-bold font-serif">Digital India</div>
              <div className="text-xl font-bold font-serif">Azadi Ka Amrit Mahotsav</div>
              <div className="text-xl font-bold font-serif">G20 India</div>
              <div className="text-xl font-bold font-serif">NIC</div>
              <div className="text-xl font-bold font-serif">MyGov</div>
           </div>
        </div>
      </div>

      {/* 4. Bottom Footer */}
      <div className="bg-black/40 border-t border-slate-900 py-4 text-[11px] text-slate-500">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
             <span>Content owned by Ministry of Urban Development, GoI.</span>
             <span className="hidden md:inline">|</span>
             <span>Developed & Hosted by <span className="text-slate-300">National Informatics Centre</span></span>
          </div>

          <div className="flex gap-6 items-center">
            <div className="text-right">
              <div className="uppercase tracking-wider text-[9px] mb-0.5">Last Updated</div>
              <div className="font-mono text-slate-300">14 Jan 2026</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-right">
              <div className="uppercase tracking-wider text-[9px] mb-0.5">Visitor Count</div>
              <div className="font-mono text-orange-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                14,020,591
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};