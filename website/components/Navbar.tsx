"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener for dynamic frosted blur transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpandedSection(null);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "Who We Are", href: "/about#who-we-are", desc: "Our origin, mission & mandate" },
        { label: "Who We Serve", href: "/about#who-we-serve", desc: "Diaspora, youth agripreneurs & partners" },
        { label: "Our 5 Pillars", href: "/about#pillars", desc: "Diaspora Investment, Policy, Tech, Markets, Capacity" },
        { label: "Leadership", href: "/about#leadership", desc: "Board of Trustees & Executive members" },
      ],
    },
    {
      label: "Programs",
      href: "/programs",
      dropdown: [
        { label: "Youth Matchmaking", href: "/programs#youth-matchmaking", desc: "Diaspora Youth Matchmaking Programme" },
        { label: "UDAN Agri Talk Series", href: "/programs#talk-series", desc: "Monthly webinars, key takeaways & archive" },
        { label: "Agri-Food Investments", href: "/programs#investments", desc: "Mobilizing diaspora capital & projects" },
        { label: "Market Access Platform", href: "/programs#market-access", desc: "Producers, buyers & export logistics" },
      ],
    },
    {
      label: "Conference",
      href: "/conference",
      dropdown: [
        { label: "Overview", href: "/conference#overview", desc: "Flagship diaspora agribusiness summit" },
        { label: "Speakers & Panelists", href: "/conference#speakers", desc: "Diplomacy, development & enterprise leaders" },
        { label: "Climate Action Awards", href: "/conference#awards", desc: "2025 winners & climate champions" },
        { label: "Exhibitions", href: "/conference#exhibitions", desc: "Commercial stalls & enterprise showcase" },
        { label: "Photo Gallery", href: "/conference#gallery", desc: "Speke Resort Munyonyo photo moments" },
      ],
    },
    { label: "Membership", href: "/membership" },
    { label: "Resources", href: "/resources" },
    { label: "News", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-[#131c33] text-white text-[9px] sm:text-[10px] py-0.5 px-4 font-body border-b border-[#c6ac62]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#63b849] animate-pulse flex-none" />
            <span className="truncate font-semibold tracking-wide">Uganda Diaspora in Agribusiness Network</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 flex-none text-[9px] sm:text-[10px]">
            <Link href="/contact" className="hidden sm:inline hover:text-white transition-colors">
              udan.ug.org@gmail.com
            </Link>
            <span className="hidden sm:inline text-gray-500">|</span>
            <Link href="/account" className="text-[#c6ac62] font-bold hover:underline flex items-center gap-1">
              <span>Member Portal</span> &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar with Dynamic Scroll-Based Frosted Blur */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-0.5 sm:py-1"
            : "bg-white/95 backdrop-blur-none border-b border-gray-100 py-1 sm:py-1.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo (Authentic UDAN emblem, tightly cropped, pronounced in size & vivid colour) */}
          <Link
            href="/"
            className="flex items-center flex-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1377a4] rounded-md py-1"
            aria-label="UDAN Home"
          >
            <div
              className={`relative flex-none transition-all duration-300 group-hover:scale-105 flex items-center justify-center ${
                scrolled
                  ? "h-11 sm:h-12 md:h-13 w-28 sm:w-32 md:w-36"
                  : "h-14 sm:h-16 md:h-18 w-36 sm:w-44 md:w-48"
              }`}
            >
              <Image
                src="/images/logo/udan-logo.png"
                alt="UDAN: Uganda Diaspora in Agribusiness Network"
                fill
                sizes="(max-width: 640px) 144px, 192px"
                className="object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)] contrast-110 brightness-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main desktop navigation">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const hasDropdown = Boolean(item.dropdown);

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-1.5 xl:px-2 py-1 rounded-md font-body text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                      isActive
                        ? "text-[#1377a4] bg-[#e8f3f8]"
                        : "text-[#1b2238] hover:text-[#1377a4] hover:bg-gray-50/80"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <svg
                        className="w-2.5 h-2.5 transition-transform group-hover:rotate-180 text-gray-400 group-hover:text-[#1377a4]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu Box */}
                  {hasDropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1 w-60 z-50 animate-fadeIn">
                      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-1.5 overflow-hidden ring-1 ring-black/5">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-3.5 py-1.5 hover:bg-[#e8f3f8] group/sub transition-colors"
                          >
                            <div className="font-body text-[10.5px] font-bold text-[#1b2238] group-hover/sub:text-[#1377a4]">
                              {sub.label}
                            </div>
                            <div className="font-body text-[9px] text-gray-500 line-clamp-1">
                              {sub.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Portal Button & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100/80 hover:bg-[#e8f3f8] text-[#1377a4] flex items-center justify-center transition-colors"
              aria-label="Open search dialog"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Account / Portal CTA */}
            <Link
              href="/account"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#63b849] hover:bg-white text-white hover:text-[#63b849] border-2 border-[#63b849] px-3 py-1 sm:px-3.5 sm:py-1 rounded-full font-body text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-[0_0_16px_rgba(99,184,73,0.65)] hover:-translate-y-0.5 group"
            >
              <span>Join UDAN</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1 sm:p-1.5 rounded-md text-[#1b2238] hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-4 max-h-[85vh] overflow-y-auto shadow-xl animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((item) => {
                const hasDropdown = Boolean(item.dropdown);
                const isExpanded = mobileExpandedSection === item.label;

                return (
                  <div key={item.label} className="border-b border-gray-100 pb-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-1 text-[12.5px] font-bold text-[#1b2238] uppercase tracking-wide hover:text-[#1377a4]"
                      >
                        {item.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={() => setMobileExpandedSection(isExpanded ? null : item.label)}
                          className="p-2 text-gray-500 hover:text-[#1377a4]"
                          aria-label={`Expand ${item.label} menu`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {hasDropdown && isExpanded && (
                      <div className="pl-3 pb-2 pt-1 space-y-1 bg-gray-50/80 rounded-lg my-1">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 px-2 text-[11px] text-gray-700 hover:text-[#1377a4] font-medium"
                          >
                            &bull; {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col gap-2">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center bg-[#63b849] hover:bg-white text-white hover:text-[#63b849] border-2 border-[#63b849] py-2 rounded-full font-body font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-[0_0_16px_rgba(99,184,73,0.65)]"
              >
                Join UDAN Network / Sign In
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center border border-[#1377a4] text-[#1377a4] hover:bg-[#e8f3f8] py-1.5 rounded-full font-body font-bold text-[11px] uppercase tracking-wider transition-colors"
              >
                Contact Secretariat
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search UDAN programs, conference, membership, articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none font-body text-sm text-[#1b2238] placeholder-gray-400"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 text-xl leading-none"
                aria-label="Close search"
              >
                &times;
              </button>
            </div>
            <div className="p-4 bg-gray-50 text-xs text-gray-500 font-body">
              <div className="font-semibold text-[#1b2238] mb-2 uppercase tracking-wide">Quick Navigation Links:</div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/programs#youth-matchmaking"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 bg-white rounded border border-gray-100 hover:border-[#1377a4] hover:text-[#1377a4] transition-colors"
                >
                  Diaspora Youth Matchmaking
                </Link>
                <Link
                  href="/conference#awards"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 bg-white rounded border border-gray-100 hover:border-[#1377a4] hover:text-[#1377a4] transition-colors"
                >
                  2025 Climate Action Awards
                </Link>
                <Link
                  href="/membership#categories"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 bg-white rounded border border-gray-100 hover:border-[#1377a4] hover:text-[#1377a4] transition-colors"
                >
                  Membership Tiers &amp; Chapters
                </Link>
                <Link
                  href="/programs#talk-series"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 bg-white rounded border border-gray-100 hover:border-[#1377a4] hover:text-[#1377a4] transition-colors"
                >
                  UDAN Talk Series Webinars
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
