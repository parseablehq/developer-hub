import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parseable.com';
  
  // Get all documentation pages
  const pages = source.getPages();
  
  const docsPages: MetadataRoute.Sitemap = pages.map((page) => ({
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
