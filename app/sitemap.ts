import type { MetadataRoute } from "next";

import { products } from "@/lib/data";
import { siteUrl } from "@/lib/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/bridal", "/care"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const pieces = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [...pages, ...pieces];
}
