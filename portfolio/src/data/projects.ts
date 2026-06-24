export interface Slide {
  alt: string;
  src?: string;
  gradient?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  slides: Slide[];
  cardBg: "dark" | string; // "dark" = #111, any other string = CSS color
  year?: string;
  impact?: string;
  link?: string;
  thumbnail?: string; // path relative to /public
}

export const projects: Project[] = [
  {
    id: "practice-loop",
    title: "Fixing a Broken Practice Loop for Instructors",
    description:
      "Why near 0% of instructors were practicing - and what it took to change that.",
    skills: ["product strategy", "user experience", "stakeholder management"],
    slides: [],
    cardBg: "dark",
    year: "2026",
    impact: "1.8% → 36% adoption in 30 days, with demos staying fallback.",
    link: "https://www.figma.com/deck/TeJyRzyBuMKRtVxExmYPB5/Prepare-Tab?node-id=2-42&viewport=-150%2C-84%2C0.69&t=xWhziehbLOuKDNOO-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    thumbnail: "/images/practiceloop.png",
  },
  {
    id: "announcements",
    title: "Announcements were breaking before they reached anyone.",
    description:
      "Fix how a 40-admin team broadcasts to 12,000 students, parents, and learning portal, without changing a single line of code in the apps they use.",
    skills: ["UIUX", "user research", "product thinking"],
    slides: [],
    cardBg: "#fde8e4",
    year: "2025",
    impact: "Cut announcement support tickets by 84% and admin compose time by 42%.",
    link: "https://www.figma.com/deck/3llDwnCN8T6mBsngsfCOon/Untitled?node-id=1-42&viewport=-150%2C-84%2C0.69&t=l1pHVlwrLTfZ80nx-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    thumbnail: "/images/announcement.png",
  },
  {
    id: "cars24-onboarding",
    title: "Automated Onboarding Flow (ATS - V 2.0)",
    description:
      "Streamlined onboarding operations by automating background verification, document validation, attendance tracking, and managing rehired cases.",
    skills: ["user research", "user experience"],
    slides: [],
    cardBg: "dark",
    year: "2025",
    impact: "Increased Hiring by 1.5 times in 1 and a half months.",
    link: "https://www.figma.com/deck/8GkrVMYbMX8mNlaV0i4WaD/CARS24-Onboarding?node-id=1-42&viewport=-150%2C-84%2C0.69&t=8C5htFA5dKpJChvV-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    thumbnail: "/images/CARS24thumbnail.png",
  },
];
