import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/works`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/awards`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}