interface SkillTagProps {
  label: string;
}

export default function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full border border-[#d4d4d4] text-sm text-[#666] font-normal leading-none select-none transition-colors hover:border-[#111] hover:text-[#111]">
      {label}
    </span>
  );
}
