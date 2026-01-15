"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Phone,
  UserCircle
} from "lucide-react";
import Link from "next/link";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("English");

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* 1. Top Accessibility & Utility Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 flex justify-between items-center relative z-50">
        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline text-gray-400">Government of India</span>
          <div className="h-3 w-px bg-gray-600 hidden sm:block"></div>
          <a href="#main" className="hover:underline hover:text-orange-400 transition-colors">
            Skip to Main Content
          </a>
          <a href="#" className="flex items-center gap-1 hover:underline hover:text-orange-400 transition-colors">
            <ShieldCheck size={12} /> Screen Reader Access
          </a>
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden md:flex items-center gap-1 text-orange-400 font-semibold">
            <Phone size={10} />
            <span>Helpline: 1800-11-0000</span>
          </div>
          <div className="h-3 w-px bg-gray-600 hidden md:block"></div>

          {/* Font Resizer */}
          <div className="flex items-center gap-2">
            <button className="hover:text-orange-400 font-bold text-xs">A-</button>
            <button className="hover:text-orange-400 font-bold text-sm">A</button>
            <button className="hover:text-orange-400 font-bold text-lg">A+</button>
          </div>

          <div className="h-3 w-px bg-gray-600"></div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-orange-400">
            <Globe size={12} />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer text-xs appearance-none"
            >
              <option className="text-black">English</option>
              <option className="text-black">हिन्दी</option>
              <option className="text-black">मराठी</option>
            </select>
            <ChevronDown size={10} />
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 transition-all duration-300 border-b-[3px] border-orange-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white py-4"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Replaced SVG with a more official looking placeholder structure */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="National Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            <div className="h-10 w-px bg-gray-300 mx-1 hidden sm:block"></div>

            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-blue-900 leading-none tracking-tight">
                PROJECT <span className="text-orange-600">INTEGRITY</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 font-bold tracking-wider uppercase mt-1">
                Infrastructure Audit & Transparency Portal
              </p>
            </div>
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search audits, projects..."
                className="pl-9 pr-4 py-1.5 rounded-full border border-gray-300 text-sm w-48 focus:w-64 transition-all duration-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={16} />
            </div>

            {/* Navigation Links */}
            <nav className="flex gap-5 text-sm font-semibold text-gray-700">
              <Link href="/dashboard" className="relative group hover:text-blue-800 transition-colors py-2">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/dashboard" className="relative group hover:text-blue-800 transition-colors py-2">
                Public Audits
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/mapview" className="relative group hover:text-blue-800 transition-colors py-2">
                Open Data
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/legal" className="relative group hover:text-blue-800 transition-colors py-2">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href="/auditview">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 gap-2 h-9"
                >
                  <AlertTriangle size={16} />
                  Report Issue
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white gap-2 shadow-md h-9"
                >
                  <UserCircle size={16} />
                  Citizen Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Search className="text-gray-600" size={24} />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* 3. News Ticker (Marquee) */}
      <div className="bg-gray-100 border-b border-gray-200 overflow-hidden py-1.5 flex relative z-30">
        <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-0.5 absolute left-0 top-0 bottom-0 flex items-center z-10 shadow-md">
          LATEST UPDATES
        </div>
        <div className="marquee-container w-full overflow-hidden whitespace-nowrap">
          <motion.div
            className="inline-block text-xs font-medium text-gray-800"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            <span className="mx-4">📢 New Transparency Audit guidelines released for FY 2025-26.</span>
            <span className="mx-4 text-blue-600">•</span>
            <span className="mx-4">🚧 Mumbai Metro Line 3 audit report is now public.</span>
            <span className="mx-4 text-blue-600">•</span>
            <span className="mx-4">✅ 100% Digital verification enabled for road infrastructure projects.</span>
          </motion.div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden shadow-xl"
          >
            <div className="p-4 flex flex-col gap-4">
              <Link href="/dashboard" className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">Dashboard</Link>
              <Link href="/dashboard" className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">Public Audits</Link>
              <Link href="/mapview" className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">Open Data</Link>
              <Link href="/legal" className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">Services</Link>
              <Link href="/legal" className="text-base font-medium text-gray-700 border-b border-gray-100 pb-2">Contact</Link>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link href="/auditview" className="w-full">
                  <Button variant="outline" className="w-full justify-center border-red-200 text-red-600">
                    Grievance
                  </Button>
                </Link>
                <Link href="/login" className="w-full">
                  <Button className="w-full justify-center bg-blue-900">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};