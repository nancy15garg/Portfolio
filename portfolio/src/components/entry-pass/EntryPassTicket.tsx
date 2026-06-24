"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DragHandleIcon } from "@/components/entry-pass/EntryPassIcons";

type EntryPassTicketProps = {
  isTorn: boolean;
  onTorn: () => void;
  onReset: () => void;
  onEnterPortfolio: () => void;
};

const TEAR_THRESHOLD = 100;   // px for full-drag auto-tear during move
const MIN_DRAG_TO_TEAR = 8;   // px — any intentional drag snaps open on release
const TICKET_NUMBER = "VIBE-CODE-2026";

export default function EntryPassTicket({
  isTorn,
  onTorn,
  onReset,
  onEnterPortfolio,
}: EntryPassTicketProps) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ pointerX: 0, pointerY: 0 });
  // Refs for synchronous reads inside pointer handlers — React state is stale between events
  const isDraggingRef = useRef(false);
  const currentDragY = useRef(0);
  // Absorbs the click event that browsers fire after a drag-to-tear pointerup
  const justToreRef = useRef(false);

  const resetDrag = useCallback(() => {
    isDraggingRef.current = false;
    currentDragY.current = 0;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!isTorn) resetDrag();
  }, [isTorn, resetDrag]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isTorn) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    currentDragY.current = 0;
    setIsDragging(true);
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isTorn) return;

    const deltaY = event.clientY - dragStart.current.pointerY;
    const nextY = Math.max(0, deltaY);

    currentDragY.current = nextY;
    setDragOffset({ x: 0, y: nextY });

    if (nextY >= TEAR_THRESHOLD) onTorn();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);

    if (currentDragY.current >= MIN_DRAG_TO_TEAR) {
      justToreRef.current = true; // flag to swallow the click event that follows
      onTorn();
      return;
    }

    currentDragY.current = 0;
    setDragOffset({ x: 0, y: 0 });
  };

  const dragProgress = isTorn ? 1 : Math.min(dragOffset.y / TEAR_THRESHOLD, 1);
  const stubRotation = isTorn ? 90 : dragProgress * 90;
  const revealOpacity = isTorn ? 1 : dragProgress * 0.85;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[420px]">
        {/* Top pass section */}
        <div className="relative z-10 overflow-hidden rounded-t-[20px] bg-[#0a0a0a] px-8 pb-10 pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.72px] text-[#a5a6f6]">
            product design
          </p>
          <h3 className="mt-6 text-[32px] font-bold leading-[1.2] tracking-[-0.32px] text-white">
            Design
            <br />
            Curiosity Pass
          </h3>
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.72px] text-[#c5c5c5]">gate</p>
              <p className="mt-1 text-base font-medium text-white">A4</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.72px] text-[#c5c5c5]">seat</p>
              <p className="mt-1 text-base font-medium text-white">12B</p>
            </div>
            <span className="mb-1 size-[10px] rounded-[5px] bg-[#a5a6f6]" />
          </div>
        </div>

        {/* Perforation */}
        <div className="relative z-20 h-0">
          <span className="absolute -left-[11px] -top-[11px] size-[22px] rounded-[11px] bg-white" />
          <span className="absolute -right-[11px] -top-[11px] size-[22px] rounded-[11px] bg-white" />
          <span className="absolute left-[15px] right-[15px] top-[-1px] border-t-2 border-dashed border-[#c5c5c5]" />
        </div>

        {/* Bottom ticket area */}
        <div className="relative h-[160px]">
          {/* Purple reveal card — entire card rotated at 6.12deg; badge cut by z-10 black section above */}
          <div
            className="pointer-events-none absolute overflow-hidden transition-opacity duration-300"
            style={{
              top: -52,
              left: 48,
              right: 48,
              bottom: 28,
              opacity: revealOpacity,
              background: "#a5a6f6",
              borderRadius: "20px",
              transform: "rotate(-6.12deg)",
              transformOrigin: "bottom center",
            }}
          >
            {/* Decorative depth blobs */}
            <div className="absolute -right-10 -top-10 size-[200px] rounded-full bg-[#7172ef] opacity-50" />
            <div className="absolute -bottom-8 -left-8 size-[130px] rounded-full bg-[#7172ef] opacity-35" />

            {/* Semicircle notch at bottom center — white circle half-clipped by overflow:hidden */}
            <div className="absolute bottom-0 left-1/2 size-10 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />

            {/* Content — badge sits near top boundary so rotation clips its right edge behind black section */}
            <div className="absolute inset-x-0 bottom-0 px-5 pb-4" style={{ top: 30 }}>
              {/* Yellow badge */}
              <div className="mb-3 mt-3 inline-block rounded-b-lg bg-[#ffc905] px-3 py-1">
                <p className="text-[11px] font-extrabold text-[#5a5cff]">GRAB THE TICKET!</p>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  {/* Heading with white stroke */}
                  <p
                    className="text-[21px] font-extrabold leading-[1.15] text-[#5a5cff]"
                    style={{
                      WebkitTextStroke: "5px white",
                      paintOrder: "stroke fill",
                    } as React.CSSProperties}
                  >
                    CURIOUS TO
                    <br />
                    KNOW ME?
                  </p>

                  {/* Subtext */}
                  <p className="mt-1 text-[13px] font-medium text-white">And How I work</p>
                </div>

                {/* TAP stamp */}
                {isTorn ? (
                  <button
                    type="button"
                    onClick={onEnterPortfolio}
                    className="pointer-events-auto cursor-pointer mb-1 shrink-0"
                    aria-label="Tap to view portfolio"
                  >
                    <span className="relative block -rotate-[22deg] size-[58px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/entry-pass/tap-circle.svg" alt="" width={58} height={58} className="object-contain" />
                      <span className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/entry-pass/tap-finger.svg" alt="" width={14} height={14} />
                        <span className="mt-0.5 text-[10px] font-bold text-[#3a3a3a]">TAP</span>
                      </span>
                    </span>
                  </button>
                ) : (
                  <span className="size-[58px] shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* Tearable stub — hinged top-left, drags down clockwise */}
          <div
            className={`absolute inset-0 z-20 origin-top-left rounded-b-[20px] border border-[#e5e5e5] bg-white px-[33px] pb-[25px] pt-[21px] ${
              isTorn ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
            }`}
            style={{
              transform: `rotate(${stubRotation}deg)`,
              transition: isDragging
                ? "none"
                : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: dragProgress > 0.2 ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
            }}
            onClick={() => {
              if (justToreRef.current) { justToreRef.current = false; return; }
              if (isTorn) onReset();
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.72px] text-[#c5c5c5]">ticket no.</p>
                <p className="mt-1 text-base font-medium text-[#0a0a0a]">{TICKET_NUMBER}</p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-full bg-[#0a0a0a] text-base font-bold text-white">
                NG
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.72px] text-[#c5c5c5]">
                drag to tear
              </p>
              <div className={`flex size-7 items-center justify-center rounded-full border border-[#a5a6f6] bg-[#f0edff] ${!isDragging && !isTorn ? "animate-drag-hint" : ""}`}>
                <DragHandleIcon className="size-[15px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTorn && (
        <button
          type="button"
          onClick={onReset}
          className="cursor-pointer mt-6 rounded-full border border-[#0a0a0a] px-5 py-2 text-[13px] lowercase text-[#0a0a0a] transition-colors hover:bg-[#f5f5f5]"
        >
          reset ticket
        </button>
      )}
    </div>
  );
}
