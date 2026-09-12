import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogs';
import { LOCAL_SERVICES } from '@/lib/services-data';

/**
 * Sitemap for www.divtagstudios.in
 *
 * Canonical domain: https://www.divtagstudios.in
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries: MetadataRoute.Sitemap = LOCAL_SERVICES.map((service) => ({
    url: `https://www.divtagstudios.in/services/${service.slug}`,
    lastModified: new Date('2026-09-12'),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `https://www.divtagstudios.in/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://www.divtagstudios.in',
      lastModified: new Date('2026-09-12'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...serviceEntries,
    {
      url: 'https://www.divtagstudios.in/work',
      lastModified: new Date('2026-09-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.divtagstudios.in/blogs',
      lastModified: new Date('2026-09-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
