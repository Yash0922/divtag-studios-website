import { MetadataRoute } from 'next';

/**
 * Sitemap for divtagstudios.in
 *
 * This is a single-page application. The only public, canonical,
 * indexable route is the homepage. Hash fragments (#services, #about, etc.)
 * are NOT separate pages and MUST NOT be included in the sitemap.
 *
 * API routes, error pages, and _next/* are excluded automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://divtagstudios.in',
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
