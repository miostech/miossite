import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { serviceSlugs, site } from "@/lib/site";
import { blogSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/contact",
    "/blog",
    ...serviceSlugs.map((s) => `/services/${s}`),
    ...blogSlugs.map((s) => `/blog/${s}`),
  ];

  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path.startsWith("/blog") ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
