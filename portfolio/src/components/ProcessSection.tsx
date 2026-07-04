"use client";

import React, { useState, useEffect, useRef } from "react";

const ICON_SIZE = 56;
const ICON_GAP  = 94;

// origW / origH are the source pixel dimensions — cards render at native size to stay sharp.
const STEPS = [
  {
    id: 0,
    label: "Problem Validation",
    cardImg: "/images/Frame 39.png",
    origW: 449, origH: 366,
    tabDefault:  "/images/search-line-1.svg",
    tabSelected: "/images/search-line.svg",
  },
  {
    id: 1,
    label: "AI Research Synthesis",
    cardImg: "/images/Frame 47.png",
    origW: 475, origH: 393,
    tabDefault:  "/images/user-line-1.svg",
    tabSelected: "/images/user-line.svg",
  },
  {
    id: 2,
    label: "Low-Fi AI Prototype",
    cardImg: "/images/Frame 48.png",
    origW: 536, origH: 386,
    tabDefault:  "/images/pages-line-1.svg",
    tabSelected: "/images/pages-line.svg",
  },
  {
    id: 3,
    label: "High-Fi on Figma",
    cardImg: "/images/Frame 49.png",
    origW: 508, origH: 437,
    tabDefault:  "/images/figma-line-1.svg",
    tabSelected: "/images/figma-line.svg",
  },
  {
    id: 4,
    label: "Launch & Testing",
    cardImg: "/images/Frame 50.png",
    origW: 473, origH: 396,
    tabDefault:  "/images/rocket-line-1.svg",
    tabSelected: "/images/rocket-line.svg",
  },
  {
    id: 5,
    label: "Track and Learn",
    cardImg: "/images/Frame 51.png",
    origW: 512, origH: 442,
    tabDefault:  "/images/line-chart-line-1.svg",
    tabSelected: "/images/line-chart-line.svg",
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isHoveringRef = useRef(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        setAnimKey((k) => k + 1);
        return (prev + 1) % STEPS.length;
      });
    }, 2800);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Start auto-cycle only when the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      stopInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreenSize(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDesktop = screenSize === "desktop";
  const isMobile  = screenSize === "mobile";

  const iconSize = isMobile ? 44 : (screenSize === "tablet" ? 48 : ICON_SIZE);
  const iconGap  = isMobile ? 22 : (screenSize === "tablet" ? 44 : ICON_GAP);
  const padTop   = isMobile ? 300 : (screenSize === "tablet" ? 400 : 420);

  const activeStep = STEPS[active];

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1200px] px-8 md:px-12 pb-12">

      {/* ── Header ── */}
      <div className="mb-6 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.72px] text-[#5c5c5c]">
          the process
        </p>
        <h2 className="text-5xl md:text-6xl font-normal text-[#111] leading-none tracking-[-0.02em]">
          I Do not just Design, I OWN it
        </h2>
      </div>

      <div style={{ position: "relative", paddingTop: padTop }}>
        {/* ── Mobile / tablet: single card centred on the section ── */}
        {!isDesktop && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "min(80vw, 380px)" : "min(65vw, 480px)",
            }}
          >
            <div key={animKey} className="process-card-reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeStep.cardImg}
                alt={activeStep.label}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        )}

        {/* ── Icon row ── */}
        <div style={{ display: "flex", gap: iconGap, justifyContent: "center" }}>
          {STEPS.map((s, i) => (
              <div
                key={s.id}
                style={{ position: "relative", flexShrink: 0, width: iconSize }}
              >
                {/* Desktop only: card floats above its own icon */}
                {isDesktop && i === active && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 16px)",
                      left: "50%",
                      marginLeft: -(s.origW / 2),
                      width: s.origW,
                    }}
                  >
                    <div key={animKey} className="process-card-reveal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.cardImg}
                        alt={s.label}
                        style={{
                          display: "block",
                          imageRendering: "auto",
                          width: s.origW,
                          height: s.origH,
                          maxWidth: "none",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Tab icon button ── */}
                <button
                  onClick={() => { setActive(i); setAnimKey((k) => k + 1); if (!isHoveringRef.current) startInterval(); }}
                  onMouseEnter={() => { isHoveringRef.current = true; stopInterval(); setActive(i); setAnimKey((k) => k + 1); }}
                  onMouseLeave={() => { isHoveringRef.current = false; startInterval(); }}
                  aria-label={s.label}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: isMobile ? 11 : 14,
                    background: i === active ? "#0a0a0a" : "#f0f0f0",
                    boxShadow: i === active ? "0 2px 14px rgba(0,0,0,0.22)" : "none",
                    transform: i === active ? "scale(1.06)" : "scale(1)",
                    transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i === active ? s.tabSelected : s.tabDefault}
                    alt=""
                    width={isMobile ? 20 : 24}
                    height={isMobile ? 20 : 24}
                    style={{ display: "block" }}
                  />
                </button>
              </div>
          ))}
        </div>
      </div>

    </section>
  );
}
