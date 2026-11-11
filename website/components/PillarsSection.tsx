"use client";

import { useState } from "react";
import Link from "next/link";

interface PillarDetail {
  id: string;
  number: string;
  title: string;
  badge: string;
  color: string;
  bgColor: string;
  accentColor: string;
  description: string;
  overview: string;
  focusAreas: {
    title: string;
    description: string;
  }[];
  partners: string[];
  outcomes: string;
  programLink: string;
}

export default function PillarsSection() {
  // Track expanded state for each pillar card (in-place Learn More / Learn Less)
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({});

  const togglePillar = (id: string) => {
    setExpandedPillars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /*
  // ===========================================================================
  // PRESERVED POPUP MODAL STATE (COMMENTED OUT TO TEST IN-LINE ACCORDION AS REQUESTED)
  // ===========================================================================
  const [selectedPillar, setSelectedPillar] = useState<PillarDetail | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPillar(null);
      }
    };
    if (selectedPillar) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPillar]);
  */

  const pillars: PillarDetail[] = [
    {
      id: "investments",
      number: "01",
      title: "Diaspora Investments",
      badge: "Capital Mobilization",
      color: "border-[#1377a4] text-[#1377a4]",
      bgColor: "bg-[#e8f3f8]",
      accentColor: "#1377a4",
      description:
        "Mobilizing and crowding in diaspora capital for high-yield, climate-smart agribusinesses across production, processing, cold-chain, and export.",
      overview:
        "Mobilizing and structuring diaspora capital is central to UDAN's mandate. By establishing transparent, de-risked co-investment pipelines, UDAN transforms informal remittances into productive agricultural assets, commercial agribusinesses, and youth-led enterprises.",
      focusAreas: [
        {
          title: "Diaspora Investment Vehicles & Crowdfunding",
          description:
            "Structured collective investment syndicates enabling diaspora members to pool resources into vetted agribusiness ventures with institutional governance and risk mitigation.",
        },
        {
          title: "Rigorous Due Diligence & Audits",
          description:
            "Comprehensive pre-investment vetting of legal titles, land tenure security, agronomic viability, and financial bookkeeping overseen by the UDAN Secretariat.",
        },
        {
          title: "High-Growth Agribusiness Pipeline",
          description:
            "Curated investment opportunities across high-value chains including Hass avocado, macadamia, coffee, aquaculture, dairy processing, and post-harvest storage.",
        },
        {
          title: "Commercial Banking & Private Equity",
          description:
            "Partnerships with agricultural banks, credit guarantee facilities, and venture funds to provide blended finance and working capital for scaling ventures.",
        },
      ],
      partners: [
        "Ministry of Foreign Affairs (MoFA)",
        "Uganda Investment Authority (UIA)",
        "Bank of Uganda",
        "Commercial Banks",
        "UN-FAO",
      ],
      outcomes:
        "Direct equity deployment, verified investor tracking, and sustainable capital returns that create dignified agricultural jobs for Ugandan youth.",
      programLink: "/programs#investments",
    },
    {
      id: "policy",
      number: "02",
      title: "Policy & Advocacy",
      badge: "Systemic Reform",
      color: "border-[#63b849] text-[#63b849]",
      bgColor: "bg-[#f0f9ed]",
      accentColor: "#63b849",
      description:
        "Advocating for enabling policies, diaspora agribusiness incentives, land tenure security, and green agricultural standards in collaboration with MoFA and MAAIF.",
      overview:
        "UDAN serves as an authoritative collective voice for policy and systemic reform in Uganda's agri-food sector. We interface directly with government ministries and development agencies to foster an enabling regulatory environment for diaspora investors and agricultural exporters.",
      focusAreas: [
        {
          title: "Diaspora Agribusiness Incentives",
          description:
            "Advocating for preferential tax frameworks, duty waivers on agricultural machinery imports, and transparent export rebates with URA and the Ministry of Finance.",
        },
        {
          title: "Land Tenure Security & Legal Protections",
          description:
            "Collaborating with the Ministry of Lands and Uganda Land Commission to safeguard diaspora agricultural land purchases and resolve customary ownership disputes.",
        },
        {
          title: "Climate & Green Policy Briefs",
          description:
            "Publishing evidence-based policy briefs advocating for national climate adaptation funding, green finance mechanisms, and agroecological standards.",
        },
        {
          title: "National Development Alignment",
          description:
            "Aligning diaspora capital mobilization directly with Uganda Vision 2040, the Parish Development Model (PDM), and national food security strategies.",
        },
      ],
      partners: [
        "Ministry of Foreign Affairs (MoFA Diaspora Department)",
        "Ministry of Agriculture (MAAIF)",
        "Uganda Revenue Authority (URA)",
        "Uganda Land Commission",
        "NEMA",
      ],
      outcomes:
        "De-risked policy environment, legally protected agricultural investments, and recognized status for diaspora agripreneurs in national economic planning.",
      programLink: "/programs#policy",
    },
    {
      id: "technology",
      number: "03",
      title: "Technology",
      badge: "Agritech & Mechanization",
      color: "border-[#c6ac62] text-[#c6ac62]",
      bgColor: "bg-[#faf6eb]",
      accentColor: "#c6ac62",
      description:
        "Fostering adoption of smart irrigation, precision agriculture, and fintech remittance channels designed specifically for transparent farm financing.",
      overview:
        "Bridging the gap between global technological innovations and Ugandan smallholders. UDAN catalyzes the deployment of climate-smart farming technologies, precision agriculture tools, and specialized fintech remittance channels to modernize production.",
      focusAreas: [
        {
          title: "Smart Solar Irrigation & Precision Agritech",
          description:
            "Deploying solar-powered water pumping, IoT soil sensors, and drip irrigation kits enabling smallholders to maintain steady production regardless of weather shocks.",
        },
        {
          title: "Fintech & Transparent Farm Remittance",
          description:
            "Tailored mobile money and escrow remittance channels allowing diaspora sponsors to directly fund certified inputs and equipment with real-time audit receipts.",
        },
        {
          title: "Post-Harvest Cold Chains & Storage",
          description:
            "Introducing solar cold-storage rooms, mobile grain dryers, and hermetic storage bags to eliminate post-harvest crop losses and extend market shelf-life.",
        },
        {
          title: "Innovation Showcases & Youth Hackathons",
          description:
            "Convening youth developers, researchers, and diaspora tech founders to co-create scalable digital solutions for agricultural logistics and advisory.",
        },
      ],
      partners: [
        "Makerere University (CAES)",
        "NARO (National Agricultural Research Organisation)",
        "AgriTech Startups",
        "Innovation Hubs",
        "Telecom Providers",
      ],
      outcomes:
        "Increased farm productivity, climate resilience against erratic drought, and reduced post-harvest losses from 35% to under 8%.",
      programLink: "/programs#technology",
    },
    {
      id: "markets",
      number: "04",
      title: "Market Access",
      badge: "B2B Trade & Exports",
      color: "border-[#1377a4] text-[#1377a4]",
      bgColor: "bg-[#e8f3f8]",
      accentColor: "#1377a4",
      description:
        "Connecting verified Ugandan cooperatives and agro-processors directly to diaspora buyers, international wholesalers, and specialized export markets.",
      overview:
        "Eliminating inefficient intermediary broker chains by establishing direct trade connections between verified Ugandan farming cooperatives and diaspora-owned wholesale, retail, and restaurant businesses in Europe, North America, the Gulf, and regional EAC markets.",
      focusAreas: [
        {
          title: "B2B Trade Platform & Verified Directory",
          description:
            "A digital marketplace listing audited Ugandan cooperatives, processors, and aggregators alongside registered diaspora wholesalers and retail distributors.",
        },
        {
          title: "Export Quality Certification & Standards",
          description:
            "Technical guidance assisting local producers to achieve GlobalGAP, SPS (Sanitary & Phytosanitary), and organic export certifications required by EU and UK buyers.",
        },
        {
          title: "Cold-Chain Logistics & Freight Consolidation",
          description:
            "Aggregating smallholder shipments to negotiate discounted cargo freight rates with airlines and maritime shippers, ensuring cold-chain integrity from farm to fork.",
        },
        {
          title: "International Trade Fairs & Road Shows",
          description:
            "Organizing virtual and physical exhibitions showcasing Ugandan specialty produce including premium coffee, dried fruits, macadamia, and shea butter.",
        },
      ],
      partners: [
        "Uganda Export Promotion Board (UEPB)",
        "Uganda Free Zones Authority (UFZA)",
        "Ministry of Trade (MTIC)",
        "Uganda Airlines Cargo",
        "Diaspora Importers",
      ],
      outcomes:
        "Secured off-taker purchase contracts, guaranteed fair prices for smallholders, and steady supply lines of authentic Ugandan produce in global markets.",
      programLink: "/programs#market-access",
    },
    {
      id: "capacity",
      number: "05",
      title: "Capacity Building",
      badge: "Knowledge & Mentorship",
      color: "border-[#63b849] text-[#63b849]",
      bgColor: "bg-[#f0f9ed]",
      accentColor: "#63b849",
      description:
        "Equipping youth agripreneurs and diaspora investors through the UDAN Talk Series, practical business modeling, and cross-border mentorship.",
      overview:
        "UDAN acts as a premier knowledge and capability hub. We empower youth agripreneurs with operational and financial skills while providing diaspora investors with rigorous agribusiness investment training and cross-border mentorship networks.",
      focusAreas: [
        {
          title: "Youth Agripreneur Mentorship",
          description:
            "Pairing vetted young founders with experienced diaspora professionals for coaching on financial modeling, operational scaling, and export readiness.",
        },
        {
          title: "Investor Education & Financial Literacy",
          description:
            "Comprehensive training modules on agribusiness financial models, due diligence checklists, risk mitigation, and regulatory compliance in Uganda.",
        },
        {
          title: "UDAN Agri Talk Series Masterclasses",
          description:
            "Monthly virtual masterclasses bringing together researchers, policymakers from UN-FAO and MoFA, and industry leaders to analyze critical agribusiness themes.",
        },
        {
          title: "Incubator & Accelerator Linkages",
          description:
            "Collaborating with local and diaspora-linked enterprise hubs to prepare early-stage ventures for pitch competitions and commercial seed funding.",
        },
      ],
      partners: [
        "UN-FAO",
        "Ministry of Foreign Affairs (MoFA)",
        "Youth Forward Champion Network (YOFCHAN)",
        "Regional Incubators",
        "IOM",
      ],
      outcomes:
        "A growing cadre of financially literate diaspora investors and investment-ready youth agribusinesses driving Uganda's rural transformation.",
      programLink: "/programs#youth-matchmaking",
    },
  ];

  const pillarEmojis: Record<string, string> = {
    investments: "💰",
    policy: "📋",
    technology: "💡",
    markets: "🌍",
    capacity: "🎓",
  };

  return (
    <section id="pillars" className="py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1b2238] tracking-tight mb-3 animate-fadeIn">
            Five Strategic Pillars of Agribusiness Transformation
          </h2>
          <p className="font-body text-gray-600 text-sm sm:text-base leading-relaxed">
            UDAN operates through five mutually reinforcing pillars designed to align diaspora capital, expertise, and networks with national development priorities.
          </p>
        </div>

        {/* 5 Cards Grid with items-start for smooth in-place expansion */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-start animate-fadeIn">
          {pillars.map((pillar) => {
            const isExpanded = !!expandedPillars[pillar.id];

            return (
              <div
                key={pillar.id}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-l-4 ${
                  isExpanded ? "border-[#1377a4] ring-1 ring-[#1377a4]/30" : "border-gray-100"
                } flex flex-col justify-between group`}
                style={{ borderLeftColor: pillar.accentColor }}
              >
                <div>
                  {/* Emoji icon above badge/number row */}
                  <span className="text-2xl sm:text-3xl block mb-2" aria-hidden="true">
                    {pillarEmojis[pillar.id]}
                  </span>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${pillar.bgColor} ${pillar.color}`}
                    >
                      {pillar.badge}
                    </span>
                    <span className="font-heading text-2xl font-black text-gray-400 group-hover:text-[#1377a4] transition-colors">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Expanded Content (shown when user taps Learn More) */}
                  {isExpanded && (
                    <div className="mt-4 pt-3.5 border-t border-gray-100 space-y-3.5 text-xs text-gray-700 animate-fadeIn">
                      <div className="p-3 bg-[#f4f8fb] rounded-lg border border-[#1377a4]/15">
                        <span className="text-[9.5px] uppercase font-bold tracking-widest text-[#1377a4] block mb-1">
                          Strategic Mandate
                        </span>
                        <p className="text-[11.5px] leading-relaxed text-gray-800">
                          {pillar.overview}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                          Key Focus Areas:
                        </span>
                        <ul className="space-y-1.5 text-[11px] text-gray-600">
                          {pillar.focusAreas.map((area, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-[#63b849] font-bold mt-0.5">&bull;</span>
                              <div>
                                <strong className="text-gray-800 font-semibold">{area.title}:</strong>{" "}
                                <span>{area.description}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1.5">
                          Institutional Partners:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pillar.partners.map((partner, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 rounded text-[10px] font-medium"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => togglePillar(pillar.id)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1377a4] hover:text-[#0e5779] uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded
                        ? `Learn less about Pillar ${pillar.number}: ${pillar.title}`
                        : `Learn more about Pillar ${pillar.number}: ${pillar.title}`
                    }
                  >
                    <span>{isExpanded ? "Learn Less" : "Learn More"}</span>
                    <span aria-hidden="true">{isExpanded ? "↑" : "→"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*
        ========================================================================
        PRESERVED POPUP MODAL (COMMENTED OUT TEMPORARILY AS REQUESTED TO TRY IN-LINE ACCORDION)
        ========================================================================
        {selectedPillar && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Pillar ${selectedPillar.number}: ${selectedPillar.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPillar(null)}
          >
            <div
              className="relative max-w-4xl sm:max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 bg-[#131c33] text-white border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-heading font-bold text-sm text-[#63b849] border border-white/15">
                    {selectedPillar.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#c6ac62] font-bold uppercase tracking-widest block">
                        UDAN Strategic Pillar
                      </span>
                      <span className="text-gray-400 text-xs">&bull;</span>
                      <span className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider">
                        {selectedPillar.badge}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPillar(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg leading-none cursor-pointer"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-gray-700 font-body text-xs sm:text-sm leading-relaxed">
                <div className="p-4 sm:p-5 bg-[#f4f8fb] rounded-xl border border-[#1377a4]/20 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1377a4] block">
                    Strategic Mandate &amp; Overview
                  </span>
                  <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-medium">
                    {selectedPillar.overview}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[#1b2238]">
                      Key Strategic Focus Areas
                    </h4>
                    <span className="text-[11px] font-semibold text-gray-400">
                      4 Core Initiatives
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
                    {selectedPillar.focusAreas.map((area, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-[#1377a4]/40 hover:shadow-sm transition-all space-y-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#1377a4] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <h5 className="font-heading font-bold text-xs sm:text-sm text-[#1b2238]">
                            {area.title}
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-7">
                          {area.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">
                      Strategic Institutional Partners
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPillar.partners.map((partner, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 bg-white rounded-md border border-gray-200 text-[11px] font-medium text-gray-700 shadow-2xs"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-[#63b849] font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#63b849]" />
                      <span className="uppercase tracking-widest text-[10px]">
                        Expected Impact &amp; Value Creation
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {selectedPillar.outcomes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                  Uganda Diaspora in Agribusiness Network (UDAN)
                </span>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <Link
                    href={selectedPillar.programLink}
                    onClick={() => setSelectedPillar(null)}
                    className="pill-btn pill-blue text-xs py-2 px-4 shadow-sm hover:shadow"
                  >
                    <span>Explore Related Programs</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedPillar(null)}
                    className="pill-btn pill-green text-xs py-2 px-4 cursor-pointer"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      */}
    </section>
  );
}
