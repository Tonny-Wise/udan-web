"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!consent) {
      setMessage("Please accept the consent terms.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage("Thank you for subscribing to UDAN updates!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="mt-16 text-white font-body" aria-label="Site footer">
        {/* Top Gold / Brand Ribbon Callout */}
        <div className="bg-[#c6ac62] text-[#131c33] py-5 px-4 border-b border-[#a88e45]">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3 text-center">
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl tracking-tight text-[#131c33]">
                Connect With UDAN Today
              </h3>
              <p className="text-xs font-semibold text-[#2a2a44] mt-0.5">
                Mobilizing diaspora capital, sustainable technologies, and market access for Uganda&apos;s food systems.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#131c33] hover:bg-[#1e3559] text-white px-6 py-2 rounded-full font-body text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm mt-1"
            >
              Get In Touch &rarr;
            </Link>
          </div>
        </div>

        {/* Main Navy Section */}
        <div className="bg-[#1e3559] py-14 px-4 sm:px-6 border-b border-[#2b4875]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Organization & Identity */}
            <div className="space-y-4">
              <Link href="/" className="inline-block group" aria-label="UDAN Home">
                <div className="relative h-16 sm:h-20 w-36 sm:w-44 mb-2 transition-transform group-hover:scale-105 flex items-center justify-start overflow-hidden">
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/278134-removebg-preview.png"
                    alt="UDAN Logo"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain object-left scale-[2.2] origin-left"
                  />
                </div>
                <div>
                  <div className="font-heading font-bold text-lg text-white">UDAN</div>
                  <div className="text-[9px] uppercase tracking-wider font-bold text-[#c6ac62]">
                    Uganda Diaspora in Agribusiness Network
                  </div>
                </div>
              </Link>
              <p className="text-[12px] text-gray-300 leading-relaxed">
                UDAN provides a credible and coordinated platform linking diaspora capital, expertise, and technologies with transformative agribusiness opportunities across Uganda&apos;s value chains.
              </p>

            </div>

            {/* Column 2: Key Programs & Pillars */}
            <div>
              <h4 className="font-heading text-base font-bold text-[#c6ac62] mb-4 uppercase tracking-wider">
                Key Initiatives
              </h4>
              <ul className="space-y-2 text-[12px] text-gray-300">
                <li>
                  <Link href="/programs#youth-matchmaking" className="hover:text-[#63b849] transition-colors">
                    &bull; Diaspora Youth Matchmaking
                  </Link>
                </li>
                <li>
                  <Link href="/programs#talk-series" className="hover:text-[#63b849] transition-colors">
                    &bull; UDAN Talk Series
                  </Link>
                </li>
                <li>
                  <Link href="/conference#awards" className="hover:text-[#63b849] transition-colors">
                    &bull; Annual Conference
                  </Link>
                </li>
                <li>
                  <Link href="/programs#investments" className="hover:text-[#63b849] transition-colors">
                    &bull; Agri-Food Investments
                  </Link>
                </li>
                <li>
                  <Link href="/programs#market-access" className="hover:text-[#63b849] transition-colors">
                    &bull; Market Access Platform
                  </Link>
                </li>
                <li>
                  <Link href="/about#pillars" className="hover:text-[#63b849] transition-colors">
                    &bull; The 5 Pillars of Community Growth
                  </Link>
                </li>
                <li>
                  <Link href="/about#services" className="hover:text-[#63b849] transition-colors">
                    &bull; UDAN Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Global Chapters */}
            <div>
              <h4 className="font-heading text-base font-bold text-[#c6ac62] mb-4 uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2.5 text-[12px] text-gray-300">
                <li className="flex items-start gap-2.5">
                  <Image src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/location.png" alt="Location" width={16} height={16} className="w-4 h-4 object-contain mt-0.5 flex-none" />
                  <span><strong>Location:</strong> Kampala, Uganda</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#63b849] mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span><strong>Chapters:</strong> East Africa, Europe, North America, Middle East, Asia</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Image src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/gmail.png" alt="Email" width={16} height={16} className="w-4 h-4 object-contain mt-0.5 flex-none" />
                  <a href="mailto:info@udandiaspora.org" className="hover:text-[#63b849] transition-colors">
                    info@udandiaspora.org
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Image src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/phone.png" alt="Phone" width={16} height={16} className="w-4 h-4 object-contain mt-0.5 flex-none" />
                  <span>
                    <a href="tel:+256781978239" className="hover:text-[#63b849] transition-colors">+256 781 978 239</a>
                    {" / "}
                    <a href="tel:+256783590960" className="hover:text-[#63b849] transition-colors">+256 783 590 960</a>
                  </span>
                </li>
              </ul>

              {/* Verified Social Media Channels */}
              <div className="mt-5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/udan_org?rpxt=MXhsaDIwMDB6aXZiZA=="
                    target="_blank"
                    rel="noreferrer"
                    aria-label="UDAN Instagram"
                    className="w-7 h-7 rounded-full overflow-hidden hover:opacity-80 transition-transform hover:scale-110 flex items-center justify-center"
                  >
                    <Image
                      src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/instagram.png"
                      alt="Instagram"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/uganda-diaspora-in-agribusiness-network-a44307388?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="UDAN LinkedIn"
                    className="w-7 h-7 rounded-full overflow-hidden hover:opacity-80 transition-transform hover:scale-110 flex items-center justify-center"
                  >
                    <Image
                      src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/linkedin.png"
                      alt="LinkedIn"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@udan_org?_r=1&_t=ZS-9B51gPnBvy4"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="UDAN TikTok"
                    className="w-7 h-7 rounded-full overflow-hidden hover:opacity-80 transition-transform hover:scale-110 flex items-center justify-center"
                  >
                    <Image
                      src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/tiktok.png"
                      alt="TikTok"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@ugandadiasporainagrinet?si=8grnCBA9SeMF-Ufg"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="UDAN YouTube"
                    className="w-7 h-7 rounded-full overflow-hidden hover:opacity-80 transition-transform hover:scale-110 flex items-center justify-center"
                  >
                    <Image
                      src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/youtube.png"
                      alt="YouTube"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div>
              <h4 className="font-heading text-base font-bold text-[#c6ac62] mb-4 uppercase tracking-wider">
                Newsletter &amp; Updates
              </h4>
              <p className="text-[12px] text-gray-300 mb-3">
                Subscribe to receive curated agribusiness investment catalogues, event alerts, and policy digests.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white text-[#131c33] rounded text-[12px] outline-none focus:ring-2 focus:ring-[#63b849]"
                />
                <label className="flex items-start gap-2 text-[11px] text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-gray-400 text-[#63b849] focus:ring-[#63b849]"
                  />
                  <span>I agree to receive communications from UDAN according to privacy terms.</span>
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#63b849] hover:bg-[#4f9738] text-white py-2 rounded font-body text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                </button>
                {message && (
                  <p
                    className={`text-[10px] mt-1 ${
                      status === "success" ? "text-green-300 font-semibold" : "text-red-300"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="bg-[#131c33] py-4 px-4 sm:px-6 text-[11px] text-gray-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              &copy; {new Date().getFullYear()} Uganda Diaspora in Agribusiness Network (UDAN). All rights reserved.
            </div>
            <nav className="flex items-center gap-4 text-xs" aria-label="Legal footer links">
              <Link href="/resources" className="hover:text-white transition-colors">
                Constitution &amp; Governance
              </Link>
              <span>|</span>
              <Link href="/membership#categories" className="hover:text-white transition-colors">
                Membership Code
              </Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-white transition-colors">
                Privacy &amp; Inquiries
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {/* 1. Floating WhatsApp Button */}
      <div
        onMouseEnter={() => setShowWhatsAppTooltip(true)}
        onMouseLeave={() => setShowWhatsAppTooltip(false)}
        className="fixed bottom-5 right-5 z-40 group"
      >
        <a
          href="https://wa.me/256783590960?text=Hello%20UDAN%20Secretariat,%20I%20would%20like%20to%20inquire%20about..."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with UDAN Secretariat on WhatsApp"
          className="bg-[#25d366] hover:bg-[#20ba5a] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 p-3"
        >
          <Image
            src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/whatsapp.png"
            alt="WhatsApp"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </a>
        {showWhatsAppTooltip && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#131c33] text-white px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg animate-fadeIn">
            Have a chat with us
          </div>
        )}
      </div>

      {/* 2. Floating Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="fixed bottom-5 left-5 z-40 bg-[#1377a4] hover:bg-[#0e5779] text-white w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
