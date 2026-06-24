/* Abstract geometric illustration for the hero — replace with a real asset later */
export default function HeroIllustration() {
  return (
    <div className="relative w-56 h-56 animate-wobble" aria-hidden="true">
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main artboard / rectangle */}
        <rect x="60" y="50" width="100" height="120" rx="8" fill="#111" />
        <rect x="66" y="56" width="88" height="108" rx="5" fill="#f0f0f0" />

        {/* Pen tool icon on artboard */}
        <path d="M100 90 L110 110 L120 90 Z" fill="#c5e83a" />
        <circle cx="110" cy="88" r="5" fill="#111" />

        {/* Floating confetti pieces */}
        <rect x="30" y="40" width="14" height="10" rx="2" fill="#f5576c" transform="rotate(-20 37 45)" />
        <rect x="170" y="60" width="12" height="8" rx="2" fill="#4facfe" transform="rotate(15 176 64)" />
        <polygon points="25,100 35,85 45,100" fill="#fee140" />
        <polygon points="182,130 194,118 202,133" fill="#fa709a" />
        <circle cx="48" cy="148" r="7" fill="#c5e83a" />
        <circle cx="180" cy="90" r="5" fill="#c5e83a" />

        {/* Small sparkles */}
        <path d="M155 45 L157 52 L164 54 L157 56 L155 63 L153 56 L146 54 L153 52 Z" fill="#c5e83a" />
        <path d="M38 70 L39.5 74 L44 75.5 L39.5 77 L38 81 L36.5 77 L32 75.5 L36.5 74 Z" fill="#111" />
      </svg>
    </div>
  );
}
