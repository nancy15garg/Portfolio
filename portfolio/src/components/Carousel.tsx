"use client";

import { useState, useCallback } from "react";
import type { Slide } from "@/data/projects";

interface CarouselProps {
  slides: Slide[];
  cardBg: "dark" | string;
}

/* Placeholder phone frame shown when no real src is provided */
function PhoneMockup({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-52 h-[420px] rounded-[40px] border-[6px] border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl overflow-hidden">
      {/* notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#111] rounded-full z-10" />
      {/* screen */}
      <div className="absolute inset-0 rounded-[34px]" style={{ background: gradient }} />
    </div>
  );
}

export default function Carousel({ slides, cardBg }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const isDark = cardBg === "dark";
  const bg = isDark ? "#111111" : cardBg;
  const arrowBg = isDark ? "#ffffff" : "#111111";
  const arrowColor = isDark ? "#111111" : "#ffffff";
  const dotActive = isDark ? "#ffffff" : "#111111";
  const dotInactive = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Slide area */}
      <div className="relative h-[500px] flex items-center justify-center select-none">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {slide.src ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-h-[440px] max-w-[80%] object-contain"
                draggable={false}
              />
            ) : (
              <PhoneMockup gradient={slide.gradient ?? "linear-gradient(135deg,#667eea,#764ba2)"} />
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="cursor-pointer absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-lg transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ backgroundColor: arrowBg, color: arrowColor }}
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-lg transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ backgroundColor: arrowBg, color: arrowColor }}
      >
        →
      </button>

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="cursor-pointer h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                backgroundColor: i === current ? dotActive : dotInactive,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
