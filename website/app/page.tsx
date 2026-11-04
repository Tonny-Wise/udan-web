import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import PillarsSection from "@/components/PillarsSection";
import EndorsementsSection from "@/components/EndorsementsSection";
import FloatingEventButton from "@/components/FloatingEventButton";

export default function Home() {
  return (
    <>
      {/* 1. Hero Banner with Photographic Backdrop, 5 Pillars & Updated Metrics */}
      <Hero />

      {/* 2. Organizational Introduction with Mission & Vision */}
      <Welcome />

      {/* 3. The 5 Strategic Pillars of UDAN */}
      <PillarsSection />

      {/* 4. Endorsements & Partner Reflections */}
      <EndorsementsSection />

      {/* 5. Floating Glowing Event Callout */}
      <FloatingEventButton />
    </>
  );
}
