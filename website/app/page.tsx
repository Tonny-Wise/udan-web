import Link from "next/link";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import PillarsSection from "@/components/PillarsSection";
import EndorsementsSection from "@/components/EndorsementsSection";
import FloatingEventButton from "@/components/FloatingEventButton";

export default function Home() {
  return (
    <>
      {/* 1. Hero Banner with Photographic Backdrop */}
      <Hero />

      {/* Hero Sub-Section: 5 Pillars & Metrics — dark bridge between hero and content */}
      <section className="bg-[#131c33] py-8 sm:py-10 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 5 Pillars Strip */}
          <div className="pt-3 border-t border-white/20 w-full">
            <div className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-[#c6ac62] mb-2 text-center">
              The 5 Strategic Pillars
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <Link
                href="/programs#investments"
                className="px-2.5 py-0.5 rounded-full bg-[#1b2238] hover:bg-[#1377a4] text-gray-200 text-[10.5px] font-semibold border border-white/10 transition-all flex items-center gap-1"
              >
                <span>Diaspora Investments</span>
              </Link>
              <Link
                href="/programs#policy"
                className="px-2.5 py-0.5 rounded-full bg-[#1b2238] hover:bg-[#1377a4] text-gray-200 text-[10.5px] font-semibold border border-white/10 transition-all flex items-center gap-1"
              >
                <span>Policy</span>
              </Link>
              <Link
                href="/programs#technology"
                className="px-2.5 py-0.5 rounded-full bg-[#1b2238] hover:bg-[#1377a4] text-gray-200 text-[10.5px] font-semibold border border-white/10 transition-all flex items-center gap-1"
              >
                <span>Technology</span>
              </Link>
              <Link
                href="/programs#market-access"
                className="px-2.5 py-0.5 rounded-full bg-[#1b2238] hover:bg-[#1377a4] text-gray-200 text-[10.5px] font-semibold border border-white/10 transition-all flex items-center gap-1"
              >
                <span>Markets</span>
              </Link>
              <Link
                href="/programs#capacity"
                className="px-2.5 py-0.5 rounded-full bg-[#1b2238] hover:bg-[#1377a4] text-gray-200 text-[10.5px] font-semibold border border-white/10 transition-all flex items-center gap-1"
              >
                <span>Capacity</span>
              </Link>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="pt-3 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full text-center border-b border-white/10 pb-6">
            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[#63b849]">$1.2M+</div>
              <div className="text-[9px] sm:text-[9.5px] text-gray-200 font-semibold uppercase tracking-wider">Agri-Finance Pipeline</div>
            </div>
            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[#c6ac62]">6 Chapters</div>
              <div className="text-[9px] sm:text-[9.5px] text-gray-200 font-semibold uppercase tracking-wider">Global Diaspora Footprint</div>
            </div>
            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[#63b849]">500+</div>
              <div className="text-[9px] sm:text-[9.5px] text-gray-200 font-semibold uppercase tracking-wider">Agri Diaspora Members</div>
            </div>
          </div>

        </div>
      </section>

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
