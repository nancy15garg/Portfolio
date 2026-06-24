"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EntryPassFooter from "@/components/entry-pass/EntryPassFooter";
import EntryPassHeader from "@/components/entry-pass/EntryPassHeader";
import { ScrollChevronIcon } from "@/components/entry-pass/EntryPassIcons";
import EntryPassTicket from "@/components/entry-pass/EntryPassTicket";

type EntryPassExperienceProps = {
  onComplete: (section?: string) => void;
};

const HEADER_TOP = 24; // (72px header − 24px font) / 2 = vertical center

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export default function EntryPassExperience({ onComplete }: EntryPassExperienceProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isTorn, setIsTorn] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);
  const [titleStart, setTitleStart] = useState({ top: 300, left: 48 });
  const [headerLeft, setHeaderLeft] = useState(48);
  const [isMeasured, setIsMeasured] = useState(false);
  const [maxTitleSize, setMaxTitleSize] = useState(120);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleAnchorRef = useRef<HTMLDivElement>(null);

  const measureTitleStart = useCallback(() => {
    const anchor = titleAnchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setTitleStart({ top: rect.top, left: rect.left });
    const containerLeft = Math.max((window.innerWidth - 1200) / 2, 0);
    const pad = window.innerWidth >= 768 ? 48 : 32;
    setHeaderLeft(containerLeft + pad);
    setMaxTitleSize(window.innerWidth < 768 ? Math.min(80, Math.floor(window.innerWidth * 0.22)) : 120);
    setIsMeasured(true);
  }, []);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Cap at actual max scroll so progress always reaches 1 regardless of viewport size
    const maxScroll = container.scrollHeight - container.clientHeight;
    const heroHeight = Math.min(Math.max(window.innerHeight * 0.72, 500), maxScroll || 1);
    const progress = Math.min(Math.max(container.scrollTop / heroHeight, 0), 1);

    setScrollProgress(progress);
    setShowScrollHint(container.scrollTop < 48);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    measureTitleStart();
    updateScrollState();

    const handleResize = () => {
      measureTitleStart();
      updateScrollState();
    };

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [measureTitleStart, updateScrollState]);

  const handleEnterPortfolio = (section?: string) => {
    setIsDissolving(true);
    window.setTimeout(() => onComplete(section), 700);
  };

  const handleContactClick = () => {
    document
      .getElementById("entry-pass-contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progress = scrollProgress;
  const titleTop = lerp(titleStart.top, HEADER_TOP, progress);
  const titleLeft = lerp(titleStart.left, headerLeft, progress);
  const titleSize = lerp(maxTitleSize, 24, progress);
  const dotScale = maxTitleSize / 120;
  const dotSize = lerp(30 * dotScale, 6, progress);
  const dotGap = lerp(10 * dotScale, 4, progress);
  const dotOffsetY = lerp(10 * dotScale, 2, progress);
  const titleTracking = lerp(-2.4 * dotScale, -0.48, progress);

  return (
    <div
      ref={scrollRef}
      className={`h-dvh overflow-y-auto bg-white transition-opacity duration-700 ${
        isDissolving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <EntryPassHeader
        onContactClick={handleContactClick}
        onPortfolioNav={(sectionId) => handleEnterPortfolio(sectionId)}
      />

      {/* Single morphing title — shrinks from hero into header */}
      <div
        className="pointer-events-none fixed z-[60] flex items-end will-change-transform"
        style={{
          top: titleTop,
          left: titleLeft,
          opacity: isMeasured ? 1 : 0,
        }}
      >
        <span
          className="font-bold leading-none text-[#0a0a0a]"
          style={{
            fontSize: titleSize,
            letterSpacing: `${titleTracking}px`,
          }}
        >
          nancy
        </span>
        <span
          className="shrink-0 rounded-full bg-[#a5a6f6]"
          style={{
            width: dotSize,
            height: dotSize,
            marginLeft: dotGap,
            marginBottom: dotOffsetY,
            borderRadius: dotSize > 12 ? 15 : 3,
          }}
        />
      </div>

      {/* Hero spacer — anchors initial title position */}
      <section className="relative flex min-h-[72vh] items-center px-8 md:px-12">
        <div ref={titleAnchorRef} className="invisible h-[80px] w-full max-w-[348px] md:h-[120px]" aria-hidden="true">
          nancy
        </div>
      </section>

      {/* Pass section */}
      <section className="mx-auto flex min-h-[72vh] max-w-[1200px] flex-col items-center justify-center px-8 py-16 md:px-12 md:py-24">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.72px] text-[#c5c5c5]">
            your pass
          </p>
          <h2 className="text-[40px] font-normal tracking-[-0.9px] text-[#0a0a0a] md:text-[60px] md:leading-[69px]">
            Here&apos;s your entry
          </h2>
        </div>

        <EntryPassTicket
          isTorn={isTorn}
          onTorn={() => setIsTorn(true)}
          onReset={() => setIsTorn(false)}
          onEnterPortfolio={handleEnterPortfolio}
        />
      </section>

      <EntryPassFooter />

      {/* Scroll hint */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e5e5] bg-white/40 backdrop-blur-[5px] transition-all duration-300 ${
          showScrollHint
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-center gap-2.5 px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-[#0a0a0a]">
            scroll for your pass
          </p>
          <ScrollChevronIcon className="size-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
