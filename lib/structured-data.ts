import { availability, type Product } from "@/lib/data";
import { shop, siteUrl } from "@/lib/shop";

/** Serialises JSON-LD safely for a <script> tag (escapes "<"). */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: shop.legalName,
    description: shop.description,
    url: siteUrl,
    telephone: shop.phone,
    email: shop.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address.street,
      addressLocality: shop.address.city,
      addressRegion: shop.address.region,
      postalCode: shop.address.postalCode,
      addressCountry: shop.address.country,
    },
    hasMap: shop.mapsUrl,
    priceRange: "₹₹₹",
    sameAs: [`https://instagram.com/${shop.instagram}`],
    openingHoursSpecification: Object.entries(shop.hours)
      .filter(([, hours]) => hours)
      .map(([day, hours]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayNames[Number(day)],
        opens: hours!.open,
        closes: hours!.close,
      })),
  };
}

const schemaAvailability = {
  in: "https://schema.org/InStock",
  low: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/OutOfStock",
  made: "https://schema.org/PreOrder",
};

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: shop.name },
    material: product.fabric,
    color: product.swatch.name,
    url: `${siteUrl}/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: schemaAvailability[availability(product)],
      url: `${siteUrl}/product/${product.slug}`,
      seller: { "@type": "Organization", name: shop.legalName },
    },
  };
}
