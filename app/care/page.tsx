import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { CareIndex } from "@/components/site/care-index";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { SiteFooter } from "@/components/site/site-footer";
import { VisitUs } from "@/components/site/visit-us";
import { shop } from "@/lib/shop";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Care & help",
  description:
    "Shipping, returns, silk care, blouse sizes and how to reach the Saree House loom room in Kanchipuram.",
};

const sections = [
  { id: "shipping", label: "Shipping & returns" },
  { id: "silk-care", label: "Silk care" },
  { id: "size-guide", label: "Size guide" },
  { id: "contact", label: "Contact" },
];

const shipping = [
  {
    title: "Delivery",
    text: "Ready sarees leave Kanchipuram in 3–5 working days, insured and boxed in a muslin wrap. Bridal pieces are made to order and take 4–6 weeks.",
  },
  {
    title: "Shipping cost",
    text: "Free across India. International orders ship by DHL; the cost is shown in your bag before you pay.",
  },
  {
    title: "Returns",
    text: "Return an unworn saree with its zari tag within 7 days of delivery for a full refund. Bridal and stitched blouses are final sale.",
  },
  {
    title: "Exchanges",
    text: "Swap a blouse size once, free of charge. Write to the loom room with your order number and we will arrange the pickup.",
  },
];

const careSteps = [
  {
    title: "Air it after wearing",
    text: "Hang the saree in shade for a few hours before folding. Sunlight fades the dye and dulls the zari.",
  },
  {
    title: "Dry clean only",
    text: "Kanjivaram silk should never be machine washed. For a small stain, dab with cold water and let it dry flat.",
  },
  {
    title: "Wrap in muslin",
    text: "Store it in the muslin cloth it came in, never plastic. Silk needs to breathe; plastic traps moisture and yellows the border.",
  },
  {
    title: "Refold every three months",
    text: "Change the fold lines so the zari does not crack along a single crease. Fold the pallu inward to protect it.",
  },
];

const sizes = [
  { size: 34, bust: 34, waist: 28, shoulder: 14, armhole: 15.5 },
  { size: 36, bust: 36, waist: 30, shoulder: 14.5, armhole: 16 },
  { size: 38, bust: 38, waist: 32, shoulder: 15, armhole: 16.5 },
  { size: 40, bust: 40, waist: 34, shoulder: 15.5, armhole: 17 },
  { size: 42, bust: 42, waist: 36, shoulder: 16, armhole: 17.5 },
];

export default function CarePage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fdfbf7_0%,#f7f1e8_100%)] pb-12 pt-28 md:pt-32">
        <div className="pointer-events-none absolute -left-24 top-10 size-[380px] rounded-full bg-gold-300/20 blur-[110px]" />
        <div className="shell relative">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] text-ink-soft/70"
          >
            <Link href="/" className="inline-flex min-h-11 items-center transition hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <span className="text-ink">Care &amp; help</span>
          </nav>

          <div className="mt-7 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
            <div>
              <h1 className="display text-[clamp(2.5rem,6.4vw,5rem)]">
                A saree that outlives <span className="text-gradient-warm">the wedding.</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-ink-soft">
                How your silk reaches you, how to keep its zari bright for
                decades, which blouse size to pick, and how to reach a person at
                the loom room.
              </p>
            </div>
            <div className="relative aspect-[3/4] w-[200px] overflow-hidden rounded-t-[999px] rounded-b-2xl border border-gold-500/40 shadow-[0_30px_60px_-30px_rgba(44,5,11,0.5)] md:w-[260px] lg:w-[300px]">
              <Image
                src="/images/moods/mood-wedding-edit.jpg"
                alt="A woman draped in a red and gold Kanjivaram saree"
                fill
                priority
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 200px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-ivory pb-24">
        <div className="shell grid grid-cols-[minmax(0,1fr)] gap-12 pt-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <CareIndex sections={sections} />

          <div className="min-w-0 space-y-20 md:space-y-24">
            <section id="shipping" aria-labelledby="shipping-title" className="scroll-mt-28">
              <h2 id="shipping-title" className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Shipping &amp; returns
              </h2>
              <dl className="mt-8 grid gap-x-12 gap-y-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
                {shipping.map((item) => (
                  <div key={item.title}>
                    <dt className="text-[15px] font-medium text-ink">{item.title}</dt>
                    <dd className="mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink-soft">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="silk-care" aria-labelledby="care-title" className="scroll-mt-28">
              <h2 id="care-title" className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Silk care
              </h2>
              <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-ink-soft">
                Four habits, in the order you will need them after each wear.
              </p>
              <ol className="mt-8 grid gap-px overflow-hidden rounded-[22px] bg-gold-500/25 sm:grid-cols-2">
                {careSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-5 bg-white p-6 sm:p-8">
                    <span
                      aria-hidden
                      className="display flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-500/50 text-[15px] text-gold-700"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-ink">{step.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="size-guide" aria-labelledby="size-title" className="scroll-mt-28">
              <h2 id="size-title" className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
                Size guide
              </h2>
              <p className="mt-3 max-w-[56ch] text-[13.5px] leading-relaxed text-ink-soft">
                Sarees are one length: 6.3 m including a 0.8 m unstitched blouse
                piece. Ready blouses follow the chart below, in inches. Measure
                over the bra you plan to wear, and size up if you sit between two.
              </p>
              <div className="mt-8 overflow-x-auto rounded-[22px] border border-ink/10 bg-white">
                <table className="w-full min-w-[520px] text-left text-[13px] tabular-nums">
                  <caption className="sr-only">Blouse measurements in inches</caption>
                  <thead>
                    <tr className="border-b border-ink/10 text-ink-soft">
                      <th scope="col" className="px-6 py-4 font-medium">Size</th>
                      <th scope="col" className="px-6 py-4 font-medium">Bust</th>
                      <th scope="col" className="px-6 py-4 font-medium">Waist</th>
                      <th scope="col" className="px-6 py-4 font-medium">Shoulder</th>
                      <th scope="col" className="px-6 py-4 font-medium">Armhole</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((row) => (
                      <tr key={row.size} className="border-b border-ink/5 last:border-0 hover:bg-cream/50">
                        <th scope="row" className="px-6 py-4 font-medium text-maroon-700">
                          {row.size}
                        </th>
                        <td className="px-6 py-4 text-ink">{row.bust}</td>
                        <td className="px-6 py-4 text-ink">{row.waist}</td>
                        <td className="px-6 py-4 text-ink">{row.shoulder}</td>
                        <td className="px-6 py-4 text-ink">{row.armhole}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
              <div className="overflow-hidden rounded-[26px] bg-maroon-950 text-white">
                <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
                  <div>
                    <h2 id="contact-title" className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-white">
                      Write to the loom room
                    </h2>
                    <p className="mt-3 max-w-[40ch] text-[13.5px] leading-relaxed text-white/65">
                      A person from the weaving family replies {shop.replyPromise},
                      by call or WhatsApp. Tell us the occasion and the colours you
                      love, and we will hold a short rail for you.
                    </p>
                    <VisitUs />
                  </div>
                  <EnquiryForm type="contact" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <SiteFooter />
    </PageTransition>
  );
}
