import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sermaraj-dev-portfolio.vercel.app';
  const currentDate = new Date().toISOString();

  // 1. Primary Page Routes
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/awards`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  // 2. Section Deep-Link Subpages & Anchors
  const sectionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#education`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/#blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  // 3. Works Subpage Filter Routes
  const worksSubpages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/works?filter=devopstrio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works?filter=major`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/works?filter=freelance`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  return [...mainPages, ...worksSubpages, ...sectionPages];
}
