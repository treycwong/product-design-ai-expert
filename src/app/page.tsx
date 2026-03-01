import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { LogosBar } from "@/components/landing/LogosBar";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Models } from "@/components/landing/Models";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#080b12" }}>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        {/* <LogosBar /> */}
        <Problem />
        <HowItWorks />
        <Features />
        <Models />
        <Pricing />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
