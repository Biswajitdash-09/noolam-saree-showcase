import { LotusMark } from "@/components/site/logo";

/**
 * First-visit intro: a gold thread runs across, the wordmark settles, the
 * curtain lifts. Pure CSS, so it plays before React hydrates. The inline
 * script below switches it on once per browser session, and never for
 * visitors who prefer reduced motion.
 */
export const preloaderScript = `try{var d=document.documentElement;if(!sessionStorage.getItem("noolam-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","");sessionStorage.setItem("noolam-intro","1");setTimeout(function(){d.removeAttribute("data-intro")},1900)}}catch(e){}`;

export function Preloader() {
  return (
    <div className="preloader" aria-hidden>
      <div className="flex w-[min(420px,76vw)] flex-col items-center">
        <LotusMark className="preloader__word h-8 w-auto text-gold-400" />
        <p className="preloader__word mt-5 text-[13px] font-semibold uppercase tracking-[0.32em] text-white">
          Noolam
        </p>
        <span className="preloader__thread mt-6 block h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-gold-400)_18%,var(--color-gold-300)_50%,var(--color-gold-400)_82%,transparent)]" />
        <p className="preloader__word mt-4 text-[11px] uppercase tracking-[0.3em] text-white/60">
          Kanchipuram silk
        </p>
      </div>
    </div>
  );
}
