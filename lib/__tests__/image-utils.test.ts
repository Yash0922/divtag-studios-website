import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  handleImageError,
  getOptimizedImageProps,
  getAboveFoldImageProps,
  getBelowFoldImageProps,
  getDecorativeImageProps,
  validateImageAlt,
  DEFAULT_FALLBACK_IMAGE,
  IMAGE_SIZES,
  RESPONSIVE_SIZES,
} from '@/lib/image-utils';

/**
 * Tests for image utilities with Next.js Image component support
 * Validates Requirements: 5.3, 8.1, 8.4, 4.6
 */
describe('Image Utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Constants', () => {
    test('exports default fallback image path', () => {
      expect(DEFAULT_FALLBACK_IMAGE).toBe('/fallback-image.jpg');
    });

    test('exports responsive sizes', () => {
      expect(RESPONSIVE_SIZES).toHaveProperty('mobile');
      expect(RESPONSIVE_SIZES).toHaveProperty('tablet');
      expect(RESPONSIVE_SIZES).toHaveProperty('desktop');
      expect(RESPONSIVE_SIZES.mobile).toBe('100vw');
    });

    test('exports predefined image sizes', () => {
      expect(IMAGE_SIZES).toHaveProperty('hero');
      expect(IMAGE_SIZES).toHaveProperty('serviceCard');
      expect(IMAGE_SIZES.hero).toBe('100vw');
    });
  });

  describe('handleImageError', () => {
    test('sets fallback image on error', () => {
      const mockImage = {
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
        dataset: { originalSrc: 'https://example.com/image.jpg' },
      } as unknown as HTMLImageElement;

      const event = {
        currentTarget: mockImage,
      } as React.SyntheticEvent<HTMLImageElement, Event>;

      handleImageError(event);

      expect(mockImage.src).toBe(DEFAULT_FALLBACK_IMAGE);
    });

    test('uses custom fallback when provided', () => {
      const customFallback = '/custom-fallback.jpg';
      const mockImage = {
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
        dataset: { originalSrc: 'https://example.com/image.jpg' },
      } as unknown as HTMLImageElement;

      const event = {
        currentTarget: mockImage,
      } as React.SyntheticEvent<HTMLImageElement, Event>;

      handleImageError(event, customFallback);

      expect(mockImage.src).toBe(customFallback);
    });

    test('sets alt text if not present', () => {
      const mockImage = {
        src: 'https://example.com/image.jpg',
        alt: '',
        dataset: { originalSrc: 'https://example.com/image.jpg' },
      } as unknown as HTMLImageElement;

      const event = {
        currentTarget: mockImage,
      } as React.SyntheticEvent<HTMLImageElement, Event>;

      handleImageError(event);

      expect(mockImage.alt).toBe('Image unavailable');
    });

    test('prevents infinite loop if fallback also fails', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockImage = {
        src: DEFAULT_FALLBACK_IMAGE,
        alt: 'Test image',
        dataset: { originalSrc: 'https://example.com/image.jpg' },
      } as unknown as HTMLImageElement;

      const event = {
        currentTarget: mockImage,
      } as React.SyntheticEvent<HTMLImageElement, Event>;

      handleImageError(event);

      expect(mockImage.src).toBe(DEFAULT_FALLBACK_IMAGE);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getOptimizedImageProps', () => {
    test('returns basic props with src and alt', () => {
      const props = getOptimizedImageProps('/test.jpg', 'Test image');

      expect(props.src).toBe('/test.jpg');
      expect(props.alt).toBe('Test image');
      expect(props.quality).toBe(85);
      expect(props.priority).toBe(false);
    });

    test('accepts priority option', () => {
      const props = getOptimizedImageProps('/test.jpg', 'Test image', {
        priority: true,
      });

      expect(props.priority).toBe(true);
    });

    test('accepts custom quality', () => {
      const props = getOptimizedImageProps('/test.jpg', 'Test image', {
        quality: 90,
      });

      expect(props.quality).toBe(90);
    });

    test('accepts sizes configuration', () => {
      const sizes = '(max-width: 768px) 100vw, 50vw';
      const props = getOptimizedImageProps('/test.jpg', 'Test image', {
        sizes,
      });

      expect(props.sizes).toBe(sizes);
    });

    test('includes onError handler when fallbackSrc provided', () => {
      const props = getOptimizedImageProps('/test.jpg', 'Test image', {
        fallbackSrc: '/fallback.jpg',
      });

      expect(props.onError).toBeDefined();
      expect(typeof props.onError).toBe('function');
    });

    test('omits onError handler when no fallbackSrc', () => {
      const props = getOptimizedImageProps('/test.jpg', 'Test image');

      expect(props.onError).toBeUndefined();
    });
  });

  describe('getAboveFoldImageProps', () => {
    test('returns props with priority enabled', () => {
      const props = getAboveFoldImageProps('/hero.jpg', 'Hero image');

      expect(props.priority).toBe(true);
      expect(props.quality).toBe(90);
    });

    test('uses hero sizes by default', () => {
      const props = getAboveFoldImageProps('/hero.jpg', 'Hero image');

      expect(props.sizes).toBe(IMAGE_SIZES.hero);
    });

    test('accepts custom sizes', () => {
      const customSizes = '100vw';
      const props = getAboveFoldImageProps('/hero.jpg', 'Hero image', customSizes);

      expect(props.sizes).toBe(customSizes);
    });
  });

  describe('getBelowFoldImageProps', () => {
    test('returns props with priority disabled', () => {
      const props = getBelowFoldImageProps('/service.jpg', 'Service image');

      expect(props.priority).toBe(false);
      expect(props.quality).toBe(85);
    });

    test('uses serviceCard sizes by default', () => {
      const props = getBelowFoldImageProps('/service.jpg', 'Service image');

      expect(props.sizes).toBe(IMAGE_SIZES.serviceCard);
    });

    test('accepts custom sizes', () => {
      const customSizes = '50vw';
      const props = getBelowFoldImageProps('/service.jpg', 'Service image', customSizes);

      expect(props.sizes).toBe(customSizes);
    });
  });

  describe('getDecorativeImageProps', () => {
    test('returns props with empty alt', () => {
      const props = getDecorativeImageProps('/pattern.svg');

      expect(props.alt).toBe('');
      expect(props['aria-hidden']).toBe(true);
    });

    test('has priority disabled', () => {
      const props = getDecorativeImageProps('/pattern.svg');

      expect(props.priority).toBe(false);
    });

    test('accepts custom sizes', () => {
      const customSizes = '100vw';
      const props = getDecorativeImageProps('/pattern.svg', customSizes);

      expect(props.sizes).toBe(customSizes);
    });
  });

  describe('validateImageAlt', () => {
    test('returns true for non-empty alt on content images', () => {
      expect(validateImageAlt('Test image', false)).toBe(true);
      expect(validateImageAlt('Another image', false)).toBe(true);
    });

    test('returns false for empty alt on content images', () => {
      expect(validateImageAlt('', false)).toBe(false);
    });

    test('returns true for empty alt on decorative images', () => {
      expect(validateImageAlt('', true)).toBe(true);
    });

    test('returns false for non-empty alt on decorative images', () => {
      expect(validateImageAlt('Should be empty', true)).toBe(false);
    });
  });

  describe('Integration', () => {
    test('above-fold props are suitable for hero images', () => {
      const props = getAboveFoldImageProps('/hero.jpg', 'Hero image');

      expect(props.priority).toBe(true);
      expect(props.quality).toBeGreaterThanOrEqual(85);
      expect(props.sizes).toBeDefined();
      expect(props.alt).toBe('Hero image');
    });

    test('below-fold props are suitable for lazy loading', () => {
      const props = getBelowFoldImageProps('/service.jpg', 'Service image');

      expect(props.priority).toBe(false);
      expect(props.sizes).toBeDefined();
      expect(props.alt).toBe('Service image');
    });

    test('decorative props meet accessibility requirements', () => {
      const props = getDecorativeImageProps('/pattern.svg');

      expect(props.alt).toBe('');
      expect(props['aria-hidden']).toBe(true);
    });
  });
});
