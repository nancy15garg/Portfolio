"use client";

import EntryPassHeader from "@/components/entry-pass/EntryPassHeader";
import EntryPassFooter from "@/components/entry-pass/EntryPassFooter";
import Hero from "@/components/Hero";
import CompaniesSection from "@/components/CompaniesSection";
import ProjectCard from "@/components/ProjectCard";
import ProcessSection from "@/components/ProcessSection";
import { projects } from "@/data/projects";

type PortfolioContentProps = {
  onBack?: () => void;
};

export default function PortfolioContent({ onBack }: PortfolioContentProps) {
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

        <div className="mt-[80px] mb-[80px] md:mt-[200px] md:mb-[200px]">
          <CompaniesSection />
        </div>

        <section
          id="work"
          className="max-w-[1200px] mx-auto px-8 md:px-12 space-y-12 pb-12"
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

        <div className="mt-[80px] md:mt-[200px]">
          <ProcessSection />
        </div>
      </main>

      <div id="portfolio-contact" className="mt-[80px] md:mt-[200px]">
        <EntryPassFooter showMascot />
      </div>
    </>
  );
}
