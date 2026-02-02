import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.parseable.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/docs/',
    },
    sitemap: `${baseUrl}/docs/sitemap.xml`,
  };
}
