"use client";

import ScrollReveal from "@/components/ScrollReveal";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <ScrollReveal delay={index * 80}>
      <article
        className="mx-auto w-full max-w-[1096px] flex flex-col gap-[10px] rounded-[24px] border border-[#e1e1e1] bg-white"
        style={{ padding: "16px 16px 24px 16px" }}
      >
        {/* Thumbnail / placeholder */}
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full rounded-2xl object-contain bg-[#e5e5e5] h-[200px] md:h-[480px]"
          />
        ) : (
          <div className="w-full rounded-2xl bg-[#d9d9d9] h-[200px] md:h-[480px]" />
        )}

        {/* Title + year */}
        <div className="flex items-start justify-between gap-4 pt-1">
          <h2 className="text-[20px] md:text-[28px] font-medium leading-tight text-[#111]">
            {project.title}
          </h2>
          {project.year && (
            <span className="mt-1 shrink-0 rounded-[10px] bg-[#f5f5f5] px-3 py-1.5 text-sm font-medium text-[#555]">
              {project.year}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="max-w-[560px] text-[14px] leading-relaxed text-[#555]">
          {project.description}
        </p>

        {/* Skills + CTA */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex flex-wrap gap-[10px]">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex h-8 items-center rounded-[8px] border border-[#6e6e6e] px-3 py-1 text-sm font-normal text-[#6a6a6a]"
              >
                {skill}
              </span>
            ))}
          </div>
          <a
            href={project.link ?? "#"}
            className="cursor-pointer shrink-0 rounded-full bg-[#5a5cff] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 text-center"
          >
            View Project
          </a>
        </div>

        {/* Impact strip */}
        {project.impact && (
          <div
            className="flex w-full items-center gap-[10px] rounded-[8px] px-4 py-2"
            style={{
              background: "linear-gradient(90deg, rgba(255,201,5,0.15) 0%, rgba(255,201,5,0.05) 100%)",
              border: "1px solid rgba(255,201,5,0.4)",
            }}
          >
            {/* Starburst badge icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
              <path d="M8 0.8L9.4 3.6L12.4 2.6L11.4 5.6L14.4 6.6L12 8.8L13.8 11.6L10.8 11L9.6 14L8 11.6L6.4 14L5.2 11L2.2 11.6L4 8.8L1.6 6.6L4.6 5.6L3.6 2.6L6.6 3.6Z" fill="#F4511E" stroke="#C93D00" strokeWidth="0.4" strokeLinejoin="round"/>
              <path d="M5.5 8.2L7.2 9.8L10.5 6.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[12px] leading-6 text-[#CC7707]">{project.impact}</p>
          </div>
        )}
      </article>
    </ScrollReveal>
  );
}
