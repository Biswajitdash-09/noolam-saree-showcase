"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

/**
 * Sticky section index drawn as a single gold zari thread.
 * The bead marks the section currently in view.
 */
export function CareIndex({ sections }: { sections: Section[] }) {
  const [active, setActive] = React.useState(sections[0]?.id);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
      <ul className="relative flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 lg:pl-6">
        <span
          aria-hidden
          className="absolute bottom-3 left-[3px] top-3 hidden w-px bg-[linear-gradient(180deg,transparent,var(--color-gold-500)_12%,var(--color-gold-500)_88%,transparent)] lg:block"
        />
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="relative shrink-0">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-6 top-1/2 hidden size-[7px] -translate-y-1/2 rounded-full border transition-all duration-300 lg:block",
                  isActive
                    ? "scale-125 border-maroon-600 bg-maroon-600"
                    : "border-gold-500 bg-ivory",
                )}
              />
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition lg:rounded-none lg:border-0 lg:px-0 lg:py-2.5",
                  isActive
                    ? "border-maroon-600 bg-maroon-600 text-white lg:bg-transparent lg:font-medium lg:text-maroon-700"
                    : "border-ink/15 text-ink-soft hover:text-ink",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
