"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface WinnerDetails {
  position: string;
  name: string;
  company: string;
  location?: string;
  sector: string;
  description: string;
  image: string;
  badge: string;
  awardImage?: string;
  productImages?: string[];
  journey?: string;
  vision?: string;
  motivation?: string;
  sustainability?: string;
  fullStory?: string;
  achievements?: string[];
  impact?: string;
  community?: string;
}

interface AwardWinnerModalProps {
  winners?: WinnerDetails[];
  winner?: WinnerDetails;
}

export default function AwardWinnerModal({ winners, winner }: AwardWinnerModalProps) {
  const [selectedWinner, setSelectedWinner] = useState<WinnerDetails | null>(null);
  const [isSingleOpen, setIsSingleOpen] = useState(false);

  const activeWinner = selectedWinner || (isSingleOpen ? winner : null);

  const handleClose = () => {
    setSelectedWinner(null);
    setIsSingleOpen(false);
  };

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (activeWinner) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeWinner]);

  return (
    <>
      {/* If winners array is provided, render all winner cards */}
      {winners && winners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {winners.map((win, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={win.image}
                  alt={win.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#131c33]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                  {win.badge}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] block">
                    {win.sector}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1b2238]">{win.name}</h3>
                  <div className="text-xs font-bold text-[#1377a4] mb-2">{win.company}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{win.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedWinner(win)}
                  className="w-full mt-4 pill-btn pill-blue text-xs py-2 px-4 justify-center"
                  aria-label={`Read more about ${win.name}`}
                >
                  <span>Read More</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If used as a standalone single-winner button */}
      {!winners && winner && (
        <button
          type="button"
          onClick={() => setIsSingleOpen(true)}
          className="w-full mt-4 pill-btn pill-blue text-xs py-2 px-4 justify-center"
          aria-label={`Read more about ${winner.name}`}
        >
          <span>Read More</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      )}

      {/* POPUP MODAL DIALOG - Rendered at root, outside card hierarchies */}
      {activeWinner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop with click-to-dismiss */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div
            className="relative z-10 max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col max-h-[92vh] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#131c33] text-white border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#63b849]" />
                <div>
                  <span className="text-[10px] text-[#c6ac62] font-bold uppercase tracking-widest block">
                    {activeWinner.position}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    {activeWinner.name} &bull; {activeWinner.company}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-7 text-gray-700 font-body text-xs sm:text-sm leading-relaxed">
              {/* Dual Visual Showcase: Founder Portrait + Official Award Presentation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-200 aspect-[16/11]">
                    <Image
                      src={activeWinner.image}
                      alt={activeWinner.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 block text-center">
                    {activeWinner.name} - Enterprise Founder
                  </span>
                </div>

                {activeWinner.awardImage && (
                  <div className="space-y-1.5">
                    <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-200 aspect-[16/11]">
                      <Image
                        src={activeWinner.awardImage}
                        alt={`${activeWinner.name} Award Ceremony`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                        className="object-contain p-2"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 block text-center">
                      Official 2025 Climate Action Award Presentation
                    </span>
                  </div>
                )}
              </div>

              {/* Enterprise Meta Card */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#63b849] mb-0.5">
                    Enterprise
                  </div>
                  <p className="font-heading font-bold text-base text-[#1b2238]">{activeWinner.company}</p>
                </div>
                {activeWinner.location && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#c6ac62] mb-0.5">
                      Location
                    </div>
                    <p className="font-heading font-semibold text-sm text-[#1b2238]">{activeWinner.location}</p>
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#1377a4] mb-0.5">
                    Sector Focus
                  </div>
                  <p className="text-xs text-gray-700">{activeWinner.sector}</p>
                </div>
              </div>

              {/* The Journey */}
              {activeWinner.journey && (
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] border-b border-gray-200 pb-1.5">
                    The Journey
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{activeWinner.journey}</p>
                </div>
              )}

              {/* The Vision & Model */}
              {activeWinner.vision && (
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] border-b border-gray-200 pb-1.5">
                    The Vision &amp; Innovation
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{activeWinner.vision}</p>
                </div>
              )}

              {/* Motivation */}
              {activeWinner.motivation && (
                <div className="p-4 bg-[#f0f7fa] border-l-4 border-[#1377a4] rounded-r-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1377a4] block">
                    Motivation &amp; Climate Philosophy
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">{activeWinner.motivation}</p>
                </div>
              )}

              {/* Sustainability & Scale */}
              {activeWinner.sustainability && (
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#1b2238] border-b border-gray-200 pb-1.5">
                    Scale, Market Reach &amp; Sustainability
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{activeWinner.sustainability}</p>
                </div>
              )}

              {/* Climate Action Achievements */}
              {activeWinner.achievements && activeWinner.achievements.length > 0 && (
                <div className="space-y-3 bg-[#f2f9ed] p-4 sm:p-5 rounded-xl border border-[#63b849]/30">
                  <h4 className="font-heading font-bold text-base text-[#1b2238] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#63b849]" />
                    <span>Climate Action Achievements</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeWinner.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                        <span className="text-[#63b849] font-bold text-base leading-none mt-0.5">&bull;</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Products & Value-Added Solutions Showcase */}
              {activeWinner.productImages && activeWinner.productImages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="border-b border-gray-200 pb-1.5 flex items-center justify-between">
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[#1b2238]">
                      Products &amp; Value-Added Solutions
                    </h4>
                    <span className="text-[11px] text-[#1377a4] font-semibold">
                      {activeWinner.company}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeWinner.productImages.map((prodImg, pIdx) => (
                      <div
                        key={pIdx}
                        className="group relative rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-full aspect-[16/11]">
                          <Image
                            src={prodImg}
                            alt={`${activeWinner.company} Product Showcase ${pIdx + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2.5 bg-white border-t border-gray-100 text-center">
                          <span className="text-[11px] font-bold text-gray-700">
                            {activeWinner.company} &bull; Product Showcase {pIdx + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500 font-semibold">
                UDAN 2025 Climate Action Awards &bull; Speke Resort Munyonyo
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="pill-btn pill-green text-xs py-1.5 px-4"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
