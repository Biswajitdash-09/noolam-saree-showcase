# Editorial imagery

The nine photographs in `public/images/editorial/` are open-source stock images
from [Unsplash](https://unsplash.com), used under the Unsplash License. They are
atmosphere only: hero backdrops, archive and look photography, the muse film and
reels, and the bridal archive. Product silks are drawn procedurally and do not
use these files.

| File | Used for | Suggested replacement |
| --- | --- | --- |
| `ocean-sunset.jpg` | Hero, muse film, bridal hero | A model in a Kanjivaram drape, backlit |
| `ocean-gold.jpg` | Hero, reel 01 | Golden light across silk or a showroom floor |
| `city-dusk.jpg` | Archive, reel 05, bridal hero | A lamp-lit courtyard or loom room |
| `city-fog.jpg` | Reels, bridal promise | Loom threads at first light |
| `city-narrow.jpg` | Muse film, reel 05 | An old-city lane in Tamil Nadu |
| `city-brick.jpg` | Muse film, archive, reel 05 | Brick and terracotta facade |
| `mountain-pines.jpg` | Archive, reel 03, bridal piece | Pine hills or a temple gopuram in landscape |
| `misty-ridge.jpg` | Archive, reel 04, bridal piece | Mist over the loom country |
| `rocky-plains.jpg` | Archive, bridal piece | Dry plains in warm light |

## Attribution

The images were downloaded from Unsplash CDN links supplied while building the
project. Unsplash does not require attribution, but crediting photographers is
good practice. When you replace an image, record the photographer and photo page
here:

```text
ocean-sunset.jpg — Photo by <name> — https://unsplash.com/photos/<id>
```

## How to swap

1. Drop a new photo into `public/images/editorial/` using **the same filename**
   (JPG). The layout keeps its crop and warm grade.
2. Or add a new file and update the paths in `lib/data.ts` (`moods`, `reels`,
   `bridal`, `looks`) and in the sections under `components/site/` that use
   `next/image`.
3. Product shots should be 4:5 portrait. Hero and film stills should be at least
   1600 px on the long edge.
4. Run `npm run build` to confirm every static product and collection page still
   resolves.

Keep files reasonably small (under ~400 KB) since they are served locally.
