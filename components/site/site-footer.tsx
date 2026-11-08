"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, AtSign, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

import { LotusMark } from "@/components/site/logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Silks", href: "/shop" },
      { label: "The Rack", href: "/shop" },
      { label: "Bridal Collection", href: "/bridal" },
      { label: "Blouses", href: "/shop" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Looms", href: "/#the-muse" },
      { label: "Try the Look", href: "/#try-the-look" },
      { label: "Pick a Silk", href: "/#pick-a-silk" },
      { label: "The Muse", href: "/#the-muse" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Shipping & Returns", href: "/#the-weave" },
      { label: "Silk Care", href: "/#the-weave" },
      { label: "Size Guide", href: "/#the-weave" },
      { label: "Contact", href: "/#the-weave" },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = React.useState("");

  return (
    <footer id="the-weave" className="relative overflow-hidden bg-maroon-950 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 size-[420px] rounded-full bg-gold-500/8 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[360px] rounded-full bg-maroon-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_64px)]" />

      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow text-white/50 before:bg-gold-400">The Weave</p>
            <h2 className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,3.6rem)] text-white">
              Woven for the divine, kept for the family.
            </h2>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-white/60">
              A NOOLAM saree leaves the loom with the weaver&apos;s name in the
              border. Visit the Kanchipuram loom room, or let us bring the rack
              to your screen.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.24em] text-white/50">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-gold-400" /> Kanchipuram · Tamil Nadu
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="size-3.5 text-gold-400" /> care@noolam.example
              </span>
              <span className="inline-flex items-center gap-2">
                <AtSign className="size-3.5 text-gold-400" /> @noolam.silk
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold-400">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/65 transition hover:text-gold-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold-400">
              The loom letter
            </p>
            <p className="mt-2 max-w-[40ch] text-sm text-white/55">
              Four letters a year: new weaves, loom notes, and first look at the
              bridal archive.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) return;
              toast.success("You're on the loom list", {
                description: "We'll write four times a year. Nothing more.",
              });
              setEmail("");
            }}
            className="flex w-full items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] p-1.5 backdrop-blur-sm"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gold-400 pl-5 pr-1.5 text-[12px] font-medium text-maroon-950 transition hover:bg-gold-300"
            >
              Join
              <span className="flex size-7 items-center justify-center rounded-full bg-maroon-900 text-gold-300">
                <ArrowUpRight className="size-3.5" />
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 text-[10px] uppercase tracking-[0.22em] text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <LotusMark className="h-7 w-8" />
            <span>© {new Date().getFullYear()} NOOLAM Kanchipuram Silk</span>
          </div>
          <p className="max-w-[46ch] normal-case tracking-[0.08em] text-white/35">
            Showcase demo. Product imagery is generated; atmosphere photography
            is free stock, credited in the project README.
          </p>
        </div>
      </div>
    </footer>
  );
}
