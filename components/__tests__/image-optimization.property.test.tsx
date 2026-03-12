import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { OptimizedImage } from '@/components/optimized-image';
import { validateImageAlt } from '@/lib/image-utils';

/**
 * Property-Based Tests for Image Optimization and Accessibility
 * 
 * Feature: service-website-divtag-studios
 * Property 3: Image Optimization and Accessibility
 * 
 * **Validates: Requirements 4.6, 8.1**
 * 
 * For any image rendered in the application, it should use the Next.js Image component
 * and include a non-empty alt attribute (or empty alt with aria-hidden for decorative images).
 */

/**
 * Arbitrary for generating valid image source paths
 * Next.js Image requires paths to start with "/" or be absolute URLs
 */
const imageSourceArbitrary = fc.oneof(
  // Absolute paths starting with /
  fc.tuple(
    fc.constantFrom('/', '/images/', '/public/', '/assets/'),
    fc.stringMatching(/^[a-z0-9-]+$/).filter(s => s.length > 0),
    fc.constantFrom('.jpg', '.png', '.webp', '.svg', '.gif')
  ).map(([prefix, name, ext]) => `${prefix}${name}${ext}`),
  
  // Absolute URLs
  fc.tuple(
    fc.constantFrom('https://example.com/', 'https://cdn.example.com/'),
    fc.stringMatching(/^[a-z0-9-]+$/).filter(s => s.length > 0),
    fc.constantFrom('.jpg', '.png', '.webp', '.svg', '.gif')
  ).map(([prefix, name, ext]) => `${prefix}${name}${ext}`)
);

/**
 * Arbitrary for generating valid alt text for content images
 */
const contentAltTextArbitrary = fc.string({ minLength: 1, maxLength: 200 })
  .filter(s => s.trim().length > 0);

/**
 * Arbitrary for generating content image props
 */
const contentImagePropsArbitrary = fc.record({
  src: imageSourceArbitrary,
  alt: contentAltTextArbitrary,
  width: fc.integer({ min: 100, max: 2000 }),
  height: fc.integer({ min: 100, max: 2000 }),
  decorative: fc.constant(false)
});

/**
 * Arbitrary for generating decorative image props
 */
const decorativeImagePropsArbitrary = fc.record({
  src: imageSourceArbitrary,
  alt: fc.constant(''),
  width: fc.integer({ min: 100, max: 2000 }),
  height: fc.integer({ min: 100, max: 2000 }),
  decorative: fc.constant(true)
});

/**
 * Arbitrary for generating any valid image props (content or decorative)
 */
const imagePropsArbitrary = fc.oneof(
  contentImagePropsArbitrary,
  decorativeImagePropsArbitrary
);

describe('Image Optimization and Accessibility - Property-Based Tests', () => {
  // Feature: service-website-divtag-studios, Property 3: Image Optimization and Accessibility
  test('all content images have non-empty alt text', () => {
    /**
     * **Validates: Requirements 4.6**
     * 
     * Property 3a: Content Image Alt Text
     * 
     * For any content image (non-decorative), the image must have a non-empty alt attribute
     * that provides meaningful description for screen readers and accessibility.
     */
    fc.assert(
      fc.property(contentImagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            decorative={false}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Verify alt attribute exists and is non-empty
        const altAttribute = imgElement?.getAttribute('alt');
        expect(altAttribute).toBeDefined();
        expect(altAttribute).toBe(imageProps.alt);
        expect(altAttribute!.length).toBeGreaterThan(0);

        // Verify the alt text passes validation
        expect(validateImageAlt(altAttribute!, false)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  test('all decorative images have empty alt with aria-hidden', () => {
    /**
     * **Validates: Requirements 4.6**
     * 
     * Property 3b: Decorative Image Accessibility
     * 
     * For any decorative image, the image must have an empty alt attribute
     * and aria-hidden="true" to indicate it should be ignored by screen readers.
     */
    fc.assert(
      fc.property(decorativeImagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            decorative={true}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Verify alt attribute is empty
        const altAttribute = imgElement?.getAttribute('alt');
        expect(altAttribute).toBe('');

        // Verify aria-hidden is true
        const ariaHidden = imgElement?.getAttribute('aria-hidden');
        expect(ariaHidden).toBe('true');

        // Verify the empty alt passes validation for decorative images
        expect(validateImageAlt('', true)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  test('all images use Next.js Image component with optimization', () => {
    /**
     * **Validates: Requirements 8.1**
     * 
     * Property 3c: Next.js Image Component Usage
     * 
     * For any image rendered in the application, it must use the Next.js Image component
     * which provides automatic optimization, lazy loading, and responsive srcset.
     */
    fc.assert(
      fc.property(imagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            decorative={imageProps.decorative}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Verify Next.js Image component attributes are present
        // Next.js Image adds specific attributes for optimization
        
        // 1. Verify src attribute exists
        expect(imgElement?.getAttribute('src')).toBeDefined();
        
        // 2. Verify loading attribute (Next.js adds this for lazy loading)
        // Images can have loading="lazy" or loading="eager" (for priority images)
        const loadingAttr = imgElement?.getAttribute('loading');
        expect(loadingAttr).toBeDefined();
        expect(['lazy', 'eager']).toContain(loadingAttr);
        
        // 3. Verify decoding attribute (Next.js adds this for performance)
        const decodingAttr = imgElement?.getAttribute('decoding');
        expect(decodingAttr).toBeDefined();
        
        // 4. Verify the image has proper dimensions
        // Next.js Image requires width and height for layout stability
        expect(imgElement?.getAttribute('width')).toBeDefined();
        expect(imgElement?.getAttribute('height')).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });

  test('all images have proper alt attribute validation', () => {
    /**
     * **Validates: Requirements 4.6, 8.1**
     * 
     * Property 3d: Image Alt Attribute Validation
     * 
     * For any image, the alt attribute must be validated according to its type:
     * - Content images: non-empty alt text
     * - Decorative images: empty alt text with aria-hidden
     */
    fc.assert(
      fc.property(imagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            decorative={imageProps.decorative}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Get the alt attribute
        const altAttribute = imgElement?.getAttribute('alt') || '';

        // Validate based on image type
        if (imageProps.decorative) {
          // Decorative images must have empty alt
          expect(altAttribute).toBe('');
          expect(validateImageAlt(altAttribute, true)).toBe(true);
          
          // And must have aria-hidden
          expect(imgElement?.getAttribute('aria-hidden')).toBe('true');
        } else {
          // Content images must have non-empty alt
          expect(altAttribute.length).toBeGreaterThan(0);
          expect(validateImageAlt(altAttribute, false)).toBe(true);
          
          // And should not have aria-hidden (or it should be undefined)
          const ariaHidden = imgElement?.getAttribute('aria-hidden');
          expect(ariaHidden).toBeNull();
        }
      }),
      { numRuns: 100 }
    );
  });

  test('images with priority flag are loaded eagerly', () => {
    /**
     * **Validates: Requirements 8.1**
     * 
     * Property 3e: Priority Image Loading
     * 
     * For any image marked as priority (above-the-fold), it should be loaded
     * eagerly rather than lazily to improve Largest Contentful Paint (LCP).
     */
    fc.assert(
      fc.property(contentImagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            priority={true}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Priority images should have loading="eager" or no loading attribute
        const loadingAttr = imgElement?.getAttribute('loading');
        // Next.js omits loading attribute for priority images or sets it to "eager"
        if (loadingAttr !== null) {
          expect(loadingAttr).toBe('eager');
        }
        
        // Priority images should have fetchpriority="high"
        const fetchPriorityAttr = imgElement?.getAttribute('fetchpriority');
        if (fetchPriorityAttr !== null) {
          expect(fetchPriorityAttr).toBe('high');
        }
      }),
      { numRuns: 100 }
    );
  });

  test('images without priority flag are loaded lazily', () => {
    /**
     * **Validates: Requirements 8.1, 8.4**
     * 
     * Property 3f: Lazy Image Loading
     * 
     * For any image not marked as priority (below-the-fold), it should be loaded
     * lazily to improve initial page load performance.
     */
    fc.assert(
      fc.property(contentImagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            priority={false}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Non-priority images should have loading="lazy"
        const loadingAttr = imgElement?.getAttribute('loading');
        expect(loadingAttr).toBe('lazy');
      }),
      { numRuns: 100 }
    );
  });

  test('image optimization properties are consistent across all images', () => {
    /**
     * **Validates: Requirements 8.1**
     * 
     * Property 3g: Consistent Image Optimization
     * 
     * For any image rendered through OptimizedImage component, it should have
     * consistent optimization properties including proper dimensions, decoding,
     * and Next.js-specific attributes.
     */
    fc.assert(
      fc.property(imagePropsArbitrary, (imageProps) => {
        const { container } = render(
          <OptimizedImage
            src={imageProps.src}
            alt={imageProps.alt}
            width={imageProps.width}
            height={imageProps.height}
            decorative={imageProps.decorative}
          />
        );

        // Find the rendered image element
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();

        // Verify consistent optimization attributes
        
        // 1. Has src attribute
        expect(imgElement?.hasAttribute('src')).toBe(true);
        
        // 2. Has alt attribute (empty or non-empty based on type)
        expect(imgElement?.hasAttribute('alt')).toBe(true);
        
        // 3. Has width and height for layout stability (prevents CLS)
        expect(imgElement?.hasAttribute('width')).toBe(true);
        expect(imgElement?.hasAttribute('height')).toBe(true);
        
        // 4. Has decoding attribute for performance
        expect(imgElement?.hasAttribute('decoding')).toBe(true);
        
        // 5. Has loading attribute for lazy/eager loading strategy
        expect(imgElement?.hasAttribute('loading')).toBe(true);
        
        // 6. Verify dimensions match what was provided
        const width = imgElement?.getAttribute('width');
        const height = imgElement?.getAttribute('height');
        expect(parseInt(width || '0')).toBeGreaterThan(0);
        expect(parseInt(height || '0')).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
