import Image from "next/image";

export default function Welcome() {
  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="welcome-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Prominent Highlight Visual */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-gray-100 border border-gray-100">
              <Image
                src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/homepage-about-section.jpeg"
                alt="Connecting Diaspora Capital to Uganda Agribusiness"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Narrative & Mission / Vision (Crisp, summarized) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 id="welcome-heading" className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] tracking-tight leading-tight">
              Connecting Diaspora Capital to Uganda&apos;s Agribusiness
            </h2>

            <p className="font-body text-gray-600 text-xs sm:text-sm leading-relaxed">
              UDAN connects global diaspora investors with vetted Ugandan agripreneurs, turning informal remittances into structured, high-yield agricultural ventures.
            </p>

            <blockquote className="border-l-4 border-[#63b849] pl-3 py-1 italic text-gray-700 font-heading text-xs sm:text-sm bg-[#f0f9ed] rounded-r-lg">
              &ldquo;Beyond remittances, we transfer technology, open export markets, and mentor youth to build scalable agribusinesses.&rdquo;
              <span className="block mt-1 font-body text-[11px] font-bold text-[#1377a4] not-italic">
                Andrew Bamugye, UDAN Executive Secretary
              </span>
            </blockquote>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#1b2238] uppercase tracking-wider">
                    Our Mission
                  </h3>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Mobilizing diaspora capital and technical skills to empower youth and transform rural agriculture.
                </p>
              </div>

              <div className="p-3.5 bg-[#e8f3f8] rounded-xl border border-[#1377a4]/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#1b2238] uppercase tracking-wider">
                    Our Vision
                  </h3>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  A thriving, climate-resilient Ugandan agri-food sector powered by diaspora innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
