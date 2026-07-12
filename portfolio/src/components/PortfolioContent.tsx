"use client";

import { useEffect } from "react";
import EntryPassHeader from "@/components/entry-pass/EntryPassHeader";
import EntryPassFooter from "@/components/entry-pass/EntryPassFooter";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ProcessSection from "@/components/ProcessSection";
import SkillsSection from "@/components/SkillsSection";
import { projects } from "@/data/projects";

type PortfolioContentProps = {
  onBack?: () => void;
  scrollTo?: string | null;
  onScrolled?: () => void;
};

export default function PortfolioContent({ onBack, scrollTo, onScrolled }: PortfolioContentProps) {
  useEffect(() => {
    if (!scrollTo) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      onScrolled?.();
    });
    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleContactClick = () => {
    document
      .getElementById("portfolio-contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <EntryPassHeader onContactClick={handleContactClick} onBack={onBack} />

      <main>
        <Hero />

        <div className="mt-[80px] md:mt-[120px]">
          <SkillsSection />
        </div>

        <section
          id="work"
          className="max-w-[1200px] mx-auto px-8 md:px-12 space-y-12 pb-12 mt-[80px] md:mt-[120px]"
        >
          <div className="flex items-center justify-center gap-2">
            <p className="font-handwriting text-[16px] text-[#666] md:text-[20px]">
              My work to see how I do that
            </p>
            <span className="text-[22px] font-bold text-[#666]">↓</span>
          </div>

          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </section>

        <div className="mt-[120px] md:mt-[200px]">
          <ProcessSection />
        </div>
      </main>

      <div id="portfolio-contact" className="mt-[80px] md:mt-[200px]">
        <EntryPassFooter showMascot />
      </div>
    </>
  );
}
