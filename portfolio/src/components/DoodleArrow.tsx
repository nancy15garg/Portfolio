interface SVGProps {
  className?: string;
  color?: string;
}

/* Curvy hand-drawn arrow pointing down-right */
export function CurvyArrow({ className = "", color = "#111" }: SVGProps) {
  return (
    <svg
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        className="doodle-path"
        d="M12 12 C 20 50, 55 28, 72 72"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="doodle-path"
        d="M63 66 L 72 72 L 68 62"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* Wavy underline */
export function WiggleLine({ className = "", color = "#111" }: SVGProps) {
  return (
    <svg
      viewBox="0 0 140 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        className="doodle-path"
        d="M0 12 C 18 2, 35 22, 52 12 S 88 2, 105 12 S 130 22, 140 12"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* Small sparkle / star shape */
export function Sparkle({ className = "", color = "#c5e83a" }: SVGProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  );
}
