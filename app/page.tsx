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
import Metalic from "./components/metalic";
import { TestimonialsColumn } from "./components/testimonials";
import Testimonials from "./components/Testimonials/page";
const testimonials = [
  {
    text: "This all-in-one platform transformed our marketing agency. The advanced automation features and CRM integration helped us scale from 50 to 200 clients seamlessly.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Marketing Agency Owner",
  },
  {
    text: "The funnel builder and email automation are game-changers. We've seen a 300% increase in lead conversion rates since switching to this platform.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Digital Marketing Director",
  },
  {
    text: "The customer support is incredible - they helped us migrate from GoHighLevel and the advanced features are exactly what we needed to grow our business.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Business Coach",
  },
  {
    text: "This platform's advanced features like AI-powered lead scoring and predictive analytics have revolutionized our sales process. ROI increased by 400%.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Sales Director",
  },
  {
    text: "The all-in-one solution with advanced automation, CRM, and marketing tools has streamlined our entire business. We've saved 20 hours per week on manual tasks.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Consulting Firm Owner",
  },
  {
    text: "The advanced funnel capabilities and AI features exceeded our expectations. Our client acquisition cost dropped by 60% within the first quarter.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Growth Marketing Manager",
  },
  {
    text: "Switching from GoHighLevel to this platform was the best decision. The additional features and better pricing structure have transformed our agency's profitability.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Agency Founder",
  },
  {
    text: "The platform's advanced automation and CRM features have helped us manage 500+ clients efficiently. The ROI is incredible compared to other solutions.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Business Consultant",
  },
  {
    text: "This platform's advanced features like AI lead scoring and predictive analytics have helped us increase our conversion rates by 250%. Game-changer for our business.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Entrepreneur",
  },
];

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
      <Testimonials />
      <PricingSectionDemo />
      <FooterSection />
      {/* <Metalic /> */}
    </div>
  );
}
