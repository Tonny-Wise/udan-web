import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

interface PostData {
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  image: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

// ── Static fallback articles ─────────────────────────────────────────────────
const articlesDatabase: Record<string, PostData> = {
  "climate-action-awards-winners-2025": {
    title: "Celebrating the 2025 Diaspora in Agribusiness for Climate Action Awards: Champions Shaping Uganda's Future",
    category: "Awards & Events",
    date: "2025-12-20",
    author: "UDAN Secretariat",
    authorRole: "Editorial Team",
    readTime: "5 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6131.JPG",
    paragraphs: [
      "On December 18, 2025, the Speke Resort Munyonyo in Kampala hosted a landmark convening: the 2025 Diaspora in Agribusiness for Climate Action Awards, organized by UDAN alongside the Ministry of Foreign Affairs Diaspora Convention and in collaboration with UN-FAO.",
      "The awards brought together hundreds of diaspora leaders, domestic agribusiness entrepreneurs, policymakers, and international development executives to spotlight practical, scalable models of climate-smart farming across Uganda.",
      "Keynote addresses delivered by Ambassador MJ Muhindo (Head of Diaspora Department, MoFA), Andrew Bamugye (UDAN Executive Secretary), and Edward Tanyiima (UN-FAO National Policy Officer) underscored a common theme: diaspora engagement must evolve from informal consumption remittances into structured, institutional investments that protect ecosystems and create sustainable youth livelihoods.",
      "The prestigious Overall Winner award was presented to Jasper Batureine of Sunland Hass Farm in Kyegegwa, recognizing his outstanding agroforestry model combining 1,750+ permanent carbon-sequestering trees with solar micro-irrigation.",
      "The 1st Runner-Up position was claimed by Ssebugwawo Ambroce of Vyema Sote Limited for groundbreaking post-harvest drying and food processing, while Walter Dunga of Prum Ventures (U) Limited earned 2nd Runner-Up for biofortified nutrition crops.",
    ],
    keyTakeaways: [
      "Speke Resort Munyonyo convocation established formal collaboration between diaspora investors and government ministries.",
      "Awards proved that environmental stewardship and commercial agricultural profitability reinforce each other.",
      "UN-FAO confirmed continued technical assistance for diaspora-led agribusiness value chains in 2026.",
    ],
  },
  "sunland-hass-farm-kyegegwa": {
    title: "Winner Spotlight: How Jasper Batureine Built a 1,750-Tree Climate-Smart Agroforestry Model in Kyegegwa",
    category: "Success Stories",
    date: "2025-12-19",
    author: "Andrew Bamugye",
    authorRole: "Executive Secretary, UDAN",
    readTime: "6 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6742.JPG",
    paragraphs: [
      "When Jasper Batureine left Uganda for the Syrian Arab Republic, he carried with him the classic diaspora ambition: work hard, send support home, and eventually return with a vision bold enough to transform his community.",
      "That vision materialized in 2021 when he established Sunland Hass Farm in the Kyegegwa region. Today, Sunland Hass Farm is reshaping horticulture and tree crop farming in Western Uganda on a foundation of long-term resilience and climate adaptation.",
      "With a meticulously planned orchard of 1,500 Hass avocado trees, 250 macadamia trees, 3.5 acres of commercial onions, and a thriving nursery seedling facility, Jasper has demonstrated that well-managed tree crops are both highly profitable and powerful carbon sinks.",
      "Crucially, Jasper eliminated dependency on expensive, polluting diesel generators by investing in a solar-powered micro-irrigation system. This ensures year-round water access for his crops even during dry spells, stabilizing yields and safeguarding local soil moisture.",
      "Beyond his own acreage, Sunland Hass Farm operates an outgrower support network, providing certified seedlings and technical training to neighboring smallholder farmers. Jasper's journey proves that diaspora capital, when backed by scientific agronomy and perseverance, creates transformative generational wealth.",
    ],
    keyTakeaways: [
      "Over 1,750 permanent trees actively sequestering carbon and restoring biodiversity in Kyegegwa.",
      "Solar irrigation dramatically reduced operating overhead while eliminating fossil fuel emissions.",
      "Outgrower seedling model creates direct economic opportunities for dozens of local farming families.",
    ],
  },
  "un-fao-uganda-diaspora-collaboration": {
    title: "UN-FAO and Government of Uganda Collaborate to Promote Diaspora Investments in Agriculture",
    category: "Policy & Partnerships",
    date: "2025-11-15",
    author: "Edward Tanyiima",
    authorRole: "National Policy Officer, UN-FAO Uganda",
    readTime: "4 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6287.JPG",
    paragraphs: [
      "The Food and Agriculture Organization of the United Nations (FAO), in close partnership with the Ministry of Foreign Affairs (MoFA) and the Ministry of Agriculture, Animal Industry and Fisheries (MAAIF), has launched a multi-stakeholder framework to crowd in diaspora capital into Uganda's agri-food sector.",
      "Recognizing that Ugandan diaspora remittances surpass $1.2 billion annually, the initiative seeks to channel these vital capital flows into productive value chain infrastructure, including cold storage, grain silos, and processing equipment.",
      "Through UDAN, diaspora investors are provided with vetted project pipelines, while domestic youth agripreneurs receive business modeling and incubation support.",
      "This collaborative intervention ensures that diaspora contributions directly accelerate the United Nations Sustainable Development Goals (SDGs), particularly Zero Hunger (SDG 2), Decent Work and Economic Growth (SDG 8), and Climate Action (SDG 13).",
    ],
    keyTakeaways: [
      "Structured collaboration between UN-FAO, MoFA Diaspora Department, and UDAN Secretariat.",
      "Emphasis on transition from informal consumption remittances to productive agri-food capital assets.",
      "Direct technical assistance for quality standards, export certification, and sustainable land use.",
    ],
  },
  "youth-matchmaking-call-for-applications-2025": {
    title: "Call for Applications: 2025 Diaspora Youth Matchmaking Programme Officially Open",
    category: "Programs & Grants",
    date: "2025-10-01",
    author: "UDAN Youth Desk",
    authorRole: "Programme Directorate",
    readTime: "4 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6520.JPG",
    paragraphs: [
      "The Uganda Diaspora in Agribusiness Network is pleased to announce the opening of the 2025 Call for Applications for its flagship Diaspora Youth Matchmaking Programme.",
      "This cohort aims to match 100 high-potential young Ugandan agripreneurs (aged 18-35) with matched diaspora investors, mentors, and commercial buyers across North America, Europe, the Middle East, and East Africa.",
      "Selected participants will progress through UDAN's proven 6-step roadmap, receiving tailored business modeling, financial audit support, and access to curated virtual pitching sessions.",
      "Applications are welcome across all agricultural subsectors, with special priority given to climate-smart horticulture, agroforestry, dairy value addition, and agritech solutions.",
    ],
    keyTakeaways: [
      "Open to young Ugandan founders aged 18-35 and diaspora investors globally.",
      "Features intensive business modeling, legal structuring, and milestone-based co-investment.",
      "Applications reviewed on a rolling quarterly basis through the UDAN portal.",
    ],
  },
};

// Registered aliases for slugs with colons, punctuation, or alternate title formats
articlesDatabase["winner-spotlight:-how-jasper-batureine-built-a-1750-tree-climate-smart-agroforestry-model-in-kyegegwa"] = articlesDatabase["sunland-hass-farm-kyegegwa"];
articlesDatabase["winner-spotlight-how-jasper-batureine-built-a-1750-tree-climate-smart-agroforestry-model-in-kyegegwa"] = articlesDatabase["sunland-hass-farm-kyegegwa"];
articlesDatabase["celebrating-the-2025-diaspora-in-agribusiness-for-climate-action-awards:-champions-shaping-uganda's-future"] = articlesDatabase["climate-action-awards-winners-2025"];
articlesDatabase["celebrating-the-2025-diaspora-in-agribusiness-for-climate-action-awards-champions-shaping-ugandas-future"] = articlesDatabase["climate-action-awards-winners-2025"];

// -- Parse content stored by admin portal ------------------------------------
function parseDbArticle(row: Record<string, unknown>): PostData | null {
  if (!row) return null;
  try {
    // Content is stored as JSON by the admin portal
    let parsed: Partial<PostData> = {};
    if (typeof row.content === "string") {
      try {
        parsed = JSON.parse(row.content);
      } catch {
        // Plain text content: treat as single paragraph
        parsed = { paragraphs: [row.content as string] };
      }
    }
    return {
      title: (row.title as string) || "",
      category: (parsed.category as string) || (row as Record<string, unknown>).category as string || "News",
      date: (row.published_at as string) || (row.created_at as string) || new Date().toISOString(),
      author: (parsed.author as string) || "UDAN Secretariat",
      authorRole: (parsed.authorRole as string) || "Editorial Team",
      readTime: (parsed.readTime as string) || "3 min read",
      image: (row.image_url as string) || "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6131.JPG",
      paragraphs: Array.isArray(parsed.paragraphs) ? (parsed.paragraphs as string[]) : [],
      keyTakeaways: Array.isArray(parsed.keyTakeaways) ? (parsed.keyTakeaways as string[]) : [],
    };
  } catch {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;

  let decodedSlug = rawSlug;
  try {
    decodedSlug = decodeURIComponent(rawSlug);
  } catch {
    // ignore
  }

  const normalized = decodedSlug.toLowerCase().trim();
  const slugCandidates = Array.from(
    new Set([
      rawSlug,
      decodedSlug,
      normalized,
      normalized.replace(/:/g, ""),
      normalized.replace(/[^a-z0-9-]/g, ""),
      normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    ])
  ).filter(Boolean);

  let post: PostData | null = null;

  // 1. Fetch from Supabase
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("news_articles")
      .select("*")
      .in("slug", slugCandidates)
      .eq("status", "published")
      .limit(1);

    if (data && data.length > 0) {
      post = parseDbArticle(data[0] as Record<string, unknown>);
    }
  } catch {
    // fall through
  }

  // 2. Fall back to static hardcoded articles if not in DB
  if (!post) {
    for (const candidate of slugCandidates) {
      if (articlesDatabase[candidate]) {
        post = articlesDatabase[candidate];
        break;
      }
    }
  }

  // 3. Fall back by title matching in articlesDatabase
  if (!post) {
    const matched = Object.values(articlesDatabase).find((item) => {
      const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return slugCandidates.some(c => itemSlug === c || itemSlug.includes(c) || c.includes(itemSlug));
    });
    if (matched) post = matched;
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white px-4 py-20 font-body">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0f9ed] text-[#63b849] font-heading text-3xl font-bold mb-4 border border-[#63b849]/20">
            404
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mb-3">
            Article Not Found
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
            We could not find an article matching that link. It may have been updated, renamed, or is temporarily unavailable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/blog" className="pill-btn pill-blue text-xs px-5 py-2">
              Browse All Articles
            </Link>
            <Link href="/" className="pill-btn pill-green text-xs px-5 py-2">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white font-body">
      {/* Article Header Banner */}
      <section className="bg-[#131c33] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 text-xs mb-4">
            <span className="bg-[#63b849] text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-300">&bull;</span>
            <time dateTime={post.date} className="text-gray-300 font-semibold">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-gray-300">&bull;</span>
            <span className="text-[#c6ac62] font-semibold">{post.readTime}</span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs text-gray-300">
            <span>By <strong>{post.author}</strong></span>
            <span>({post.authorRole})</span>
          </div>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1377a4]">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#1377a4]">Blog &amp; Stories</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </nav>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-xl mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        {/* Article Paragraphs */}
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          {post.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Key Takeaways Box */}
        {post.keyTakeaways.length > 0 && (
          <div className="my-10 p-6 sm:p-8 bg-[#f0f9ed] rounded-2xl border-l-4 border-[#63b849] space-y-3">
            <h3 className="font-heading font-bold text-xl text-[#1b2238]">Key Takeaways &amp; Impact</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#63b849] font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author Bio & Next Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-heading font-bold text-lg text-[#1b2238]">{post.author}</div>
            <div className="text-xs text-[#1377a4] font-semibold">{post.authorRole}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="pill-btn pill-blue text-xs">
              <span>&larr; Back to Blog</span>
            </Link>
            <Link href="/contact" className="pill-btn pill-green text-xs">
              <span>Inquire / Partner</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
