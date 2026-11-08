import { tickerItems } from "@/lib/data";

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <span key={item.title} className="flex items-center whitespace-nowrap">
          <span className="mx-3 text-[10px] text-gold-500/70">◆</span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:text-[11.5px]">
            {item.title}
          </span>
          <span className="ml-2.5 text-[10.5px] tracking-[0.04em] text-white/55 sm:text-[11.5px]">
            {item.text}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TickerBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="relative h-9 overflow-hidden border-t border-gold-500/25 bg-[linear-gradient(90deg,#2c050b_0%,#5c0d17_28%,#4a0a12_62%,#2c050b_100%)] sm:h-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-maroon-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-maroon-950 to-transparent" />
        <div className="flex h-full items-center">
          <div className="marquee-track">
            <Run />
            <Run />
            <Run hidden />
            <Run hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
