"use client";

import { useState, useEffect } from "react";
import EntryPassExperience from "@/components/entry-pass/EntryPassExperience";
import PortfolioContent from "@/components/PortfolioContent";

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    if (!showPortfolio || !pendingSection) return;
    const id = pendingSection;
    setPendingSection(null);
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [showPortfolio, pendingSection]);

  if (!showPortfolio) {
    return (
      <EntryPassExperience
        onComplete={(section?: string) => {
          if (section) setPendingSection(section);
          setShowPortfolio(true);
        }}
      />
    );
  }

  return (
    <div className="animate-portfolio-reveal bg-dot-grid min-h-screen">
      <PortfolioContent onBack={() => setShowPortfolio(false)} />
    </div>
  );
}
