"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  caption?: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  coverImage?: string;
  images: GalleryImage[];
}

interface ConferenceGalleryProps {
  categories: GalleryCategory[];
}

export default function ConferenceGallery({ categories }: ConferenceGalleryProps) {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  const activeCategory = activeCategoryIdx !== null ? categories[activeCategoryIdx] : null;
  const currentImages = activeCategory ? activeCategory.images : [];
  const totalPhotos = currentImages.length;

  const handleOpenCategory = (catIdx: number, photoIdx: number = 0) => {
    setActiveCategoryIdx(catIdx);
    setCurrentPhotoIdx(photoIdx);
  };

  const handleClose = () => {
    setActiveCategoryIdx(null);
    setCurrentPhotoIdx(0);
  };

  const handlePrev = useCallback(() => {
    if (totalPhotos <= 1) return;
    setCurrentPhotoIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos]);

  const handleNext = useCallback(() => {
    if (totalPhotos <= 1) return;
    setCurrentPhotoIdx((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCategoryIdx === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (activeCategoryIdx !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCategoryIdx, handlePrev, handleNext]);

  return (
    <>
      {/* ALBUM CATEGORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, catIdx) => {
          const cover = cat.coverImage || cat.images[0]?.src || "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/gallery/AF6A6287.JPG";
          const count = cat.images.length;

          return (
            <div
              key={cat.id || catIdx}
              onClick={() => handleOpenCategory(catIdx, 0)}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-left focus-within:ring-2 focus-within:ring-[#1377a4]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenCategory(catIdx, 0);
                }
              }}
              aria-label={`Open album: ${cat.title} (${count} photos)`}
            >
              {/* Cover Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                <Image
                  src={cover}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Top Photo Count Badge */}
                <div className="absolute top-3 left-3 bg-[#131c33]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/10">
                  <svg
                    className="w-3.5 h-3.5 text-[#63b849]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{count} Photos</span>
                </div>

                {/* Zoom Hint */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>

              {/* Banner Below */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#131c33] via-[#18233f] to-[#1c2948] text-white flex items-center justify-between border-t border-white/10 group-hover:from-[#1b2b4e] group-hover:to-[#152445] transition-colors">
                <div className="min-w-0 flex-1 pr-3">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#63b849] transition-colors leading-snug line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#63b849]" />
                    <span>Tap to view {count} photos &rarr;</span>
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#63b849] text-white flex items-center justify-center transition-all group-hover:translate-x-1 shrink-0 border border-white/10 shadow-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MULTI-IMAGE SLIDER LIGHTBOX MODAL */}
      {activeCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCategory.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-md animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="relative max-w-6xl w-full h-[92vh] max-h-[920px] bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#1b2542] border-b border-white/10 text-white shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#63b849] shrink-0" />
                <h3 className="font-heading font-bold text-sm sm:text-base tracking-wide truncate">
                  {activeCategory.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-gray-200 font-semibold">
                  Photo {currentPhotoIdx + 1} of {totalPhotos}
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg leading-none"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Slider Center Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-0 p-2 sm:p-4">
              {currentImages[currentPhotoIdx] && (
                <div className="relative w-full h-full">
                  <Image
                    src={currentImages[currentPhotoIdx].src}
                    alt={
                      currentImages[currentPhotoIdx].caption ||
                      `${activeCategory.title} - Photo ${currentPhotoIdx + 1}`
                    }
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-contain"
                  />
                </div>
              )}

              {/* Slide Arrows */}
              {totalPhotos > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#63b849]"
                    aria-label="Previous photo"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#63b849]"
                    aria-label="Next photo"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip & Modal Footer */}
            <div className="bg-[#1b2542] border-t border-white/10 px-4 sm:px-6 py-3 shrink-0 flex flex-col gap-2">
              {/* Thumbnail strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20">
                {currentImages.map((img, idx) => {
                  const isCurrent = idx === currentPhotoIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentPhotoIdx(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        isCurrent
                          ? "border-[#63b849] scale-105 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Jump to photo ${idx + 1}`}
                    >
                      <Image
                        src={img.src}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
                <span className="hidden sm:inline text-gray-400">
                  Tip: Use left and right arrow keys to slide, Esc to close
                </span>
                <span className="sm:hidden text-gray-400">
                  Swipe or tap arrows to slide
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="pill-btn pill-green text-xs py-1.5 px-4"
                >
                  <span>Close Gallery</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
