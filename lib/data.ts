export type CategoryId =
  | "silk"
  | "half"
  | "blouse-full"
  | "blouse-half"
  | "checked"
  | "zari";

export type ProductKind = "saree" | "blouse";

export type PatternId =
  | "zari"
  | "check"
  | "buta"
  | "stripe"
  | "temple"
  | "brocade"
  | "plain";

export type Swatch = {
  name: string;
  base: string;
  deep: string;
  light: string;
  pattern: PatternId;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  categories: CategoryId[];
  price: number;
  compareAt?: number;
  fabric: string;
  pallu?: string;
  swatch: Swatch;
  sizes: number[];
  description: string;
  badge?: string;
  isBridal?: boolean;
};

export type Category = {
  id: "all" | CategoryId;
  label: string;
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All pieces" },
  { id: "silk", label: "Silk Sarees" },
  { id: "half", label: "Half Sarees" },
  { id: "blouse-full", label: "Full-Sleeve Blouses" },
  { id: "blouse-half", label: "Half-Sleeve Blouses" },
  { id: "checked", label: "Checked Sarees" },
  { id: "zari", label: "Zari & Brocade" },
];

export const SIZES = [34, 36, 38, 40, 42];

const sareeSizes = SIZES;
const blouseSizes = SIZES;

export const products: Product[] = [
  {
    id: "p01",
    slug: "noolam-temple-gold-brocade",
    name: "Noolam Temple Gold Brocade",
    kind: "saree",
    categories: ["silk", "zari"],
    price: 32000,
    fabric: "Pure Kanjivaram silk · 3-ply",
    pallu: "Temple gold korvai pallu",
    swatch: {
      name: "Temple Gold",
      base: "#c9a227",
      deep: "#7a5a10",
      light: "#efdda2",
      pattern: "zari",
    },
    sizes: sareeSizes,
    description:
      "Woven on a pit loom in Kanchipuram, this brocade carries a silver-core zari that catches every lamp. The korvai pallu is joined by hand, never cut and stitched.",
    badge: "Heirloom",
  },
  {
    id: "p02",
    slug: "palace-check",
    name: "Palace Check",
    kind: "saree",
    categories: ["silk", "checked"],
    price: 19900,
    fabric: "Kanchipuram silk · checked body",
    pallu: "Gold zari border",
    swatch: {
      name: "Indigo Palace",
      base: "#2b3a72",
      deep: "#141d40",
      light: "#7585c7",
      pattern: "check",
    },
    sizes: sareeSizes,
    description:
      "A courtly check in indigo and gold, drawn from the floor plans of a Thanjavur palace. Crisp, architectural, and unexpectedly easy to drape.",
  },
  {
    id: "p03",
    slug: "kanchi-rani",
    name: "Kanchi Rani",
    kind: "saree",
    categories: ["silk", "zari"],
    price: 32400,
    fabric: "Pure Kanjivaram silk · 3-ply",
    pallu: "Rani pink zari pallu",
    swatch: {
      name: "Rani Pink",
      base: "#a51e4a",
      deep: "#560a26",
      light: "#e86a95",
      pattern: "zari",
    },
    sizes: sareeSizes,
    description:
      "The colour of a queen's courtyard at dusk. Rani pink silk with a broad zari border and a pallu that pools like light on water.",
    badge: "Signature",
  },
  {
    id: "p04",
    slug: "ivory-elephant-border",
    name: "Ivory Elephant Border",
    kind: "saree",
    categories: ["silk", "zari"],
    price: 32000,
    fabric: "Pure Kanjivaram silk · 3-ply",
    pallu: "Elephant motif pallu",
    swatch: {
      name: "Temple Ivory",
      base: "#e0d3b6",
      deep: "#a99872",
      light: "#f7efdd",
      pattern: "buta",
    },
    sizes: sareeSizes,
    description:
      "An ivory field scattered with elephants, parrots and mangoes in muted zari. The most quietly regal saree in the archive.",
  },
  {
    id: "p05",
    slug: "bengal-garden",
    name: "Bengal Garden",
    kind: "saree",
    categories: ["silk"],
    price: 24600,
    fabric: "Soft Bengal silk · hand-block print",
    pallu: "Floral buti pallu",
    swatch: {
      name: "Sandal Garden",
      base: "#d9c294",
      deep: "#9c7f4b",
      light: "#f2e5c5",
      pattern: "buta",
    },
    sizes: sareeSizes,
    description:
      "Creeper vines, champa flowers and a border of tiny birds, block-printed by hand in Shantiniketan and finished on a soft silk ground.",
  },
  {
    id: "p06",
    slug: "magenta-shot-silk",
    name: "Magenta Shot Silk",
    kind: "saree",
    categories: ["silk"],
    price: 29800,
    fabric: "Shot silk · two-tone weave",
    pallu: "Narrow zari edge",
    swatch: {
      name: "Shot Magenta",
      base: "#9a1b6e",
      deep: "#460a33",
      light: "#dc5aa7",
      pattern: "stripe",
    },
    sizes: sareeSizes,
    description:
      "Warp and weft in different dyes, so the silk shifts from magenta to violet as you move. Cut with a fine gold edge and no fuss.",
  },
  {
    id: "p07",
    slug: "peacock-blue-kanjivaram",
    name: "Peacock Blue Kanjivaram",
    kind: "saree",
    categories: ["silk", "checked"],
    price: 36400,
    fabric: "Pure Kanjivaram silk · 3-ply",
    pallu: "Peacock zari pallu",
    swatch: {
      name: "Peacock",
      base: "#0d3f6b",
      deep: "#041d34",
      light: "#4d87bd",
      pattern: "check",
    },
    sizes: sareeSizes,
    description:
      "Peacock blue shot with a fine check, bordered by a zari pallu of dancing peacocks. A saree that changes character with the light.",
  },
  {
    id: "p08",
    slug: "ruby-korvai",
    name: "Ruby Korvai",
    kind: "saree",
    categories: ["silk"],
    price: 41800,
    fabric: "Pure Kanjivaram silk · 3-ply",
    pallu: "Contrast korvai pallu",
    swatch: {
      name: "Ruby",
      base: "#8a1622",
      deep: "#3c060c",
      light: "#cf4a52",
      pattern: "temple",
    },
    sizes: sareeSizes,
    description:
      "Our most ceremonial weave: ruby body, deep maroon border, and a contrast korvai pallu joined in three days of patient handwork.",
    badge: "Limited",
  },
  {
    id: "p09",
    slug: "forest-rettaipet",
    name: "Forest Green Rettaipet",
    kind: "saree",
    categories: ["silk", "checked"],
    price: 18600,
    fabric: "Kanchipuram silk · rettaipet border",
    pallu: "Two-sided zari border",
    swatch: {
      name: "Forest",
      base: "#1f5138",
      deep: "#0b2619",
      light: "#5f9678",
      pattern: "check",
    },
    sizes: sareeSizes,
    description:
      "Rettaipet means two borders: one for the body, one for the pallu, both woven in gold. Forest green with a quiet checked ground.",
  },
  {
    id: "p10",
    slug: "rose-half-saree",
    name: "Rose Half Saree",
    kind: "saree",
    categories: ["half"],
    price: 21900,
    fabric: "Silk half saree · contrast lehenga",
    pallu: "Pleated silk pallu",
    swatch: {
      name: "Rose Court",
      base: "#c8557a",
      deep: "#792642",
      light: "#eea8bd",
      pattern: "plain",
    },
    sizes: sareeSizes,
    description:
      "A half saree for the first festival of the year: rose silk, a soft pleated pallu and a contrast border that catches the aarti light.",
  },
  {
    id: "p11",
    slug: "marigold-half-saree",
    name: "Marigold Half Saree",
    kind: "saree",
    categories: ["half", "checked"],
    price: 18400,
    fabric: "Silk half saree · checked skirt",
    pallu: "Marigold zari pallu",
    swatch: {
      name: "Marigold",
      base: "#d68a1f",
      deep: "#844d08",
      light: "#f4c672",
      pattern: "check",
    },
    sizes: sareeSizes,
    description:
      "Marigold silk with a checked skirt and a pallu edged in gold — made for temple mornings and long lunches after.",
  },
  {
    id: "p12",
    slug: "emerald-half-saree",
    name: "Emerald Half Saree",
    kind: "saree",
    categories: ["half", "checked"],
    price: 24200,
    fabric: "Silk half saree · checked skirt",
    pallu: "Emerald zari pallu",
    swatch: {
      name: "Emerald",
      base: "#146b4e",
      deep: "#043325",
      light: "#56aa8a",
      pattern: "check",
    },
    sizes: sareeSizes,
    description:
      "Deep emerald with a fine check, cut as a half saree so the drape stays light through a full day of ceremony.",
    badge: "New",
  },
  {
    id: "p13",
    slug: "lilac-half-saree",
    name: "Lilac Half Saree",
    kind: "saree",
    categories: ["half", "zari"],
    price: 14900,
    fabric: "Silk half saree · zari border",
    pallu: "Lilac zari pallu",
    swatch: {
      name: "Lilac",
      base: "#7a6bb0",
      deep: "#392f66",
      light: "#b8abe2",
      pattern: "zari",
    },
    sizes: sareeSizes,
    description:
      "Lilac silk with a delicate zari border — the lightest, most forgiving half saree we make.",
  },
  {
    id: "p14",
    slug: "saffron-raw-silk-blouse",
    name: "Noolam Saffron Raw Silk Blouse",
    kind: "blouse",
    categories: ["blouse-full"],
    price: 3600,
    fabric: "Raw silk · full sleeve",
    swatch: {
      name: "Saffron",
      base: "#c97a16",
      deep: "#7d4405",
      light: "#efb35f",
      pattern: "plain",
    },
    sizes: blouseSizes,
    description:
      "Raw silk in saffron with a hand-embroidered neckline and full sleeves. Cut close, finished with a soft canvas lining.",
  },
  {
    id: "p15",
    slug: "plum-brocade-blouse",
    name: "Plum Brocade Blouse",
    kind: "blouse",
    categories: ["blouse-full"],
    price: 5400,
    fabric: "Brocade · full sleeve",
    swatch: {
      name: "Plum",
      base: "#5a1f45",
      deep: "#2a0a1e",
      light: "#95527b",
      pattern: "brocade",
    },
    sizes: blouseSizes,
    description:
      "A full-sleeve brocade blouse in deep plum, with a high back and a hook-and-eye placket. Built to carry a heavy pallu.",
  },
  {
    id: "p16",
    slug: "ivory-zari-blouse",
    name: "Ivory Zari Blouse",
    kind: "blouse",
    categories: ["blouse-full"],
    price: 6100,
    fabric: "Silk · zari weave · full sleeve",
    swatch: {
      name: "Ivory Zari",
      base: "#ded1b3",
      deep: "#a2906b",
      light: "#f8f0dd",
      pattern: "zari",
    },
    sizes: blouseSizes,
    description:
      "Ivory silk with an all-over zari check and full sleeves. The quiet partner to a loud pallu.",
  },
  {
    id: "p17",
    slug: "teal-silk-blouse",
    name: "Teal Silk Blouse",
    kind: "blouse",
    categories: ["blouse-full"],
    price: 4200,
    fabric: "Pure silk · full sleeve",
    swatch: {
      name: "Teal",
      base: "#155f66",
      deep: "#042e33",
      light: "#4fa0a6",
      pattern: "plain",
    },
    sizes: blouseSizes,
    description:
      "A deep teal silk blouse with full sleeves and a scooped back. Works with gold, ivory and every shade of red.",
  },
  {
    id: "p18",
    slug: "dusty-rose-silk-blouse",
    name: "Dusty Rose Silk Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 4200,
    fabric: "Pure silk · half sleeve",
    swatch: {
      name: "Dusty Rose",
      base: "#b5626f",
      deep: "#6f2f3a",
      light: "#e3a2ac",
      pattern: "plain",
    },
    sizes: blouseSizes,
    description:
      "The house blouse: dusty rose silk, half sleeves, a clean neckline and a fit that disappears under a heavy drape.",
  },
  {
    id: "p19",
    slug: "gold-tissue-blouse",
    name: "Gold Tissue Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 4800,
    fabric: "Tissue silk · half sleeve",
    swatch: {
      name: "Gold Tissue",
      base: "#c9a75a",
      deep: "#7f6222",
      light: "#f0dda6",
      pattern: "brocade",
    },
    sizes: blouseSizes,
    description:
      "Liquid gold tissue with half sleeves and a soft sheen — made for the last hour of an evening wedding.",
  },
  {
    id: "p20",
    slug: "maroon-velvet-blouse",
    name: "Maroon Velvet Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 7200,
    fabric: "Silk velvet · half sleeve",
    swatch: {
      name: "Maroon Velvet",
      base: "#5f0f21",
      deep: "#29040b",
      light: "#98374a",
      pattern: "plain",
    },
    sizes: blouseSizes,
    description:
      "Silk velvet in oxblood maroon, with a round neck and half sleeves. Winter wedding, temple reception, everything between.",
    badge: "Editor's pick",
  },
  {
    id: "p21",
    slug: "indigo-cotton-blouse",
    name: "Indigo Cotton Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 2900,
    fabric: "Handloom cotton · half sleeve",
    swatch: {
      name: "Indigo",
      base: "#2b4170",
      deep: "#13203d",
      light: "#6b83b7",
      pattern: "stripe",
    },
    sizes: blouseSizes,
    description:
      "Handloom cotton in natural indigo, cut with half sleeves for everyday sarees and long commutes.",
  },
  {
    id: "p22",
    slug: "sand-zari-blouse",
    name: "Sand Zari Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 3900,
    fabric: "Silk · fine zari · half sleeve",
    swatch: {
      name: "Sand",
      base: "#cbb28b",
      deep: "#8b744e",
      light: "#ecdcbe",
      pattern: "zari",
    },
    sizes: blouseSizes,
    description:
      "Warm sand silk with a whisper of zari. The neutral that makes an heirloom pallu look new.",
  },
  {
    id: "p23",
    slug: "wine-brocade-blouse",
    name: "Wine Brocade Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 6400,
    fabric: "Brocade · half sleeve",
    swatch: {
      name: "Wine",
      base: "#6b1024",
      deep: "#2c0410",
      light: "#a63d55",
      pattern: "brocade",
    },
    sizes: blouseSizes,
    description:
      "A wine brocade with an all-over vine motif and half sleeves. Best paired with a plain Kanjivaram body.",
  },
  {
    id: "p24",
    slug: "olive-raw-silk-blouse",
    name: "Olive Raw Silk Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 3400,
    fabric: "Raw silk · half sleeve",
    swatch: {
      name: "Olive",
      base: "#6a6a2b",
      deep: "#333306",
      light: "#a3a35e",
      pattern: "plain",
    },
    sizes: blouseSizes,
    description:
      "Olive raw silk with a boat neck and half sleeves — earthy, quiet, and very good with antique gold.",
  },
  {
    id: "p25",
    slug: "black-gold-blouse",
    name: "Black Gold Blouse",
    kind: "blouse",
    categories: ["blouse-half"],
    price: 5900,
    fabric: "Silk · gold zari · half sleeve",
    swatch: {
      name: "Black Gold",
      base: "#211a18",
      deep: "#0a0706",
      light: "#6b5748",
      pattern: "zari",
    },
    sizes: blouseSizes,
    description:
      "Black silk with a fine gold zari stripe and half sleeves. The easiest way to make a bright saree feel evening-ready.",
  },
];

export type LookPiece = {
  id: string;
  kind: "saree" | "blouse" | "choker" | "jhumkas" | "ottiyanam" | "bangles";
  label: string;
  name: string;
  price: number;
  swatch: Swatch;
};

export type Look = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  media: string;
  pieces: LookPiece[];
};

function piece(
  id: string,
  kind: LookPiece["kind"],
  label: string,
  name: string,
  price: number,
  swatch: Swatch,
): LookPiece {
  return { id, kind, label, name, price, swatch };
}

const jewel = (name: string, base: string, deep: string, light: string): Swatch => ({
  name,
  base,
  deep,
  light,
  pattern: "zari",
});

export const looks: Look[] = [
  {
    id: "l1",
    slug: "ivory-elephant",
    name: "Ivory Elephant",
    subtitle: "Temple ivory, antique gold",
    media: "/images/editorial/ocean-gold.jpg",
    pieces: [
      piece("l1a", "saree", "NOOLAM · Saree", "Ivory Kanjivaram with Elephant Border", 32000, {
        name: "Temple Ivory",
        base: "#e0d3b6",
        deep: "#a99872",
        light: "#f7efdd",
        pattern: "buta",
      }),
      piece("l1b", "blouse", "NOOLAM · Blouse", "Dusty Rose Silk Blouse", 4200, {
        name: "Dusty Rose",
        base: "#b5626f",
        deep: "#6f2f3a",
        light: "#e3a2ac",
        pattern: "plain",
      }),
      piece("l1c", "choker", "NOOLAM · Choker", "Pink Stone Temple Choker", 9400, jewel("Ruby & Gold", "#a51e2c", "#5c0810", "#d7b551")),
      piece("l1d", "jhumkas", "NOOLAM · Jhumkas", "Jhumkas with Pearl Drops", 4600, jewel("Pearl Gold", "#c9a227", "#7a5a10", "#f2e3b8")),
      piece("l1e", "ottiyanam", "NOOLAM · Ottiyanam", "Elephant Motif Ottiyanam", 15000, jewel("Antique Gold", "#b98d1b", "#6b4a08", "#efd68e")),
      piece("l1f", "bangles", "NOOLAM · Bangles", "Gold and Dusty Rose Bangle Stack", 3800, jewel("Rose Gold", "#b5626f", "#6f2f3a", "#e3c08a")),
    ],
  },
  {
    id: "l2",
    slug: "emerald-nayika",
    name: "Emerald Nayika",
    subtitle: "Forest silk, ruby border",
    media: "/images/editorial/mountain-pines.jpg",
    pieces: [
      piece("l2a", "saree", "NOOLAM · Saree", "Forest Green Rettaipet", 18600, {
        name: "Forest",
        base: "#1f5138",
        deep: "#0b2619",
        light: "#5f9678",
        pattern: "check",
      }),
      piece("l2b", "blouse", "NOOLAM · Blouse", "Black Gold Blouse", 5900, {
        name: "Black Gold",
        base: "#211a18",
        deep: "#0a0706",
        light: "#6b5748",
        pattern: "zari",
      }),
      piece("l2c", "choker", "NOOLAM · Choker", "Emerald Drop Choker", 11200, jewel("Emerald", "#146b4e", "#043325", "#c9a227")),
      piece("l2d", "jhumkas", "NOOLAM · Jhumkas", "Green Glass Jhumkas", 3900, jewel("Emerald Glass", "#1a7a58", "#063827", "#8fd0b6")),
      piece("l2e", "ottiyanam", "NOOLAM · Ottiyanam", "Lakshmi Coin Ottiyanam", 16800, jewel("Temple Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l2f", "bangles", "NOOLAM · Bangles", "Emerald and Gold Bangles", 4300, jewel("Emerald", "#146b4e", "#043325", "#d7b551")),
    ],
  },
  {
    id: "l3",
    slug: "rani-court",
    name: "Rani Court",
    subtitle: "Rani pink, temple gold",
    media: "/images/editorial/city-dusk.jpg",
    pieces: [
      piece("l3a", "saree", "NOOLAM · Saree", "Kanchi Rani", 32400, {
        name: "Rani Pink",
        base: "#a51e4a",
        deep: "#560a26",
        light: "#e86a95",
        pattern: "zari",
      }),
      piece("l3b", "blouse", "NOOLAM · Blouse", "Maroon Velvet Blouse", 7200, {
        name: "Maroon Velvet",
        base: "#5f0f21",
        deep: "#29040b",
        light: "#98374a",
        pattern: "plain",
      }),
      piece("l3c", "choker", "NOOLAM · Choker", "Kemp Stone Choker", 12800, jewel("Kemp", "#8a1622", "#3c060c", "#d7b551")),
      piece("l3d", "jhumkas", "NOOLAM · Jhumkas", "Temple Jhumkas", 5200, jewel("Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l3e", "ottiyanam", "NOOLAM · Ottiyanam", "Ruby Waist Chain", 15400, jewel("Ruby", "#8a1622", "#3c060c", "#efd68e")),
      piece("l3f", "bangles", "NOOLAM · Bangles", "Ruby Bangle Stack", 4600, jewel("Ruby", "#a51e4a", "#560a26", "#e8a0b5")),
    ],
  },
  {
    id: "l4",
    slug: "indigo-monsoon",
    name: "Indigo Monsoon",
    subtitle: "Palace check, pearl drops",
    media: "/images/editorial/city-fog.jpg",
    pieces: [
      piece("l4a", "saree", "NOOLAM · Saree", "Palace Check", 19900, {
        name: "Indigo Palace",
        base: "#2b3a72",
        deep: "#141d40",
        light: "#7585c7",
        pattern: "check",
      }),
      piece("l4b", "blouse", "NOOLAM · Blouse", "Indigo Cotton Blouse", 2900, {
        name: "Indigo",
        base: "#2b4170",
        deep: "#13203d",
        light: "#6b83b7",
        pattern: "stripe",
      }),
      piece("l4c", "choker", "NOOLAM · Choker", "Pearl and Gold Choker", 8600, jewel("Pearl", "#ded8c8", "#8f8776", "#ffffff")),
      piece("l4d", "jhumkas", "NOOLAM · Jhumkas", "Pearl Drop Jhumkas", 4400, jewel("Pearl Gold", "#c9a227", "#7a5a10", "#f2e3b8")),
      piece("l4e", "ottiyanam", "NOOLAM · Ottiyanam", "Fine Gold Waist Chain", 13200, jewel("Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l4f", "bangles", "NOOLAM · Bangles", "Gold Bangle Pair", 3100, jewel("Gold", "#c9a227", "#7a5a10", "#efdda2")),
    ],
  },
  {
    id: "l5",
    slug: "marigold-bazaar",
    name: "Marigold Bazaar",
    subtitle: "Market gold, glass bangles",
    media: "/images/editorial/rocky-plains.jpg",
    pieces: [
      piece("l5a", "saree", "NOOLAM · Saree", "Marigold Half Saree", 18400, {
        name: "Marigold",
        base: "#d68a1f",
        deep: "#844d08",
        light: "#f4c672",
        pattern: "check",
      }),
      piece("l5b", "blouse", "NOOLAM · Blouse", "Saffron Raw Silk Blouse", 3600, {
        name: "Saffron",
        base: "#c97a16",
        deep: "#7d4405",
        light: "#efb35f",
        pattern: "plain",
      }),
      piece("l5c", "choker", "NOOLAM · Choker", "Lakshmi Coin Choker", 7800, jewel("Coin Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l5d", "jhumkas", "NOOLAM · Jhumkas", "Marigold Jhumkas", 3600, jewel("Marigold", "#d68a1f", "#844d08", "#f4c672")),
      piece("l5e", "ottiyanam", "NOOLAM · Ottiyanam", "Coin Motif Ottiyanam", 11800, jewel("Antique Gold", "#b98d1b", "#6b4a08", "#efd68e")),
      piece("l5f", "bangles", "NOOLAM · Bangles", "Orange Glass Bangles", 1900, jewel("Glass", "#e08b1a", "#8a4d05", "#f7ce85")),
    ],
  },
  {
    id: "l6",
    slug: "peacock-hour",
    name: "Peacock Hour",
    subtitle: "Blue silk, emerald drops",
    media: "/images/editorial/city-brick.jpg",
    pieces: [
      piece("l6a", "saree", "NOOLAM · Saree", "Peacock Blue Kanjivaram", 36400, {
        name: "Peacock",
        base: "#0d3f6b",
        deep: "#041d34",
        light: "#4d87bd",
        pattern: "check",
      }),
      piece("l6b", "blouse", "NOOLAM · Blouse", "Teal Silk Blouse", 4200, {
        name: "Teal",
        base: "#155f66",
        deep: "#042e33",
        light: "#4fa0a6",
        pattern: "plain",
      }),
      piece("l6c", "choker", "NOOLAM · Choker", "Peacock Motif Choker", 10400, jewel("Peacock", "#0d3f6b", "#041d34", "#c9a227")),
      piece("l6d", "jhumkas", "NOOLAM · Jhumkas", "Blue Sapphire Jhumkas", 6200, jewel("Sapphire", "#1b3f8a", "#0a1c45", "#7f9de0")),
      piece("l6e", "ottiyanam", "NOOLAM · Ottiyanam", "Peacock Waist Chain", 16200, jewel("Peacock Gold", "#c9a227", "#7a5a10", "#4d87bd")),
      piece("l6f", "bangles", "NOOLAM · Bangles", "Blue and Gold Bangles", 4100, jewel("Blue Gold", "#1b3f8a", "#0a1c45", "#d7b551")),
    ],
  },
  {
    id: "l7",
    slug: "sandalwood-dawn",
    name: "Sandalwood Dawn",
    subtitle: "Sand silk, antique gold",
    media: "/images/editorial/misty-ridge.jpg",
    pieces: [
      piece("l7a", "saree", "NOOLAM · Saree", "Bengal Garden", 24600, {
        name: "Sandal Garden",
        base: "#d9c294",
        deep: "#9c7f4b",
        light: "#f2e5c5",
        pattern: "buta",
      }),
      piece("l7b", "blouse", "NOOLAM · Blouse", "Sand Zari Blouse", 3900, {
        name: "Sand",
        base: "#cbb28b",
        deep: "#8b744e",
        light: "#ecdcbe",
        pattern: "zari",
      }),
      piece("l7c", "choker", "NOOLAM · Choker", "Antique Gold Choker", 9200, jewel("Antique Gold", "#b98d1b", "#6b4a08", "#efd68e")),
      piece("l7d", "jhumkas", "NOOLAM · Jhumkas", "Sandalwood Jhumkas", 4100, jewel("Sandal", "#cbb28b", "#8b744e", "#ecdcbe")),
      piece("l7e", "ottiyanam", "NOOLAM · Ottiyanam", "Antique Waist Chain", 12600, jewel("Antique Gold", "#b98d1b", "#6b4a08", "#efd68e")),
      piece("l7f", "bangles", "NOOLAM · Bangles", "Matte Gold Bangles", 3200, jewel("Matte Gold", "#b98d1b", "#6b4a08", "#e3cd98")),
    ],
  },
  {
    id: "l8",
    slug: "ruby-muhurtham",
    name: "Ruby Muhurtham",
    subtitle: "Bridal ruby, full gold",
    media: "/images/editorial/ocean-sunset.jpg",
    pieces: [
      piece("l8a", "saree", "NOOLAM · Saree", "Ruby Korvai", 41800, {
        name: "Ruby",
        base: "#8a1622",
        deep: "#3c060c",
        light: "#cf4a52",
        pattern: "temple",
      }),
      piece("l8b", "blouse", "NOOLAM · Blouse", "Gold Tissue Blouse", 4800, {
        name: "Gold Tissue",
        base: "#c9a75a",
        deep: "#7f6222",
        light: "#f0dda6",
        pattern: "brocade",
      }),
      piece("l8c", "choker", "NOOLAM · Choker", "Bridal Kemp Choker", 18400, jewel("Bridal Kemp", "#8a1622", "#3c060c", "#efdda2")),
      piece("l8d", "jhumkas", "NOOLAM · Jhumkas", "Bridal Jhumkas", 7600, jewel("Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l8e", "ottiyanam", "NOOLAM · Ottiyanam", "Bridal Ottiyanam", 22400, jewel("Bridal Gold", "#c9a227", "#7a5a10", "#efdda2")),
      piece("l8f", "bangles", "NOOLAM · Bangles", "Bridal Bangle Stack", 6800, jewel("Bridal Gold", "#b98d1b", "#6b4a08", "#efd68e")),
    ],
  },
];

export type Mood = {
  label: string;
  caption: string;
  media: string;
  tone: "warm" | "deep" | "cool";
};

export const moods: Mood[] = [
  { label: "Wedding Edit", caption: "Muhurtham silks", media: "/images/editorial/mountain-pines.jpg", tone: "warm" },
  { label: "Kanchipuram Icons", caption: "Temple looms", media: "/images/editorial/rocky-plains.jpg", tone: "deep" },
  { label: "Banarasi Heirlooms", caption: "Zari and brocade", media: "/images/editorial/misty-ridge.jpg", tone: "deep" },
  { label: "Festive Radiance", caption: "Evening light", media: "/images/editorial/city-dusk.jpg", tone: "warm" },
  { label: "Zari Signatures", caption: "Silver-core gold", media: "/images/editorial/city-brick.jpg", tone: "cool" },
  { label: "Bridal Élan", caption: "For the vow", media: "/images/editorial/ocean-sunset.jpg", tone: "warm" },
];

export type Reel = {
  id: string;
  number: string;
  duration: string;
  fabric: string;
  title: string;
  location: string;
  media: string;
};

export const reels: Reel[] = [
  {
    id: "r1",
    number: "01",
    duration: "0:16",
    fabric: "Tissue Kanjivaram",
    title: "Ponni Kanjivaram",
    location: "Lamp room, Kanchipuram",
    media: "/images/editorial/ocean-gold.jpg",
  },
  {
    id: "r2",
    number: "02",
    duration: "0:31",
    fabric: "Hand-block Cotton",
    title: "Marina Morning",
    location: "Mylapore to the sea",
    media: "/images/editorial/city-fog.jpg",
  },
  {
    id: "r3",
    number: "03",
    duration: "0:17",
    fabric: "Banarasi Katan",
    title: "Kaali Banarasi",
    location: "Studio, Varanasi red",
    media: "/images/editorial/mountain-pines.jpg",
  },
  {
    id: "r4",
    number: "04",
    duration: "0:15",
    fabric: "Kanjivaram Silk",
    title: "Pachai Pattu",
    location: "The bride's chamber",
    media: "/images/editorial/ocean-sunset.jpg",
  },
  {
    id: "r5",
    number: "05",
    duration: "0:38",
    fabric: "Georgette Silk",
    title: "Galli Sindoor",
    location: "Old-city lanes",
    media: "/images/editorial/city-narrow.jpg",
  },
];

export type Bridal = {
  id: string;
  slug: string;
  name: string;
  fabric: string;
  pallu: string;
  price: number;
  compareAt?: number;
  discount?: string;
  media: string;
  swatch: Swatch;
};

export const bridal: Bridal[] = [
  {
    id: "b1",
    slug: "manjal-kalyanam-pattu",
    name: "Manjal Kalyanam Pattu",
    fabric: "Pattu",
    pallu: "Red-gold pallu",
    price: 27300,
    media: "/images/editorial/ocean-sunset.jpg",
    swatch: { name: "Manjal", base: "#d9a12b", deep: "#8a5f0a", light: "#f4d48a", pattern: "zari" },
  },
  {
    id: "b2",
    slug: "rakta-muhurtham",
    name: "Rakta Muhurtham",
    fabric: "Kanjivaram silk",
    pallu: "Temple korvai pallu",
    price: 38600,
    compareAt: 42900,
    discount: "-10%",
    media: "/images/editorial/city-dusk.jpg",
    swatch: { name: "Rakta", base: "#8a1622", deep: "#3c060c", light: "#cf4a52", pattern: "temple" },
  },
  {
    id: "b3",
    slug: "ivory-vow",
    name: "Ivory Vow",
    fabric: "Pure silk",
    pallu: "Elephant and mango pallu",
    price: 41200,
    media: "/images/editorial/rocky-plains.jpg",
    swatch: { name: "Ivory", base: "#e0d3b6", deep: "#a99872", light: "#f7efdd", pattern: "buta" },
  },
  {
    id: "b4",
    slug: "malligai-bride",
    name: "Malligai Bride",
    fabric: "Soft silk",
    pallu: "Jasmine vine border",
    price: 33400,
    compareAt: 39300,
    discount: "-15%",
    media: "/images/editorial/mountain-pines.jpg",
    swatch: { name: "Malligai", base: "#e8e2d2", deep: "#b3a88f", light: "#fbf7ef", pattern: "buta" },
  },
  {
    id: "b5",
    slug: "neelambari",
    name: "Neelambari",
    fabric: "Kanjivaram silk",
    pallu: "Peacock zari pallu",
    price: 29800,
    media: "/images/editorial/misty-ridge.jpg",
    swatch: { name: "Neelambari", base: "#0d3f6b", deep: "#041d34", light: "#4d87bd", pattern: "zari" },
  },
  {
    id: "b6",
    slug: "sandhya-ragam",
    name: "Sandhya Ragam",
    fabric: "Tissue silk",
    pallu: "Gold tissue pallu",
    price: 35200,
    media: "/images/editorial/city-brick.jpg",
    swatch: { name: "Sandhya", base: "#c9a75a", deep: "#7f6222", light: "#f0dda6", pattern: "brocade" },
  },
  {
    id: "b7",
    slug: "thanga-malar",
    name: "Thanga Malar",
    fabric: "Pure Kanjivaram",
    pallu: "Gold flower pallu",
    price: 44000,
    compareAt: 48900,
    discount: "-10%",
    media: "/images/editorial/city-fog.jpg",
    swatch: { name: "Thanga", base: "#b98d1b", deep: "#6b4a08", light: "#efd68e", pattern: "zari" },
  },
];

export const tickerItems = [
  { title: "TRY THE LOOK", text: "Eight Kanjivaram looks, styled head to toe" },
  { title: "PURE ZARI", text: "Silver-core zari woven into every temple border" },
  { title: "THE RACK", text: "Browse the full rail of silks" },
  { title: "BRIDAL", text: "Heirloom bridal silks for the day that matters" },
  { title: "THE LOOMS", text: "Handwoven in Kanchipuram, one saree at a time" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Try the Look", href: "/#try-the-look" },
  { label: "Pick a Silk", href: "/#pick-a-silk" },
  { label: "The Rack", href: "/#the-rack" },
  { label: "The Muse", href: "/#the-muse" },
  { label: "Bridal", href: "/bridal" },
  { label: "The Weave", href: "/#the-weave" },
];

export const bundlePrice = (look: Look) =>
  Math.round((look.pieces.reduce((sum, p) => sum + p.price, 0) * 0.9) / 100) * 100;

export const lookTotal = (look: Look) => look.pieces.reduce((sum, p) => sum + p.price, 0);

export const categoryCount = (id: "all" | CategoryId) =>
  id === "all" ? products.length : products.filter((p) => p.categories.includes(id)).length;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const rackProducts = products.filter((p) => p.kind === "saree" || p.kind === "blouse");
