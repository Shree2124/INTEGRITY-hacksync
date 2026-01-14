"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ChatBot } from "../components/LandingPage/ChatBot";
import { Header } from "../components/LandingPage/HeaderSection";
import { HeroSection } from "../components/LandingPage/HeroSection";
import { ProcessSection } from "../components/LandingPage/ProcessSection";
import { FeaturesSection } from "../components/LandingPage/FeaturesSection";
import { CTASection } from "../components/LandingPage/CTASection";
import { FooterSection } from "../components/LandingPage/FooterSection";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { user, emailVerified } = useAuth();

  const handleGetStarted = () => {
    // If user is authenticated and verified, go to dashboard
    if (user && emailVerified) {
      router.push('/mapview');
    } else {
      // Otherwise, go to register page
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <ChatBot />
      <Header onGetStarted={handleGetStarted} />
      {/* <MarqueeSection /> */}
      <HeroSection onGetStarted={handleGetStarted} />
      {/* <StatsSection /> */}
      <ProcessSection />
      <FeaturesSection />
      <CTASection onGetStarted={handleGetStarted} />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
