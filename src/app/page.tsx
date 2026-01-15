"use client";
import React from "react";
import { ChatBot } from "../components/LandingPage/ChatBot";
import { Header } from "../components/LandingPage/HeaderSection";
import { HeroSection } from "../components/LandingPage/HeroSection";
import { ProcessSection } from "../components/LandingPage/ProcessSection";
import { FeaturesSection } from "../components/LandingPage/FeaturesSection";
import { CTASection } from "../components/LandingPage/CTASection";
import { FooterSection } from "../components/LandingPage/FooterSection";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <ChatBot />
      <Header />
      {/* <MarqueeSection /> */}
      <HeroSection />
      {/* <StatsSection /> */}
      <ProcessSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
