import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.parseable.com';
  const legacyRoutes = new Set([
    '/docs/query',
    '/docs/overview/key-concepts',
  ]);
  
  // Get all documentation pages
  const pages = source.getPages();
  
  const docsPages: MetadataRoute.Sitemap = pages
    .filter((page) => !legacyRoutes.has(page.url))
    .map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page.url === '/docs' ? 1.0 : 0.8,
    }));

  // Add the root docs page
  const rootPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  return [...rootPage, ...docsPages];
}
