interface FooterProps {
  email?: string;
  instagram?: string;
  linkedin?: string;
  medium?: string;
}

export default function Footer({
  email = "nancy15garg@gmail.com",
  instagram = "#",
  linkedin = "#",
  medium = "#",
}: FooterProps) {
  return (
    <footer id="about" className="pt-0 pb-16">
      {/* Divider */}
      <hr className="border-t border-[#e5e5e5]" />

      <div className="flex items-start justify-between gap-8 pt-14">
        {/* Left */}
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-normal text-[#111] leading-none tracking-[-0.02em]">
            Let&apos;s connect?
          </h2>
          <a
            href={`mailto:${email}`}
            className="inline-block px-6 py-3 rounded-full bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors duration-200"
          >
            Drop a mail
          </a>
        </div>

        {/* Right — social links */}
        <div className="flex gap-10 text-sm text-[#111] font-medium pt-2">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            Instagram
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            Medium
          </a>
        </div>
      </div>
    </footer>
  );
}
