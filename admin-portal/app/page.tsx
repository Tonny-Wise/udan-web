"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type AdminTab = "registrations" | "gallery" | "news" | "events" | "settings";

interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor";
}

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller";
  company: string;
  region: string;
  registeredAt: string;
  status: "pending" | "approved" | "rejected";
}

interface GalleryCategory {
  id: string;
  name: string;
}

interface GalleryImage {
  id: string;
  category_id: string;
  category: string;
  // Actual DB column is image_url; we map it to url for display convenience
  url: string;
  sort_order: number;
  uploaded_at: string;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_at: string | null;
  created_at: string;
  status: "draft" | "published";
  // parsed from JSON content
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

interface Event {
  id: string;
  // Actual DB column: event_type
  type: "conference" | "talk-series";
  title: string;
  // Actual DB columns: event_date, event_time
  date: string;
  time: string;
  location: string;
  enabled: boolean;
  countdown_active: boolean;
  created_at: string;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("registrations");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Registrations (unchanged)
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Gallery state: loaded from Supabase
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>("all");
  const [newImageFiles, setNewImageFiles] = useState<FileList | null>(null);
  const [newImageCategory, setNewImageCategory] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);

  // News state: loaded from Supabase
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newNews, setNewNews] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    authorRole: "",
    readTime: "",
    excerpt: "",
    imageUrl: "",
    paragraphs: "", // one paragraph per line
    keyTakeaways: "", // one takeaway per line
    isFeatured: false,
  });
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [newsUploading, setNewsUploading] = useState(false);

  // Events state: loaded from Supabase
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<{
    type: "conference" | "talk-series";
    title: string;
    date: string;
    time: string;
    location: string;
  }>({
    type: "conference",
    title: "",
    date: "",
    time: "",
    location: "",
  });

  // ── Auth check ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      const adminUser = localStorage.getItem("adminUser");
      if (token && adminUser) {
        try {
          setCurrentUser(JSON.parse(adminUser));
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // ── Supabase client with service role key ────────────────────────────────────
  const getSupabase = async () => {
    const { createClient } = await import("@supabase/supabase-js");
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
  };

  // ── Registrations fetch ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchRegistrations = async () => {
      try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
          .from("members")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) { console.error("Error fetching registrations:", error); return; }
        if (data) {
          setRegistrations(
            data.map((m: any) => ({
              id: m.id,
              name: m.full_name,
              email: m.email,
              phone: m.phone || "",
              role: m.registration_type,
              company: m.company || "",
              region: m.region || "",
              registeredAt: m.created_at?.split("T")[0] || "",
              status: m.status,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      }
    };
    fetchRegistrations();
  }, [isAuthenticated]);

  // ── Gallery fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchGalleryData();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGalleryData = async () => {
    setGalleryError(null);
    try {
      const supabase = await getSupabase();
      const [catResult, imgResult] = await Promise.all([
        supabase
          .from("gallery_categories")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase
          .from("gallery_images")
          .select("*, gallery_categories(name)")
          .order("created_at", { ascending: true }),
      ]);
      if (catResult.error) {
        setGalleryError("Failed to load categories: " + catResult.error.message);
        return;
      }
      if (imgResult.error) {
        setGalleryError("Failed to load images: " + imgResult.error.message);
        return;
      }
      setGalleryCategories(
        (catResult.data || []).map((c: any) => ({ id: c.id, name: c.name }))
      );
      setGalleryImages(
        (imgResult.data || []).map((img: any) => ({
          id: img.id,
          category_id: img.category_id,
          // gallery_categories is the joined relation; fall back to alt_text if missing
          category: img.gallery_categories?.name ?? img.alt_text ?? "",
          url: img.image_url,
          sort_order: img.sort_order ?? 0,
          uploaded_at: img.created_at ?? "",
        }))
      );
    } catch (err: any) {
      setGalleryError("Unexpected error loading gallery: " + (err?.message ?? String(err)));
    }
  };

  // ── News fetch ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchNews();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNews = async () => {
    setNewsError(null);
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setNewsError("Failed to load news: " + error.message);
        return;
      }
      setNews(
        (data || []).map((n: any) => {
          // Parse JSON content if available
          let parsed: any = {};
          if (n.content) {
            try { parsed = JSON.parse(n.content); } catch { /* plain text */ }
          }
          return {
            id: n.id,
            title: n.title,
            slug: n.slug ?? "",
            excerpt: n.excerpt ?? parsed.excerpt ?? "",
            content: n.content ?? "",
            image_url: n.image_url ?? "",
            published_at: n.published_at ?? null,
            created_at: n.created_at,
            status: n.status,
            category: parsed.category ?? "",
            author: parsed.author ?? "",
            authorRole: parsed.authorRole ?? "",
            readTime: parsed.readTime ?? "",
            paragraphs: Array.isArray(parsed.paragraphs) ? parsed.paragraphs : [],
            keyTakeaways: Array.isArray(parsed.keyTakeaways) ? parsed.keyTakeaways : [],
          };
        })
      );
    } catch (err: any) {
      setNewsError("Unexpected error loading news: " + (err?.message ?? String(err)));
    }
  };

  // ── Events fetch ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchEvents();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    setEventsError(null);
    try {
      const supabase = await getSupabase();
      // Actual DB columns: event_type, event_date, event_time (not type/date/time)
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      if (error) {
        setEventsError("Failed to load events: " + error.message);
        return;
      }
      setEvents(
        (data || []).map((e: any) => ({
          id: e.id,
          type: e.event_type,
          title: e.title,
          date: e.event_date,
          time: e.event_time,
          location: e.location,
          enabled: e.enabled,
          countdown_active: e.countdown_active,
          created_at: e.created_at,
        }))
      );
    } catch (err: any) {
      setEventsError("Unexpected error loading events: " + (err?.message ?? String(err)));
    }
  };

  // ── Login / Logout ───────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginEmail("");
    setLoginPassword("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="relative h-16 w-44 sm:h-20 sm:w-52 flex items-center justify-center">
                <Image
                  src="/images/logo/udan-logo.png"
                  alt="UDAN"
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-contain filter drop-shadow-sm"
                  priority
                />
              </div>
            </div>
            <h1 className="font-bold text-2xl text-[#0f172a] mb-1">Admin Portal</h1>
            <p className="text-sm text-[#64748b]">Secure access for administrators only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@udandiaspora.org"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all"
              />
            </div>
            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#22c55e] hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Sign In to Admin Portal
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-[#94a3b8]">
            <p>For access, contact the UDAN Secretariat</p>
            <p className="mt-1 text-[#64748b] font-semibold">info@udandiaspora.org</p>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED DASHBOARD HANDLERS ─────────────────────────────────────────

  // Registrations (unchanged)
  const updateRegistrationStatus = async (id: any, status: Registration["status"]) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("members").update({ status, approved_at: new Date().toISOString() }).eq("id", id);
      if (error) { console.error("Error updating status:", error); return; }
      setRegistrations(registrations.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) { console.error("Failed to update status:", err); }
  };

  const deleteRegistration = async (id: any) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("members").delete().eq("id", id);
      if (error) { console.error("Error deleting registration:", error); return; }
      setRegistrations(registrations.filter((r) => r.id !== id));
    } catch (err) { console.error("Failed to delete registration:", err); }
  };

  // ── Gallery handlers ─────────────────────────────────────────────────────────

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    setGalleryError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("gallery_categories")
        .insert({ name: newCategoryName.trim() });
      if (error) {
        setGalleryError("Failed to add category: " + error.message);
        return;
      }
      setNewCategoryName("");
      await fetchGalleryData();
    } catch (err: any) {
      setGalleryError("Unexpected error adding category: " + (err?.message ?? String(err)));
    }
  };

  const deleteCategory = async (id: string) => {
    setGalleryError(null);
    try {
      const supabase = await getSupabase();
      // CASCADE in DB will delete related gallery_images rows
      const { error } = await supabase.from("gallery_categories").delete().eq("id", id);
      if (error) {
        setGalleryError("Failed to delete category: " + error.message);
        return;
      }
      await fetchGalleryData();
    } catch (err: any) {
      setGalleryError("Unexpected error deleting category: " + (err?.message ?? String(err)));
    }
  };

  const addImage = async () => {
    if (!newImageFiles || newImageFiles.length === 0 || !newImageCategory) return;
    setGalleryError(null);
    setGalleryUploading(true);
    try {
      const supabase = await getSupabase();
      const categoryName = galleryCategories.find((c) => c.id === newImageCategory)?.name ?? "general";

      for (const file of Array.from(newImageFiles)) {
        const ext = file.name.split(".").pop();
        const fileName = `${categoryName}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          setGalleryError("Upload failed: " + uploadError.message);
          setGalleryUploading(false);
          return;
        }

        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);

        const { error: dbError } = await supabase.from("gallery_images").insert({
          category_id: newImageCategory,
          image_url: urlData.publicUrl,
          alt_text: categoryName,
          uploaded_by: currentUser?.id ?? null,
        });

        if (dbError) {
          setGalleryError("DB insert failed: " + dbError.message);
          setGalleryUploading(false);
          return;
        }
      }

      setNewImageFiles(null);
      // reset the file input
      const fileInput = document.getElementById("gallery-file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      await fetchGalleryData();
    } catch (err: any) {
      setGalleryError("Unexpected error uploading image: " + (err?.message ?? String(err)));
    } finally {
      setGalleryUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    setGalleryError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) {
        setGalleryError("Failed to delete image: " + error.message);
        return;
      }
      await fetchGalleryData();
    } catch (err: any) {
      setGalleryError("Unexpected error deleting image: " + (err?.message ?? String(err)));
    }
  };

  // ── News handlers ─────────────────────────────────────────────────────────────

  const addNews = async () => {
    if (!newNews.title.trim() || !newNews.slug.trim()) return;
    setNewsError(null);
    setNewsUploading(true);
    try {
      const supabase = await getSupabase();

      // Upload cover image to storage if a file was selected
      let finalImageUrl = newNews.imageUrl.trim();
      if (newsImageFile) {
        const ext = newsImageFile.name.split(".").pop();
        const fileName = `${newNews.slug}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("news-photos")
          .upload(fileName, newsImageFile, { cacheControl: "3600", upsert: false });
        if (uploadError) {
          setNewsError("Image upload failed: " + uploadError.message);
          setNewsUploading(false);
          return;
        }
        const { data: urlData } = supabase.storage.from("news-photos").getPublicUrl(fileName);
        finalImageUrl = urlData.publicUrl;
      }

      // Parse paragraphs and key takeaways from line-separated text
      const paragraphs = newNews.paragraphs
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const keyTakeaways = newNews.keyTakeaways
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      // Store all structured data as JSON in content
      const contentJson = JSON.stringify({
        category: newNews.category.trim(),
        author: newNews.author.trim(),
        authorRole: newNews.authorRole.trim(),
        readTime: newNews.readTime.trim() || "3 min read",
        excerpt: newNews.excerpt.trim(),
        paragraphs,
        keyTakeaways,
        is_featured: newNews.isFeatured,
      });

      const { error } = await supabase.from("news_articles").insert({
        title: newNews.title.trim(),
        slug: newNews.slug.trim(),
        excerpt: newNews.excerpt.trim() || null,
        content: contentJson,
        image_url: finalImageUrl || null,
        status: "draft",
        created_by: currentUser?.id ?? null,
      });
      if (error) {
        setNewsError("Failed to create article: " + error.message);
        return;
      }
      setNewNews({
        title: "", slug: "", category: "", author: "", authorRole: "",
        readTime: "", excerpt: "", imageUrl: "", paragraphs: "", keyTakeaways: "", isFeatured: false,
      });
      setNewsImageFile(null);
      const newsFileInput = document.getElementById("news-file-input") as HTMLInputElement;
      if (newsFileInput) newsFileInput.value = "";
      await fetchNews();
    } catch (err: any) {
      setNewsError("Unexpected error creating article: " + (err?.message ?? String(err)));
    } finally {
      setNewsUploading(false);
    }
  };

  const publishNews = async (id: string) => {
    setNewsError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("news_articles")
        .update({ status: "published", published_at: new Date().toISOString() })
        .eq("id", id);
      if (error) {
        setNewsError("Failed to publish article: " + error.message);
        return;
      }
      await fetchNews();
    } catch (err: any) {
      setNewsError("Unexpected error publishing article: " + (err?.message ?? String(err)));
    }
  };

  const deleteNews = async (id: string) => {
    setNewsError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("news_articles").delete().eq("id", id);
      if (error) {
        setNewsError("Failed to delete article: " + error.message);
        return;
      }
      await fetchNews();
    } catch (err: any) {
      setNewsError("Unexpected error deleting article: " + (err?.message ?? String(err)));
    }
  };

  // ── Events handlers ───────────────────────────────────────────────────────────

  const addEvent = async () => {
    if (!newEvent.title.trim()) return;
    setEventsError(null);
    try {
      const supabase = await getSupabase();
      // Actual DB columns: event_type, event_date, event_time (not type/date/time)
      const { error } = await supabase.from("events").insert({
        event_type: newEvent.type,
        title: newEvent.title.trim(),
        event_date: newEvent.date,
        event_time: newEvent.time,
        location: newEvent.location,
        enabled: true,
        countdown_active: true,
        created_by: currentUser?.id ?? null,
      });
      if (error) {
        setEventsError("Failed to create event: " + error.message);
        return;
      }
      setNewEvent({ type: "conference", title: "", date: "", time: "", location: "" });
      await fetchEvents();
    } catch (err: any) {
      setEventsError("Unexpected error creating event: " + (err?.message ?? String(err)));
    }
  };

  const toggleEventEnabled = async (id: string, current: boolean) => {
    setEventsError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("events")
        .update({ enabled: !current, countdown_active: !current })
        .eq("id", id);
      if (error) {
        setEventsError("Failed to update event: " + error.message);
        return;
      }
      await fetchEvents();
    } catch (err: any) {
      setEventsError("Unexpected error updating event: " + (err?.message ?? String(err)));
    }
  };

  const deleteEvent = async (id: string) => {
    setEventsError(null);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        setEventsError("Failed to delete event: " + error.message);
        return;
      }
      await fetchEvents();
    } catch (err: any) {
      setEventsError("Unexpected error deleting event: " + (err?.message ?? String(err)));
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#0f172a] flex flex-col transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
          <div className="relative h-10 w-24 flex-shrink-0 flex items-center">
            <Image
              src="/images/logo/udan-logo.png"
              alt="UDAN"
              fill
              sizes="96px"
              className="object-contain object-left"
            />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">UDAN</p>
            <p className="text-slate-400 text-[11px]">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { id: "registrations", label: "Registrations", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            )},
            { id: "gallery", label: "Gallery", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            )},
            { id: "news", label: "News", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
            )},
            { id: "events", label: "Events", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            )},
            { id: "settings", label: "Settings", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
            )},
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as AdminTab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? "bg-[#22c55e]/10 text-[#22c55e]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-slate-300 text-xs font-semibold">{currentUser?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{currentUser?.email}</p>
              <p className="text-slate-400 text-[10px]">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-2 rounded-lg transition-colors text-left"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-slate-100" aria-label="Open navigation menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="relative h-8 w-20 flex-shrink-0 flex items-center">
            <Image
              src="/images/logo/udan-logo.png"
              alt="UDAN"
              fill
              sizes="80px"
              className="object-contain object-left"
            />
          </div>
          <span className="font-bold text-[#0f172a]">UDAN Admin</span>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#0f172a] capitalize">{activeTab}</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage your {activeTab} content</p>
          </div>

          {/* ── REGISTRATIONS TAB ─────────────────────────────────────────────── */}
          {activeTab === "registrations" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Total", value: registrations.length, color: "text-[#0f172a]" },
                  { label: "Pending", value: registrations.filter((r) => r.status === "pending").length, color: "text-yellow-600" },
                  { label: "Approved", value: registrations.filter((r) => r.status === "approved").length, color: "text-[#22c55e]" },
                  { label: "Buyers", value: registrations.filter((r) => r.role === "buyer").length, color: "text-blue-600" },
                  { label: "Sellers", value: registrations.filter((r) => r.role === "seller").length, color: "text-purple-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-medium text-[#64748b] mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-[#0f172a]">Member Registrations</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Role</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Company</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Email</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Region</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {registrations.map((reg, i) => (
                        <tr key={reg.id} className={`hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[#22c55e] text-xs font-bold">{reg.name?.[0]?.toUpperCase()}</span>
                              </div>
                              <span className="text-sm font-semibold text-[#0f172a]">{reg.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${reg.role === "buyer" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>
                              {reg.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-sm text-[#64748b]">{reg.company}</td>
                          <td className="py-3.5 px-4 text-sm text-[#64748b]">{reg.email}</td>
                          <td className="py-3.5 px-4 text-sm text-[#64748b]">{reg.region}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${reg.status === "approved" ? "bg-green-50 text-green-700" : reg.status === "rejected" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {reg.status !== "approved" && (
                                <button onClick={() => updateRegistrationStatus(reg.id, "approved")}
                                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors">
                                  Approve
                                </button>
                              )}
                              <button onClick={() => deleteRegistration(reg.id)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── GALLERY TAB ───────────────────────────────────────────────────── */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              {galleryError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold mb-4">{galleryError}</div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Total Images</p>
                  <p className="text-3xl font-bold text-[#0f172a]">{galleryImages.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Categories</p>
                  <p className="text-3xl font-bold text-[#0f172a]">{galleryCategories.length}</p>
                </div>
              </div>

              {/* Add Image Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Upload Images</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={newImageCategory}
                    onChange={(e) => setNewImageCategory(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all bg-white"
                  >
                    <option value="">Select category...</option>
                    {galleryCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <input
                    id="gallery-file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setNewImageFiles(e.target.files)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#22c55e]/10 file:text-[#22c55e] hover:file:bg-[#22c55e]/20"
                  />
                  <button
                    onClick={addImage}
                    disabled={!newImageFiles || newImageFiles.length === 0 || !newImageCategory || galleryUploading}
                    className="px-4 py-2 bg-[#22c55e] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {galleryUploading ? "Uploading…" : `Upload${newImageFiles && newImageFiles.length > 1 ? ` (${newImageFiles.length})` : ""}`}
                  </button>
                </div>
              </div>

              {/* Manage Categories */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Manage Categories</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition-all"
                  />
                  <button
                    onClick={addCategory}
                    className="px-4 py-2 bg-[#22c55e] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {galleryCategories.map((cat) => (
                    <span key={cat.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-[#0f172a] text-xs font-medium rounded-full">
                      {cat.name}
                      <button onClick={() => deleteCategory(cat.id)} className="text-[#94a3b8] hover:text-red-500 transition-colors" aria-label={`Delete ${cat.name}`}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Category Filter + Image Grid */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#0f172a]">
                    Images ({selectedGalleryCategory === "all"
                      ? galleryImages.length
                      : galleryImages.filter((g) => g.category_id === selectedGalleryCategory).length})
                  </h3>
                </div>

                {/* Category filter tabs */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <button
                    onClick={() => setSelectedGalleryCategory("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedGalleryCategory === "all" ? "bg-[#0f172a] text-white" : "bg-slate-100 text-[#64748b] hover:bg-slate-200"}`}
                  >
                    All ({galleryImages.length})
                  </button>
                  {galleryCategories.map((cat) => {
                    const count = galleryImages.filter((g) => g.category_id === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedGalleryCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedGalleryCategory === cat.id ? "bg-[#22c55e] text-white" : "bg-slate-100 text-[#64748b] hover:bg-slate-200"}`}
                      >
                        {cat.name.length > 20 ? cat.name.slice(0, 20) + "…" : cat.name} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Image grid: small squares */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {galleryImages
                    .filter((img) => selectedGalleryCategory === "all" || img.category_id === selectedGalleryCategory)
                    .map((img) => (
                      <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                        <img src={img.url.startsWith("/") ? `http://localhost:3000${img.url}` : img.url} alt={img.category} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <button
                            onClick={() => deleteImage(img.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white px-2 py-1 rounded text-[10px] font-semibold"
                            aria-label="Delete image"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  {galleryImages.filter((img) => selectedGalleryCategory === "all" || img.category_id === selectedGalleryCategory).length === 0 && (
                    <div className="col-span-full py-10 text-center text-sm text-[#94a3b8]">
                      No images in this category yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── NEWS TAB ──────────────────────────────────────────────────────── */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {newsError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold mb-4">{newsError}</div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Total Articles</p>
                  <p className="text-3xl font-bold text-[#0f172a]">{news.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Published</p>
                  <p className="text-3xl font-bold text-[#22c55e]">{news.filter((n) => n.status === "published").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Drafts</p>
                  <p className="text-3xl font-bold text-yellow-500">{news.filter((n) => n.status === "draft").length}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Add News Article</h3>
                <div className="space-y-3">
                  {/* Row 1: Title */}
                  <input type="text" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    placeholder="Article title *"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                  {/* Row 2: Slug + Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">URL Slug *</label>
                      <input type="text" value={newNews.slug} onChange={(e) => setNewNews({ ...newNews, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                        placeholder="my-article-slug"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Category</label>
                      <input type="text" value={newNews.category} onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                        placeholder="e.g. Awards & Events"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                    </div>
                  </div>
                  {/* Row 3: Author + Author Role + Read Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Author</label>
                      <input type="text" value={newNews.author} onChange={(e) => setNewNews({ ...newNews, author: e.target.value })}
                        placeholder="UDAN Secretariat"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Author Role</label>
                      <input type="text" value={newNews.authorRole} onChange={(e) => setNewNews({ ...newNews, authorRole: e.target.value })}
                        placeholder="Editorial Team"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Read Time</label>
                      <input type="text" value={newNews.readTime} onChange={(e) => setNewNews({ ...newNews, readTime: e.target.value })}
                        placeholder="5 min read"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                    </div>
                  </div>
                  {/* Row 4: Image URL */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Cover Image</label>
                    <input
                      id="news-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewsImageFile(e.target.files?.[0] ?? null)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#22c55e]/10 file:text-[#22c55e] hover:file:bg-[#22c55e]/20"
                    />
                    {newsImageFile && (
                      <p className="text-[11px] text-[#22c55e] mt-1 font-medium">Selected: {newsImageFile.name}</p>
                    )}
                  </div>
                  {/* Row 5: Excerpt */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Excerpt (shown on blog listing)</label>
                    <textarea value={newNews.excerpt} onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                      placeholder="Short summary shown on the blog page..." rows={2}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 resize-none" />
                  </div>
                  {/* Row 6: Paragraphs */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                      Article Body (one paragraph per line)
                    </label>
                    <textarea value={newNews.paragraphs} onChange={(e) => setNewNews({ ...newNews, paragraphs: e.target.value })}
                      placeholder={"First paragraph of the article.\nSecond paragraph continues here.\nThird paragraph..."}
                      rows={6}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 resize-y font-mono" />
                  </div>
                  {/* Row 7: Key Takeaways */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                      Key Takeaways (one per line, shown as bullet points)
                    </label>
                    <textarea value={newNews.keyTakeaways} onChange={(e) => setNewNews({ ...newNews, keyTakeaways: e.target.value })}
                      placeholder={"First key takeaway point.\nSecond key takeaway point.\nThird key takeaway point."}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 resize-y font-mono" />
                  </div>
                  {/* Featured toggle */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newNews.isFeatured}
                      onChange={(e) => setNewNews({ ...newNews, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 accent-[#22c55e]"
                    />
                    <span className="text-sm font-semibold text-[#0f172a]">Set as Featured Story</span>
                    <span className="text-xs text-[#64748b]">(shows as the top article on the News page)</span>
                  </label>
                  <button onClick={addNews}
                    disabled={!newNews.title.trim() || !newNews.slug.trim() || newsUploading}
                    className="w-full py-2.5 bg-[#22c55e] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {newsUploading ? "Uploading..." : "Create Article (Draft)"}
                  </button>
                </div>
              </div>

              {/* Static (hardcoded) articles: always visible, read-only */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-semibold text-[#0f172a]">Current Articles</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-[#64748b] font-medium">Built-in: visible on website</span>
                </div>
                <div className="space-y-3">
                  {[
                    { slug: "climate-action-awards-winners-2025", title: "Celebrating the 2025 Diaspora in Agribusiness for Climate Action Awards", category: "Awards & Events", date: "2025-12-20", author: "UDAN Secretariat", image: "/images/AF6A6131.JPG" },
                    { slug: "sunland-hass-farm-kyegegwa", title: "Winner Spotlight: How Jasper Batureine Built a 1,750-Tree Climate-Smart Agroforestry Model", category: "Success Stories", date: "2025-12-19", author: "Andrew Bamugye", image: "/images/AF6A6742.JPG" },
                    { slug: "un-fao-uganda-diaspora-collaboration", title: "UN-FAO and Government of Uganda Collaborate to Promote Diaspora Investments", category: "Policy & Partnerships", date: "2025-11-15", author: "Edward Tanyiima", image: "/images/AF6A6287.JPG" },
                    { slug: "youth-matchmaking-call-for-applications-2025", title: "Call for Applications: 2025 Diaspora Youth Matchmaking Programme Officially Open", category: "Programs & Grants", date: "2025-10-01", author: "UDAN Youth Desk", image: "/images/AF6A6520.JPG" },
                  ].map((a) => (
                    <div key={a.slug} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <img src={`http://localhost:3000${a.image}`} alt={a.title} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700">published</span>
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">{a.category}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#0f172a] truncate">{a.title}</p>
                        <p className="text-[11px] text-[#94a3b8] font-mono">/blog/{a.slug}</p>
                        <p className="text-[11px] text-[#94a3b8]">By {a.author} · {a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DB articles */}
              {news.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Articles from Database</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {news.map((article) => (
                      <div key={article.id} className="border border-slate-100 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${article.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                              {article.status}
                            </span>
                            {article.category && (
                              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                                {article.category}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#94a3b8]">{article.created_at?.split("T")[0] ?? ""}</span>
                        </div>
                        <h4 className="font-semibold text-[#0f172a] mb-1 text-sm">{article.title}</h4>
                        {article.slug && (
                          <p className="text-[11px] text-[#94a3b8] font-mono mb-2">/blog/{article.slug}</p>
                        )}
                        {article.excerpt && (
                          <p className="text-xs text-[#64748b] line-clamp-2 mb-2">{article.excerpt}</p>
                        )}
                        <div className="flex items-center gap-3 text-[11px] text-[#94a3b8] mb-3 flex-wrap">
                          {article.author && <span>By {article.author}{article.authorRole ? ` · ${article.authorRole}` : ""}</span>}
                          {article.readTime && <span>· {article.readTime}</span>}
                          {article.paragraphs.length > 0 && <span>· {article.paragraphs.length} para</span>}
                          {article.keyTakeaways.length > 0 && <span>· {article.keyTakeaways.length} takeaways</span>}
                        </div>
                        {article.image_url && (
                          <img src={article.image_url.startsWith("/") ? `http://localhost:3000${article.image_url}` : article.image_url} alt={article.title} className="w-full h-28 object-cover rounded-lg mb-3" />
                        )}
                        <div className="flex items-center gap-2">
                          {article.status !== "published" && (
                            <button onClick={() => publishNews(article.id)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors">
                              Publish
                            </button>
                          )}
                          <button onClick={() => deleteNews(article.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── EVENTS TAB ────────────────────────────────────────────────────── */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {eventsError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold mb-4">{eventsError}</div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Active Events</p>
                  <p className="text-3xl font-bold text-[#22c55e]">{events.filter((e) => e.enabled).length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-medium text-[#64748b] mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-[#0f172a]">{events.length}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Create Event</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as "conference" | "talk-series" })}
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20">
                    <option value="conference">Conference</option>
                    <option value="talk-series">Talk Series</option>
                  </select>
                  <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event title"
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                  <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                  <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                  <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Location"
                    className="sm:col-span-2 px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20" />
                </div>
                <button onClick={addEvent}
                  className="mt-3 w-full py-2.5 bg-[#22c55e] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
                  Create Event
                </button>
              </div>

              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${event.type === "conference" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                            {event.type === "conference" ? "Conference" : "Talk Series"}
                          </span>
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${event.enabled ? "bg-green-50 text-green-700" : "bg-slate-100 text-[#64748b]"}`}>
                            {event.enabled ? "Active" : "Disabled"}
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#0f172a] mb-2">{event.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                          <span>📅 {event.date}</span>
                          <span>⏰ {event.time}</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <button
                          onClick={() => toggleEventEnabled(event.id, event.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${event.enabled ? "bg-[#22c55e]" : "bg-slate-200"}`}
                          aria-label={event.enabled ? "Disable event" : "Enable event"}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${event.enabled ? "translate-x-6" : "translate-x-1"}`} />
                        </button>
                        <button onClick={() => deleteEvent(event.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ──────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#0f172a] mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-medium text-[#64748b] mb-1">Logged in as</p>
                    <p className="text-sm font-semibold text-[#0f172a]">{currentUser?.email}</p>
                    <p className="text-xs text-[#94a3b8] capitalize mt-0.5">{currentUser?.role}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700 mb-2">Database Integration Status</p>
                    <ul className="text-xs text-blue-600 space-y-1.5">
                      <li>✓ Admin tables schema created</li>
                      <li>✓ Login API endpoint ready</li>
                      <li>✓ Gallery, News & Events connected to Supabase</li>
                    </ul>
                  </div>
                  <button onClick={handleLogout}
                    className="w-full py-2.5 bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
