"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface YouthItem {
  name: string;
  rank?: string;
  rankBadge?: string;
  enterprise?: string;
  location?: string;
  sector?: string;
  faceImage: string;
  detailsImage: string;
}

export default function YouthCohortGallery({ youthList }: { youthList: YouthItem[] }) {
  const [selectedYouth, setSelectedYouth] = useState<YouthItem | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedYouth(null);
      }
    };
    if (selectedYouth) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedYouth]);

  return (
    <>
      {/* 5 Cards aligned on the same single line on desktop */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
        {youthList.map((youth, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedYouth(youth)}
            className="w-full group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center p-3.5 sm:p-4 focus:outline-none focus:ring-2 focus:ring-[#1377a4]"
            aria-label={`View full details for ${youth.name}`}
          >
            {/* Face Portrait Image */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3">
              <Image
                src={youth.faceImage}
                alt={youth.name}
                fill
                priority={idx < 2}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay prompt on hover/focus */}
              <div className="absolute inset-0 bg-[#131c33]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                <svg
                  className="w-4 h-4 text-[#63b849]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
                <span>View Details</span>
              </div>
            </div>

            {/* Center-Aligned Card Information (Without rank badges) */}
            <div className="flex-1 flex flex-col items-center justify-between w-full">
              <div className="flex flex-col items-center w-full">
                <h4 className="font-heading font-bold text-sm sm:text-base text-[#1b2238] group-hover:text-[#1377a4] transition-colors leading-tight">
                  {youth.name}
                </h4>

                {youth.enterprise && (
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1377a4] mt-2 leading-snug">
                    {youth.enterprise}
                  </p>
                )}

                {youth.location && (
                  <p className="text-[11px] text-gray-500 mt-1 leading-tight">
                    {youth.location}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 w-full flex items-center justify-center">
                <span className="text-[11px] font-bold text-[#1377a4] group-hover:text-[#0e5779] inline-flex items-center gap-1">
                  <span>Tap for details</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* POPUP LIGHTBOX MODAL - Shows the full detailed card image at original size */}
      {selectedYouth && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedYouth.name}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedYouth(null)}
        >
          <div
            className="relative max-w-5xl lg:max-w-6xl w-full bg-[#131c33] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#1b2542] border-b border-white/10 text-white">
              <div className="flex items-center gap-2.5">
                <h3 className="font-heading font-bold text-sm sm:text-base tracking-wide">
                  {selectedYouth.name} &bull; Venture Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedYouth(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Image display - original popup size showing the detailed card image */}
            <div className="relative w-full aspect-[16/11] max-h-[75vh] bg-[#0d1527] flex items-center justify-center p-1 sm:p-2">
              <Image
                src={selectedYouth.detailsImage}
                alt={`${selectedYouth.name} Full Venture Details`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            {/* Footer bar */}
            <div className="px-5 py-3 bg-[#1b2542] border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
              <span className="text-gray-400">Diaspora Youth Matchmaking Programme 2026</span>
              <button
                type="button"
                onClick={() => setSelectedYouth(null)}
                className="pill-btn pill-green text-[11px] py-1.5 px-4"
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
