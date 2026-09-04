import { MetadataRoute } from 'next';

/**
 * robots.txt for divtagstudios.in
 * Allows all crawlers, disallows API routes, references sitemap.
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
    sitemap: 'https://divtagstudios.in/sitemap.xml',
  };
}
