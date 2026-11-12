"use client";

import { useState } from "react";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "United States",
    occupation: "",
    company: "",
    region: "North America",
    membershipType: "Ordinary Membership",
    agriInterests: "Crop production",
    registrationType: "buyer",
    isDiaspora: "" as "" | "yes" | "no",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!formData.isDiaspora) {
      setFeedbackMsg("Please indicate whether you are a member of the Ugandan diaspora.");
      setStatus("error");
      return;
    }
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
          phone: formData.phone,
          gender: formData.gender,
          region: formData.region,
          country: formData.country,
          occupation: formData.occupation,
          company: formData.company,
          agriInterests: formData.agriInterests,
          membershipType: formData.membershipType,
          registrationType: formData.registrationType,
          isDiaspora: formData.isDiaspora,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg("Your membership application has been submitted successfully!");
        setFormData({
          name: "", email: "", phone: "", gender: "", country: "United States",
          occupation: "", company: "", region: "North America",
          membershipType: "Ordinary Membership", agriInterests: "Crop production",
          registrationType: "buyer", isDiaspora: "", consent: false,
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
      name: "Ordinary Membership ($50/yr)",
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
      name: "Business Membership ($250/yr)",
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
      name: "Youth & Student Membership ($25/yr)",
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
    { region: "North America", focus: "Investment syndication, agroforestry capital & trade linkages with East Coast & Midwest markets." },
    { region: "Europe", focus: "Specialty food imports (coffee, dried fruits, vanilla) & European organic certification standards." },
    { region: "Middle East", focus: "Horticulture cold-chain logistics, meat export standards & sovereign fund partnerships." },
    { region: "East Africa", focus: "On-the-ground project monitoring, outgrower schemes & cross-border EAC agricultural trade." },
    { region: "Southern & Central Africa", focus: "Agricultural machinery exchange, seed technology & regional processing knowledge." },
    { region: "Asia & Australia", focus: "Solar irrigation technology adoption, farm mechanization & bulk agro-commodity contracts." },
  ];

  return (
    <div className="bg-white font-body">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#131c33] via-[#1b2238] to-[#0f2744] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            JOIN UDAN TODAY
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Connect to a structured global ecosystem that promotes investment, innovation, trade, and knowledge exchange within Uganda&apos;s agricultural sector.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">

        {/* MEMBERSHIP TIERS */}
        <section id="categories" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">Membership Tiers</h2>
            <p className="text-gray-600 text-sm mt-2">
              UDAN transforms your connection with Uganda from informal uncertainty into high-impact, professional success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`bg-white rounded-2xl border-2 ${cat.color} p-6 sm:p-8 flex flex-col shadow-sm relative`}>
                {cat.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#63b849] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      {cat.badge}
                    </span>
                  </div>
                )}
                {!cat.highlight && (
                  <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">{cat.badge}</span>
                )}
                <div className="mb-4 mt-2">
                  <span className="font-heading font-black text-4xl text-[#1b2238]">{cat.price}</span>
                  <span className="text-gray-400 text-sm ml-1">{cat.period}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-2">{cat.name.split(" (")[0]}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{cat.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {cat.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-[#63b849] font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GLOBAL CHAPTERS */}
        <section id="chapters" className="scroll-mt-32 bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mt-1">UDAN Global Chapters</h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Our regional chapters provide grassroots organizing, local networking events, and collaborative investment clubs in your country of residence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-heading font-bold text-xl text-[#1b2238] mb-3">{ch.region}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ch.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section id="apply" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#63b849]">Online Onboarding</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Apply for UDAN Membership
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete the application form. The Secretariat will review your details, verify your regional chapter allocation, and issue your official UDAN Member Certificate.
              </p>
              <div className="p-4 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30 text-xs text-gray-700 space-y-2">
                <p><strong>Data Protection:</strong> All details are stored securely under Uganda and international data privacy regulations.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Full Name *</label>
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jasper Batureine"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Email Address *</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jasper@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]" />
                  </div>
                </div>

                {/* Phone + Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Phone (with country code)</label>
                    <input type="tel" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Gender</label>
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
                      <option value="">Select...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Country + Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Country of Residence</label>
                    <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
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
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Chapter / Region</label>
                    <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Middle East</option>
                      <option>East Africa</option>
                      <option>Southern & Central Africa</option>
                      <option>Asia & Australia</option>
                    </select>
                  </div>
                </div>

                {/* Occupation + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Occupation</label>
                    <input type="text" value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="e.g. Agronomist, Investor"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Company / Organization</label>
                    <input type="text" value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Sunland Hass Farm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]" />
                  </div>
                </div>

                {/* Diaspora status */}
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-2">
                    Are you a member of the Ugandan diaspora? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isDiaspora" value="yes"
                        checked={formData.isDiaspora === "yes"}
                        onChange={() => setFormData({ ...formData, isDiaspora: "yes" })}
                        className="accent-[#63b849]" />
                      <span className="text-sm text-[#1b2238] font-medium">Yes, I am in the diaspora</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isDiaspora" value="no"
                        checked={formData.isDiaspora === "no"}
                        onChange={() => setFormData({ ...formData, isDiaspora: "no" })}
                        className="accent-[#63b849]" />
                      <span className="text-sm text-[#1b2238] font-medium">No, I am based in Uganda</span>
                    </label>
                  </div>
                </div>

                {/* Registration type + Membership tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">I am registering as a</label>
                    <select value={formData.registrationType} onChange={(e) => setFormData({ ...formData, registrationType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
                      <option value="buyer">Buyer / Investor</option>
                      <option value="seller">Seller / Agripreneur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Membership Tier</label>
                    <select value={formData.membershipType} onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
                      <option>Ordinary Membership</option>
                      <option>Business Membership</option>
                      <option>Youth &amp; Student Membership</option>
                    </select>
                  </div>
                </div>

                {/* Agri interests */}
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">Primary Area of Agribusiness Interest</label>
                  <select value={formData.agriInterests} onChange={(e) => setFormData({ ...formData, agriInterests: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#63b849]">
                    <option>Crop production</option>
                    <option>Livestock and dairy farming</option>
                    <option>Aquaculture and apiculture</option>
                    <option>Agro-processing and value addition</option>
                    <option>Agritech, mechanization &amp; solar irrigation</option>
                    <option>Trade, export, and supply chain management</option>
                    <option>Agribusiness finance &amp; investment funds</option>
                    <option>Research, policy, and food systems</option>
                  </select>
                </div>

                {/* Consent */}
                <label className="flex items-start gap-2 pt-1 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" required checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded accent-[#63b849]" />
                  <span>
                    I consent to UDAN processing my application data for membership onboarding, regional chapter coordination, and communication according to the UDAN Privacy Policy.
                  </span>
                </label>

                <button type="submit" disabled={status === "loading"}
                  className="w-full pill-btn pill-green text-sm justify-center py-3 font-bold uppercase tracking-wider disabled:opacity-50">
                  {status === "loading" ? "Submitting..." : "Submit Membership Application"}
                </button>

                {feedbackMsg && (
                  <div className={`p-3 rounded-lg text-sm font-semibold ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {feedbackMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
