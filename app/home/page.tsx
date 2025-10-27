import Image from "next/image";
import Link from "next/link";
import HeroSection from "../Components/HeroSection";
import FeaturesSection from "../Components/FeaturesSection";
import HowItWorksSection from "../Components/HowItWorks";
import WhoItsForSection from "../Components/WhoItsForSection";
import PricingSection from "../Components/PricingSection";
import TestimonialsSection from "../Components/TestimonialsSection";
import CTABanner from "../Components/CTABanner";

export default function Home() {
  return (
   <>
  <HeroSection/>
  <FeaturesSection/>
  <HowItWorksSection/>
  <WhoItsForSection/>
  <PricingSection/>
  <TestimonialsSection/>
  <CTABanner/>
   </>
  );
}
