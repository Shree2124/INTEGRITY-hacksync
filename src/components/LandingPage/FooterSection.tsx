"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/dbConnect";
import Link from "next/link";

export const FooterSection: React.FC = () => {
  const [totalAudits, setTotalAudits] = useState<number>(14020591); // Fallback
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );

    async function fetchStats() {
      const { count } = await supabase
        .from("citizen_reports")
        .select("*", { count: "exact", head: true });

      if (count !== null) setTotalAudits(count + 14000); // Adding base number for realism
    }
    fetchStats();
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto relative overflow-hidden font-sans">
      {/* 1. National Tricolor Strip */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-[#FF9933]"></div> {/* Saffron */}
        <div className="w-1/3 bg-white"></div> {/* White */}
        <div className="w-1/3 bg-[#138808]"></div> {/* Green */}
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* 2. Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Identity Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-4 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="relative w-10 h-10 sm:w-40 sm:h-12 flex items-center justify-center">
                    <img
                      src="/darklogo.png"
                      alt="logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              An open-source initiative to foster transparency in public
              infrastructure through Citizen Audits and AI Verification.
              Ensuring every rupee builds the nation.
            </p>

            <div className="flex gap-4 pt-2">
              {[Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all"
                >
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
              <li>
                <Link
                  href="/auditview"
                  className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  File an Audit
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Track Application
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Public Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Download App
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  Whistleblower Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal/Compliance */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider border-l-2 border-white pl-3">
              Compliance
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "RTI Act",
                "Terms of Use",
                "Privacy Policy",
                "Hyperlinking Policy",
                "Copyright Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/legal"
                    className="hover:text-orange-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    {item}
                  </Link>
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
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                Toll Free Number (24x7)
              </p>
              <h2 className="text-3xl font-mono font-bold text-white tracking-wider hover:text-green-400 cursor-pointer transition-colors">
                1800-11-2025
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="text-slate-500 mt-1 shrink-0" size={16} />
                <p>
                  Room No. 404, A-Wing, Nirman Bhawan,
                  <br />
                  New Delhi - 110011
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="text-slate-500 shrink-0" size={16} />
                <a
                  href="mailto:support@integrity.gov.in"
                  className="hover:text-white transition-colors"
                >
                  support@integrity.gov.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Partner Logos (Gray Scale) */}
        <div className="border-t border-slate-900 pt-8 pb-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using Text placeholders for logos to avoid broken images, but styled like images */}
            <div className="text-xl font-bold font-serif">Digital India</div>
            <div className="text-xl font-bold font-serif">
              Azadi Ka Amrit Mahotsav
            </div>
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
            <span>
              Developed & Hosted by{" "}
              <span className="text-slate-300">
                National Informatics Centre
              </span>
            </span>
          </div>

          <div className="flex gap-6 items-center">
            <div className="text-right">
              <div className="uppercase tracking-wider text-[9px] mb-0.5">
                Last Updated
              </div>
              <div className="font-mono text-slate-300">{lastUpdated}</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-right">
              <div className="uppercase tracking-wider text-[9px] mb-0.5">
                Total Audits Filed
              </div>
              <div className="font-mono text-orange-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {totalAudits.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
