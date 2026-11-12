"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
  const [registrationType, setRegistrationType] = useState<"chooser" | "buyer" | "seller" | "other" | "success" | null>(null);
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
    registrationType: "", // "buyer", "seller", or "other"
    customRole: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });

  const handleChooseType = (type: "buyer" | "seller" | "other") => {
    setRegistrationType(type);
    setRegData({ ...regData, registrationType: type });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationType === "other" && !regData.customRole.trim()) {
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
      registrationType === "other"
        ? regData.customRole.trim()
        : registrationType === "buyer"
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
          interests: `Registered as ${effectiveRole} - Gender: ${regData.gender}, Region: ${regData.region} (${regData.country}), Occupation: ${regData.occupation || "N/A"}, Company: ${regData.company || "N/A"}, Focus: ${regData.agriInterests}, Type: ${regData.membershipType}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegStatus("success");
        setRegistrationType("success");
        setRegMessage(
          `Congratulations! You have successfully registered as ${
            registrationType === "buyer"
              ? "a Buyer"
              : registrationType === "seller"
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

  return (
    <div className="bg-white font-body min-h-[85vh]">
      {/* Banner */}
      <section className="bg-[#131c33] text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mb-2">
            {registrationType === "success" ? "Registration Confirmed" : "Register with UDAN"}
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            {registrationType === "success"
              ? "Your account has been created successfully"
              : "Join the Uganda Diaspora in Agribusiness Network. Choose your role to get started."}
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* SUCCESS STATE */}
        {registrationType === "success" && (
          <div className="bg-gradient-to-br from-[#f0f9ed] to-[#e8f5e1] rounded-2xl p-8 sm:p-12 border border-[#63b849]/40 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#63b849] text-white flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
              ✓
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mb-3">
              Registration Successful!
            </h2>
            <p className="text-sm text-gray-700 max-w-md mx-auto mb-6">
              {regMessage}
            </p>
            <p className="text-xs text-gray-600 mb-8">
              An email confirmation has been sent to <span className="font-bold text-[#1b2238]">{regData.email}</span>. 
              Please check your inbox for next steps and member portal access.
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
                  registrationType: "",
                  customRole: "",
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
        )}

        {/* ROLE CHOOSER */}
        {registrationType === null && (
          <div className="animate-fadeIn space-y-8">
            <div className="text-center">
              <h2 className="font-heading font-bold text-2xl text-[#1b2238] mb-2">
                What describes you best?
              </h2>
              <p className="text-xs text-gray-600">
                Choose your primary role in the agribusiness network
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* BUYER CARD */}
              <button
                type="button"
                onClick={() => handleChooseType("buyer")}
                className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-[#1377a4] bg-white hover:bg-blue-50/50 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#1377a4]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#1377a4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">
                  I am a Buyer
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  I am looking to source quality agricultural products, connect with suppliers, and explore investment opportunities.
                </p>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#1377a4] flex items-center gap-1">
                  Choose Buyer
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              {/* SELLER CARD */}
              <button
                type="button"
                onClick={() => handleChooseType("seller")}
                className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-[#63b849] bg-white hover:bg-green-50/50 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#63b849]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#63b849]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-2">
                  I am a Seller
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  I am an agripreneur or agribusiness enterprise looking to reach buyers, showcase my business, and scale operations.
                </p>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#63b849] flex items-center gap-1">
                  Choose Seller
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            </div>

            {/* OTHERS CARD BELOW */}
            <button
              type="button"
              onClick={() => handleChooseType("other")}
              className="group w-full p-8 rounded-2xl border-2 border-gray-200 hover:border-[#e5851d] bg-white hover:bg-amber-50/40 hover:shadow-md transition-all duration-300 text-left cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#e5851d]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#e5851d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#1b2238] mb-1">
                    Other Roles &amp; Stakeholders
                  </h3>
                  <p className="text-xs text-gray-600 max-w-xl">
                    I am an investor, mentor, researcher, development partner, policymaker, student, or other agribusiness professional looking to connect with UDAN.
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#e5851d] flex items-center gap-1 shrink-0 self-start sm:self-center">
                Choose Others
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        )}

        {/* REGISTRATION FORM */}
        {(registrationType === "buyer" || registrationType === "seller" || registrationType === "other") && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setRegistrationType(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ←
              </button>
              <div>
                <h2 className="font-heading font-bold text-xl text-[#1b2238]">
                  Register as {registrationType === "buyer" ? "a Buyer" : registrationType === "seller" ? "a Seller" : "an Agribusiness Stakeholder"}
                </h2>
                <p className="text-xs text-gray-500">
                  Complete your profile to join the UDAN network
                </p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* SPECIFIC ROLE FIELD FOR OTHERS */}
              {registrationType === "other" && (
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
                {regStatus === "loading"
                  ? "Registering..."
                  : `Complete Registration as ${
                      registrationType === "buyer"
                        ? "Buyer"
                        : registrationType === "seller"
                        ? "Seller"
                        : regData.customRole || "Member"
                    }`}
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
          </div>
        )}
      </div>
    </div>
  );
}
