import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/HeroSection";
import Stats from "@/components/landing/StatsSection";
import Gallery from "@/components/landing/LaundromatsSection";
import HowItWorks from "@/components/landing/HowItWorksSection";
import Services from "@/components/landing/ServicesSection";
import PromoSection from "@/components/landing/BusinessSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      dir="rtl"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Gallery />
        <HowItWorks />
        <Services />
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
}
