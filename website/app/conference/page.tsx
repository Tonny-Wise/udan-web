import Image from "next/image";
import Link from "next/link";
import ConferenceGallery from "@/components/ConferenceGallery";
import type { GalleryCategory } from "@/components/ConferenceGallery";
import AwardWinnerModal from "@/components/AwardWinnerModal";
import { createServiceRoleClient } from "@/lib/supabase/server";

export const revalidate = 30; // refresh gallery every 30 seconds

export const metadata = {
  title: "The Annual Diaspora in Agribusiness Conference | UDAN Diaspora",
  description:
    "Discover The Annual Diaspora in Agribusiness Conference and Diaspora in Agribusiness Awards.",
};

const fallbackGalleryCategories: GalleryCategory[] = [
  {
    id: "youth-agripreneur-products-exhibition",
    title: "Youth Agripreneur Products Exhibition",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/1.png",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/1.png" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/2.png" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/3.png" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/4.png" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/5.png" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/youth-agripreneur-products-exhibition/6.png" },
    ],
  },
  {
    id: "hamis-breeding-farm-tour",
    title: "Hamis Breeding Farm Tour",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/1.jpg",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/1.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/2.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/3.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/4.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/5.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/6.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/7.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/8.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/hamis-breeding-farm-tour/9.jpg" },
    ],
  },
  {
    id: "sanga-animal-farm-tour",
    title: "Sanga Animal Farm Tour",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/1.jpg",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/1.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/2.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/3.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/4.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/5.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/6.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/7.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/8.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/sanga-animal-farm-tour/9.jpg" },
    ],
  },
  {
    id: "2026-matchmaking-conference",
    title: "2026 Matchmaking Conference",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/1.jpg",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/1.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/2.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/3.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/4.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/5.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/6.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2026-matchmaking-conference/7.jpg" },
    ],
  },
  {
    id: "2025-climate-action-awards-winners",
    title: "2025 Climate Action Awards Winners",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/1.jpg",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/1.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/2.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/3.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/4.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/5.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/2025-climate-action-awards-winners/6.jpg" },
    ],
  },
  {
    id: "diaspora-convention-2025",
    title: "Diaspora Convention 2025",
    coverImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/1.jpg",
    images: [
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/1.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/2.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/3.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/4.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/5.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/6.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/7.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/8.jpg" },
      { src: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/diaspora-convention-2025/9.jpg" },
    ],
  },
];

export default async function ConferencePage() {
  // Fetch gallery data from Supabase
  let galleryCategories: GalleryCategory[] = fallbackGalleryCategories;
  try {
    const supabase = createServiceRoleClient();
    const { data: cats, error: catsError } = await supabase
      .from("gallery_categories")
      .select("id, name")
      .order("created_at", { ascending: true });
    if (!catsError && cats && cats.length > 0) {
      const { data: imgs } = await supabase
        .from("gallery_images")
        .select("id, category_id, image_url, alt_text")
        .order("id", { ascending: true });
      galleryCategories = cats.map((cat: { id: string; name: string }) => {
        const catImages = (imgs || []).filter(
          (img: { category_id: string }) => img.category_id === cat.id
        );
        return {
          id: cat.id,
          title: cat.name,
          coverImage: catImages[0]?.image_url ?? undefined,
          images: catImages.map(
            (img: { image_url: string; alt_text?: string | null }) => ({
              src: img.image_url,
              caption: img.alt_text ?? undefined,
            })
          ),
        };
      }).filter((cat) => cat.images.length > 0);
    }
  } catch {
    // Fall back to static data on error
  }
  const speakers = [
    {
      name: "Ambassador MJ Muhindo",
      title: "Head of Diaspora Department, Ministry of Foreign Affairs",
      topic: "Diaspora Diplomacy & Bilateral Trade Partnerships",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/conference/ambassador-johnny-addressing.jpeg",
    },
    {
      name: "Andrew Bamugye",
      title: "UDAN Executive Secretary",
      topic: "Private Sector Leadership & Agribusiness Climate Finance",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/conference/andrew-addressing.jpeg",
    },
    {
      name: "Edward Tanyiima",
      title: "National Policy Officer, UN-FAO Uganda",
      topic: "Agrifood Innovation & Climate Resilience in Value Chains",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/conference/edward-tanyima-speech.jpeg",
    },
  ];

  const winners = [
    {
      position: "Overall Winner",
      name: "Jasper Batureine",
      company: "Sunland Hass Farm",
      location: "Kyegegwa, Uganda",
      sector: "Horticulture & Agroforestry",
      description:
        "1,750+ permanent carbon-sequestering Hass avocado & macadamia trees, 3.5 acres of onions, solar irrigation, and thriving outgrower seedling facility.",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/jasper-full-pic.jpg",
      badge: "Winner",
      awardImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/jasper-award.png",
      productImages: [
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/jasper-products-1.png",
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/jasper-products-2.png",
      ],
      journey:
        "When Jasper Batureine left Uganda for the Syrian Arab Republic, he carried with him the classic diaspora ambition: work hard, send support home, and eventually return with a vision bold enough to make even the old eucalyptus trees nervous.",
      vision:
        "That vision materialized in 2021 when he established Sunland Hass Farm, a climate-smart agribusiness that is now reshaping horticulture and tree crop farming in the Kyegegwa region. Sunland Hass Farm is built on a foundation of long-term resilience, sustainable productivity, and climate adaptation. With a meticulously planned orchard of 1,500 Hass avocado trees, 250 macadamia trees, 3.5 acres of onions, and a thriving seedling production facility, Jasper has demonstrated that well-managed tree crops are not just profitable: they are powerful carbon sinks. His integration of solar-powered irrigation further reduces fossil fuel dependence, protecting both the environment and his wallet from unpredictable diesel prices.",
      motivation:
        "Jasper's journey is a powerful reminder that diaspora contributions do not always come wrapped in remittances. Sometimes, they return home, plant an orchard, and quietly trap carbon for the next half-century like climate action ninjas.",
      sustainability:
        "The farm's market reach spans export buyers, oil processors, retailers, and farmers seeking high-quality seedlings. With 3 full-time employees and 15 seasonal workers, Sunland Hass Farm is demonstrating that sustainable land management, climate-smart technologies, and tree-crop farming can generate both environmental and economic returns. Jasper Batureine is proving that returning to the land is not a retreat, it is a strategic advance toward a greener, more resilient Uganda.",
      achievements: [
        "Over 1,750 permanent trees actively sequestering carbon and improving local biodiversity",
        "Measurable reduction in diesel consumption through solar irrigation systems",
        "Restored soil fertility and diversified habitats across the 12-acre agroforestry landscape",
        "1,500 Hass avocado trees and 250 macadamia trees established as durable carbon sinks",
        "3.5 acres of high-yield commercial onion production",
        "Certified seedling production facility supplying outgrower farmers across Kyegegwa region",
      ],
      impact:
        "The farm sequesters carbon continuously through mature tree growth and soil organic matter enrichment. Water-efficient solar irrigation shields crops from drought shocks, securing year-round harvest consistency.",
      community:
        "Supports regional outgrowers through certified grafted seedlings and field technical mentorship, creating employment and boosting household incomes across Kyegegwa District.",
    },
    {
      position: "1st Runner-Up",
      name: "Ssebugwawo Ambroce",
      company: "Vyema Sote Limited",
      location: "Masese-Jinja, Uganda",
      sector: "Nutrition, Circular Economy & Post-Harvest Preservation",
      description:
        "Circular mushroom production using agricultural waste substrates, eliminating charcoal drying, and producing nutritious value-added porridge flour and sauces.",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/ambroce-full-pic.jpg",
      badge: "1st Runner-Up",
      awardImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/ambroce-award.png",
      productImages: [
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/ambroce-products-1.png",
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/ambroce-products-2.png",
      ],
      journey:
        "If resilience had a face in the agribusiness world, it would probably be wearing a hairnet and standing next to a solar greenhouse. Founded in 2022, Vyema Sote Limited is an emerging nutrition and climate-action enterprise specializing in mushroom porridge flour, fresh oyster mushrooms, and mushroom-based chili sauce.",
      vision:
        "His production systems rely on agricultural waste substrates, turning what would be discarded into a productive base for nutrient-dense food. Vyema Sote serves women-led households, mothers and caregivers, urban low-income families, and local retail shops. Ambroce has positioned mushroom farming as an accessible, high-yield opportunity for low-income communities, delivering high nutritional value with minimal land and water requirements.",
      motivation:
        "By transforming agro-waste into high-protein, nutrient-rich functional foods, Vyema Sote demonstrates how circular bio-economy practices can directly solve urban malnutrition while eliminating greenhouse gas emissions from decomposing crop waste.",
      sustainability:
        "The enterprise is sustained through revenue from value-added products and training services, proving that circular economy principles can create viable, scalable agribusiness models in urban and peri-urban settings.",
      achievements: [
        "Significant reduction of organic waste through substrate reuse",
        "Complete elimination of charcoal-based drying",
        "Reduced land pressure through minimal-space mushroom systems",
        "Empowerment of women farmers in low-income urban communities",
        "Innovative formulation of mushroom porridge flour, fresh oyster mushrooms, and chili sauce",
        "Direct delivery of high nutritional value to mothers, caregivers, and low-income urban households",
      ],
      impact:
        "Eliminates organic waste accumulation and charcoal emissions, preserving local urban tree cover and enhancing soil through composted spent substrate.",
      community:
        "Equips urban mothers and youth with compact vertical growing skills, providing reliable daily nutrition and a steady household income stream.",
    },
    {
      position: "2nd Runner-Up",
      name: "Walter Dunga",
      company: "Prum Ventures (U) Limited",
      location: "Kitagwenda, Uganda",
      sector: "Nutrition, Functional Foods & Soil Regeneration",
      description:
        "Okra-based functional nutrition, agroforestry intercropping, soil regeneration across 22 acres, and 20-30% reduction in post-harvest losses.",
      image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/walter-full-pic.jpg",
      badge: "2nd Runner-Up",
      awardImage: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/dunga-award.png",
      productImages: [
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/dunga-products-1.png",
        "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/awards/dunga-products-2.png",
      ],
      journey:
        "Where some see okra as a slimy side dish, Walter Dunga saw possibility, nutrition, employment, and climate-smart transformation. Prum Ventures specializes in okra porridge flour for maternal nutrition, okra powder for digestion and immunity, okra sauce, okra seed oil, and dried okra slices for export and off-season consumption.",
      vision:
        "Central to the business is a strong climate-action model. Prum Ventures integrates agroforestry, soil-regenerative farming, waste-to-energy briquettes, and solar-powered drying to reduce post-harvest losses, cut carbon emissions, and build community resilience against drought and soil degradation.",
      motivation:
        "Beyond production, Walter runs comprehensive nutrition education programmes targeting mothers, caregivers, and families dealing with micronutrient deficiencies. His approach merges agribusiness with public health, ensuring that food is not only grown but understood, valued, and utilized correctly.",
      sustainability:
        "With 8 full-time and 3 part-time employees, Walter has built a system that supports farmer livelihoods while expanding access to functional foods for vulnerable households, retail shops, health centers, and rural families. His innovations, such as a mobile learning platform, community-based nutrition centers, and the expansion of farmer clusters, position Prum Ventures as a scalable, nation-ready model. Financially, the company is sustained through direct consumer sales and institutional supplies, reinforced by partnerships with CWEN and farmer groups. Walter's work demonstrates that transformative climate action does not need grand speeches or global summits. Sometimes, it just needs an okra pod, a determined entrepreneur, and an Excel sheet that doesn't lie.",
      achievements: [
        "Integrates agroforestry systems, intercropping okra with leafy tree species to improve soil cover and moisture retention",
        "Applies soil regenerative practices that enhance fertility, reduce erosion, and restore degraded land",
        "Achieves 20-30% reduction in post-harvest losses through improved drying and handling techniques",
        "Trains 27 women farmers in climate-resilient cultivation, strengthening community adaptation to climate stresses",
        "Promotes low-energy, efficient processing methods that reduce waste and minimize emissions",
        "Improves soil health across 22 acres through sustainable cultivation and land management",
        "Expands climate knowledge through mobile learning tools and community-level nutrition centers",
      ],
      impact:
        "Restores degraded agricultural land across 22 acres with agroforestry, drastically cuts post-harvest food loss, and utilizes solar dehydration technology.",
      community:
        "Trains and contracts 27 women outgrowers, partnering with community health centers to supply essential micronutrient-fortified porridge flours.",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Banner with Photographic Conference Backdrop and Pulsing CTA Card */}
      <section className="relative bg-[#131c33] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Photographic backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6287.JPG"
            alt="UDAN Annual Agribusiness Conference"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131c33]/90 via-[#131c33]/95 to-[#131c33]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4 drop-shadow-md">
            The Annual Diaspora in Agribusiness Conference
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed drop-shadow">
            The flagship convening of the Uganda Diaspora in Agribusiness.
          </p>

          {/* Pulsing Action Card for Stalls & Investors */}
          <div className="mt-8 max-w-xl mx-auto w-full text-left">
            <div className="relative rounded-2xl p-4 sm:p-5 bg-[#1b2542]/85 backdrop-blur-md border border-[#c6ac62]/40 shadow-2xl transition-all group">
              {/* Subtle outer breathing ring */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#63b849]/30 via-[#c6ac62]/40 to-[#1377a4]/30 opacity-70 blur-sm group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63b849] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#63b849]" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c6ac62]">
                      2026 Conference Bookings Open
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    2026 Exhibition Stalls &amp; Investor Access
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <Link
                    href="/contact"
                    className="pill-btn pill-gold text-xs text-center justify-center shadow-lg hover:scale-105 transition-all flex-1 sm:flex-none"
                  >
                    <span>Book a Stall</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    href="/account"
                    className="pill-btn pill-green text-xs text-center justify-center shadow-lg hover:scale-105 transition-all flex-1 sm:flex-none"
                  >
                    <span>Join as Investor</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* OVERVIEW SECTION */}
        <section id="overview" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] leading-tight">
                Catalyzing Cross-Border Investment in Climate-Smart Agribusiness
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                The UDAN Annual Conference &amp; Awards serves as a high-level summit bringing together diaspora investors, agripreneurs, policymakers, development partners, and researchers to advance Uganda&apos;s agricultural transformation.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-[#1377a4] hover:border-gray-200 hover:shadow-md transition-all">
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">1. Investment Dialogue &amp; Deal Flow</h4>
                  <p className="text-xs text-gray-600 mt-1">Connecting diaspora capital and technical expertise with verified local agribusiness enterprises to accelerate viable investment agreements.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-[#63b849] hover:border-gray-200 hover:shadow-md transition-all">
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">2. Policy Engagement</h4>
                  <p className="text-xs text-gray-600 mt-1">Providing an open forum to discuss tax exemptions, land security, climate adaptation metrics, and export compliance.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-[#c6ac62] hover:border-gray-200 hover:shadow-md transition-all">
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">3. Recognition of Outstanding Diaspora in Agribusiness</h4>
                  <p className="text-xs text-gray-600 mt-1">Celebrating diaspora and youth champions who prove that environmentally sustainable farming is commercially viable.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100">
              <Image
                src="/WhatsApp Image 2026-11-12 at 12.00.09.jpeg"
                alt="Catalyzing Cross-Border Investment in Climate-Smart Agribusiness"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* KEYNOTE SPEAKERS */}
        <section id="speakers" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              Panelists
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Insights from diplomacy, international development, and enterprise leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakers.map((spk, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative h-48 sm:h-64 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={spk.image}
                    alt={spk.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-1">{spk.name}</h3>
                    <div className="text-xs font-bold text-[#1377a4] mb-3">{spk.title}</div>
                    <div className="p-3 bg-gray-50 rounded text-xs text-gray-700 italic border border-gray-100">
                      Key Topic: &ldquo;{spk.topic}&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2025 CLIMATE ACTION AWARDS & WINNERS */}
        <section id="awards" className="scroll-mt-32 bg-[#f0f9ed] rounded-2xl p-8 sm:p-12 border-2 border-[#63b849]/40">
          <div className="max-w-3xl mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              2025 Diaspora in Agribusiness for Climate Action Awards
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm mt-2">
              Recognizing outstanding enterprises that combine commercial profitability with carbon sequestration, water resilience, and community empowerment.
            </p>
          </div>

          <AwardWinnerModal winners={winners} />
        </section>

        {/* EXHIBITIONS & STALLS */}
        <section id="exhibitions" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Exhibition Stalls
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                The exhibition segment provided a live commercial platform for Ugandan agribusiness innovators, solar technology providers, organic certified processors, and agricultural financiers to showcase products directly to diaspora buyers.
              </p>
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-100">
              <Image
                src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6683.JPG"
                alt="Agribusiness Exhibition Stalls at Speke Resort"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section id="gallery" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              Photo Gallery
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Explore photo albums from UDAN conferences, exhibitions, and farm tours. Tap any album to slide through its photos.
            </p>
          </div>

          <ConferenceGallery categories={galleryCategories} />
        </section>

        {/* TICKETS & REGISTRATION */}
        <section id="tickets" className="scroll-mt-32 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#131c33] via-[#1b2b4e] to-[#0f4b66] text-white border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c6ac62]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              Participate in the Next UDAN Annual Conference
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              UDAN members receive priority ticket allocations, exhibition stall discounts, and access to private investor roundtables.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/account" className="pill-btn pill-green text-xs shadow-lg hover:scale-105 transition-transform">
                <span>Register as Delegate</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/contact" className="pill-btn pill-gold text-xs shadow-lg hover:scale-105 transition-transform">
                <span>Book an Exhibition Stall</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
