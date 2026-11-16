"use client";

import Link from "next/link";
import DiasporaForm from "@/components/DiasporaForm";

export default function MembershipPage() {
  const chapters = [
    {
      region: "North America",
      focus: "Investment syndication, agroforestry capital & trade linkages with East Coast & Midwest markets.",
    },
    {
      region: "Europe",
      focus: "Specialty food imports (coffee, dried fruits, vanilla) & European organic certification standards.",
    },
    {
      region: "Middle East",
      focus: "Horticulture cold-chain logistics, meat export standards & sovereign fund partnerships.",
    },
    {
      region: "East Africa",
      focus: "On-the-ground project monitoring, outgrower schemes & cross-border EAC agricultural trade.",
    },
    {
      region: "Southern & Central Africa",
      focus: "Agricultural machinery exchange, seed technology & regional processing knowledge.",
    },
    {
      region: "Asia & Australia",
      focus: "Solar irrigation technology adoption, farm mechanization & bulk agro-commodity contracts.",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#131c33] via-[#1b2238] to-[#0f2744] text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            JOIN UDAN TODAY
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Connect to a structured global ecosystem that promotes investment, innovation, trade, and knowledge exchange within Uganda&apos;s agricultural sector.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#register" className="pill-btn pill-green text-xs sm:text-sm px-6 py-2.5">
              Register Online
            </a>
            <a href="#benefits" className="pill-btn pill-blue text-xs sm:text-sm px-6 py-2.5">
              Explore Benefits
            </a>
          </div>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* MEMBERSHIP BENEFITS */}
        <section id="benefits" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              Why Join UDAN?
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              UDAN transforms your connection with Uganda from informal uncertainty into high-impact, professional success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#1377a4] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f3f8] text-[#1377a4] flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Curated Deal Flow</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Access screened and structured agribusiness opportunities across production, processing, export, and agritech sectors with due diligence reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#63b849] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#f0f9ed] text-[#63b849] flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Priority Program Access</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Early notification and guaranteed consideration for participation in UDAN accelerators, trade missions, investment roundtables, and masterclasses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#c6ac62] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#faf6eb] text-[#c6ac62] flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Market Access Platform</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Exclusive directory access linking verified Ugandan producers, farmer cooperatives, and international buyers for direct contract negotiations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#131c33] transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-[#131c33] flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Policy &amp; Institutional Voice</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct advocacy representation with MoFA, MAAIF, URA, and UIA to safeguard diaspora assets, tax incentives, and fair trade regulations.
              </p>
            </div>
          </div>
        </section>

        {/* REGIONAL & COUNTRY CHAPTERS */}
        <section id="chapters" className="scroll-mt-32 bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              UDAN Global Chapters
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Our regional chapters provide grassroots organizing, local networking events, and collaborative investment clubs in your country of residence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-3">{ch.region}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{ch.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN UDAN REGISTRATION FORM */}
        <div id="apply" className="scroll-mt-32" />
        <section id="register" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Join UDAN Today
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete the diaspora application form to join the Uganda Diaspora in Agribusiness Network. The Secretariat will verify your profile, link you to your regional chapter, and grant you access to curated agribusiness opportunities and our B2B trade platform.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Direct B2B Market Access</p>
                  <p>Connect with vetted buyers, commercial sellers, and verified suppliers across Uganda and the global diaspora.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Data Protection &amp; Privacy</p>
                  <p>All information is managed securely in compliance with Ugandan and international data privacy regulations.</p>
                </div>
                <div className="p-4 bg-[#faf6eb] rounded-xl border border-[#c6ac62]/40 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Immediate Confirmation</p>
                  <p>An email confirmation will be sent upon submission with portal access instructions and chapter onboarding details.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
              <DiasporaForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
