type JewelKind = "choker" | "jhumkas" | "ottiyanam" | "bangles";

export function JewelIcon({ kind, className }: { kind: JewelKind; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <linearGradient id={`jewel-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7d193" />
          <stop offset="55%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8f6f16" />
        </linearGradient>
      </defs>
      <g {...common} stroke={`url(#jewel-${kind})`}>
        {kind === "choker" && (
          <>
            <path d="M9 27c3 12 12 19 23 19s20-7 23-19" />
            <path d="M9 27c3-8 12-12 23-12s20 4 23 12" opacity="0.45" />
            <path d="M16 24c2 8 8 13 16 13s14-5 16-13" opacity="0.7" />
            <circle cx="32" cy="44" r="4.5" fill={`url(#jewel-${kind})`} stroke="none" />
            <circle cx="18" cy="31" r="1.8" fill="#7a0f1c" stroke="none" />
            <circle cx="32" cy="35" r="1.8" fill="#7a0f1c" stroke="none" />
            <circle cx="46" cy="31" r="1.8" fill="#7a0f1c" stroke="none" />
            <path d="M32 48.5v4" />
          </>
        )}
        {kind === "jhumkas" && (
          <>
            <g>
              <path d="M24 18v5" />
              <circle cx="24" cy="15" r="3" />
              <path d="M16 25h16l-3 9c-.8 2.4-2.6 3.8-5 3.8s-4.2-1.4-5-3.8Z" />
              <path d="M18 33.6h12" opacity="0.6" />
              <circle cx="20" cy="38" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
              <circle cx="24" cy="39.5" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
              <circle cx="28" cy="38" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
            </g>
            <g opacity="0.95">
              <path d="M40 18v5" />
              <circle cx="40" cy="15" r="3" />
              <path d="M32 25h16l-3 9c-.8 2.4-2.6 3.8-5 3.8s-4.2-1.4-5-3.8Z" />
              <path d="M34 33.6h12" opacity="0.6" />
              <circle cx="36" cy="38" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
              <circle cx="40" cy="39.5" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
              <circle cx="44" cy="38" r="1" fill={`url(#jewel-${kind})`} stroke="none" />
            </g>
          </>
        )}
        {kind === "ottiyanam" && (
          <>
            <path d="M7 25c6-4 14-6 25-6s19 2 25 6" />
            <path d="M7 30c6-4 14-6 25-6s19 2 25 6" opacity="0.55" />
            <path d="M12 27v4M20 24v5M28 22.5v5M36 22.5v5M44 24v5M52 27v4" opacity="0.6" />
            <path d="M32 30v8" />
            <path d="M27 41h10l-5 8Z" fill={`url(#jewel-${kind})`} stroke="none" />
            <circle cx="32" cy="36" r="2.6" fill={`url(#jewel-${kind})`} stroke="none" />
            <circle cx="14" cy="33" r="1.6" fill={`url(#jewel-${kind})`} stroke="none" />
            <circle cx="50" cy="33" r="1.6" fill={`url(#jewel-${kind})`} stroke="none" />
          </>
        )}
        {kind === "bangles" && (
          <>
            <ellipse cx="32" cy="18" rx="14" ry="5.5" />
            <ellipse cx="32" cy="30" rx="15.5" ry="6" opacity="0.85" />
            <ellipse cx="32" cy="43" rx="14" ry="5.5" opacity="0.7" />
            <ellipse cx="32" cy="5" rx="9" ry="3.2" opacity="0.5" />
            <path d="M47 18c0 3-6.7 5.5-15 5.5S17 21 17 18" opacity="0.5" />
            <path d="M47.5 30c0 3.3-7 6-15.5 6s-15.5-2.7-15.5-6" opacity="0.5" />
          </>
        )}
      </g>
    </svg>
  );
}
