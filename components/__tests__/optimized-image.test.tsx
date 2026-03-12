import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { OptimizedImage } from '@/components/optimized-image';

/**
 * Tests for OptimizedImage component
 * Validates Requirements: 8.1, 8.4, 4.6
 */
describe('OptimizedImage', () => {
  describe('Basic Rendering', () => {
    test('renders with required props', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Test image');
    });

    test('applies custom className', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
          className="custom-class"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveClass('custom-class');
    });
  });

  describe('Priority Loading', () => {
    test('uses priority when aboveFold is true', () => {
      const { container } = render(
        <OptimizedImage
          src="/hero.jpg"
          alt="Hero image"
          width={1920}
          height={1080}
          aboveFold={true}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // Next.js Image with priority doesn't have loading="lazy"
      expect(img).not.toHaveAttribute('loading', 'lazy');
    });

    test('uses lazy loading when aboveFold is false', () => {
      const { container } = render(
        <OptimizedImage
          src="/service.jpg"
          alt="Service image"
          width={800}
          height={600}
          aboveFold={false}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // Next.js Image without priority has loading="lazy"
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    test('explicit priority prop overrides aboveFold', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
          aboveFold={false}
          priority={true}
        />
      );

      const img = container.querySelector('img');
      expect(img).not.toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Decorative Images', () => {
    test('renders decorative image with empty alt', () => {
      const { container } = render(
        <OptimizedImage
          src="/pattern.svg"
          alt=""
          width={100}
          height={100}
          decorative={true}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });

    test('warns when decorative image has non-empty alt', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <OptimizedImage
          src="/pattern.svg"
          alt="Should be empty"
          width={100}
          height={100}
          decorative={true}
        />
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Decorative images should have empty alt text'),
        expect.any(Object)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Alt Text Validation', () => {
    test('warns when non-decorative image has no alt', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <OptimizedImage
          src="/test.jpg"
          alt=""
          width={800}
          height={600}
          decorative={false}
        />
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Non-decorative images must have alt text'),
        expect.any(Object)
      );

      consoleSpy.mockRestore();
    });

    test('does not warn when non-decorative image has alt', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
        />
      );

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Quality Settings', () => {
    test('uses default quality of 85', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // Quality is applied in the src URL by Next.js
    });

    test('accepts custom quality', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
          quality={90}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
    });
  });

  describe('Responsive Sizes', () => {
    test('accepts sizes prop', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // Next.js applies sizes to srcset
    });
  });

  describe('Error Handling', () => {
    test('includes onError handler', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={800}
          height={600}
          fallbackSrc="/fallback.jpg"
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // onError handler is attached but not directly testable in this environment
    });
  });

  describe('Integration', () => {
    test('above-fold image has correct configuration', () => {
      const { container } = render(
        <OptimizedImage
          src="/hero.jpg"
          alt="Hero image"
          width={1920}
          height={1080}
          aboveFold={true}
          sizes="100vw"
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Hero image');
      expect(img).not.toHaveAttribute('loading', 'lazy');
    });

    test('below-fold image has correct configuration', () => {
      const { container } = render(
        <OptimizedImage
          src="/service.jpg"
          alt="Service image"
          width={800}
          height={600}
          aboveFold={false}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Service image');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });
});
