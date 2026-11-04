import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "UDAN | Uganda Diaspora in Agribusiness Network",
  description:
    "Connecting diaspora capital, technology, and market access with sustainable agribusiness opportunities across Uganda's agricultural value chains in partnership with UN-FAO and MoFA.",
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
