"use client";

import { useState, useEffect, useRef } from "react";

type EntryPassHeaderProps = {
  onContactClick: () => void;
  onBack?: () => void;
  onPortfolioNav?: (sectionId: string) => void;
};

// Maps section id → which nav label should be active
const SECTION_MAP: Record<string, string> = {
  hero: "about",
  work: "work",
};

const navItems = [
  { label: "about", href: "#hero" },
  { label: "work",  href: "#work" },
  { label: "contact", action: "contact" as const },
  { label: "resume", href: "https://drive.google.com/file/d/10_Wugyc_KFhtoodr8pCoC6TTzS2JR9pm/view?usp=sharing" },
] as const;

type NavItem = (typeof navItems)[number];

export default function EntryPassHeader({ onContactClick, onBack, onPortfolioNav }: EntryPassHeaderProps) {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections = Object.keys(SECTION_MAP)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.current.add(entry.target.id);
          else visibleSections.current.delete(entry.target.id);
        });

        if (visibleSections.current.has("hero")) setActiveSection("about");
        else if (visibleSections.current.has("work")) setActiveSection("work");
        else setActiveSection("");
      },
      { threshold: [0.2, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavItemClick = (item: NavItem) => {
    setMenuOpen(false);
    if ("action" in item) {
      onContactClick();
      return;
    }
    if (item.href.startsWith("#")) {
      if (onPortfolioNav) {
        onPortfolioNav(item.href.slice(1));
      } else {
        document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (!item.href.startsWith("#")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const renderNavItem = (item: NavItem, inDropdown = false) => {
    const isActive = "href" in item && activeSection === item.label;
    const baseClass = `cursor-pointer rounded-[10px] px-3 py-1.5 text-sm font-medium lowercase tracking-[-0.084px] transition-colors hover:text-[#0a0a0a] ${
      isActive ? "bg-[#f5f5f5] text-[#0a0a0a]" : "text-[#555]"
    }`;
    const dropdownClass = `cursor-pointer w-full text-left rounded-[10px] px-3 py-2.5 text-sm font-medium lowercase tracking-[-0.084px] transition-colors hover:bg-[#f5f5f5] hover:text-[#0a0a0a] ${
      isActive ? "bg-[#f5f5f5] text-[#0a0a0a]" : "text-[#555]"
    }`;

    return (
      <button
        key={item.label}
        type="button"
        onClick={() => handleNavItemClick(item)}
        className={inDropdown ? dropdownClass : baseClass}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/40 backdrop-blur-[5px]">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-8 md:px-12">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-[10px] px-3 py-1.5 text-sm font-medium lowercase tracking-[-0.084px] text-[#555] transition-colors hover:text-[#0a0a0a]"
          >
            ← back
          </button>
        ) : (
          <div className="w-[72px]" aria-hidden="true" />
        )}

        {/* Main nav — hidden at ≤400px */}
        <nav className="flex items-center gap-1 max-[620px]:hidden">
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Hamburger — visible only at ≤400px */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="hidden max-[620px]:flex cursor-pointer flex-col items-center justify-center gap-[5px] w-9 h-9 rounded-[10px] transition-colors hover:bg-[#f5f5f5]"
        >
          <span
            className="block h-[1.5px] bg-[#0a0a0a] transition-all duration-200"
            style={{
              width: 18,
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[1.5px] bg-[#0a0a0a] transition-all duration-200"
            style={{
              width: 18,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[1.5px] bg-[#0a0a0a] transition-all duration-200"
            style={{
              width: 18,
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Dropdown menu — only rendered at ≤620px when open */}
      {menuOpen && (
        <div className="max-[620px]:flex hidden flex-col border-t border-[#e8e8e8] bg-white/95 backdrop-blur-[5px] px-6 py-3">
          {navItems.map((item) => renderNavItem(item, true))}
        </div>
      )}

      {/* Blur fade — backdrop-blur that tapers off at the bottom edge */}
      {!menuOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[72px] h-20"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
      )}
    </header>
  );
}
