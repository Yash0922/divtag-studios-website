import { describe, test, expect, vi } from 'vitest';

// Mock next/font/google before importing layout
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    variable: '--font-inter',
    style: { fontFamily: 'Inter' },
  }),
}));

// Now we can safely import the metadata
import { metadata } from '@/app/layout';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

/**
 * Unit tests for SEO metadata configuration
 * Tests metadata exports, sitemap generation, and robots.txt configuration
 * 
 * Requirements: 4.1, 4.2, 4.3
 */
describe('Metadata Configuration', () => {
  describe('Page Metadata (Requirement 4.1, 4.2)', () => {
    test('exports metadata object', () => {
      expect(metadata).toBeDefined();
      expect(typeof metadata).toBe('object');
    });

    test('includes correct title', () => {
      expect(metadata.title).toBe('Div Tag Studios - Turning Pixels into Products');
    });

    test('includes comprehensive description with all services', () => {
      expect(metadata.description).toBeDefined();
      expect(typeof metadata.description).toBe('string');
      
      // Verify description mentions all six services
      const description = metadata.description as string;
      expect(description).toContain('Web Development');
      expect(description).toContain('Android Development');
      expect(description).toContain('UI/UX Design');
      expect(description).toContain('Graphic Design');
      expect(description).toContain('Video Editing');
      expect(description).toContain('SEO');
    });

    test('includes relevant keywords array', () => {
      expect(metadata.keywords).toBeDefined();
      expect(Array.isArray(metadata.keywords)).toBe(true);
      
      const keywords = metadata.keywords as string[];
      expect(keywords.length).toBeGreaterThan(0);
      
      // Verify key service keywords are present
      expect(keywords).toContain('web development');
      expect(keywords).toContain('android development');
      expect(keywords).toContain('ui ux design');
      expect(keywords).toContain('graphic design');
      expect(keywords).toContain('video editing');
      expect(keywords).toContain('seo services');
      expect(keywords).toContain('digital agency');
    });

    test('includes authors metadata', () => {
      expect(metadata.authors).toBeDefined();
      expect(Array.isArray(metadata.authors)).toBe(true);
      
      const authors = metadata.authors as Array<{ name: string }>;
      expect(authors.length).toBeGreaterThan(0);
      expect(authors[0].name).toBe('Div Tag Studios');
    });
  });

  describe('Open Graph Metadata (Requirement 4.2)', () => {
    test('includes Open Graph configuration', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(typeof metadata.openGraph).toBe('object');
    });

    test('includes Open Graph title', () => {
      expect(metadata.openGraph?.title).toBe('Div Tag Studios - Turning Pixels into Products');
    });

    test('includes Open Graph description', () => {
      expect(metadata.openGraph?.description).toBeDefined();
      expect(typeof metadata.openGraph?.description).toBe('string');
      expect((metadata.openGraph?.description as string).length).toBeGreaterThan(0);
    });

    test('sets Open Graph type to website', () => {
      expect(metadata.openGraph?.type).toBe('website');
    });

    test('includes Open Graph URL', () => {
      expect(metadata.openGraph?.url).toBe('https://divtagstudios.com');
    });

    test('includes Open Graph images with correct dimensions', () => {
      expect(metadata.openGraph?.images).toBeDefined();
      expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
      
      const images = metadata.openGraph?.images as Array<{
        url: string;
        width: number;
        height: number;
        alt: string;
      }>;
      
      expect(images.length).toBeGreaterThan(0);
      
      const firstImage = images[0];
      expect(firstImage.url).toBe('/og-image.png');
      expect(firstImage.width).toBe(1200);
      expect(firstImage.height).toBe(630);
      expect(firstImage.alt).toBe('Div Tag Studios');
    });
  });

  describe('Twitter Card Metadata (Requirement 4.2)', () => {
    test('includes Twitter Card configuration', () => {
      expect(metadata.twitter).toBeDefined();
      expect(typeof metadata.twitter).toBe('object');
    });

    test('sets Twitter Card type to summary_large_image', () => {
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    test('includes Twitter Card title', () => {
      expect(metadata.twitter?.title).toBe('Div Tag Studios - Turning Pixels into Products');
    });

    test('includes Twitter Card description', () => {
      expect(metadata.twitter?.description).toBeDefined();
      expect(typeof metadata.twitter?.description).toBe('string');
      expect((metadata.twitter?.description as string).length).toBeGreaterThan(0);
    });

    test('includes Twitter Card images', () => {
      expect(metadata.twitter?.images).toBeDefined();
      expect(Array.isArray(metadata.twitter?.images)).toBe(true);
      
      const images = metadata.twitter?.images as string[];
      expect(images.length).toBeGreaterThan(0);
      expect(images[0]).toBe('/og-image.png');
    });
  });
});

describe('Sitemap Generation (Requirement 4.3)', () => {
  test('sitemap function returns array', () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
  });

  test('sitemap includes homepage entry', () => {
    const result = sitemap();
    expect(result.length).toBeGreaterThan(0);
    
    const homepage = result[0];
    expect(homepage.url).toBe('https://divtagstudios.com');
  });

  test('sitemap entry includes lastModified date', () => {
    const result = sitemap();
    const homepage = result[0];
    
    expect(homepage.lastModified).toBeDefined();
    expect(homepage.lastModified).toBeInstanceOf(Date);
  });

  test('sitemap entry includes changeFrequency', () => {
    const result = sitemap();
    const homepage = result[0];
    
    expect(homepage.changeFrequency).toBe('monthly');
  });

  test('sitemap entry includes priority', () => {
    const result = sitemap();
    const homepage = result[0];
    
    expect(homepage.priority).toBe(1.0);
  });

  test('sitemap priority is within valid range', () => {
    const result = sitemap();
    const homepage = result[0];
    
    expect(homepage.priority).toBeGreaterThanOrEqual(0.0);
    expect(homepage.priority).toBeLessThanOrEqual(1.0);
  });
});

describe('Robots.txt Configuration (Requirement 4.3)', () => {
  test('robots function returns object', () => {
    const result = robots();
    expect(typeof result).toBe('object');
    expect(result).toBeDefined();
  });

  test('robots includes rules configuration', () => {
    const result = robots();
    expect(result.rules).toBeDefined();
    expect(typeof result.rules).toBe('object');
  });

  test('robots allows all user agents', () => {
    const result = robots();
    expect(result.rules.userAgent).toBe('*');
  });

  test('robots allows all paths', () => {
    const result = robots();
    expect(result.rules.allow).toBe('/');
  });

  test('robots includes sitemap reference', () => {
    const result = robots();
    expect(result.sitemap).toBeDefined();
    expect(typeof result.sitemap).toBe('string');
    expect(result.sitemap).toBe('https://divtagstudios.com/sitemap.xml');
  });

  test('robots sitemap URL is valid', () => {
    const result = robots();
    const sitemapUrl = result.sitemap as string;
    
    // Check it's a valid URL
    expect(() => new URL(sitemapUrl)).not.toThrow();
    
    // Check it ends with sitemap.xml
    expect(sitemapUrl).toMatch(/sitemap\.xml$/);
  });
});
