"use client";

import { useEffect, useRef } from "react";

export default function CompaniesSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const clipRectRef   = useRef<SVGRectElement>(null);
  const dehaaRef      = useRef<SVGGElement>(null);
  const cars24Ref     = useRef<SVGGElement>(null);
  const c24OuterRef   = useRef<SVGCircleElement>(null);
  const c24InnerRef   = useRef<SVGCircleElement>(null);
  const nxtwaveRef    = useRef<SVGGElement>(null);
  const subheadRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Linear remap with clamp
    const at = (p: number, p0: number, p1: number) =>
      Math.max(0, Math.min(1, (p - p0) / (p1 - p0)));

    const update = () => {
      const { top } = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 = section just entering viewport bottom
      //           1 = section top is 30% down from viewport top
      const progress = Math.max(0, Math.min(1, (vh - top) / (vh * 0.7)));

      // ── Path reveal clip (scaleX from left edge) ──
      // The clip rect sits at x=0, so scaleX from origin = reveal left→right
      const px = at(progress, 0, 0.82);
      clipRectRef.current?.style.setProperty("transform", `scaleX(${px})`);

      // ── DeHaat (x=270 / 1100 ≈ 24.5% of path) ──
      // Path reaches it at progress ≈ 0.82 × 0.245 ≈ 0.20
      const td = at(progress, 0.18, 0.27);
      if (dehaaRef.current) {
        dehaaRef.current.style.opacity = `${td}`;
        dehaaRef.current.style.transform = `scale(${0.4 + 0.6 * td})`;
      }

      // ── Cars24 (x=565 / 1100 ≈ 51.4% of path) ──
      // Path reaches it at progress ≈ 0.82 × 0.514 ≈ 0.42
      const tc = at(progress, 0.40, 0.50);
      if (cars24Ref.current) cars24Ref.current.style.opacity = `${tc}`;
      if (c24OuterRef.current) {
        c24OuterRef.current.style.transform = `scale(${tc})`;
      }
      if (c24InnerRef.current) {
        const tc2 = at(progress, 0.43, 0.53);
        c24InnerRef.current.style.transform = `scale(${tc2})`;
      }

      // ── NxtWave (x=860 / 1100 ≈ 78.2% of path) ──
      // Path reaches it at progress ≈ 0.82 × 0.782 ≈ 0.64
      const tn = at(progress, 0.62, 0.73);
      if (nxtwaveRef.current) {
        nxtwaveRef.current.style.opacity = `${tn}`;
        nxtwaveRef.current.style.transform = `scale(${0.4 + 0.6 * tn})`;
      }

      // ── Subheading ──
      const ts = at(progress, 0.78, 0.96);
      if (subheadRef.current) {
        subheadRef.current.style.opacity = `${ts}`;
        subheadRef.current.style.transform = `translateY(${10 - 10 * ts}px)`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update(); // sync on mount
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1200px] px-8 md:px-12">
      {/* Mobile layout — simple logo row */}
      <div className="md:hidden">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <img src="/images/DeHaat.png" alt="DeHaat" className="h-8 w-auto object-contain" />
          <div className="h-8 w-20 overflow-hidden rounded-md">
            <img src="/images/cars24.png" alt="Cars24" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <img src="/images/Group 6030.png" alt="NxtWave" className="h-8 w-auto object-contain" />
            <span className="font-handwriting text-[13px] text-[#16a34a]">(current)</span>
          </div>
        </div>
        <p className="mt-4 font-handwriting text-[16px] text-[#888]">
          From agritech to automotive to edtech — each one sharpened how I think and design.
        </p>
      </div>

      {/* Desktop layout — animated SVG */}
      <div className="hidden md:block">
      {/*
        Nodes are Q-bezier endpoints (exactly on the path):
          DeHaat  x=270  y=238
          Cars24  x=565  y=185
          NxtWave x=860  y=135
      */}
      <svg
        viewBox="0 0 1100 280"
        width="100%"
        height="auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/*
            Reveal clip: a rect at x=0 whose scaleX goes 0→1, growing rightward.
            transformOrigin "0px 0px" anchors the scale to the left edge.
          */}
          <clipPath id="pathReveal">
            <rect
              ref={clipRectRef}
              x="0" y="-30" width="1200" height="340"
              style={{ transformOrigin: "0px 0px", transform: "scaleX(0)" }}
            />
          </clipPath>

          {/* Cars24: center-crop the 1:1 square to ~2.2:1, rounded corners */}
          <clipPath id="cars24clip">
            <rect x="510" y="103" width="110" height="50" rx="8" ry="8" />
          </clipPath>
        </defs>

        {/* ── Wavy dashed path — revealed by clip ── */}
        <path
          d="
            M 30 240
            Q 100 262  185 242
            Q 232 232  270 238
            Q 320 243  420 208
            Q 492 180  565 185
            Q 645 190  715 158
            Q 792 130  860 135
            Q 938 140  998 115
            Q 1054 92  1082 98
          "
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeDasharray="10 7"
          strokeLinecap="round"
          clipPath="url(#pathReveal)"
        />

        {/* ── NxtWave (x=860, y=135) — scales from node centre ── */}
        <g
          ref={nxtwaveRef}
          style={{
            opacity: 0,
            transform: "scale(0.4)",
            transformOrigin: "860px 135px",
          }}
        >
          <text
            x="860" y="28"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: 14, fill: "#16a34a" }}
            textAnchor="middle"
          >
            (current)
          </text>
          <image
            href="/images/Group 6030.png"
            x="785" y="36" width="150" height="50"
            preserveAspectRatio="xMidYMid meet"
          />
          <line x1="860" y1="86" x2="860" y2="117"
            stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="860" cy="135" r="26" fill="#dcfce7" opacity="0.5" />
          <circle cx="860" cy="135" r="18" fill="#f0fdf4" stroke="#16a34a" strokeWidth="4" />
          <circle cx="860" cy="135" r="7" fill="#16a34a" />
        </g>

        {/* ── Cars24 (x=565, y=185) — logo fades, circles scale individually ── */}
        <g ref={cars24Ref} style={{ opacity: 0 }}>
          {/* image scaled to 110×110, clipped to center 50px strip */}
          <image
            href="/images/cars24.png"
            x="510" y="73" width="110" height="110"
            clipPath="url(#cars24clip)"
            preserveAspectRatio="xMidYMid slice"
          />
          <line x1="565" y1="153" x2="565" y2="169"
            stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
          <circle
            ref={c24OuterRef}
            cx="565" cy="185" r="16" fill="white" stroke="#1a1a1a" strokeWidth="4"
            style={{ transformOrigin: "565px 185px", transform: "scale(0)" }}
          />
          <circle
            ref={c24InnerRef}
            cx="565" cy="185" r="6" fill="#1a1a1a"
            style={{ transformOrigin: "565px 185px", transform: "scale(0)" }}
          />
        </g>

        {/* ── DeHaat (x=270, y=238) — scales from node centre ── */}
        <g
          ref={dehaaRef}
          style={{
            opacity: 0,
            transform: "scale(0.4)",
            transformOrigin: "270px 238px",
          }}
        >
          <image
            href="/images/DeHaat.png"
            x="195" y="155" width="150" height="50"
            preserveAspectRatio="xMidYMid meet"
          />
          <line x1="270" y1="205" x2="270" y2="222"
            stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
          <circle cx="270" cy="238" r="16" fill="white" stroke="#1a1a1a" strokeWidth="4" />
          <circle cx="270" cy="238" r="6" fill="#1a1a1a" />
        </g>
      </svg>

      {/* ── Subheading, revealed last ── */}
      <p
        ref={subheadRef}
        className="mt-6 font-handwriting text-[20px] text-[#888]"
        style={{ opacity: 0, transform: "translateY(10px)" }}
      >
        From agritech to automotive to edtech — each one sharpened how I think and design.
      </p>
      </div>
    </section>
  );
}
