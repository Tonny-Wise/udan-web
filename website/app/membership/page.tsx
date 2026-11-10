"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United States",
    occupation: "",
    category: "Ordinary Membership ($50/yr)",
    interests: "Crop production",
    company: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!formData.consent) {
      setFeedbackMsg("Please agree to the membership data processing terms.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interests: `[${formData.category}] Country: ${formData.country}, Occupation: ${formData.occupation || "N/A"}, Company: ${formData.company || "N/A"}, Focus: ${formData.interests}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg("Your membership application has been submitted successfully! Check your email for confirmation.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "United States",
          occupation: "",
          category: "Ordinary Membership ($50/yr)",
          interests: "Crop production",
          company: "",
          consent: false,
        });
      } else {
        setStatus("error");
        setFeedbackMsg(data.error || "Failed to submit application. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("An unexpected error occurred. Please try again.");
    }
  };

  const categories = [
    {
      name: "Ordinary Membership",
      price: "$50",
      period: "per year",
      badge: "Individual",
      highlight: false,
      color: "border-gray-200",
      desc: "For diaspora professionals, researchers, individual investors, and mentors seeking structured engagement with Uganda's agribusiness sector.",
      features: [
        "Curated deal flow alerts & investment pipeline",
        "Full participation in UDAN Talk Series & webinars",
        "Regional chapter voting rights & community access",
        "Directory access to verified Ugandan producers",
        "Annual Conference member discount",
      ],
    },
    {
      name: "Business Membership",
      price: "$250",
      period: "per year",
      badge: "Most Popular",
      highlight: true,
      color: "border-[#63b849] ring-2 ring-[#63b849]/30",
      desc: "For diaspora-owned businesses, commercial farms, trading companies, and cooperatives seeking trade facilitation and supplier linkages.",
      features: [
        "All Ordinary Membership benefits included",
        "Priority listing on UDAN B2B Trade Platform",
        "Direct export & customs advisory (URA & UEPB)",
        "Exhibition stall discount at Annual Conference",
        "Co-investment syndication & escrow structuring",
        "Dedicated Secretariat investor relations liaison",
      ],
    },
    {
      name: "Youth & Student Membership",
      price: "$25",
      period: "per year",
      badge: "Emerging Leaders",
      highlight: false,
      color: "border-gray-200",
      desc: "For young founders aged 18-35 and university students aspiring to launch or scale agricultural ventures in Uganda.",
      features: [
        "Eligibility for Diaspora Youth Matchmaking Programme",
        "One-on-one diaspora mentorship pairing",
        "Business modeling & pitching workshops",
        "Student & youth networking forums",
      ],
    },
  ];

  const chapters = [
    {
      region: "North America",
      focus: "Investment syndication, agroforestry capital & trade linkages with East Coast & Midwest markets.",
    },
    {
      region: "Europe",
      focus: "Specialty food imports (coffee, dried fruits, vanilla) & European organic certification standards.",
    },
    {
      region: "Middle East",
      focus: "Horticulture cold-chain logistics, meat export standards & sovereign fund partnerships.",
    },
    {
      region: "East Africa",
      focus: "On-the-ground project monitoring, outgrower schemes & cross-border EAC agricultural trade.",
    },
    {
      region: "Southern & Central Africa",
      focus: "Agricultural machinery exchange, seed technology & regional processing knowledge.",
    },
    {
      region: "Asia & Australia",
      focus: "Solar irrigation technology adoption, farm mechanization & bulk agro-commodity contracts.",
    },
  ];

  return (
    <div className="bg-white font-body">
      {/* Header Banner */}
      <section className="bg-[#131c33] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            JOIN UDAN TODAY
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Connect to a structured global ecosystem that promotes investment, innovation, trade, and knowledge exchange within Uganda&apos;s agricultural sector.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* MEMBERSHIP BENEFITS */}
        <section id="benefits" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              Why Join UDAN?
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              UDAN transforms your connection with Uganda from informal uncertainty into high-impact, professional success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#1377a4] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#e8f3f8] text-[#1377a4] flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Curated Deal Flow</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Access screened and structured agribusiness opportunities across production, processing, export, and agritech sectors with due diligence reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#63b849] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#f0f9ed] text-[#63b849] flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Priority Program Access</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Early notification and guaranteed consideration for participation in UDAN accelerators, trade missions, investment roundtables, and masterclasses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#c6ac62] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#faf6eb] text-[#c6ac62] flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Market Access Platform</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Exclusive directory access linking verified Ugandan producers, farmer cooperatives, and international buyers for direct contract negotiations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#131c33] transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-[#131c33] flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">Policy &amp; Institutional Voice</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct advocacy representation with MoFA, MAAIF, URA, and UIA to safeguard diaspora assets, tax incentives, and fair trade regulations.
              </p>
            </div>
          </div>
        </section>

        {/* REGIONAL & COUNTRY CHAPTERS */}
        <section id="chapters" className="scroll-mt-32 bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">
              UDAN Global Chapters
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Our regional chapters provide grassroots organizing, local networking events, and collaborative investment clubs in your country of residence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-3">{ch.region}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{ch.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APPLICATION & ENROLLMENT FORM (COMMENTED OUT) */}
        {false && (
        <section id="apply" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#63b849]">Online Onboarding</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Apply for UDAN Membership
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete the application form below. The Secretariat will review your details, verify your regional chapter allocation, and issue your official UDAN Member Certificate and portal login.
              </p>
              <div className="p-4 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30 text-xs text-gray-700 space-y-2">
                <p><strong>Data Protection:</strong> All details are stored securely under Uganda and international data privacy regulations.</p>
                <p><strong>Notification:</strong> Confirmation email will be delivered to you upon successful submission.</p>
              </div>
            </div>
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Full Names *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jasper Batureine"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jasper@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Phone Number (with country code)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Country of Residence
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>Netherlands</option>
                      <option>Sweden</option>
                      <option>Norway</option>
                      <option>United Arab Emirates</option>
                      <option>Qatar</option>
                      <option>South Africa</option>
                      <option>Uganda</option>
                      <option>Other / Diaspora</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Professional Background / Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="e.g. Agronomist, Software Engineer, Investor"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Sunland Hass Farm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Membership Tier
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    >
                      <option>Ordinary Membership ($50/yr)</option>
                      <option>Business Membership ($250/yr)</option>
                      <option>Youth &amp; Student Membership ($25/yr)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      Primary Area of Agribusiness Interest
                    </label>
                    <select
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    >
                      <option>Crop production (Horticulture, Avocado, Macadamia)</option>
                      <option>Livestock and dairy farming</option>
                      <option>Aquaculture and apiculture</option>
                      <option>Agro-processing and value addition</option>
                      <option>Agritech, mechanization &amp; solar irrigation</option>
                      <option>Trade, export, and supply chain management</option>
                      <option>Agribusiness finance &amp; investment funds</option>
                      <option>Research, policy, and food systems</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#63b849] focus:ring-[#63b849]"
                  />
                  <span>
                    I consent to UDAN processing my application data for membership onboarding, regional chapter coordination, and communication according to the UDAN Privacy Policy.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full pill-btn pill-green text-xs justify-center py-3 font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting Application..." : "Submit Membership Application"}
                </button>

                {feedbackMsg && (
                  <div
                    className={`p-3 rounded-lg text-xs font-semibold ${
                      status === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {feedbackMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
