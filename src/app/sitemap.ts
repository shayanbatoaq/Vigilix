import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { disciplines } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    "",
    "/services",
    ...disciplines.map((d) => `/services/${d.id}`),
    "/about",
    "/approach",
    "/contact",
    "/privacy",
  ].map((path) => ({ url: `${site.url}${path}` }));
}
