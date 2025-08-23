'use client'

import HeroSection from "./components/hero";
import FeaturesSection from "./components/features";
// import LogoCloud from "./components/logo-cloud";
import IntegrationsSection from "./components/integrations";
import FooterSection from "./components/Footer";
import { PricingSectionDemo } from "./components/princing-page";
import StatsSection from "./components/stats";
// import Metalic from "./components/metalic";
// import BlobCursor from "./components/BlobCursor/BlobCursor";
// import { TestimonialsColumn } from "./components/testimonials";
import Testimonials from "./components/Testimonials/page";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden overflow-y-clip">
      {/* Cursor layer (kept but inert) */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {/* <BlobCursor ... /> */}
      </div>

      {/* HERO */}
      <HeroSection />

      {/* CONTENT pulled over hero.
          Use matching negative margin to remove bottom reserved space */}
      <div
        className="
          -translate-y-[850px] -mb-[850px]
          md:-translate-y-[600px] md:-mb-[600px]
          lg:-translate-y-[850px] lg:-mb-[850px]
          relative z-10
        "
      >
        {/* <LogoCloud /> */}
        <StatsSection />
        <FeaturesSection />
        <IntegrationsSection />
        <Testimonials />
        {/* <PricingSectionDemo /> */}
        <FooterSection />
      </div>

      {/* <Metalic /> */}
    </main>
  );
}
