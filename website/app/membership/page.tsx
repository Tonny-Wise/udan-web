"use client";

import { useState } from "react";
import Link from "next/link";

export default function MembershipPage() {
  const [registrationType, setRegistrationType] = useState<"success" | null>(null);
  const [regStatus, setRegStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [regMessage, setRegMessage] = useState("");

  // Registration state
  const [regData, setRegData] = useState({
    fullName: "",
    gender: "Prefer not to say",
    email: "",
    phone: "",
    region: "North America",
    country: "United States",
    occupation: "",
    agriInterests: "Crop production",
    company: "",
    membershipType: "Ordinary Membership",
    registrationType: "buyer" as "buyer" | "seller" | "other",
    customRole: "",
    isDiaspora: "" as "" | "yes" | "no",
    password: "",
    confirmPassword: "",
    consent: false,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.isDiaspora) {
      setRegStatus("error");
      setRegMessage("Please indicate whether you are a member of the Ugandan diaspora.");
      return;
    }
    if (regData.registrationType === "other" && !regData.customRole.trim()) {
      setRegStatus("error");
      setRegMessage("Please specify your role or designation.");
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      setRegStatus("error");
      setRegMessage("Passwords do not match. Please verify.");
      return;
    }
    if (!regData.consent) {
      setRegStatus("error");
      setRegMessage("Please consent to the membership data processing terms.");
      return;
    }

    setRegStatus("loading");
    setRegMessage("");

    const effectiveRole =
      regData.registrationType === "other"
        ? regData.customRole.trim() || "Other Stakeholder"
        : regData.registrationType === "buyer"
        ? "Buyer"
        : "Seller";

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regData.fullName,
          email: regData.email,
          phone: regData.phone,
          gender: regData.gender,
          region: regData.region,
          country: regData.country,
          occupation: regData.occupation,
          company: regData.company,
          agriInterests: regData.agriInterests,
          membershipType: regData.membershipType,
          registrationType: effectiveRole,
          isDiaspora: regData.isDiaspora,
          interests: `Registered as ${effectiveRole} - Diaspora: ${regData.isDiaspora === "yes" ? "Yes" : "No"}, Gender: ${regData.gender}, Region: ${regData.region} (${regData.country}), Occupation: ${regData.occupation || "N/A"}, Company: ${regData.company || "N/A"}, Focus: ${regData.agriInterests}, Type: ${regData.membershipType}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegStatus("success");
        setRegistrationType("success");
        setRegMessage(
          `Congratulations! You have successfully registered as ${
            regData.registrationType === "buyer"
              ? "a Buyer"
              : regData.registrationType === "seller"
              ? "a Seller"
              : effectiveRole
          }.`
        );
      } else {
        setRegStatus("error");
        setRegMessage(data.error || "Failed to register. Please try again.");
      }
    } catch {
      setRegStatus("error");
      setRegMessage("An unexpected error occurred. Please try again.");
    }
  };

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
      <section className="bg-gradient-to-br from-[#131c33] via-[#1b2238] to-[#0f2744] text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            JOIN UDAN TODAY
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Connect to a structured global ecosystem that promotes investment, innovation, trade, and knowledge exchange within Uganda&apos;s agricultural sector.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#register" className="pill-btn pill-green text-xs sm:text-sm px-6 py-2.5">
              Register Online
            </a>
            <a href="#benefits" className="pill-btn pill-blue text-xs sm:text-sm px-6 py-2.5">
              Explore Benefits
            </a>
          </div>
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

        {/* JOIN UDAN REGISTRATION FORM */}
        <div id="apply" className="scroll-mt-32" />
        <section id="register" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#63b849]">Online Onboarding</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238]">
                Join UDAN Today
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete the registration form to join the Uganda Diaspora in Agribusiness Network. The Secretariat will verify your profile, link you to your regional chapter, and grant you access to curated agribusiness opportunities and our B2B trade platform.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-[#f0f9ed] rounded-xl border border-[#63b849]/30 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Direct B2B Market Access</p>
                  <p>Connect with vetted buyers, commercial sellers, and verified suppliers across Uganda and the global diaspora.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Data Protection &amp; Privacy</p>
                  <p>All information is managed securely in compliance with Ugandan and international data privacy regulations.</p>
                </div>
                <div className="p-4 bg-[#faf6eb] rounded-xl border border-[#c6ac62]/40 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-[#1b2238]">Immediate Confirmation</p>
                  <p>An email confirmation will be sent upon submission with portal access instructions and chapter onboarding details.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
              {/* SUCCESS STATE */}
              {registrationType === "success" ? (
                <div className="bg-gradient-to-br from-[#f0f9ed] to-[#e8f5e1] rounded-2xl p-8 sm:p-10 border border-[#63b849]/40 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#63b849] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mb-3">
                    Registration Successful!
                  </h3>
                  <p className="text-sm text-gray-700 max-w-md mx-auto mb-6">
                    {regMessage}
                  </p>
                  <p className="text-xs text-gray-600 mb-8">
                    An email confirmation will be sent to <span className="font-bold text-[#1b2238]">{regData.email}</span>. 
                    Please check your inbox for next steps and B2B Business portal access.
                  </p>
                  <button
                    onClick={() => {
                      setRegistrationType(null);
                      setRegData({
                        fullName: "",
                        gender: "Prefer not to say",
                        email: "",
                        phone: "",
                        region: "North America",
                        country: "United States",
                        occupation: "",
                        agriInterests: "Crop production",
                        company: "",
                        membershipType: "Ordinary Membership",
                        registrationType: "buyer",
                        customRole: "",
                        isDiaspora: "",
                        password: "",
                        confirmPassword: "",
                        consent: false,
                      });
                    }}
                    className="pill-btn pill-green text-xs py-2.5 px-6"
                  >
                    Register Another Member
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="mb-4 pb-3 border-b border-gray-200">
                    <h3 className="font-heading font-bold text-xl text-[#1b2238]">
                      Register with UDAN
                    </h3>
                    <p className="text-xs text-gray-500">
                      Complete your profile to join the Uganda Diaspora in Agribusiness Network
                    </p>
                  </div>

                  {/* DIASPORA QUESTION */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-2">
                      Are you a member of the Ugandan diaspora? *
                    </label>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isDiaspora"
                          value="yes"
                          checked={regData.isDiaspora === "yes"}
                          onChange={() => setRegData({ ...regData, isDiaspora: "yes" })}
                          className="accent-[#63b849]"
                        />
                        <span className="text-sm text-[#1b2238] font-medium">Yes, I am in the diaspora</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isDiaspora"
                          value="no"
                          checked={regData.isDiaspora === "no"}
                          onChange={() => setRegData({ ...regData, isDiaspora: "no" })}
                          className="accent-[#63b849]"
                        />
                        <span className="text-sm text-[#1b2238] font-medium">No, I am based in Uganda</span>
                      </label>
                    </div>
                  </div>

                  {/* REGISTRATION ROLE SELECTOR */}
                  <div>
                    <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                      I am registering as *
                    </label>
                    <select
                      value={regData.registrationType}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          registrationType: e.target.value as "buyer" | "seller" | "other",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                    >
                      <option value="buyer">Buyer / Investor</option>
                      <option value="seller">Seller / Agripreneur</option>
                      <option value="other">Other Stakeholder / Partner</option>
                    </select>
                  </div>

                  {/* SPECIFIC ROLE FIELD FOR OTHERS */}
                  {regData.registrationType === "other" && (
                    <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Specify Your Role / Designation *
                      </label>
                      <input
                        type="text"
                        required
                        value={regData.customRole}
                        onChange={(e) => setRegData({ ...regData, customRole: e.target.value })}
                        placeholder="e.g. Impact Investor, Development Partner, Agricultural Researcher, Mentor, Student"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none bg-white focus:border-[#e5851d] focus:ring-1 focus:ring-[#e5851d]"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">
                        Type your specific role or interest within the agribusiness ecosystem
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Full Names *
                      </label>
                      <input
                        type="text"
                        required
                        value={regData.fullName}
                        onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                        placeholder="e.g. Jasper Batureine"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Gender
                      </label>
                      <select
                        value={regData.gender}
                        onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={regData.email}
                        onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                        placeholder="e.g. jasper@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={regData.phone}
                        onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Regional Chapter
                      </label>
                      <select
                        value={regData.region}
                        onChange={(e) => setRegData({ ...regData, region: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      >
                        <option>North America (USA, Canada)</option>
                        <option>Europe (UK, Germany, Netherlands, Sweden, Norway)</option>
                        <option>Middle East (UAE, Qatar, Saudi Arabia)</option>
                        <option>East Africa (Uganda, Kenya, Tanzania, Rwanda, Burundi)</option>
                        <option>Southern &amp; Central Africa (South Africa, Zambia, Zimbabwe)</option>
                        <option>Asia &amp; Australia (China, India, Australia)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={regData.country}
                        onChange={(e) => setRegData({ ...regData, country: e.target.value })}
                        placeholder="e.g. United States, United Kingdom"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Professional Background / Occupation
                      </label>
                      <input
                        type="text"
                        value={regData.occupation}
                        onChange={(e) => setRegData({ ...regData, occupation: e.target.value })}
                        placeholder="e.g. Financial Analyst, Agronomist, Engineer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Organisation / Company
                      </label>
                      <input
                        type="text"
                        value={regData.company}
                        onChange={(e) => setRegData({ ...regData, company: e.target.value })}
                        placeholder="e.g. Sunland Hass Farm Ltd"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Area of Agribusiness Interests
                      </label>
                      <select
                        value={regData.agriInterests}
                        onChange={(e) => setRegData({ ...regData, agriInterests: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      >
                        <option>Crop production</option>
                        <option>Livestock and dairy farming</option>
                        <option>Aquaculture and apiculture</option>
                        <option>Agro-processing and value addition</option>
                        <option>Agritech and farm mechanization</option>
                        <option>Irrigation and climate-smart agriculture</option>
                        <option>Agricultural inputs and farm services</option>
                        <option>Trade, export, and supply chain management</option>
                        <option>Agribusiness finance and investment</option>
                        <option>Research, policy, and food systems development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Type of Membership
                      </label>
                      <select
                        value={regData.membershipType}
                        onChange={(e) => setRegData({ ...regData, membershipType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849]"
                      >
                        <option>Ordinary Membership</option>
                        <option>Business Membership</option>
                        <option>Youth &amp; Student Membership</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Password Setup *
                      </label>
                      <input
                        type="password"
                        required
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        placeholder="At least 8 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#63b849] focus:ring-1 focus:ring-[#63b849]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={regData.consent}
                        onChange={(e) => setRegData({ ...regData, consent: e.target.checked })}
                        className="mt-0.5 rounded text-[#63b849] focus:ring-[#63b849]"
                      />
                      <span>
                        I consent to UDAN processing my personal data for membership onboarding, regional chapter affiliation, and communication according to the UDAN Constitution and Privacy Policy.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={regStatus === "loading"}
                    className="w-full pill-btn pill-green text-xs justify-center py-3 font-bold uppercase tracking-wider disabled:opacity-50"
                  >
                    {regStatus === "loading" ? "Registering..." : "Complete Registration"}
                  </button>

                  {regMessage && (
                    <div
                      className={`p-3 rounded-lg text-xs font-semibold ${
                        regStatus === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {regMessage}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
