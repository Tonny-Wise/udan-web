import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60; // revalidate every 60 seconds

export const metadata = {
  title: "News, Insights & Success Stories | UDAN Diaspora",
  description:
    "Read the latest articles on climate-smart agribusiness, the 2025 Climate Action Awards winners, UN-FAO partnerships, and diaspora investments.",
};

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  is_featured: boolean;
}

// Static fallback posts shown when DB has no published articles
const defaultPosts: BlogPostItem[] = [
  {
    id: "1",
    slug: "climate-action-awards-winners-2025",
    title: "Celebrating the 2025 Diaspora in Agribusiness for Climate Action Awards: Champions Shaping Uganda's Future",
    excerpt:
      "Held at Speke Resort Munyonyo alongside the Ministry of Foreign Affairs Diaspora Convention, the 2025 awards honoured diaspora and youth pioneers transforming agriculture through agroforestry, renewable energy, and post-harvest innovation.",
    category: "Awards & Events",
    date: "2025-12-20",
    author: "UDAN Secretariat",
    readTime: "5 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6131.JPG",
    is_featured: true,
  },
  {
    id: "2",
    slug: "sunland-hass-farm-kyegegwa",
    title: "Winner Spotlight: How Jasper Batureine Built a 1,750-Tree Climate-Smart Agroforestry Model in Kyegegwa",
    excerpt:
      "When Jasper Batureine returned from the Syrian Arab Republic, he channeled his diaspora savings into Sunland Hass Farm. Today, 1,500 Hass avocado and 250 macadamia trees sequester carbon while solar micro-irrigation shields production from droughts.",
    category: "Success Stories",
    date: "2025-12-19",
    author: "Andrew Bamugye",
    readTime: "6 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6742.JPG",
    is_featured: false,
  },
  {
    id: "3",
    slug: "un-fao-uganda-diaspora-collaboration",
    title: "UN-FAO and Government of Uganda Collaborate to Promote Diaspora Investments in Agriculture",
    excerpt:
      "A strategic partnership between UN-FAO, the Ministry of Foreign Affairs, and UDAN establishes structured corridors for diaspora remittances to become productive, employment-generating agribusiness capital.",
    category: "Policy & Partnerships",
    date: "2025-11-15",
    author: "Edward Tanyiima (FAO)",
    readTime: "4 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6287.JPG",
    is_featured: false,
  },
  {
    id: "4",
    slug: "youth-matchmaking-call-for-applications-2025",
    title: "Call for Applications: 2025 Diaspora Youth Matchmaking Programme Officially Open",
    excerpt:
      "Connecting young Ugandan agripreneurs with diaspora co-investors across 6 clear milestones: from business modeling to formal equity syndication. Learn how to apply for the upcoming cohort.",
    category: "Programs & Grants",
    date: "2025-10-01",
    author: "Youth Desk",
    readTime: "4 min read",
    image: "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6520.JPG",
    is_featured: false,
  },
];

function parsePost(row: Record<string, unknown>): BlogPostItem {
  let parsed: Record<string, unknown> = {};
  if (typeof row.content === "string") {
    try { parsed = JSON.parse(row.content); } catch { /* ignore */ }
  }
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) || (parsed.excerpt as string) || "",
    category: (parsed.category as string) || "News",
    date: (row.published_at as string) || (row.created_at as string) || "",
    author: (parsed.author as string) || "UDAN Secretariat",
    readTime: (parsed.readTime as string) || "3 min read",
    image: (row.image_url as string) || "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6131.JPG",
    is_featured: (parsed.is_featured as boolean) || false,
  };
}

async function fetchPosts(): Promise<BlogPostItem[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data.map((row) => parsePost(row as Record<string, unknown>));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const dbPosts = await fetchPosts();
  const posts = dbPosts.length > 0 ? dbPosts : defaultPosts;

  // Featured = explicitly marked, or most recent
  const featured = posts.find((p) => p.is_featured) ?? posts[0];
  const restPosts = posts.filter((p) => p.id !== featured.id);

  return (
    <div className="bg-white font-body">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#131c33] via-[#1b2238] to-[#0f2744] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            UDAN News
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Case studies, policy briefs, event highlights, and thought leadership from Uganda&apos;s diaspora agribusiness community.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* FEATURED STORY */}
        <section>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-56 sm:h-80 lg:h-auto min-h-[280px] bg-gray-100 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#63b849] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Featured Story
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold mb-2 flex-wrap">
                    <span className="text-[#1377a4] uppercase font-bold">{featured.category}</span>
                    <span>&bull;</span>
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="font-heading font-bold text-xl sm:text-3xl text-[#1b2238] group-hover:text-[#1377a4] transition-colors mb-3 leading-tight">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-gray-500 font-medium">By {featured.author}</span>
                  <Link href={`/blog/${featured.slug}`} className="pill-btn pill-blue text-[11px] py-2 px-4">
                    <span>Read Full Story</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATES GRID */}
        {restPosts.length > 0 && (
          <section>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mt-1">Updates</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {restPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#131c33]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold mb-2">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </time>{" "}
                        &bull; {post.readTime}
                      </div>

                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] group-hover:text-[#1377a4] transition-colors leading-snug mb-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">By {post.author}</span>
                      <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[#63b849] hover:underline flex items-center gap-1">
                        <span>Read More</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
