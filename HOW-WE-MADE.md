# How We Made It

1. **Brand idea** — A dummy house, **NOOLAM · Kanchipuram Silk**, with a divine,
   historic showroom feel: deep maroon, temple gold and ivory, gopuram arches,
   real zari language.
2. **References** — Ten section screenshots in `screenshots/` were the design
   source of truth. We kept their interaction ideas and gave them a saree-store
   twist.
3. **Prompting section by section** — Each section was specified in one plain
   sentence (see [PROMPTS.md](PROMPTS.md)), then built and reviewed against its
   screenshot at desktop width.
4. **House style** — One typeface (Poppins), one button family, one maroon/gold
   palette, and white or ivory light sections so the page reads as a single
   store.
5. **Imagery** — Product silks are procedural: layered CSS gradients, zari,
   check and buta patterns, and SVG drape/blouse clip-paths. Free stock photos
   are used only for atmosphere. This keeps all 25 pieces visually consistent
   and easy to recolour.
6. **Data** — One typed catalog (`lib/data.ts`) feeds the home page, the rack,
   `/shop`, `/product/[slug]` and `/bridal`, so counts and prices never drift
   between sections.
7. **Interactions** — Drag carousels, tilting cards, hangers that lift off the
   rail, a full-screen rack detail, a 3D reel arc, arch-topped bridal pieces,
   and a persistent gold-on-maroon ticker.
8. **Check and polish** — Screenshots at 1440 px and 390 px, `tsc --noEmit`, and
   a production build with all 25 product pages prerendered.

**Tools:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind
CSS v4, Motion, Radix primitives, Lucide, Sonner.
