"use client";

import { useState } from "react";
import EntryPassExperience from "@/components/entry-pass/EntryPassExperience";
import PortfolioContent from "@/components/PortfolioContent";

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  if (!showPortfolio) {
    return (
      <EntryPassExperience
        onComplete={(section?: string) => {
          setPendingSection(section ?? null);
          setShowPortfolio(true);
        }}
      />
    );
  }

  return (
    <div className="animate-portfolio-reveal min-h-screen">
      <PortfolioContent
        onBack={() => setShowPortfolio(false)}
        scrollTo={pendingSection}
        onScrolled={() => setPendingSection(null)}
      />
    </div>
  );
}
