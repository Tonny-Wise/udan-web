/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
