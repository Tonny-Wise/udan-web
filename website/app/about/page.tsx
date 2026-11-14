import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About UDAN | Uganda Diaspora in Agribusiness Network",
  description:
    "Learn about UDAN's mission, governance, leadership, strategic pillars, and secretariat functions connecting the Ugandan diaspora with sustainable agriculture.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "1. Diaspora Investments",
      desc: "Mobilizing and structuring diaspora capital through transparent investment vehicles, rigorous due diligence, and risk mitigation.",
    },
    {
      title: "2. Policy Advocacy",
      desc: "Championing diaspora agribusiness incentives, export duty rationalization, land security, and sustainable standards alongside MoFA & MAAIF.",
    },
    {
      title: "3. Technology & AgriTech",
      desc: "Promoting climate-smart solar irrigation, farm mechanization, and specialized fintech remittance channels for transparent farm tracking.",
    },
    {
      title: "4. Market Access",
      desc: "Building a verified B2B marketplace linking Ugandan cooperatives and agro-processors with diaspora buyers, wholesalers, and international retail chains.",
    },
    {
      title: "5. Capacity Development",
      desc: "Fostering diaspora knowledge transfer, business modeling, investor education, and one-on-one mentorship for youth agripreneurs.",
    },
  ];

  const executiveMembers = [
    {
      name: "Andrew Bamugye",
      role: "Executive Secretary",
      org: "UDAN Secretariat",
      bio: "Leading UDAN's day-to-day operations, strategic partnerships, and diaspora investment facilitation. Dedicated to creating structured, accountable pipelines that convert remittances into productive agricultural assets.",
      image: "/Andrew- UDAN Executive.jpeg",
    },
    {
      name: "Christopher Olobo",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Advising on strategic agribusiness investments, diaspora financing pipelines, and commercial agribusiness structuring across Uganda.",
      image: "/Christopher-UDAN Executive.jpeg",
    },
    {
      name: "Jacob Lubaale",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Supporting global diaspora membership coordination, value chain expansion, and technical knowledge transfer.",
      image: "/Jacob - UDAN.jpeg",
    },
    {
      name: "Livingstone Kyeyune",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Driving commercial agriculture partnerships, agro-processing integration, and direct market access channels.",
      image: "/Livingstone.jpeg",
    },
    {
      name: "Lydia Nakayenze",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Advancing youth and women in agribusiness, sustainable rural enterprises, and community outgrower integration models.",
      image: "/Lydia Nakayenze- UDAN Executive.jpeg",
    },
    {
      name: "Pamela Anyoti Peronaci",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Spearheading international export promotion, specialty agricultural trade corridors, and diaspora market connections.",
      image: "/Pamela- UDAN Executive.jpeg",
    },
    {
      name: "Mukasa Muawiya",
      role: "Executive Member",
      org: "UDAN Executive Committee",
      bio: "Promoting digital technology deployment, farm mechanization, and operational excellence for scalable agri-enterprises.",
      image: "/Mukasa-UDAN Executive.jpeg",
    },
  ];

  const boardOfTrustees = [
    {
      name: "Board of Trustees",
      role: "Governance & Fiduciary Oversight",
      org: "UDAN Board",
      bio: "Distinguished diaspora and Ugandan agricultural leaders providing strategic oversight, fiduciary accountability, and ethical stewardship of all network programs.",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-br from-[#1b2238] via-[#131c33] to-[#0e1a2e] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            About UDAN
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bridging diaspora ambitions with Uganda&apos;s agricultural reality through structured investment, policy advocacy, and youth empowerment.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* SECTION 1: WHO WE ARE */}
        <section id="who-we-are" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] leading-tight">
                Catalyzing Uganda&apos;s Agri-Food Sector Through Diaspora Partnership
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                The <strong>Uganda Diaspora in Agribusiness Network (UDAN)</strong> is an organized platform designed to connect diaspora expertise, financial resources, and commercial networks with Uganda&apos;s vibrant agricultural sector.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Agriculture represents the backbone of Uganda&apos;s economy, employing over 70% of the workforce. At the same time, the Ugandan diaspora remits over $1.2 billion annually. Historically, much of this capital was directed toward consumption or informal family projects with high failure rates. UDAN transforms this paradigm by establishing professional due diligence, structured co-investment vehicles, and direct market access.
              </p>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-gray-100 border border-gray-100 order-1 lg:order-2">
              <Image
                src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/about-us-hero.jpeg"
                alt="UDAN Agri-food Dialogue"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE SERVE */}
        <section id="who-we-serve" className="scroll-mt-32 bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-100">
          <div className="max-w-3xl mb-8">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
              Who We Serve Across The Value Chain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#1377a4] text-white flex items-center justify-center font-bold mb-3">
                01
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] mb-2">Diaspora Investors &amp; Professionals</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Individuals and diaspora business syndicates seeking verified, de-risked agricultural investment opportunities with clear governance and transparent reporting.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#63b849] text-white flex items-center justify-center font-bold mb-3">
                02
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] mb-2">Ugandan Youth Agripreneurs</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dynamic young founders running viable farming, processing, and agritech ventures who require patient growth capital, international mentorship, and market linkages.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#c6ac62] text-[#131c33] flex items-center justify-center font-bold mb-3">
                03
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] mb-2">Institutions &amp; Development Partners</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Government ministries, bilateral agencies (UN-FAO, IOM), and commercial banks seeking a credible partner to channel diaspora finance toward national development goals.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 5 STRATEGIC PILLARS */}
        <section id="pillars" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
              The 5 Pillars of UDAN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-[#1377a4] transition-colors">
                <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-2">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#1377a4] to-[#131c33] text-white flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Engage Our Pillars</h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Join a specific working group or submit an agribusiness project under one of our five strategic pillars.
                </p>
              </div>
              <Link href="/contact" className="pill-btn pill-green mt-4 self-start">
                <span>Inquire</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: LEADERSHIP */}
        <section id="leadership" className="scroll-mt-32 space-y-12">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
              Leadership
            </h2>
          </div>

          {/* 1. Board of Trustees (Positioned above Executive) */}
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b2238] mb-6 text-center">
              Board of Trustees
            </h3>
            <div className="flex justify-center">
              {boardOfTrustees.map((member, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col w-full max-w-sm">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mt-6 border border-gray-200 shadow-inner">
                    <div className="text-gray-400 text-4xl">👥</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between text-center">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#1b2238]">{member.name}</h4>
                      <div className="text-xs font-semibold text-[#1377a4] mb-3">{member.role}</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Executive Members */}
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1b2238] mb-6 text-center">
              Executive Members
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {executiveMembers.map((leader, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col text-center w-full sm:w-[calc(50%-0.6rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.85rem)] max-w-[270px] group hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {/* Square Profile Image Header */}
                  <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                    {leader.image ? (
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#131c33] via-[#1b2b4e] to-[#0f4b66] flex flex-col items-center justify-center text-white p-4">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-heading font-bold text-xl text-white shadow-inner mb-1">
                          {leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-semibold text-center truncate">
                      {leader.org}
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-4 flex-1 flex flex-col justify-center text-center">
                    <div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b2238] leading-snug">
                        {leader.name}
                      </h4>
                      <div className="text-[11px] font-semibold text-[#1377a4] mt-0.5">
                        {leader.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
