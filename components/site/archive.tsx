import Image from "next/image";

import { moods } from "@/lib/data";

export function Archive() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">The NOOLAM Archive</p>
            <h2
              id="archive-title"
              className="display mt-5 text-[clamp(2.1rem,5.2vw,4.6rem)]"
            >
              Six Moods.{" "}
              <span className="text-gradient-warm">Timeless Drapes</span>
            </h2>
          </div>
          <p className="max-w-[19rem] text-sm leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Woven by hand, worn for a lifetime. Six silk stories, from quiet
            mornings to festive evenings.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
          {moods.map((mood) => (
            <figure key={mood.label} className="group flex flex-col items-center">
              <div className="relative w-full max-w-[220px] pt-3">
                <div className="relative aspect-[213/342] w-full transition-all duration-500 ease-out group-hover:-translate-y-2.5 group-hover:drop-shadow-[0_22px_34px_rgba(74,10,18,0.22)]">
                  <Image
                    src={mood.media}
                    alt={`${mood.label} — ${mood.caption}`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <figcaption className="mt-5 text-center">
                <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-ink sm:text-[10.5px]">
                  {mood.label}
                </p>
                <p className="mt-1 text-[10px] tracking-wide text-ink-soft/65">
                  {mood.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
