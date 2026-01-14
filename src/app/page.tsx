"use client";
import React from "react";
import { ChatBot } from "../components/LandingPage/ChatBot";
import { Header } from "../components/LandingPage/HeaderSection";
import { HeroSection } from "../components/LandingPage/HeroSection";
import { ProcessSection } from "../components/LandingPage/ProcessSection";
import { FeaturesSection } from "../components/LandingPage/FeaturesSection";
import { CTASection } from "../components/LandingPage/CTASection";
import { FooterSection } from "../components/LandingPage/FooterSection";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <ChatBot />
      <Header onGetStarted={onGetStarted} />
      {/* <MarqueeSection /> */}
      <HeroSection onGetStarted={onGetStarted} />
      {/* <StatsSection /> */}
      <ProcessSection />
      <FeaturesSection />
      <CTASection onGetStarted={onGetStarted} />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
