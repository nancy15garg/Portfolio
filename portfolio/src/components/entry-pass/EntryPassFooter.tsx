"use client";

import { useState, useEffect, useRef } from "react";
import {
  BehanceIcon,
  EmailIcon,
  LinkedInIcon,
  PhoneIcon,
} from "@/components/entry-pass/EntryPassIcons";

type CopyContact = { kind: "copy"; Icon: React.ComponentType<{ className?: string }>; alt: string; value: string };
type LinkContact = { kind: "link"; Icon: React.ComponentType<{ className?: string }>; alt: string; href: string };
type Contact = CopyContact | LinkContact;

const contacts: Contact[] = [
  { kind: "copy", Icon: PhoneIcon,   alt: "Phone",    value: "9992161500" },
  { kind: "copy", Icon: EmailIcon,   alt: "Email",    value: "nancy15garg@gmail.com" },
  { kind: "link", Icon: LinkedInIcon, alt: "LinkedIn", href: "https://www.linkedin.com/in/nancy-garg-9a67ba219/" },
  { kind: "link", Icon: BehanceIcon,  alt: "Behance",  href: "https://www.behance.net/nancy15gar2942" },
];

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

interface EntryPassFooterProps {
  showMascot?: boolean;
}

export default function EntryPassFooter({ showMascot = false }: EntryPassFooterProps) {
  const [arrived, setArrived]         = useState(false);
  const [smiling, setSmiling]         = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [copied, setCopied]           = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard not available
    }
  };

  const footerRef  = useRef<HTMLElement>(null);
  const mascotRef  = useRef<HTMLDivElement>(null);

  // Intersection observer — trigger slide-in after 1 s
  useEffect(() => {
    if (!showMascot) return;
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !arrived) {
          setTimeout(() => {
            setArrived(true);
            setTimeout(() => setSmiling(true), 1400 + 2000);
          }, 1000);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [arrived, showMascot]);

  // Eye tracking — only active once the character has landed
  useEffect(() => {
    if (!showMascot || !arrived) return;

    const MAX_TRAVEL = 4; // SVG user units — keeps pupils inside the whites

    const handleMouseMove = (e: MouseEvent) => {
      const el = mascotRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;

      const dx   = e.clientX - centerX;
      const dy   = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist === 0) { setPupilOffset({ x: 0, y: 0 }); return; }

      // Reach full travel once cursor is ≥ 120 px away
      const scale = Math.min(dist / 120, 1);
      setPupilOffset({
        x: (dx / dist) * MAX_TRAVEL * scale,
        y: (dy / dist) * MAX_TRAVEL * scale,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showMascot, arrived]);

  return (
    <footer
      ref={footerRef}
      id="entry-pass-contact"
      className="relative mx-auto max-w-[1200px] px-8 pb-12 md:px-12"
    >
      {showMascot && (
        <div
          ref={mascotRef}
          className={arrived ? "mascot-enter" : "mascot-hidden"}
          style={{
            position: "absolute",
            right: 48,
            top: -64,
            zIndex: 11,
            transformOrigin: "center bottom",
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" rx="26" fill="#141414" />

            {/* Left eye */}
            <circle cx="33" cy="44" r="11" fill="white" />
            <circle
              cx={33 + pupilOffset.x}
              cy={44 + pupilOffset.y}
              r="4.5"
              fill="#141414"
              style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
            />

            {/* Right eye */}
            <circle cx="67" cy="44" r="11" fill="white" />
            <circle
              cx={67 + pupilOffset.x}
              cy={44 + pupilOffset.y}
              r="4.5"
              fill="#141414"
              style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
            />

            {/* Shocked mouth */}
            <ellipse
              cx="50" cy="70" rx="7" ry="9" fill="white"
              style={{ opacity: smiling ? 0 : 1, transition: "opacity 0.4s ease" }}
            />

            {/* Slight smile */}
            <path
              d="M40 68 Q50 76 60 68"
              stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round"
              style={{ opacity: smiling ? 1 : 0, transition: "opacity 0.4s ease" }}
            />
          </svg>
        </div>
      )}

      <hr className="border-t border-[#e5e5e5]" />
      <div className="flex flex-col gap-10 pt-10 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[40px] font-normal leading-[1.15] tracking-[-0.9px] text-[#0a0a0a] md:text-[60px]">
          Let&apos;s connect<span className="text-[#a5a6f6]">.</span>
        </h2>
        <div className="flex items-center gap-3">
          {contacts.map((contact) => {
            if (contact.kind === "copy") {
              const { Icon, alt, value } = contact;
              return (
                <div key={alt} className="group relative">
                  {/* Tooltip wrapper — pb-3 fills the gap so hover stays active while moving to the tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 pb-3 opacity-0 transition-[opacity,transform] duration-200 translate-y-2 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="relative flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#0a0a0a] px-4 py-2 text-sm text-white">
                      <span className="font-medium">{value}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(value, alt)}
                        className={`cursor-pointer flex items-center transition-colors ${copied === alt ? "text-green-400" : "text-white/50 hover:text-white"}`}
                        aria-label={`Copy ${alt}`}
                      >
                        {copied === alt ? <CheckIcon /> : <CopyIcon />}
                      </button>
                      {/* Arrow pointing down to icon */}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#0a0a0a]" />
                    </div>
                  </div>
                  {/* Icon circle */}
                  <div className="flex size-[52px] cursor-default items-center justify-center rounded-full border border-[#0a0a0a] transition-all duration-200 ease-out group-hover:size-[64px] group-hover:bg-[#f5f5f5]">
                    <Icon className="size-[22px]" />
                  </div>
                </div>
              );
            }
            const { Icon, alt, href } = contact;
            return (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex size-[52px] items-center justify-center rounded-full border border-[#0a0a0a] transition-all duration-200 ease-out hover:size-[64px] hover:bg-[#f5f5f5]"
                aria-label={alt}
              >
                <Icon className="size-[22px]" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
