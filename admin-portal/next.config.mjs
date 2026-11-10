/** @type {import('next').NextConfig} */
import { dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.google.com',
        pathname: '/u/0/d/**',
      },
      {
        protocol: 'https',
        hostname: 'akcpppgfytrztkpyysvg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'akcpppgfytrztkpyysvg.supabase.co',
        pathname: '/storage/v1/render/image/public/**',
      },
      {
        protocol: 'https',
        hostname: 'akcpppgfytrztkpyysvg.supabase.co',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
