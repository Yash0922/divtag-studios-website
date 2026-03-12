# Image Optimization Guide

This document explains how to use Next.js Image component in the Div Tag Studios website for optimal performance and accessibility.

## Overview

The project uses Next.js Image component for automatic image optimization, including:
- Automatic WebP/AVIF format conversion
- Responsive image sizing with srcset
- Lazy loading for below-the-fold images
- Priority loading for above-the-fold images
- Error handling with fallback images

## Configuration

Image optimization is configured in `next.config.ts`:

```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  qualities: [75, 85, 90, 100],
  minimumCacheTTL: 60,
}
```

## Using OptimizedImage Component

The `OptimizedImage` component wraps Next.js Image with best practices and error handling.

### Basic Usage

```tsx
import { OptimizedImage } from '@/components/optimized-image';

<OptimizedImage
  src="/hero-image.jpg"
  alt="Hero section background"
  width={1920}
  height={1080}
/>
```

### Above-the-Fold Images (Priority Loading)

For images visible on initial page load (hero sections, logos):

```tsx
<OptimizedImage
  src="/hero-image.jpg"
  alt="Hero section background"
  width={1920}
  height={1080}
  aboveFold={true}
  sizes="100vw"
/>
```

This sets `priority={true}` which:
- Disables lazy loading
- Preloads the image
- Improves Largest Contentful Paint (LCP)

### Below-the-Fold Images (Lazy Loading)

For images that appear lower on the page:

```tsx
<OptimizedImage
  src="/service-image.jpg"
  alt="Web development service"
  width={800}
  height={600}
  aboveFold={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

This enables lazy loading, loading images only when they enter the viewport.

### Decorative Images

For decorative images that don't convey content:

```tsx
<OptimizedImage
  src="/pattern.svg"
  alt=""
  width={100}
  height={100}
  decorative={true}
/>
```

This sets `aria-hidden={true}` and uses empty alt text for screen readers.

### Responsive Sizes

The `sizes` prop tells the browser which image size to load based on viewport:

```tsx
// Full width on mobile, half width on tablet, third width on desktop
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Always full width
sizes="100vw"

// Half width on all screens
sizes="50vw"
```

Predefined sizes are available in `lib/image-utils.ts`:

```tsx
import { IMAGE_SIZES } from '@/lib/image-utils';

<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  sizes={IMAGE_SIZES.hero}
/>
```

### Error Handling

Images automatically fall back to `/fallback-image.jpg` if they fail to load:

```tsx
<OptimizedImage
  src="/might-not-exist.jpg"
  alt="Image"
  width={800}
  height={600}
  fallbackSrc="/custom-fallback.jpg"
/>
```

## Using Image Utility Functions

For more control, use the utility functions directly with Next.js Image:

```tsx
import Image from 'next/image';
import { getAboveFoldImageProps, getBelowFoldImageProps } from '@/lib/image-utils';

// Above-the-fold image
<Image
  {...getAboveFoldImageProps('/hero.jpg', 'Hero image')}
  width={1920}
  height={1080}
/>

// Below-the-fold image
<Image
  {...getBelowFoldImageProps('/service.jpg', 'Service image')}
  width={800}
  height={600}
/>
```

## Best Practices

### 1. Always Provide Alt Text

```tsx
// ✅ Good - descriptive alt text
<OptimizedImage src="/logo.svg" alt="Div Tag Studios logo" width={200} height={60} />

// ❌ Bad - missing alt text
<OptimizedImage src="/logo.svg" alt="" width={200} height={60} />

// ✅ Good - decorative image with empty alt
<OptimizedImage src="/pattern.svg" alt="" decorative={true} width={100} height={100} />
```

### 2. Use Priority for Above-the-Fold Images

```tsx
// ✅ Good - hero image with priority
<OptimizedImage src="/hero.jpg" alt="Hero" width={1920} height={1080} aboveFold={true} />

// ❌ Bad - hero image without priority (will lazy load)
<OptimizedImage src="/hero.jpg" alt="Hero" width={1920} height={1080} />
```

### 3. Specify Appropriate Sizes

```tsx
// ✅ Good - responsive sizes
<OptimizedImage
  src="/service.jpg"
  alt="Service"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 33vw"
/>

// ⚠️ Okay but not optimal - no sizes specified
<OptimizedImage src="/service.jpg" alt="Service" width={800} height={600} />
```

### 4. Use Appropriate Quality Settings

```tsx
// ✅ Good - high quality for hero images
<OptimizedImage src="/hero.jpg" alt="Hero" width={1920} height={1080} quality={90} />

// ✅ Good - standard quality for content images
<OptimizedImage src="/content.jpg" alt="Content" width={800} height={600} quality={85} />

// ✅ Good - lower quality for thumbnails
<OptimizedImage src="/thumb.jpg" alt="Thumbnail" width={200} height={200} quality={75} />
```

### 5. Provide Width and Height

Always provide width and height to prevent layout shift:

```tsx
// ✅ Good - prevents CLS
<OptimizedImage src="/image.jpg" alt="Image" width={800} height={600} />

// ❌ Bad - causes layout shift
<OptimizedImage src="/image.jpg" alt="Image" fill />
```

## Image Formats

Next.js automatically serves images in modern formats:

1. **AVIF** - Best compression, modern browsers
2. **WebP** - Good compression, wide support
3. **Original format** - Fallback for older browsers

No additional configuration needed - Next.js handles this automatically.

## Performance Metrics

Proper image optimization improves:

- **LCP (Largest Contentful Paint)** - Priority loading for hero images
- **CLS (Cumulative Layout Shift)** - Width/height prevent layout shift
- **FCP (First Contentful Paint)** - Lazy loading reduces initial load
- **Bandwidth** - Responsive images serve appropriate sizes

## Troubleshooting

### Images Not Loading

1. Check that images exist in the `public/` directory
2. Verify the path starts with `/` (e.g., `/logo.svg` not `logo.svg`)
3. Check browser console for errors

### Layout Shift Issues

1. Always provide `width` and `height` props
2. Use `fill` only when necessary (with proper container sizing)

### Performance Issues

1. Use `priority={true}` only for above-the-fold images
2. Specify appropriate `sizes` for responsive images
3. Use appropriate quality settings (85 is default)

## Examples

### Hero Section Image

```tsx
<OptimizedImage
  src="/hero-background.jpg"
  alt="Modern web development workspace"
  width={1920}
  height={1080}
  aboveFold={true}
  sizes="100vw"
  quality={90}
  className="object-cover"
/>
```

### Service Card Image

```tsx
<OptimizedImage
  src="/services/web-development.jpg"
  alt="Web development service illustration"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={85}
/>
```

### Logo

```tsx
<OptimizedImage
  src="/logo.svg"
  alt="Div Tag Studios"
  width={200}
  height={60}
  aboveFold={true}
  quality={100}
/>
```

### Decorative Pattern

```tsx
<OptimizedImage
  src="/patterns/dots.svg"
  alt=""
  width={100}
  height={100}
  decorative={true}
  quality={85}
/>
```

## References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [WCAG Image Alt Text Guidelines](https://www.w3.org/WAI/tutorials/images/)
