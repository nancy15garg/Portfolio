import Link from "next/link";

type NavProps = {
  onBack?: () => void;
};

export default function Nav({ onBack }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 rounded-full border border-[#111] text-[13px] font-medium text-[#111] bg-white hover:bg-[#111] hover:text-white transition-colors duration-200"
        >
          back
        </button>
      ) : (
        <span />
      )}

      <div className="flex gap-3">
        <Link
          href="#work"
          className="px-5 py-2 rounded-full border border-[#111] text-[13px] font-medium text-[#111] bg-white hover:bg-[#111] hover:text-white transition-colors duration-200"
        >
          work
        </Link>
        <Link
          href="#about"
          className="px-5 py-2 rounded-full border border-[#111] text-[13px] font-medium text-[#111] bg-white hover:bg-[#111] hover:text-white transition-colors duration-200"
        >
          about
        </Link>
      </div>
    </nav>
  );
}
