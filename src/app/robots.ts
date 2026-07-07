import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, ''); // Ensure no trailing slash

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/static/',
          '/*.json$',
        ],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot'],
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot'],
        disallow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
