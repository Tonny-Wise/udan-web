"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface ActiveEvent {
  title: string;
  event_type: string;
}

export default function FloatingEventButton() {
  const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from("events")
          .select("title, event_type")
          .eq("enabled", true)
          .order("event_date", { ascending: true })
          .limit(1);
        if (data && data.length > 0) setActiveEvent(data[0]);
      } catch {
        // No active event or Supabase unavailable: hide the button
      }
    };
    fetchEvent();
  }, []);

  if (!activeEvent) return null;

  const eventUrl =
    activeEvent.event_type === "talk-series" ? "/programs" : "/conference";

  return (
    <aside
      aria-label="Active event announcement"
      className="fixed bottom-20 left-5 sm:bottom-24 sm:left-6 z-40 group"
    >
      <Link
        href={eventUrl}
        className="relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#131c33]/95 hover:bg-[#1b2542] backdrop-blur-md border border-[#c6ac62]/70 hover:border-[#63b849] shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#63b849]"
      >
        {/* Pulsing Outer Glow Aura */}
        <span
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#63b849] via-[#c6ac62] to-[#1377a4] opacity-75 blur-md animate-pulse group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        {/* Live Radar Beacon */}
        <span className="relative flex h-3.5 w-3.5 shrink-0 z-10" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63b849] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#63b849] shadow-[0_0_10px_#63b849]" />
        </span>

        {/* Text Details */}
        <div className="relative z-10 flex flex-col text-left">
          <span className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#c6ac62] leading-none">
            Event Happening
          </span>
          <span className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 flex items-center gap-1.5">
            <span>Join Us</span>
            <span className="hidden md:inline font-normal text-gray-300 text-[11px]">
              &bull; {activeEvent.title}
            </span>
          </span>
        </div>

        {/* Action Icon */}
        <span
          className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#63b849] to-[#54a33c] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md group-hover:translate-x-0.5 transition-transform shrink-0"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </Link>
    </aside>
  );
}
