"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `[${form.category}] ${form.subject || "UDAN Inquiry"}`,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("Thank you! Your message has been delivered to the UDAN Secretariat. We will respond promptly.");
        setForm({
          name: "",
          email: "",
          category: "General Inquiry",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white font-body">
      {/* Header Banner */}
      <section className="bg-[#131c33] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">

          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Reach out regarding agribusiness co-investments, regional chapter participation, matchmaking applications, or institutional partnerships.
          </p>
        </div>
        <div className="brand-ribbon w-full absolute bottom-0 left-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Directory & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mt-1 mb-4">
                Secretariat
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                The UDAN Secretariat coordinates closely with the Ministry of Foreign Affairs (MoFA) Diaspora Department and diplomatic missions worldwide.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/60 shadow-sm flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2.5 flex-none shadow-sm">
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/location.png"
                    alt="Location"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </span>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">Secretariat</h4>
                  <p className="text-xs text-gray-600">
                    Uganda Diaspora in Agribusiness Network (UDAN) Secretariat<br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/60 shadow-sm flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2.5 flex-none shadow-sm">
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/phone.png"
                    alt="Phone"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </span>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">Telephone &amp; WhatsApp</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Phone: <a href="tel:+256781978239" className="text-[#1377a4] font-semibold hover:underline">+256 781 978 239</a> / <a href="tel:+256783590960" className="text-[#1377a4] font-semibold hover:underline">+256 783 590 960</a><br />
                    WhatsApp Hotline: <a href="https://wa.me/256783590960" target="_blank" rel="noreferrer" className="text-[#63b849] font-semibold hover:underline">+256 783 590 960</a>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/60 shadow-sm flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2.5 flex-none shadow-sm">
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/gmail.png"
                    alt="Email"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </span>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#1b2238]">Official Inquiries</h4>
                  <p className="text-xs text-gray-600">
                    General Inquiries: <a href="mailto:info@udandiaspora.org" className="text-[#1377a4] font-semibold">info@udandiaspora.org</a><br />
                    Executive Desk: <a href="mailto:secretariat@udandiaspora.org" className="text-[#1377a4] font-semibold">secretariat@udandiaspora.org</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Channels (Explicitly addressing review feedback: TikTok + LinkedIn) */}
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
              <h4 className="font-heading font-bold text-base text-[#1b2238] mb-1">
                Follow UDAN
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Join our community discussions, live webinar streams, and field updates.
              </p>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://www.instagram.com/udan_org?rpxt=MXhsaDIwMDB6aXZiZA=="
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[#1b2238] text-xs font-semibold flex items-center gap-2 hover:border-[#e1306c] hover:shadow-sm transition-all"
                >
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/instagram.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/uganda-diaspora-in-agribusiness-network-a44307388?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[#1b2238] text-xs font-semibold flex items-center gap-2 hover:border-[#1377a4] hover:shadow-sm transition-all"
                >
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/linkedin.png"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.tiktok.com/@udan_org?_r=1&_t=ZS-9B51gPnBvy4"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[#1b2238] text-xs font-semibold flex items-center gap-2 hover:border-black hover:shadow-sm transition-all"
                >
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/tiktok.png"
                    alt="TikTok"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>TikTok</span>
                </a>
                <a
                  href="https://youtube.com/@ugandadiasporainagrinet?si=8grnCBA9SeMF-Ufg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[#1b2238] text-xs font-semibold flex items-center gap-2 hover:border-[#ff0000] hover:shadow-sm transition-all"
                >
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/youtube.png"
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://wa.me/256783590960"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[#1b2238] text-xs font-semibold flex items-center gap-2 hover:border-[#25d366] hover:shadow-sm transition-all"
                >
                  <Image
                    src="https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/whatsapp.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#63b849]">Send Message</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b2238] mt-1">
                Write Directly to Us
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Fill in your details and an assigned liaison officer will follow up with you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#1377a4] focus:ring-1 focus:ring-[#1377a4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. johndoe@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#1377a4] focus:ring-1 focus:ring-[#1377a4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#1377a4]"
                  >
                    <option>General Inquiry</option>
                    <option>Diaspora Youth Matchmaking Programme</option>
                    <option>Agri-Food Investment</option>
                    <option>Membership </option>
                    <option>Annual Conference</option>
                    <option>Institutional Partnership</option>
                    <option>Press </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Partnership Proposal for Hass Avocado"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#1377a4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1b2238] uppercase tracking-wider mb-1">
                  Your Message / Proposal *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please describe your background, agricultural interests, or inquiry in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#1377a4] focus:ring-1 focus:ring-[#1377a4]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full pill-btn pill-blue text-xs justify-center py-3 font-bold uppercase tracking-wider disabled:opacity-50"
              >
                {status === "loading" ? "Transmitting Message..." : "Send"}
              </button>

              {feedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-semibold ${
                    status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
