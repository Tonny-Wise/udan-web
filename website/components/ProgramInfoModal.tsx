"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProgramInfoModalProps {
  programId: "matchmaking" | "talk-series" | "investments";
  buttonText?: string;
  buttonClassName?: string;
  learnMoreImage?: string;
}

export default function ProgramInfoModal({
  programId,
  buttonText = "Learn More",
  buttonClassName = "pill-btn pill-blue text-xs inline-flex items-center gap-1.5 py-2 px-4 shadow-sm hover:shadow",
  learnMoreImage,
}: ProgramInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
        aria-label={`Learn more about ${
          programId === "matchmaking"
            ? "Diaspora Youth Matchmaking Programme"
            : programId === "talk-series"
            ? "UDAN Agri Talk Series"
            : "Agri-Food Investments & Diaspora Investment Vehicle"
        }`}
      >
        <span>{buttonText}</span>
        <span aria-hidden="true">&rarr;</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-5xl lg:max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#131c33] text-white border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#63b849]" />
                <div>
                  <span className="text-[10px] text-[#c6ac62] font-bold uppercase tracking-widest block">
                    UDAN Flagship Initiative
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    {programId === "matchmaking"
                      ? "Diaspora Youth Matchmaking Programme"
                      : programId === "talk-series"
                      ? "UDAN Agri Talk Series Programme"
                      : "Agri-Food Investments & Diaspora Investment Vehicle"}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-gray-700 font-body text-xs sm:text-sm leading-relaxed">
              {/* Program Featured Visual Banner */}
              <div className="space-y-3">
                <div className="bg-[#f0f7fa] border-l-4 border-[#1377a4] p-4 rounded-r-xl">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1377a4] block">
                    Programme Framework &amp; Focus
                  </span>
                  <h4 className="font-heading font-bold text-base sm:text-xl text-[#1b2238]">
                    {programId === "matchmaking"
                      ? "Empowering Uganda's Youth Through Diaspora Capital & Markets"
                      : programId === "talk-series"
                      ? "Thought Leadership & High-Level Policy Dialogues"
                      : "Mobilizing Diaspora Capital for Scalable, Climate-Resilient Agribusiness"}
                  </h4>
                </div>

                <div
                  className={`relative mx-auto rounded-xl overflow-hidden shadow-md bg-gray-100 border border-gray-200 ${
                    programId === "investments" || programId === "matchmaking"
                      ? "max-w-2xl w-full"
                      : "w-full"
                  }`}
                  style={{ aspectRatio: 'auto' }}
                >
                  <Image
                    src={
                      programId === "matchmaking"
                        ? "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/045A8992.jpg"
                        : programId === "talk-series"
                        ? learnMoreImage || "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/agri-talk-series.jpeg"
                        : learnMoreImage || "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/PHOTO-2026-11-02-18-22-12.jpg"
                    }
                    alt={
                      programId === "matchmaking"
                        ? "Diaspora Youth Matchmaking Programme"
                        : programId === "talk-series"
                        ? "UDAN Agri Talk Series"
                        : "Agri-Food Investments & Due Diligence"
                    }
                    width={800}
                    height={600}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* PROGRAM 1: MATCHMAKING DETAILS */}
              {programId === "matchmaking" && (
                <div className="space-y-6">
                  {/* Overview */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Overview &amp; Purpose
                    </h4>
                    <p>
                      Ugandan agribusinesses face significant challenges, including limited access to
                      finance, inadequate technology, low production capacity, and restricted market
                      access. Meanwhile, the Ugandan diaspora remains an immense, untapped resource with
                      the financial resources, technical expertise, and commercial networks needed to
                      transform the agri-food sector.
                    </p>
                    <p>
                      The <strong>Diaspora Youth Agribusiness Matchmaking Programme</strong> is a joint
                      flagship initiative between the <strong>Food and Agriculture Organization (UN-FAO)</strong> and
                      the <strong>Uganda Diaspora in Agribusiness Network (UDAN)</strong>. It connects
                      prescreened Ugandan youth-led agribusinesses (aged 18 to 30) with Ugandan diaspora
                      investors and mentors to facilitate capital investment, technology transfer, and
                      direct agricultural export channels.
                    </p>
                  </div>

                  {/* Strategic Partners */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <h5 className="font-heading font-bold text-sm text-[#1b2238] uppercase tracking-wide">
                      Strategic Institutional Partners
                    </h5>
                    <p className="text-xs text-gray-600">
                      To deliver this initiative, UDAN collaborates closely with:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#131c33] pt-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#63b849]" />
                        <span>Food and Agriculture Organization (UN-FAO)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1377a4]" />
                        <span>Ministry of Foreign Affairs (MoFA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#63b849]" />
                        <span>Ministry of Agriculture, Animal Industry &amp; Fisheries (MAAIF)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1377a4]" />
                        <span>Uganda Investment Authority (UIA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#63b849]" />
                        <span>Uganda Free Zones &amp; Export Promotions Authority (UFZEPA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1377a4]" />
                        <span>Young Farmers Champions Network (YOFCHAN)</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Programme Objectives */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Specific Programme Objectives
                    </h4>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      <li>
                        <strong>Increase Export Market Access:</strong> Connect verified youth producers
                        directly to diaspora buyers and international wholesale distributors.
                      </li>
                      <li>
                        <strong>Expand Enterprise Capacity:</strong> Upgrade youth production and
                        processing capabilities to meet global phytosanitary and export standards.
                      </li>
                      <li>
                        <strong>Attract Diaspora Capital:</strong> Channel diaspora remittances away from
                        informal consumption into structured, high-yield agricultural ventures.
                      </li>
                      <li>
                        <strong>Support Export Readiness:</strong> Address key bottlenecks in certification,
                        sanitary compliance, modern packaging, and cold-chain logistics.
                      </li>
                      <li>
                        <strong>Promote Climate Resilience:</strong> Integrate climate-smart, adaptive
                        practices such as solar drip irrigation, agroforestry, and organic soil health.
                      </li>
                      <li>
                        <strong>Facilitate Transparent Financing:</strong> Establish transparent due diligence
                        and monitoring frameworks to safeguard diaspora investments.
                      </li>
                    </ul>
                  </div>

                  {/* The 6-Step Matchmaking Pathway */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      The 6-Step Matchmaking Journey
                    </h4>
                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#1377a4]">
                          <span className="w-5 h-5 rounded-full bg-[#1377a4] text-white flex items-center justify-center text-[10px]">
                            1
                          </span>
                          <span>Expression of Interest (EOI) for Agripreneurs</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Annual public call published across UDAN platforms in collaboration with YOFCHAN
                          to identify registered, high-potential youth agribusinesses ready for scale.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#63b849]">
                          <span className="w-5 h-5 rounded-full bg-[#63b849] text-white flex items-center justify-center text-[10px]">
                            2
                          </span>
                          <span>Screening &amp; Enterprise Due Diligence</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Rigorous desktop evaluation, founder background verification, physical farm audits,
                          and financial track-record assessments to establish verified business health.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#c6ac62]">
                          <span className="w-5 h-5 rounded-full bg-[#c6ac62] text-[#131c33] flex items-center justify-center text-[10px]">
                            3
                          </span>
                          <span>Enterprise Development &amp; Pitch Deck Modeling</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Diagnostic reports, business improvement plans, investor pitch preparation, and
                          targeted workshops on climate-smart resilience to ensure full investment readiness.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#1377a4]">
                          <span className="w-5 h-5 rounded-full bg-[#1377a4] text-white flex items-center justify-center text-[10px]">
                            4
                          </span>
                          <span>Annual Diaspora Expression of Interest Call</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Call disseminated across Ugandan diaspora organizations and MoFA diplomatic missions
                          to profile diaspora investors, mentors, and trade partners with relevant sector experience.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#63b849]">
                          <span className="w-5 h-5 rounded-full bg-[#63b849] text-white flex items-center justify-center text-[10px]">
                            5
                          </span>
                          <span>Matching, NDAs &amp; Bilateral Deal Structuring</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Project staff facilitate non-disclosure agreements (NDAs), bilateral virtual meetings,
                          investor due diligence, and formal partnership contract signing with clear workplans.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#c6ac62]">
                          <span className="w-5 h-5 rounded-full bg-[#c6ac62] text-[#131c33] flex items-center justify-center text-[10px]">
                            6
                          </span>
                          <span>12-Month Post-Matching Support &amp; Climate Action Awards</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-7">
                          Active monitoring against set milestones, mentorship tracking, case study documentation,
                          and annual award presentations celebrating top performers at the national convention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROGRAM 2: TALK SERIES DETAILS */}
              {programId === "talk-series" && (
                <div className="space-y-6">
                  {/* Overview */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Overview &amp; Purpose
                    </h4>
                    <p>
                      The <strong>UDAN Agri Talk Series</strong> is an annual thought leadership and knowledge
                      sharing programme designed to bring together Uganda&apos;s diaspora, local agripreneurs,
                      government agencies, development partners, and private sector leaders to engage on key
                      issues shaping Uganda&apos;s agricultural transformation.
                    </p>
                    <p>
                      Conducted across three virtual masterclass sessions annually, the series bridges global
                      expertise with local grassroots opportunities by convening diaspora innovators, investors,
                      technical specialists, and policy actors who contribute directly to Uganda&apos;s agri-food
                      and climate resilience agenda.
                    </p>
                    <blockquote className="border-l-4 border-[#63b849] pl-3 py-1.5 italic text-gray-700 bg-[#f0f9ed] rounded-r-lg">
                      &ldquo;The programme&apos;s strength lies in bringing specialists together to speak sense,
                      share evidence, offer solutions, and remind us that Uganda&apos;s development is too
                      important to be left to good intentions alone. Expertise is required, and the diaspora has
                      plenty of it.&rdquo;
                    </blockquote>
                  </div>

                  {/* Core Purpose & Objectives */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Core Objectives of the Talk Series
                    </h4>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      <li>
                        <strong>Strengthen Diaspora Engagement:</strong> Deepen diaspora participation in
                        Uganda&apos;s commercial agribusiness and climate-development agenda.
                      </li>
                      <li>
                        <strong>Foster Cross-Sector Collaboration:</strong> Connect diaspora capital with local
                        farmers, regulatory authorities (URA, UEPB, UIA), and financial institutions.
                      </li>
                      <li>
                        <strong>Showcase Scalable Innovations:</strong> Spotlight practical models in export
                        logistics, precision irrigation, and value addition.
                      </li>
                      <li>
                        <strong>Inform Policy Pipelines:</strong> Document actionable insights to inform
                        government incentives, export standards, and future UDAN support programs.
                      </li>
                      <li>
                        <strong>Mobilize Tangible Linkages:</strong> Transform virtual dialogue into active B2B
                        trading contracts, investment syndicates, and mentorship matches.
                      </li>
                    </ul>
                  </div>

                  {/* 3 Signature Virtual Sessions & Themes */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Signature Talk Series Sessions &amp; Themes
                    </h4>
                    <div className="space-y-4 pt-1">
                      {/* Session 1 */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] block">
                          Talk Series 1
                        </span>
                        <h5 className="font-heading font-bold text-base text-[#1b2238]">
                          Diaspora as Catalysts for Uganda&apos;s Agri-Export Growth: Investment, Innovation &amp; Market Access
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Focused on diaspora exporters, importers, and value chain experts leveraging retail
                          and digital networks in the UK, EU, UAE, and North America. Tackled sanitary
                          certification standards with UEPB, cold-chain preservation, and digital B2B matchmaking
                          to eliminate informal middlemen.
                        </p>
                        <div className="pt-2 text-xs font-semibold text-[#63b849] flex items-center gap-1.5">
                          <span>Key Outcome:</span>
                          <span className="text-gray-700 font-normal">
                            Formation of diaspora-market trade groups and follow-up export clinics.
                          </span>
                        </div>
                      </div>

                      {/* Session 2 */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] block">
                          Talk Series 2
                        </span>
                        <h5 className="font-heading font-bold text-base text-[#1b2238]">
                          Financing Climate-Smart Agribusiness: Blended Capital &amp; Risk Mitigation
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Conducted in partnership with UN-FAO and financial specialists. Explored structured
                          co-investment funds, green credit lines, crop insurance frameworks, and practical
                          technologies protecting farm yields against severe drought and weather volatility.
                        </p>
                        <div className="pt-2 text-xs font-semibold text-[#63b849] flex items-center gap-1.5">
                          <span>Key Outcome:</span>
                          <span className="text-gray-700 font-normal">
                            Direct linkages between diaspora syndicates and agricultural commercial banks.
                          </span>
                        </div>
                      </div>

                      {/* Session 3 */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c6ac62] block">
                          Talk Series 3
                        </span>
                        <h5 className="font-heading font-bold text-base text-[#1b2238]">
                          Urban Food Systems &amp; Agri-Tech Innovations
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Featured high-level panelists from Makerere University, Kampala Capital City
                          Authority (KCCA), and youth innovators. Showcased urban hydroponics, rooftop organic
                          gardening, smart solar irrigation, and mobile distribution applications for city food
                          security.
                        </p>
                        <div className="pt-2 text-xs font-semibold text-[#63b849] flex items-center gap-1.5">
                          <span>Key Outcome:</span>
                          <span className="text-gray-700 font-normal">
                            Diaspora co-funding of youth urban hydroponics and KCCA urban agriculture guidelines.
                          </span>
                        </div>
                      </div>

                      {/* Session 4 */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] block">
                            Talk Series 4
                          </span>
                          <span className="text-[11px] font-bold text-[#63b849]">
                            22 November 2025
                          </span>
                        </div>
                        <h5 className="font-heading font-bold text-base text-[#1b2238]">
                          Harnessing Diaspora Innovation and Investment to Transform Urban Food Systems in Uganda
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Focuses on deploying diaspora capital, technology, and market linkages into Uganda&apos;s urban and peri-urban food ecosystems. Explores smart city agricultural logistics, cold-chain storage, indoor and rooftop farming, and digital market hubs that enhance urban food security and youth employment.
                        </p>
                        <div className="pt-2 text-xs font-semibold text-[#63b849] flex items-center gap-1.5">
                          <span>Key Focus:</span>
                          <span className="text-gray-700 font-normal">
                            Mobilizing diaspora investments for sustainable, resilient urban food value chains.
                          </span>
                        </div>
                      </div>

                      {/* Session 5 */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] block">
                            Talk Series 5
                          </span>
                          <span className="text-[11px] font-bold text-[#63b849]">
                            October 18, 2026
                          </span>
                        </div>
                        <h5 className="font-heading font-bold text-base text-[#1b2238]">
                          Climate Action and Green Investment
                        </h5>
                        <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                          Diaspora as Catalysts for Resilience and Migration Solutions
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Highlights diaspora capital as an engine for climate resilience, regenerative agriculture, and green investment in Uganda. Addresses how sustainable agribusiness opportunities provide durable migration solutions, stabilizing rural communities vulnerable to climate disruption.
                        </p>
                        <div className="pt-2 text-xs font-semibold text-[#63b849] flex items-center gap-1.5">
                          <span>Key Focus:</span>
                          <span className="text-gray-700 font-normal">
                            Green investment pipelines, renewable agritech, and climate resilience solutions.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROGRAM 3: AGRI-FOOD INVESTMENTS DETAILS */}
              {programId === "investments" && (
                <div className="space-y-6">
                  {/* Overview & Mandate */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Overview &amp; Investment Mandate
                    </h4>
                    <p>
                      Mobilizing and crowding in diaspora capital into Uganda&apos;s agri-food sector is central to UDAN&apos;s core mission. While agriculture employs over 70% of Uganda&apos;s population and provides the bulk of export revenue, high-potential commercial enterprises and youth-led agribusinesses often face a critical financing shortfall.
                    </p>
                    <p>
                      UDAN serves as an institutional bridge connecting Ugandan diaspora capital, international private equity, and development finance with bankable, climate-smart agribusiness opportunities. Through structured co-investment vehicles, verified due diligence, and active Secretariat field monitoring, we de-risk agricultural investments and convert passive family remittances into scalable, productive equity and debt portfolios that yield financial returns and durable community impact.
                    </p>
                  </div>

                  {/* Quick Key Statistics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 bg-[#f0f7fa] rounded-xl border border-[#1377a4]/20 text-center">
                      <span className="font-heading font-bold text-2xl sm:text-3xl text-[#1377a4] block">
                        $1.5M+
                      </span>
                      <span className="text-[11px] text-gray-600 font-semibold block mt-1">
                        Diaspora Capital Targeted &amp; Mobilized
                      </span>
                    </div>
                    <div className="p-4 bg-[#f2f9ed] rounded-xl border border-[#63b849]/20 text-center">
                      <span className="font-heading font-bold text-2xl sm:text-3xl text-[#63b849] block">
                        500+
                      </span>
                      <span className="text-[11px] text-gray-600 font-semibold block mt-1">
                        Screened Agri-Enterprises &amp; Pioneers
                      </span>
                    </div>
                    <div className="p-4 bg-[#fdf9ee] rounded-xl border border-[#c6ac62]/30 text-center">
                      <span className="font-heading font-bold text-2xl sm:text-3xl text-[#c6ac62] block">
                        12
                      </span>
                      <span className="text-[11px] text-gray-600 font-semibold block mt-1">
                        High-Impact Priority Value Chains
                      </span>
                    </div>
                    <div className="p-4 bg-[#f5f5f7] rounded-xl border border-gray-200 text-center">
                      <span className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] block">
                        100%
                      </span>
                      <span className="text-[11px] text-gray-600 font-semibold block mt-1">
                        Field-Audited Due Diligence Oversight
                      </span>
                    </div>
                  </div>

                  {/* Why Invest in Uganda's Agri-Food Sector */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Why Invest in Uganda&apos;s Agri-Food Sector
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#1377a4]" />
                          <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                            Natural Agricultural Endowments
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Over 80% of Uganda&apos;s land is arable, with dual annual rainy seasons supporting bi-annual harvest cycles, deep volcanic soil fertility, and extensive freshwater networks across the Great Lakes basin.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#63b849]" />
                          <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                            Strategic Regional Food Basket
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Uganda is centrally positioned as the primary food supplier to the East African Community (EAC), unlocking access to an expanding regional market of 300+ million consumers across Kenya, DRC, South Sudan, Rwanda, and the wider AfCFTA trade area.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#c6ac62]" />
                          <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                            Youth Demographic Dividend &amp; Tech Adoption
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Over 70% of Uganda&apos;s population is under 30. A new generation of tech-savvy agripreneurs is adopting precision agritech, mobile soil sensors, solar irrigation, and e-commerce platforms to accelerate commercial productivity.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#131c33]" />
                          <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                            Robust Government Support &amp; Tax Incentives
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          The Government of Uganda offers aggressive investment incentives: 10-year income tax exemptions for agro-exporters, zero-rated import duties on farm machinery, and 100% foreign ownership rights.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Priority Investment Opportunities & Value Chains */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      Priority Investment Opportunities &amp; Value Chains
                    </h4>
                    <p className="text-xs text-gray-600">
                      UDAN structures direct co-investment opportunities across six core commercial verticals with verified demand, favorable margins, and clear export pathways:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] block">
                          Vertical 1: Horticulture
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          High-Value Commercial Tree Crops
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Hass avocado orchards, macadamia nut processing, mango pulp extraction, and export-grade organic vanilla curing. Supported by secured international off-taker agreements in Europe and the Middle East.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] block">
                          Vertical 2: Agro-Processing
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          Specialty Processing &amp; Value Addition
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Cocoa craft confectionery, specialty Arabica and Robusta micro-lot washing stations, chili powder dehydration, and natural fruit drying operations that multiply raw crop valuations.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c6ac62] block">
                          Vertical 3: Grains &amp; Feed
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          Commercial Grain Silos &amp; Feed Milling
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Bulk maize and soybean aggregation hubs, modern moisture-controlled metal silo storage complexes, sunflower oil expelling, and formulation of high-protein animal feeds.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] block">
                          Vertical 4: Livestock &amp; Dairy
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          Modern Dairy &amp; Cattle Feedlots
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Solar-powered milk chilling collection centers, pasteurization packaging plants, zero-grazing beef fattening feedlots, and climate-controlled commercial poultry breeding units.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] block">
                          Vertical 5: Aquaculture
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          Lake Victoria Commercial Aquaculture
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Deep-water floating cage tilapia operations on Lake Victoria, certified catfish fingerling hatcheries, and eco-friendly extruded floating fish feed production lines.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b2238] block">
                          Vertical 6: Agri-Tech
                        </span>
                        <h5 className="font-heading font-bold text-sm text-[#1b2238]">
                          Climate-Smart &amp; Post-Harvest Tech
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Off-grid solar drip irrigation installations, mobile digital soil testing clinics, refrigerated cold-chain aggregation vans, and supply chain farm traceability software.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Diaspora Investment Vehicle (DIV) Framework */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      The Diaspora Investment Vehicle (DIV) Framework
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To overcome individual investment risks, distance barriers, and project execution challenges, UDAN champions the <strong>Diaspora Investment Vehicle (DIV)</strong> model. This collective investment framework allows diaspora individuals and regional diaspora groups to pool funds safely into audited commercial ventures with transparent legal governance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#1377a4]">
                          <span className="w-5 h-5 rounded-full bg-[#1377a4] text-white flex items-center justify-center text-[10px]">
                            1
                          </span>
                          <span>Deal Sourcing &amp; Pipeline Curation</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-7">
                          Target agribusinesses are identified through UDAN regional chapters, district local governments, and youth accelerator pipelines based on market traction, clear unit economics, and scalable business plans.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#63b849]">
                          <span className="w-5 h-5 rounded-full bg-[#63b849] text-white flex items-center justify-center text-[10px]">
                            2
                          </span>
                          <span>Rigorous Due Diligence &amp; Legal Audits</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-7">
                          The UDAN Secretariat conducts exhaustive due diligence: land title verification at Ministry of Lands registries, historical financial audits, regulatory compliance, and environmental/climate resilience assessments.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#c6ac62]">
                          <span className="w-5 h-5 rounded-full bg-[#c6ac62] text-white flex items-center justify-center text-[10px]">
                            3
                          </span>
                          <span>Ring-Fenced Escrow &amp; Milestone Tranches</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-7">
                          Invested capital is placed in ring-fenced escrow accounts managed with regulated financial trustees. Capital is released to farm enterprises in staged tranches strictly tied to verified operational milestones.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#1b2238]">
                          <span className="w-5 h-5 rounded-full bg-[#1b2238] text-white flex items-center justify-center text-[10px]">
                            4
                          </span>
                          <span>Secretariat Monitoring &amp; Impact Reporting</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-7">
                          Continuous on-site field visits by UDAN technical officers, combined with drone imagery and digital farm logs. Investors receive quarterly financial and agronomic progress reports and independent annual audits.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Institutional Partnerships & Regulatory Links */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <h5 className="font-heading font-bold text-sm text-[#1b2238] uppercase tracking-wide">
                      Strategic Institutional Partnerships &amp; Regulatory Linkages
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      UDAN coordinates seamlessly with Uganda&apos;s leading regulatory authorities, ministries, and international agencies to ensure investor protection, tax compliance, and legal integrity:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#1377a4] block">Uganda Investment Authority (UIA)</span>
                        <p className="text-gray-600 text-[11px]">Investment licensing, One-Stop Centre facilitation, investor certificates, and serviced land allocation in business parks.</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#63b849] block">Uganda Revenue Authority (URA)</span>
                        <p className="text-gray-600 text-[11px]">Guidance on agricultural tax incentives, zero-rated VAT on inputs, and 10-year income tax exemptions for agro-exporters.</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#131c33] block">Ministry of Foreign Affairs (MoFA)</span>
                        <p className="text-gray-600 text-[11px]">Diaspora Department investor protection, bilateral trade diplomacy, and cross-border remittance policy integration.</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#1377a4] block">Ministry of Agriculture (MAAIF)</span>
                        <p className="text-gray-600 text-[11px]">National food policy, export phytosanitary sanitary clearance, certified seed inputs, and extension coordination.</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#63b849] block">Uganda Export Promotion Board (UEPB)</span>
                        <p className="text-gray-600 text-[11px]">International trade exhibition corridors, export documentation, and bilateral market access under AGOA and AfCFTA.</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                        <span className="font-bold text-[#c6ac62] block">UN-FAO &amp; Commercial Banks</span>
                        <p className="text-gray-600 text-[11px]">Blended finance mechanisms, Bank of Uganda Agricultural Credit Facility (ACF) access, and climate resilience frameworks.</p>
                      </div>
                    </div>
                  </div>

                  {/* How Diaspora Investors Engage */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-xl text-[#1b2238] border-b border-gray-200 pb-2">
                      How Diaspora Investors Engage
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                        <span className="font-heading font-bold text-sm text-[#1377a4] block">Step 1</span>
                        <h6 className="font-bold text-xs text-[#1b2238]">Join UDAN Network</h6>
                        <p className="text-[11px] text-gray-600">Enrol as a verified member to register your investment profile and sector preferences.</p>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                        <span className="font-heading font-bold text-sm text-[#63b849] block">Step 2</span>
                        <h6 className="font-bold text-xs text-[#1b2238]">Review Deal Catalog</h6>
                        <p className="text-[11px] text-gray-600">Access curated investment pitch decks, audited financial models, and feasibility dossiers.</p>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                        <span className="font-heading font-bold text-sm text-[#c6ac62] block">Step 3</span>
                        <h6 className="font-bold text-xs text-[#1b2238]">Briefings &amp; Site Visits</h6>
                        <p className="text-[11px] text-gray-600">Participate in virtual founder Q&amp;A sessions or guided on-site farm inspections in Uganda.</p>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                        <span className="font-heading font-bold text-sm text-[#1b2238] block">Step 4</span>
                        <h6 className="font-bold text-xs text-[#1b2238]">Co-Invest &amp; Track</h6>
                        <p className="text-[11px] text-gray-600">Execute syndicate term sheets, fund via escrow, and receive quarterly verified monitoring reports.</p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action Banner */}
                  <div className="p-5 rounded-xl bg-[#131c33] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h5 className="font-heading font-bold text-base text-white">
                        Ready to Invest in Uganda&apos;s Agrifood Transformation?
                      </h5>
                      <p className="text-xs text-gray-300">
                        Connect directly with our investment facilitation desk to discuss syndicates, deal pipelines, and co-investment models.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href="/membership"
                        className="pill-btn pill-green text-xs py-2 px-4 whitespace-nowrap"
                      >
                        <span>Join Membership</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500 font-semibold">
                Uganda Diaspora in Agribusiness Network (UDAN)
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="pill-btn pill-green text-xs py-1.5 px-4"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
