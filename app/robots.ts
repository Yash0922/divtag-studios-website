import { MetadataRoute } from 'next';

/**
 * robots.txt for www.divtagstudios.in
 * Allows all crawlers on public pages.
 * Disallows API routes (not meant for indexing).
 * References the canonical www sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.divtagstudios.in/sitemap.xml',
  };
}
