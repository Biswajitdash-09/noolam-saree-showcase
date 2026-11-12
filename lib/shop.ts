/**
 * Shop details — the one file to edit when the shop's details change.
 * Everything customers see about contacting, visiting or ordering from the
 * shop reads from here: the footer, the care page, WhatsApp messages,
 * enquiry emails and the Google search listing.
 */

export type DayHours = { open: string; close: string } | null; // 24h "HH:MM", IST. null = closed

export const shop = {
  name: "NOOLAM",
  legalName: "NOOLAM Kanchipuram Silk",
  tagline: "Kanchipuram silk, woven for the divine",
  description:
    "Kanjivaram silk sarees, bridal pattu and silk blouses, handwoven on the pit looms of Kanchipuram.",

  /** WhatsApp number in international format, digits only (91 = India). */
  whatsapp: "919000000000",
  /** Phone number shown to customers and used for tap-to-call. */
  phone: "+91 90000 00000",
  email: "care@noolam.example",

  address: {
    street: "14 Gandhi Road",
    city: "Kanchipuram",
    region: "Tamil Nadu",
    postalCode: "631501",
    country: "IN",
  },
  /** Link that opens the shop in Google Maps. */
  mapsUrl: "https://maps.google.com/?q=Gandhi+Road+Kanchipuram",

  /** Opening hours in Indian Standard Time. Sunday = 0. */
  hours: {
    0: { open: "10:00", close: "20:00" },
    1: { open: "10:00", close: "20:00" },
    2: { open: "10:00", close: "20:00" },
    3: { open: "10:00", close: "20:00" },
    4: { open: "10:00", close: "20:00" },
    5: { open: "10:00", close: "20:00" },
    6: { open: "10:00", close: "20:00" },
  } as Record<number, DayHours>,
  hoursNote: "Open daily, 10 am – 8 pm. Closed on Pongal.",

  instagram: "noolam.silk",

  shipping: {
    readyDays: "3–5 working days",
    madeToOrderWeeks: "4–6 weeks",
    note: "Free insured shipping across India.",
  },
  returns: {
    days: 7,
    note: "Return an unworn saree with its zari tag within 7 days of delivery. Bridal and stitched blouses are final sale.",
  },

  /** How fast the shop promises to reply to enquiries. */
  replyPromise: "within one working day",
} as const;

export const shopAddressLine = `${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}`;

export const telHref = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
