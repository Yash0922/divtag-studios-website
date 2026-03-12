/**
 * Image utility functions for Next.js Image component
 * Provides error handling, fallbacks, and responsive image configurations
 * Validates Requirements: 5.3, 8.1, 8.4
 */

import type { ImageProps } from 'next/image';

/**
 * Default fallback image path
 */
export const DEFAULT_FALLBACK_IMAGE = '/fallback-image.jpg';

/**
 * Common image sizes for responsive srcset
 * Based on typical breakpoints: mobile, tablet, desktop
 */
export const RESPONSIVE_SIZES = {
  mobile: '100vw',
  tablet: '50vw',
  desktop: '33vw',
  full: '100vw',
  half: '50vw',
  third: '33vw',
} as const;

/**
 * Predefined sizes strings for common layouts
 */
export const IMAGE_SIZES = {
  hero: '100vw',
  serviceCard: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  aboutImage: '(max-width: 768px) 100vw, 50vw',
  fullWidth: '100vw',
} as const;

/**
 * Handle image loading errors by setting a fallback image
 * @param event - The error event from the image element
 * @param fallbackSrc - Optional custom fallback image path
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_FALLBACK_IMAGE
): void {
  const target = event.currentTarget;
  
  // Prevent infinite loop if fallback also fails
  if (target.src === fallbackSrc) {
    console.error('Fallback image also failed to load:', fallbackSrc);
    return;
  }
  
  // Set fallback image
  target.src = fallbackSrc;
  target.alt = target.alt || 'Image unavailable';
  
  // Log error for debugging
  console.warn('Image failed to load, using fallback:', {
    originalSrc: target.dataset.originalSrc || 'unknown',
    fallbackSrc,
  });
}

/**
 * Get optimized Next.js Image props with error handling
 * @param src - Image source URL
 * @param alt - Image alt text (required for accessibility)
 * @param options - Additional configuration options
 * @returns Props object for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  options?: {
    priority?: boolean;
    sizes?: string;
    quality?: number;
    fallbackSrc?: string;
  }
): Partial<ImageProps> {
  const { priority = false, sizes, quality = 85, fallbackSrc } = options || {};

  return {
    src,
    alt,
    quality,
    priority,
    sizes,
    onError: fallbackSrc
      ? (e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          handleImageError(e, fallbackSrc)
      : undefined,
  };
}

/**
 * Get props for above-the-fold images (hero, first section)
 * These images should be loaded with priority to improve LCP
 */
export function getAboveFoldImageProps(
  src: string,
  alt: string,
  sizes: string = IMAGE_SIZES.hero
): Partial<ImageProps> {
  return getOptimizedImageProps(src, alt, {
    priority: true,
    sizes,
    quality: 90, // Higher quality for hero images
  });
}

/**
 * Get props for below-the-fold images (lazy loaded)
 * These images will be loaded as they come into viewport
 */
export function getBelowFoldImageProps(
  src: string,
  alt: string,
  sizes: string = IMAGE_SIZES.serviceCard
): Partial<ImageProps> {
  return getOptimizedImageProps(src, alt, {
    priority: false,
    sizes,
    quality: 85,
  });
}

/**
 * Validate that an image has proper alt text
 * Empty alt is only allowed for decorative images with aria-hidden
 */
export function validateImageAlt(
  alt: string,
  isDecorative: boolean = false
): boolean {
  if (isDecorative) {
    return alt === '';
  }
  return alt.length > 0;
}

/**
 * Get props for decorative images (empty alt with aria-hidden)
 */
export function getDecorativeImageProps(
  src: string,
  sizes?: string
): Partial<ImageProps> & { 'aria-hidden': boolean } {
  return {
    ...getOptimizedImageProps(src, '', {
      priority: false,
      sizes,
    }),
    'aria-hidden': true,
  };
}
