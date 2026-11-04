const STORAGE_BASE = "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public";

/**
 * Returns the public URL for an image in Supabase Storage.
 * Bucket routing mirrors the upload script:
 *   gallery/...         → gallery bucket
 *   awards/...          → awards bucket
 *   youth-cohort/...    → youth-cohort bucket
 *   executives/...      → executives bucket
 *   icons/...           → logos bucket
 *   logo/...            → logos bucket
 *   everything else     → gallery bucket
 */
export function storageUrl(path: string): string {
  // Strip leading slash if present
  const clean = path.replace(/^\/images\//, "");

  if (clean.startsWith("awards/")) return `${STORAGE_BASE}/awards/${clean.slice("awards/".length)}`;
  if (clean.startsWith("youth-cohort/")) return `${STORAGE_BASE}/youth-cohort/${clean.slice("youth-cohort/".length)}`;
  if (clean.startsWith("executives/")) return `${STORAGE_BASE}/executives/${clean.slice("executives/".length)}`;
  if (clean.startsWith("icons/")) return `${STORAGE_BASE}/logos/${clean.slice("icons/".length)}`;
  if (clean.startsWith("logo/")) return `${STORAGE_BASE}/logos/${clean.slice("logo/".length)}`;

  // gallery, conference, and all root-level photos → gallery bucket
  return `${STORAGE_BASE}/gallery/${clean}`;
}
