import Image, { ImageProps } from 'next/image';
import { getOptimizedImageProps, handleImageError, DEFAULT_FALLBACK_IMAGE } from '@/lib/image-utils';

/**
 * OptimizedImage component wraps Next.js Image with error handling and best practices
 * 
 * Features:
 * - Automatic error handling with fallback images
 * - Proper alt text validation
 * - Responsive srcset configuration
 * - Priority loading for above-the-fold images
 * - Lazy loading for below-the-fold images
 * 
 * Requirements: 8.1, 8.4, 4.6
 */

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  /**
   * Whether this image is above the fold (should be loaded with priority)
   * Default: false (lazy loaded)
   */
  aboveFold?: boolean;
  
  /**
   * Custom fallback image path if the main image fails to load
   * Default: /fallback-image.jpg
   */
  fallbackSrc?: string;
  
  /**
   * Whether this is a decorative image (empty alt with aria-hidden)
   * Default: false
   */
  decorative?: boolean;
}

/**
 * OptimizedImage component with automatic optimization and error handling
 */
export function OptimizedImage({
  src,
  alt,
  aboveFold = false,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  decorative = false,
  priority,
  sizes,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  // Validate alt text
  if (!decorative && !alt) {
    console.warn('OptimizedImage: Non-decorative images must have alt text', { src });
  }
  
  if (decorative && alt) {
    console.warn('OptimizedImage: Decorative images should have empty alt text', { src });
  }

  // Determine priority: explicit prop takes precedence, then aboveFold
  const shouldPrioritize = priority !== undefined ? priority : aboveFold;

  return (
    <Image
      src={src}
      alt={decorative ? '' : alt}
      priority={shouldPrioritize}
      quality={quality}
      sizes={sizes}
      onError={(e) => handleImageError(e, fallbackSrc)}
      aria-hidden={decorative ? true : undefined}
      {...props}
    />
  );
}
