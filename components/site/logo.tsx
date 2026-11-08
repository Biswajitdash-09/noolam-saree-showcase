import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className={cn("text-gold-400", className)}
    >
      <path
        d="M20 27c-4.4-2.3-7.2-6-8.2-10.4 3.9.4 7 2.2 8.2 5.2 1.2-3 4.3-4.8 8.2-5.2-1 4.4-3.8 8.1-8.2 10.4Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path
        d="M20 26.4c-6.8-.3-12.3-2.9-16-8 2.9-1.7 5.8-1.9 8.5-.6 1.6.8 2.9 2 4 3.5 1.3-1.9 3-3.2 5.1-3.9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      <path
        d="M20 26.4c6.8-.3 12.3-2.9 16-8-2.9-1.7-5.8-1.9-8.5-.6-1.6.8-2.9 2-4 3.5-1.3-1.9-3-3.2-5.1-3.9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      <path
        d="M20 21.2c-2.4-2.1-3.3-5.2-2.6-8.7 2.1 1 3.3 2.7 3.5 5 .5-2.3 1.9-3.8 4.1-4.5.4 3.2-.7 6-3.1 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LotusMark className="h-8 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[19px] font-semibold uppercase tracking-[0.34em]",
            inverted ? "text-white" : "text-white",
          )}
        >
          Noolam
        </span>
        <span className="mt-1 text-[7.5px] font-medium uppercase tracking-[0.42em] text-white/60">
          Kanchipuram Silk
        </span>
      </span>
    </span>
  );
}
