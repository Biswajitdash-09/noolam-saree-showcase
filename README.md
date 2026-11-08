# NOOLAM — Kanchipuram Silk Saree Website

A showcase website for a fictional Kanchipuram silk house, built from the ten
reference screens in [`screenshots/`](screenshots). Dark maroon, temple gold and
ivory, gopuram arches, a saree rail you can lift pieces off, and a bridal
archive.

<p>
  <img src="screenshots/01-hero.png" width="49%">
  <img src="screenshots/02-six-moods.png" width="49%">
  <img src="screenshots/03-try-the-look.png" width="49%">
  <img src="screenshots/04-pick-a-silk.png" width="49%">
  <img src="screenshots/05-the-rack.png" width="49%">
  <img src="screenshots/06-rack-saree-detail.png" width="49%">
  <img src="screenshots/07-rack-blouse-detail.png" width="49%">
  <img src="screenshots/08-muse-film.png" width="49%">
  <img src="screenshots/09-muse-reels.png" width="49%">
  <img src="screenshots/10-bridal.png" width="49%">
</p>

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Production checks:

```bash
npm run typecheck    # tsc --noEmit
npm run build        # static build, one page per product
npm start
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | The full showcase: hero, archive, try-the-look, pick-a-silk, the rack, muse film, muse reels, bridal carousel, footer |
| `/shop` | All 25 pieces with filter pills and sorting |
| `/product/[slug]` | Product page — front/back drape, size, quantity, add to bag, care notes, related pieces |
| `/bridal` | The seven-piece bridal archive, promises and fitting CTA |

## What is real and what is a demo

- **Cart, wishlist, filters and sorting are UI-only.** State lives in memory for
  the session (`components/site/store.tsx`); there is no persistence, checkout
  or payment flow.
- **Product imagery is procedural.** Every saree and blouse is drawn with CSS
  gradients, zari/check/buta patterns and SVG clip-paths in
  `components/site/silk-fabric.tsx`. That keeps the 25-piece catalog consistent
  and makes colour swaps instant.
- **Atmosphere photography is free stock**, kept locally in
  `public/images/editorial/`. See [`docs/IMAGES.md`](docs/IMAGES.md) for the
  swap guide and credits.
- Newsletter and "ask the loom room" forms show a toast only.

## Structure

```text
app/
  page.tsx                 home composition
  shop/page.tsx            catalog page
  product/[slug]/page.tsx   product page (generateStaticParams)
  bridal/page.tsx          bridal archive
  globals.css              Tailwind v4 tokens + typography utilities
components/
  site/                    all store sections and storefront UI
  ui/                      small shadcn-style primitives
lib/
  data.ts                  single typed source for the catalog
  utils.ts                 cn() and INR formatting
public/images/editorial/   stock photography used for atmosphere
screenshots/               the ten design references
```

Design tokens live in `app/globals.css`: maroon, gold, ivory, cream, sand, ink.
Poppins is loaded through `next/font` and exposed as `--font-poppins`.

## Editing the catalog

Everything the storefront renders comes from `lib/data.ts`:

- `products` — the 25 sarees and blouses (prices, fabrics, sizes, swatches).
- `looks` — the eight styled looks and their pieces.
- `bridal` — the seven bridal pieces.
- `reels`, `moods`, `tickerItems`, `navLinks`.

Adding a product automatically adds its product page (`generateStaticParams`)
and its slot in the rack and shop filters. Keep the category counts in the
reference intact if you are matching the design.

## Credits

References: the ten supplied screenshots. Font: Poppins (SIL Open Font
License). Icons: [Lucide](https://lucide.dev). Stock photography: Unsplash free
license — details in [`docs/IMAGES.md`](docs/IMAGES.md).

Process notes: [PROMPTS.md](PROMPTS.md) · [HOW-WE-MADE.md](HOW-WE-MADE.md)
