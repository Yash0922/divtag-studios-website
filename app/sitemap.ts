import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogs';

/**
 * Sitemap for www.divtagstudios.in
 *
 * Canonical domain: https://www.divtagstudios.in
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `https://www.divtagstudios.in/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: 'https://www.divtagstudios.in',
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.divtagstudios.in/work',
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.divtagstudios.in/blogs',
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
