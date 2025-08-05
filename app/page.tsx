'use client'
import Image from "next/image";
import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
import LogoCloud from "./components/logo-cloud";
import IntegrationsSection from "./components/integrations";
import FooterSection from "./components/Footer"; 
import { PricingSectionDemo } from "./components/princing-page";
import BlobCursor from "./components/BlobCursor/BlobCursor";
import StatsSection from "./components/stats";


export default function Home() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full z-50">
      {/* <BlobCursor
        blobType="circle"
        fillColor="#0357d9"
        trailCount={3}
        sizes={[40, 105, 55]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      /> */}
      </div>
      <HeroSection />
      {/* <LogoCloud /> */}
      <StatsSection />
      <FeaturesSection />
      <IntegrationsSection />
      <PricingSectionDemo />
      <FooterSection />
    </div>
  );
}
