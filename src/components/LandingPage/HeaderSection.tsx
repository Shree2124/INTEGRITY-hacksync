"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  AlertTriangle,
  UserCircle,
} from "lucide-react";
import Link from "next/link"; // Import Link from Next.js

interface HeaderProps {
  onGetStarted?: () => void; // Made optional as we now have direct links
}

// Define routes for consistency across Desktop and Mobile
const NAV_LINKS = [
  { name: "Public Audits", href: "/auditdata" },
  { name: "Open Data", href: "/opendata" },
  { name: "About Us", href: "/aboutus" },
];

export const Header: React.FC<HeaderProps> = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white sticky top-0 z-40 transition-all duration-300 border-b-[3px] border-orange-500 ${
          scrolled
            ? " backdrop-blur-md shadow-lg py-2"
            : " py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo Section (Link to Home) */}
          <Link href="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="relative w-10 h-10 sm:w-40 sm:h-12 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            <div className="h-10 w-px bg-gray-300 mx-1 hidden sm:block"></div>

          </Link>

          {/* Desktop Search & Nav */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Navigation Links */}
            <nav className="flex gap-5 text-sm font-semibold text-gray-700">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group hover:text-blue-800 transition-colors py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href="/reportissue">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 gap-2 h-9"
                >
                  <AlertTriangle size={16} />
                  Report Issue
                </Button>
              </Link>
              
              <Link href="/login">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white gap-2 shadow-md h-9 flex items-center px-4 rounded-md font-semibold">
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
              {isMobileMenuOpen ? (
                <X className="text-gray-800" />
              ) : (
                <Menu className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden shadow-xl absolute w-full z-30"
          >
            <div className="p-4 flex flex-col gap-4">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-gray-700 border-b border-gray-100 pb-2 hover:text-orange-600"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link href="/report" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50"
                  >
                     <AlertTriangle size={16} className="mr-2"/> Report Issue
                  </Button>
                </Link>
                
                <Link href="/login" className="w-full">
                  <Button
                    className="w-full justify-center bg-blue-900 hover:bg-blue-800"
                  >
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