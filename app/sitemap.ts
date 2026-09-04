import { MetadataRoute } from 'next';

// Production domain — no trailing slash, no www prefix
const siteUrl = 'https://divtagstudios.in';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
