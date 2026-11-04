/**
 * Supabase Storage image transform API.
 * Converts a public storage URL into a resized/optimized render URL.
 * Docs: https://supabase.com/docs/guides/storage/serving/image-transformations
 *
 * Usage:
 *   transformImage(url, { width: 400, quality: 75 })
 *   → serves a 400px-wide WebP from Supabase CDN instead of the raw file
 */

const RENDER_BASE = "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/render/image/public";
const STORAGE_BASE = "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public";

interface TransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 1–100, default 80
  resize?: "cover" | "contain" | "fill";
  format?: "origin" | "avif" | "webp";
}

export function transformImage(url: string, options: TransformOptions = {}): string {
  // Only transform Supabase storage URLs
  if (!url.startsWith(STORAGE_BASE)) return url;

  // Extract the path after /object/public/
  const path = url.slice(STORAGE_BASE.length + 1); // e.g. "gallery/homepage-hero.jpeg"

  const params = new URLSearchParams();
  if (options.width)   params.set("width",   String(options.width));
  if (options.height)  params.set("height",  String(options.height));
  if (options.quality) params.set("quality", String(options.quality));
  if (options.resize)  params.set("resize",  options.resize);
  if (options.format)  params.set("format",  options.format);

  const query = params.toString();
  return `${RENDER_BASE}/${path}${query ? `?${query}` : ""}`;
}

/**
 * Preset helpers for common use cases
 */
export const img = {
  /** Album cover thumbnails (gallery grid) */
  cover:     (url: string) => transformImage(url, { width: 800,  quality: 80, resize: "cover" }),
  /** Thumbnail strip in lightbox */
  thumb:     (url: string) => transformImage(url, { width: 128,  quality: 70, resize: "cover" }),
  /** Full-size lightbox view */
  full:      (url: string) => transformImage(url, { width: 1600, quality: 85 }),
  /** Hero / large section images */
  hero:      (url: string) => transformImage(url, { width: 1920, quality: 80 }),
  /** Small portrait/headshots */
  portrait:  (url: string) => transformImage(url, { width: 400,  quality: 80, resize: "cover" }),
  /** Tiny icons */
  icon:      (url: string) => transformImage(url, { width: 64,   quality: 90 }),
};
