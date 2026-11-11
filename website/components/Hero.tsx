import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full bg-[#0b0f19] text-white overflow-hidden min-h-[calc(100dvh-4.5rem)] sm:min-h-[calc(100dvh-5rem)] flex flex-col justify-between">
      {/* Real Photographic Background Layer with Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-matchmaking.jpeg"
          alt="UDAN Youth Agripreneurs and Diaspora Innovation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Neutral dark contrast overlay - no blue tint */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10 flex-1 flex flex-col items-center justify-center text-center">
        {/* Main Title */}
        <h1
          className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl max-w-3xl tracking-tight text-white mb-2.5 leading-snug drop-shadow-md animate-fadeInUp"
        >
          Mobilizing Diaspora Capital, Innovation &amp; Knowledge For Uganda&apos;s Agri-Food Transformation
        </h1>

        {/* Subhead */}
        <p
          className="font-body text-[11px] sm:text-xs lg:text-[13px] max-w-xl text-gray-200 mb-4 leading-relaxed drop-shadow animate-fadeInUp"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Connecting diaspora investors, youth agripreneurs, development partners, and policy champions to build sustainable, climate-smart food systems.
        </p>

        {/* Action CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 animate-fadeInUp"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          <Link href="/programs#youth-matchmaking" className="pill-btn pill-green text-xs shadow-md hover:shadow-lg py-1.5 px-4">
            <span>Youth Matchmaking</span>
          </Link>
          <Link href="/conference" className="pill-btn pill-gold text-xs shadow-md hover:shadow-lg py-1.5 px-4">
            <span>2025 Awards Highlights</span>
          </Link>
        </div>

        {/* Mission & Vision (Positioned directly below the CTA buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl text-left">
          <div className="p-3 sm:p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-[#63b849]/40 shadow-sm">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-[#63b849] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#63b849]" />
              Our Mission
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-200 leading-relaxed font-body">
              Mobilizing diaspora capital and technical skills to empower youth and transform rural agriculture.
            </p>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-[#c6ac62]/40 shadow-sm">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-[#c6ac62] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c6ac62]" />
              Our Vision
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-200 leading-relaxed font-body">
              A thriving, climate-resilient Ugandan agri-food sector powered by diaspora innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom — visual bridge to the dark sub-section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ zIndex: 5, background: "linear-gradient(to top, #131c33cc, transparent)" }}
      />

      {/* Brand Color Ribbon Strip */}
      <div className="relative z-10 brand-ribbon w-full" />
    </div>
  );
}
