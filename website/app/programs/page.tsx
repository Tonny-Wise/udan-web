import Image from "next/image";
import Link from "next/link";
import YouthCohortGallery from "@/components/YouthCohortGallery";
import ProgramInfoModal from "@/components/ProgramInfoModal";

export const metadata = {
  title: "Programs & Initiatives | UDAN Diaspora",
  description:
    "Explore the Diaspora Youth Matchmaking Programme, UDAN Talk Series, Agri-Food Investment Vehicles, and B2B Market Access initiatives.",
};

export default function ProgramsPage() {
  const matchingSteps = [
    {
      num: "01",
      step: "Expression of Interest",
      desc: "Youth agripreneurs and diaspora investors register profiles detailing value chain focus, experience, and capital capacity.",
    },
    {
      num: "02",
      step: "Screening & Selection",
      desc: "Rigorous technical vetting of agronomic viability, financial records, land tenure security, and environmental compliance.",
    },
    {
      num: "03",
      step: "Business Modelling & Structuring",
      desc: "Technical assistance in refining unit economics, financial projections, governance structures, and climate adaptation metrics.",
    },
    {
      num: "04",
      step: "Investor Pitch Sessions",
      desc: "Curated virtual pitch events connecting vetted youth founders with matched diaspora investors based on shared sector interests.",
    },
    {
      num: "05",
      step: "Funding & Capital Deployment",
      desc: "Formal legal agreements, escrow setup, milestone-based capital disbursement, and procurement of climate-smart inputs.",
    },
    {
      num: "06",
      step: "Follow-up & Mentorship",
      desc: "Continuous cross-border advisory, quarterly monitoring reports, farm visits by local field officers, and market linkages.",
    },
  ];

  const talkArchive = [
    {
      series: "Talk Series 4",
      date: "22 November 2025",
      title: "Harnessing Diaspora Innovation and Investment to Transform Urban Food Systems in Uganda",
      description: "Convening diaspora agri-innovators and investors to accelerate technology, logistics, and sustainable financing for urban food systems.",
    },
    {
      series: "Talk Series 5",
      date: "October 18, 2026",
      title: "Climate Action and Green Investment",
      description: "Diaspora as Catalysts for Resilience and Migration Solutions",
    },
  ];

  const topYouth = [
    {
      name: "Nakiranda Jesca",
      enterprise: "JESSIE COCOA CRAFT",
      location: "Iganga, Uganda",
      sector: "Horticulture & Cold Chain Storage",
      faceImage: "/images/youth-cohort/nakiranda-jesca-face.png",
      detailsImage: "/images/youth-cohort/nakiranda-jesca.jpeg",
    },
    {
      name: "Nangobi Victoria",
      enterprise: "BUSOGA FLOWER FOOD COMPANY",
      location: "Jinja, Uganda",
      sector: "Smart Solar Irrigation & Soil Testing",
      faceImage: "/images/youth-cohort/nangobi-victoria-face.png",
      detailsImage: "/images/youth-cohort/nangobi-victoria.jpeg",
    },
    {
      name: "Muhoozi Allan",
      enterprise: "AGROWISE FARM INPUTS LTD",
      location: "Sheema District, Uganda",
      sector: "Post-Harvest Agro-Processing",
      faceImage: "/images/youth-cohort/muhoozi-allan-face.png",
      detailsImage: "/images/youth-cohort/muhoozi-allan.jpeg",
    },
    {
      name: "Ali Walter",
      enterprise: "KING OF KINGS MIC FARM LTD",
      location: "Kitgum, Uganda",
      sector: "Oilseed & Livestock Feed",
      faceImage: "/images/youth-cohort/ali-walter-face.png",
      detailsImage: "/images/youth-cohort/alii-walter.jpeg",
    },
    {
      name: "Namwaya Emily",
      enterprise: "HERTECH FOUNDATION",
      location: "Busia, Uganda",
      sector: "Organic Farming & Honey Value Addition",
      faceImage: "/images/youth-cohort/namwaya-emily-face.png",
      detailsImage: "/images/youth-cohort/emily-namwaya.jpeg",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Page Header */}
      <section className="bg-[#131c33] text-white py-24 sm:py-32 lg:py-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            Our Programs
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Delivering practical programs that mobilize capital, facilitate market access, deploy digital technologies, and empower the next generation of agripreneurs.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* PROGRAM 1: DIASPORA YOUTH MATCHMAKING PROGRAMME */}
        <section id="youth-matchmaking" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1b2238] leading-tight">
                Diaspora Youth Matchmaking Programme
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                The <strong>Diaspora Youth Matchmaking Programme</strong> directly addresses the twin challenges of youth unemployment in Uganda and the lack of reliable, de-risked investment channels for diaspora citizens.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                By pairing vetted young Ugandan agripreneurs with diaspora investors, mentors, and technical specialists, the programme creates commercially viable, climate-resilient agribusiness ventures that create local jobs and generate sustainable investor returns.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="font-heading font-bold text-sm text-[#1377a4]">Who It&apos;s For</div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    Young agripreneurs running registered farming, processing, or agritech enterprises with proof of traction, looking to connect with diaspora investors and experienced mentors.
                  </p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="font-heading font-bold text-sm text-[#63b849]">Investor Benefit</div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    Direct equity or debt co-investment into audited businesses backed by UDAN Secretariat field monitoring.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <ProgramInfoModal
                  programId="matchmaking"
                  buttonText="Learn More About Matchmaking"
                  buttonClassName="pill-btn pill-blue text-xs font-semibold inline-flex items-center gap-1.5 py-2.5 px-5 shadow-sm hover:shadow"
                />
              </div>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/2] bg-gray-50 border border-gray-200/60 order-1 lg:order-2">
              <Image
                src="/images/youthmatchmaking.jpg"
                alt="Diaspora Youth Matchmaking Programme"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 6-STEP MATCHING PROCESS */}
          <div id="matching-process" className="scroll-mt-32 pt-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b2238] mt-1">
                The 6-Step Matchmaking Process
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                A structured, milestone-driven framework ensuring investor security and venture growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matchingSteps.map((s) => (
                <div
                  key={s.num}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#63b849] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="font-heading font-bold text-2xl text-[#c6ac62] block mb-1.5">{s.num}</span>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b2238] mb-1.5">{s.step}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2025 CALL FOR APPLICATIONS PORTAL */}
          <div id="call-for-applications" className="scroll-mt-32 mt-14 p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2.5">
                <span className="px-3 py-0.5 rounded-full bg-gray-700 text-white text-[10px] font-bold uppercase tracking-widest inline-block">
                  Applications Closed
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b2238]">
                  2025 Matchmaking Programme Call for Applications
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Applications for the 2025 cohort are officially closed. Thank you to all youth-led agribusinesses and diaspora investors who submitted expressions of interest. Selected finalists and cohort profiles are highlighted below.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                <div className="w-full text-center px-4 py-2.5 rounded-full bg-gray-200 text-gray-500 font-bold text-xs border border-gray-300 select-none cursor-not-allowed">
                  Applications Closed
                </div>
                <a
                  href="/documents/Diaspora-Youth-Matchmaking-Guidelines.docx"
                  download="UDAN-Matchmaking-Guidelines.docx"
                  className="w-full text-center pill-btn pill-outline border-[#1377a4] text-[#1377a4] text-xs justify-center hover:bg-[#1377a4] hover:text-white transition-colors"
                >
                  <span>Download Guidelines</span>
                </a>
              </div>
            </div>
          </div>

          {/* TOP FIVE IN YOUTH MATCHMAKING */}
          <div className="pt-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mt-1">
                Top 5 agripreneurs from the 2026 Diaspora - Youth matchmaking program
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Spotlighting exemplary young Ugandan agripreneurs. Tap any card to flip and view full venture details.
              </p>
            </div>

            <YouthCohortGallery youthList={topYouth} />
          </div>

          {/* 2026 DIASPORA - YOUTH MATCHMAKING PROGRAM FEATURED COHORT */}
          <div className="pt-20">
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1b2238] tracking-tight">
                2026 Diaspora - Youth Matchmaking Program
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                These carefully vetted youth agripreneurs were selected through the 2026 Agriprenuers Matchmaking Program. They lead innovative and scalable agricultural ventures across Uganda and are actively seeking strategic partnership, investment opportunities, market access, and knowledge exchange with the diaspora community to accelerate growth and create lasting impact.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-50">
              <Image
                src="/images/matchmaking-programme-2026.jpeg"
                alt="2026 Diaspora - Youth Matchmaking Program"
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* PROGRAM 2: UDAN TALK SERIES */}
        <section id="talk-series" className="scroll-mt-32 p-6 sm:p-10 rounded-2xl bg-gray-50 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238]">
                UDAN Agri Talk Series
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                The UDAN Agri Talk Series convenes monthly virtual masterclasses bringing together diaspora agri-investors, technical researchers, and policy leaders from UN-FAO, the Ministry of Foreign Affairs, and financial institutions to discuss key agribusiness themes.
              </p>
              <div className="pt-1">
                <ProgramInfoModal
                  programId="talk-series"
                  buttonText="Learn More About Talk Series"
                  buttonClassName="pill-btn pill-blue text-xs font-semibold inline-flex items-center gap-1.5 py-2.5 px-5 shadow-sm hover:shadow"
                  learnMoreImage="/images/udan-talk-series-learn-more.jpeg"
                />
              </div>
              <div className="space-y-2.5 pt-1">
                {talkArchive.map((talk, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[#1377a4] transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] bg-[#e8f3f8] px-2 py-0.5 rounded">
                        {talk.series}
                      </span>
                      <span className="text-[11px] text-[#63b849] font-bold">{talk.date}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#1b2238] leading-snug">
                      {talk.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                      {talk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 order-1 lg:order-2">
              <Image
                src="/images/udan-talk-series-main.jpeg"
                alt="UDAN Talk Series & High-level Panel"
                width={1000}
                height={750}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* PROGRAM 3: AGRI-FOOD INVESTMENTS */}
        <section id="investments" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl aspect-[3/2] bg-gray-100 border border-gray-200/60">
              <Image
                src="/images/PHOTO-2026-11-02-18-16-04.jpg"
                alt="Agri-Food Investments & Due Diligence"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Agri-Food Investments
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                UDAN establishes structured investment mechanisms to crowd in diaspora capital into high-growth agricultural value chains including Hass avocado, macadamia, dairy processing, aquaculture, and grain storage.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="font-heading font-bold text-sm text-[#1377a4]">Diaspora Investment Vehicle</div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    Syndicated co-investment pooling diaspora capital into vetted commercial agribusinesses with verified milestone-based escrow governance.
                  </p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="font-heading font-bold text-sm text-[#63b849]">Due Diligence &amp; De-Risking</div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    Field-audited title verification, financial due diligence, and Secretariat oversight across 12 high-priority value chains.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <ProgramInfoModal
                  programId="investments"
                  buttonText="Learn More About Agri-Food Investments"
                  buttonClassName="pill-btn pill-blue text-xs font-semibold inline-flex items-center gap-1.5 py-2.5 px-5 shadow-sm hover:shadow"
                  learnMoreImage="/images/PHOTO-2026-11-02-18-22-12.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM 4: MARKET ACCESS */}
        <section id="market-access" className="scroll-mt-32 p-8 sm:p-12 rounded-2xl bg-[#e8f3f8] border border-[#1377a4]/20">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
                Market Access Platform
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
                Directly linking Ugandan cooperatives, certified outgrowers, and agro-processors with diaspora-owned wholesalers, supermarkets, and specialty food distributors abroad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-heading font-bold text-base text-[#1b2238] mb-1">1. Verified Producer Directory</h4>
                <p className="text-xs text-gray-600">Access registered farmer groups and certified processors with validated production volumes and sanitary certifications.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-heading font-bold text-base text-[#1b2238] mb-1">2. Buyer Listings</h4>
                <p className="text-xs text-gray-600">Diaspora retailers, restaurants, and international importers publish procurement requests for Ugandan coffee, vanilla, and dried fruits.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-heading font-bold text-base text-[#1b2238] mb-1">3. Trade Facilitation</h4>
                <p className="text-xs text-gray-600">Logistics coordination, customs assistance with URA and UEPB, phytosanitary inspection, and export cargo consolidation.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
