import type { MetadataRoute } from "next";

import { SITE_URL } from "~/config/site";

import { APARTMENTS } from "~/data/apartments";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("", 1),
    entry("/form", 0.8),
    entry("/apartments", 0.9),
    ...APARTMENTS.map((apt) => entry(`/apartments/${apt.slug}`, 0.7)),
  ];
}
