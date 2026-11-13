import Image from "next/image";

export default function EndorsementsSection() {
  const endorsements = [
    {
      from: "Ambassador MJ Muhindo",
      role: "Head of Diaspora Department",
      org: "Ministry of Foreign Affairs (MoFA)",
      image: "/Use this for ambassador 2.jpeg",
      quote:
        "The Ministry of Foreign Affairs views the Ugandan diaspora as indispensable partners in nation-building. Through UDAN, we are creating institutional avenues where diaspora expertise and capital can transform our agricultural landscapes, generate youth employment, and drive export revenue.",
    },
    {
      from: "Edward Tanyiima",
      role: "National Policy Officer",
      org: "UN-FAO Uganda",
      image: "/Edward tanyima 2.jpeg",
      quote:
        "FAO is proud to partner with UDAN and the Government of Uganda to promote diaspora investments in agriculture. Aligning diaspora financial flows with climate-smart practices and youth entrepreneurship is vital for sustainable food systems transformation.",
    },
    {
      from: "Andrew Bamugye",
      role: "Executive Secretary",
      org: "UDAN Secretariat",
      image: "/Andrew- UDAN Executive.jpeg",
      quote:
        "Our mission at UDAN is to replace the historical risk and uncertainty of informal remittances with transparent, professionally managed agribusiness opportunities. Together with our partners, we are building a legacy of green growth and generational wealth.",
    },
  ];

  return (
    <section id="endorsements" className="py-16 sm:py-20 bg-[#131c33] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3 animate-fadeIn">
            Endorsements
          </h2>
          <p className="font-body text-gray-300 text-xs sm:text-sm leading-relaxed">
            High-level messages and perspectives from strategic partners championing diaspora investment in Uganda&apos;s agricultural sector.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {endorsements.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1b2a44] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative group hover:border-[#c6ac62]/60"
            >
              {/* Decorative quotation mark */}
              <div className="absolute top-5 right-6 text-5xl text-[#c6ac62]/15 font-serif select-none pointer-events-none group-hover:text-[#c6ac62]/35 transition-colors">
                &ldquo;
              </div>

              {/* Quote Body */}
              <p className="font-body italic text-sm sm:text-base text-gray-200 leading-relaxed mb-6 relative z-10">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author / Endorser Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#c6ac62] shrink-0 shadow-sm transition-all duration-300 group-hover:ring-4 group-hover:ring-[#c6ac62]/40">
                  <Image
                    src={item.image}
                    alt={item.from}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white leading-snug">
                    {item.from}
                  </h4>
                  <p className="text-[11.5px] text-[#63b849] font-medium leading-tight mt-0.5">
                    {item.role}
                  </p>
                  <p className="text-[10.5px] text-gray-400 font-medium">
                    {item.org}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
