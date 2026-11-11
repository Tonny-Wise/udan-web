import Link from "next/link";

export const metadata = {
  title: "Resources",
  description:
    "Access UDAN governance documents, FAO reports, policy briefs, tax guidelines, and agribusiness investment templates.",
};

export default function ResourcesPage() {
  const videos = [
    {
      title: "Working with Diaspora to Boost Employment Opportunities in Agri-Food Systems in Uganda",
      desc: "Official documentary on how UN-FAO and the Ugandan Government collaborate with diaspora networks to drive youth employment and sustainable rural investment.",
      link: "https://www.fao.org/rural-employment/resources/videos/video-detail/working-with-diaspora-to-boost-employment-opportunities-in-agri-food-systems-in-uganda/en",
    },
    {
      title: "Ugandan Diaspora Agribusiness Conference: FAO & Government Collaboration",
      desc: "Highlights and keynote reflections from the Agribusiness Conference held in collaboration with the Diaspora Department.",
      link: "https://www.fao.org/rural-employment/resources/news-and-stories/detail-news/Ugandan-Diaspora-Agribusiness-Conference---FAO-and-the-Government-of-Uganda-collaborate-to-promote-diaspora-investments-in-agriculture/en",
    },
  ];

  const institutionalLinks = [
    {
      name: "Uganda Revenue Authority (URA)",
      role: "Tax Incentives & Diaspora Remittance Advisory",
      desc: "Official guidance on import duty exemptions for agricultural machinery, greenhouse kits, and diaspora tax treatments.",
      url: "https://ura.go.ug",
    },
    {
      name: "Uganda Investment Authority (UIA)",
      role: "One-Stop Centre for Diaspora Investment",
      desc: "Land acquisition facilitation, investment licenses, and fiscal incentive certificates for agribusiness projects.",
      url: "https://ugandainvest.go.ug",
    },
    {
      name: "Ministry of Foreign Affairs (MoFA)",
      role: "Diaspora Department",
      desc: "Government diaspora policy, consular facilitation, and international bilateral partnerships.",
      url: "https://mofa.go.ug",
    },
    {
      name: "Ministry of Agriculture, Animal Industry & Fisheries (MAAIF)",
      role: "Agricultural Standards & Value Chains",
      desc: "National agricultural transformation policy, seed certification, and climate-smart agriculture strategies.",
      url: "https://agriculture.go.ug",
    },
    {
      name: "Uganda Export Promotion Board (UEPB)",
      role: "Export Market Compliance & Standards",
      desc: "Phytosanitary protocols, EU and Gulf market compliance guidelines, and export trade statistics.",
      url: "https://uepb.go.ug",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#1a2a3a] via-[#131c33] to-[#162238] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            UDAN Resources
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Download governance frameworks, investment templates, policy briefs, and access partner portals supporting diaspora agribusiness in Uganda.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* VIDEOS & PARTNER MULTIMEDIA */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              UN-FAO &amp; Government Collaboration Videos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-2">{vid.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{vid.desc}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <a
                    href={vid.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#63b849] hover:underline"
                  >
                    <span>Watch on FAO Portal</span>
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INSTITUTIONAL PORTAL LINKS */}
        <section>
          <div className="max-w-3xl mb-8">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
             Institutional Portals
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Direct access to Uganda government ministries, tax advisory, and investment promotion authorities.
            </p>
          </div>

          <div className="space-y-3">
            {institutionalLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-[#1377a4] hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1b2238] group-hover:text-[#1377a4] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#63b849] mb-1">{item.role}</div>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-[#1377a4] transition-colors self-end sm:self-center">
                    Visit Portal &#8599;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
