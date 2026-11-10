import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://udandiaspora.org";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UDAN | Uganda Diaspora in Agribusiness Network",
    template: "%s | UDAN",
  },
  description:
    "Connecting diaspora capital, technology, and market access with sustainable agribusiness opportunities across Uganda's agricultural value chains.",
  keywords: [
    "Uganda diaspora agribusiness",
    "UDAN",
    "Uganda Diaspora Agribusiness Network",
    "diaspora investment Uganda",
    "Uganda agribusiness",
    "youth agripreneurs Uganda",
    "diaspora matchmaking",
    "climate action awards Uganda",
    "Uganda agri-food investments",
  ],
  authors: [{ name: "UDAN Secretariat", url: SITE_URL }],
  creator: "UDAN",
  publisher: "Uganda Diaspora in Agribusiness Network",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: SITE_URL,
    siteName: "UDAN: Uganda Diaspora in Agribusiness Network",
    title: "UDAN | Uganda Diaspora in Agribusiness Network",
    description:
      "Connecting diaspora capital, technology, and market access with sustainable agribusiness opportunities across Uganda.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 1200,
        alt: "UDAN: Uganda Diaspora in Agribusiness Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UDAN | Uganda Diaspora in Agribusiness Network",
    description:
      "Connecting diaspora capital and youth agripreneurs to transform Uganda's agri-food sector.",
    images: [OG_IMAGE],
    creator: "@UDANDiaspora",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
