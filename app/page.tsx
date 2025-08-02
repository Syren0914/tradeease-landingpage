'use client'
import Image from "next/image";
import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
import LogoCloud from "./components/logo-cloud";
import IntegrationsSection from "./components/integrations";
import FooterSection from "./components/Footer"; 
import { PricingSectionDemo } from "./components/princing-page";


export default function Home() {
  return (
    <div>
      
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
      <IntegrationsSection />
      <PricingSectionDemo />
      <FooterSection />
    </div>
  );
}
