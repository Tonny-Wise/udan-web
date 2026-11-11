import Image from "next/image";

export default function Welcome() {
  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] relative overflow-hidden" aria-labelledby="welcome-heading">
      {/* Subtle decorative diagonal stripe pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #1377a4 0px, #1377a4 1px, transparent 0px, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
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
            <h2 id="welcome-heading" className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] tracking-tight leading-tight">
              Connecting Diaspora Capital to Uganda&apos;s Agribusiness
            </h2>

            <p className="font-body text-gray-600 text-xs sm:text-sm leading-relaxed">
              UDAN connects global diaspora investors with vetted Ugandan agripreneurs, turning informal remittances into structured, high-yield agricultural ventures.
            </p>

            <blockquote className="border-l-[6px] border-[#63b849] pl-5 py-3 italic text-gray-700 font-heading text-sm sm:text-base bg-[#e8f7e1] rounded-r-lg shadow-sm">
              <span className="font-semibold">&ldquo;Beyond remittances, we transfer technology, open export markets, and mentor youth to build scalable agribusinesses.&rdquo;</span>
              <span className="block mt-1 font-body text-[11px] font-bold text-[#1377a4] not-italic">
                Andrew Bamugye, UDAN Executive Secretary
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
