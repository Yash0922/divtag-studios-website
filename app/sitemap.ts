import { MetadataRoute } from 'next';

/**
 * Sitemap for www.divtagstudios.in
 *
 * Single-page application — only the homepage is public and indexable.
 * Hash fragments (#services, #about, etc.) are NOT separate pages.
 * API routes and error pages are excluded automatically by Next.js.
 *
 * Canonical domain: https://www.divtagstudios.in
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.divtagstudios.in',
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
