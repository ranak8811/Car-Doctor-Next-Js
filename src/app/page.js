import Link from "next/link";
import ServicesSection from "./components/ServicesSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import TeamSection from "@/components/TeamSection";
import CoreFeatures from "@/components/CoreFeatures";

export const metadata = {
  title: "Home",
  description: "Car Doctor Home Page",
};

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <TeamSection />
      <CoreFeatures />
    </div>
  );
}
