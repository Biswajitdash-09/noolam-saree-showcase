import { ArrowPill } from "@/components/site/arrow-pill";
import { LotusMark } from "@/components/site/logo";
import { SiteFooter } from "@/components/site/site-footer";

export default function NotFound() {
  return (
    <>
    <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-[linear-gradient(180deg,#fdfbf7_0%,#f4ecdf_100%)] pb-20 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/20 blur-[120px]" />
      <div className="shell relative flex flex-col items-center text-center">
        <LotusMark className="h-10 w-12 text-gold-500" />
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.2rem,5.6vw,4.2rem)]">
          This thread leads nowhere.
        </h1>
        <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
          The page may have moved, or the link has a typo. The full rail of
          silks is still where we left it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ArrowPill href="/shop">Browse all silks</ArrowPill>
          <ArrowPill href="/" variant="outline">
            Back to home
          </ArrowPill>
        </div>
      </div>
    </section>
    <SiteFooter />
    </>
  );
}
