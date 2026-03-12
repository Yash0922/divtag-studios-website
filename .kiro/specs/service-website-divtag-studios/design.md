# Technical Design Document

## Overview

This document outlines the technical design for the Div Tag Studios service website, a modern, performant, and SEO-optimized web application built with Next.js 14+ App Router, React Server Components, and shadcn/ui. The website serves as a digital storefront showcasing six core services: Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO.

### Design Goals

- **Performance**: Achieve Lighthouse scores above 90 through Next.js optimizations, code splitting, and lazy loading
- **SEO Excellence**: Implement comprehensive metadata, structured data, and semantic HTML for search engine visibility
- **Responsive Design**: Deliver optimal experiences across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports
- **Accessibility**: Meet WCAG 2.1 AA standards with keyboard navigation, ARIA labels, and screen reader support
- **Modern UI**: Leverage shadcn/ui components for a professional, consistent, and animated interface
- **Developer Experience**: Use TypeScript, component composition, and Next.js conventions for maintainability

### Technology Stack

- **Framework**: Next.js 14+ with App Router and React Server Components
- **Language**: TypeScript for type safety
- **UI Library**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Styling**: Tailwind CSS with custom design tokens
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (optimized for Next.js)

## Architecture

### Application Structure

The application follows Next.js 14 App Router conventions with a single-page architecture using scroll-based navigation:

```
app/
├── layout.tsx                 # Root layout with metadata, fonts, providers
├── page.tsx                   # Home page (server component)
├── globals.css                # Tailwind directives and custom styles
├── api/
│   └── contact/
│       └── route.ts           # Contact form submission endpoint
components/
├── ui/                        # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── label.tsx
│   ├── navigation-menu.tsx
│   └── sheet.tsx              # Mobile menu
├── sections/
│   ├── hero-section.tsx       # Hero with branding and CTA
│   ├── services-section.tsx   # Services grid
│   ├── about-section.tsx      # Company information
│   ├── contact-section.tsx    # Contact form
│   └── footer.tsx             # Footer with links
├── navigation/
│   ├── navbar.tsx             # Desktop navigation
│   └── mobile-nav.tsx         # Mobile hamburger menu
├── service-card.tsx           # Individual service display
└── contact-form.tsx           # Form with validation
lib/
├── utils.ts                   # cn() utility and helpers
├── validations.ts             # Zod schemas for forms
└── constants.ts               # Service data, colors, content
public/
├── logo.svg                   # Company logo
├── services/                  # Service-related images
└── favicon.ico
```

### Rendering Strategy

- **Server Components (default)**: All sections, navbar, footer, and service cards render on the server for optimal performance and SEO
- **Client Components**: Contact form (interactive validation), mobile navigation (state management), service cards (hover animations)
- **Static Generation**: The home page is statically generated at build time with ISR (Incremental Static Regeneration) for updates

### Routing and Navigation

The website uses a single-page architecture with hash-based or scroll-based navigation:

- **Smooth Scrolling**: Navigation links trigger smooth scroll to section IDs using `scrollIntoView` or Next.js `Link` with hash fragments
- **Sticky Navigation**: The navbar remains fixed at the top using `position: sticky` or `fixed` with proper z-index layering
- **Active State**: Navigation highlights the current section using Intersection Observer API to detect viewport visibility

## Components and Interfaces

### Core Components

#### 1. Navbar Component

**Purpose**: Provides persistent navigation across all viewport sizes

**Props Interface**:
```typescript
interface NavbarProps {
  className?: string;
}
```

**Behavior**:
- Desktop (≥1024px): Horizontal navigation menu with logo and links
- Mobile (<1024px): Logo + hamburger button that opens Sheet component
- Sticky positioning with backdrop blur effect on scroll
- Active link highlighting based on current section

**Implementation Notes**:
- Use `shadcn/ui NavigationMenu` for desktop
- Use `shadcn/ui Sheet` for mobile drawer
- Client component for mobile menu state and scroll detection

#### 2. Hero Section Component

**Purpose**: First impression with branding and call-to-action

**Props Interface**:
```typescript
interface HeroSectionProps {
  className?: string;
}
```

**Content**:
- Company name: "Div Tag Studios"
- Tagline: "Turning Pixels into Products"
- Primary CTA button: "View Our Services" (scrolls to services section)
- Background: Gradient or subtle pattern

**Implementation Notes**:
- Server component (static content)
- Use `shadcn/ui Button` for CTA
- Implement fade-in animation on load using CSS or Framer Motion

#### 3. Service Card Component

**Purpose**: Displays individual service information with visual feedback

**Props Interface**:
```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}
```

**Behavior**:
- Hover effect: Lift animation (translateY) and shadow increase
- Icon display with consistent sizing
- Responsive padding and typography

**Implementation Notes**:
- Use `shadcn/ui Card` as base
- Client component for hover interactions
- Icons from Lucide React (Code2, Smartphone, Palette, Image, Video, TrendingUp)

#### 4. Services Section Component

**Purpose**: Grid layout showcasing all six services

**Props Interface**:
```typescript
interface ServicesSectionProps {
  className?: string;
}
```

**Layout**:
- Mobile (320-767px): 1 column
- Tablet (768-1023px): 2 columns
- Desktop (1024px+): 3 columns
- Gap: 1.5rem (24px)

**Implementation Notes**:
- Server component with service data from constants
- CSS Grid with responsive columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

#### 5. Contact Form Component

**Purpose**: Collects visitor inquiries with validation

**Props Interface**:
```typescript
interface ContactFormProps {
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}
```

**Fields**:
- Name (required, min 2 characters)
- Email (required, valid email format)
- Service Interest (required, dropdown with 6 services)
- Message (required, min 10 characters)

**Validation**:
- Client-side: React Hook Form + Zod schema
- Real-time field validation on blur
- Display error messages below fields
- Disable submit button during submission

**Submission Flow**:
1. Validate form data
2. POST to `/api/contact` endpoint
3. Show loading state on button
4. Display success message or error
5. Reset form on success

**Implementation Notes**:
- Client component for interactivity
- Use `shadcn/ui Input`, `Textarea`, `Label`, `Button`
- Use `shadcn/ui Select` for service dropdown
- Success/error states with toast or inline message

#### 6. About Section Component

**Purpose**: Communicates company mission and values

**Props Interface**:
```typescript
interface AboutSectionProps {
  className?: string;
}
```

**Content**:
- Company mission statement
- Core values or approach (3-4 bullet points)
- Optional: Team photo or illustration

**Implementation Notes**:
- Server component (static content)
- Content stored in constants file

#### 7. Footer Component

**Purpose**: Provides copyright, social links, and secondary navigation

**Props Interface**:
```typescript
interface FooterProps {
  className?: string;
}
```

**Content**:
- Copyright notice: "© 2024 Div Tag Studios. All rights reserved."
- Social media links (LinkedIn, Twitter, GitHub, etc.)
- Email contact: contact@divtagstudios.com (example)
- Optional: Quick links to sections

**Implementation Notes**:
- Server component
- Social icons from Lucide React
- Links open in new tab with `rel="noopener noreferrer"`

### API Routes

#### Contact Form Endpoint

**Route**: `POST /api/contact`

**Request Body**:
```typescript
{
  name: string;
  email: string;
  service: string;
  message: string;
}
```

**Response**:
```typescript
// Success (200)
{
  success: true;
  message: "Thank you for contacting us. We'll get back to you soon."
}

// Validation Error (400)
{
  success: false;
  error: "Invalid email format"
}

// Server Error (500)
{
  success: false;
  error: "Failed to send message. Please try again."
}
```

**Implementation**:
- Validate request body using Zod schema
- In production: Send email via service (SendGrid, Resend, etc.) or save to database
- In development: Log to console
- Return appropriate status codes and messages

## Data Models

### Service Model

```typescript
interface Service {
  id: string;                    // Unique identifier (kebab-case)
  title: string;                 // Display name
  description: string;           // Brief description (2-3 sentences)
  icon: LucideIcon;              // Icon component from Lucide
  keywords: string[];            // SEO keywords for this service
}
```

**Service Data** (stored in `lib/constants.ts`):

```typescript
export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices. From responsive websites to complex web platforms.',
    icon: Code2,
    keywords: ['web development', 'react', 'next.js', 'frontend', 'backend']
  },
  {
    id: 'android-development',
    title: 'Android Development',
    description: 'Native Android applications with intuitive interfaces and robust performance. Built with Kotlin and modern Android architecture.',
    icon: Smartphone,
    keywords: ['android', 'mobile app', 'kotlin', 'native development']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that combine aesthetics with functionality. Wireframes, prototypes, and design systems.',
    icon: Palette,
    keywords: ['ui design', 'ux design', 'user experience', 'figma', 'prototyping']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Visual identity and branding materials that make your business stand out. Logos, marketing materials, and brand guidelines.',
    icon: Image,
    keywords: ['graphic design', 'branding', 'logo design', 'visual identity']
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video editing and post-production services. From promotional videos to social media content.',
    icon: Video,
    keywords: ['video editing', 'post-production', 'motion graphics', 'video content']
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Search engine optimization strategies to improve your online visibility. Technical SEO, content optimization, and analytics.',
    icon: TrendingUp,
    keywords: ['seo', 'search optimization', 'google ranking', 'digital marketing']
  }
];
```

### Contact Form Model

```typescript
interface ContactFormData {
  name: string;
  email: string;
  service: string;              // One of the service IDs
  message: string;
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  service: z.string()
    .min(1, 'Please select a service'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});
```

### SEO Metadata Model

```typescript
interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: 'website';
    url: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
}
```

**Implementation in `app/layout.tsx`**:

```typescript
export const metadata: Metadata = {
  title: 'Div Tag Studios - Turning Pixels into Products',
  description: 'Professional digital services including Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO. Transform your ideas into reality.',
  keywords: ['web development', 'android development', 'ui ux design', 'graphic design', 'video editing', 'seo services', 'digital agency'],
  authors: [{ name: 'Div Tag Studios' }],
  openGraph: {
    title: 'Div Tag Studios - Turning Pixels into Products',
    description: 'Professional digital services for modern businesses',
    type: 'website',
    url: 'https://divtagstudios.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Div Tag Studios'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Div Tag Studios - Turning Pixels into Products',
    description: 'Professional digital services for modern businesses',
    images: ['/og-image.png']
  }
};
```

### Design Tokens

```typescript
// Stored in tailwind.config.ts and/or lib/constants.ts

export const COLORS = {
  primary: {
    DEFAULT: 'hsl(222.2 47.4% 11.2%)',    // Dark blue-gray
    foreground: 'hsl(210 40% 98%)'
  },
  secondary: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(222.2 47.4% 11.2%)'
  },
  accent: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(222.2 47.4% 11.2%)'
  },
  muted: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(215.4 16.3% 46.9%)'
  }
};

export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

export const TOUCH_TARGET_SIZE = '44px';  // Minimum for mobile accessibility
```

## SEO Implementation Strategy

### 1. Metadata Configuration

**Root Layout** (`app/layout.tsx`):
- Primary title and description
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL
- Language attribute (`lang="en"`)
- Viewport meta tag for responsive design

### 2. Semantic HTML Structure

```html
<body>
  <header>
    <nav> <!-- Navigation --> </nav>
  </header>
  
  <main>
    <section id="hero"> <!-- Hero Section --> </section>
    <section id="services"> <!-- Services Section --> </section>
    <section id="about"> <!-- About Section --> </section>
    <section id="contact"> <!-- Contact Section --> </section>
  </main>
  
  <footer> <!-- Footer --> </footer>
</body>
```

### 3. Heading Hierarchy

- **H1**: "Div Tag Studios" (once per page, in hero)
- **H2**: Section titles ("Our Services", "About Us", "Contact Us")
- **H3**: Service card titles, subsection headings
- **H4**: Minor headings within sections

### 4. Structured Data (JSON-LD)

Implement Organization schema in `app/layout.tsx`:

```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Div Tag Studios',
  description: 'Professional digital services company',
  url: 'https://divtagstudios.com',
  logo: 'https://divtagstudios.com/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@divtagstudios.com',
    contactType: 'Customer Service'
  },
  sameAs: [
    'https://twitter.com/divtagstudios',
    'https://linkedin.com/company/divtagstudios'
  ]
};
```

### 5. Sitemap Generation

Create `app/sitemap.ts`:

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://divtagstudios.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0
    }
  ];
}
```

### 6. Robots.txt

Create `app/robots.ts`:

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: 'https://divtagstudios.com/sitemap.xml'
  };
}
```

### 7. Image Optimization

- Use Next.js `<Image>` component for all images
- Provide descriptive `alt` text for every image
- Use WebP format with fallbacks
- Implement lazy loading for below-the-fold images
- Optimize logo as SVG for scalability

### 8. Performance Optimizations for SEO

- Server-side rendering for initial page load
- Minimize JavaScript bundle size through code splitting
- Implement proper caching headers
- Use font optimization with `next/font`
- Minimize Cumulative Layout Shift (CLS) with proper image dimensions

## Responsive Design Approach

### Breakpoint Strategy

Using Tailwind CSS responsive prefixes:

- **Mobile-first**: Base styles apply to mobile (320px+)
- **md**: Tablet styles (768px+)
- **lg**: Desktop styles (1024px+)
- **xl**: Large desktop (1280px+) - optional enhancements

### Layout Patterns

#### Services Grid

```typescript
// Responsive grid classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map(service => <ServiceCard key={service.id} {...service} />)}
</div>
```

#### Navigation

```typescript
// Desktop: Horizontal menu
<nav className="hidden lg:flex items-center gap-6">
  <NavLinks />
</nav>

// Mobile: Hamburger + Sheet
<Sheet>
  <SheetTrigger className="lg:hidden">
    <Menu className="h-6 w-6" />
  </SheetTrigger>
  <SheetContent>
    <NavLinks />
  </SheetContent>
</Sheet>
```

#### Typography Scaling

```typescript
// Hero heading
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Div Tag Studios
</h1>

// Section headings
<h2 className="text-3xl md:text-4xl font-semibold">
  Our Services
</h2>

// Body text
<p className="text-base md:text-lg">
  Description text
</p>
```

### Touch Target Sizing

All interactive elements meet minimum 44x44px touch target:

```typescript
// Button component
<Button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Click Me
</Button>

// Navigation links
<a className="inline-block py-3 px-4 min-h-[44px]">
  Services
</a>
```

### Container Strategy

```typescript
// Max-width container with responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
  {children}
</div>
```

### Image Responsiveness

```typescript
<Image
  src="/service-image.jpg"
  alt="Web Development Service"
  width={800}
  height={600}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Performance Optimization Techniques

### 1. Next.js Image Optimization

```typescript
import Image from 'next/image';

// Automatic optimization, lazy loading, responsive srcset
<Image
  src="/hero-background.jpg"
  alt="Hero background"
  fill
  priority  // For above-the-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Code Splitting

- **Automatic**: Next.js splits code by route automatically
- **Dynamic Imports**: For heavy components not needed immediately

```typescript
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <FormSkeleton />,
  ssr: false  // If form doesn't need SSR
});
```

### 3. Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 4. Lazy Loading Strategies

```typescript
// Lazy load below-the-fold sections
<section id="services" className="lazy-section">
  <ServiceCards />
</section>

// Intersection Observer for animations
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  });
  
  document.querySelectorAll('.lazy-section').forEach(el => {
    observer.observe(el);
  });
}, []);
```

### 5. Bundle Size Optimization

- Use `shadcn/ui` components (tree-shakeable)
- Import only needed Lucide icons
- Avoid large dependencies
- Use Next.js bundle analyzer to identify bloat

```typescript
// Import specific icons only
import { Code2, Smartphone, Palette } from 'lucide-react';

// Not: import * as Icons from 'lucide-react';
```

### 6. Caching Strategy

```typescript
// API route with caching headers
export async function POST(request: Request) {
  // ... handle request
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store'  // For dynamic contact form
    }
  });
}

// Static assets cached automatically by Next.js
```

### 7. Server Components by Default

- Render most components on server for faster initial load
- Only use 'use client' when necessary (forms, animations, state)
- Reduces JavaScript sent to client

### 8. Prefetching

Next.js automatically prefetches links in viewport:

```typescript
<Link href="#services" prefetch={true}>
  View Services
</Link>
```

### 9. Compression

- Next.js automatically compresses responses with gzip/brotli
- Ensure hosting platform supports compression (Vercel does by default)

### 10. Monitoring

- Use Next.js Speed Insights (Vercel)
- Monitor Core Web Vitals: LCP, FID, CLS
- Regular Lighthouse audits in CI/CD pipeline

## Accessibility Implementation

### 1. Keyboard Navigation

All interactive elements must be keyboard accessible:

```typescript
// Proper focus management
<button
  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Submit
</button>

// Skip to main content link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>
```

### 2. ARIA Labels

```typescript
// Icon-only buttons
<button aria-label="Open navigation menu">
  <Menu className="h-6 w-6" />
</button>

// Form fields (handled by shadcn/ui Label component)
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" aria-required="true" />

// Error messages
<Input
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert" className="text-destructive">
    {errors.email.message}
  </span>
)}
```

### 3. Color Contrast

Ensure WCAG 2.1 AA compliance (4.5:1 for normal text, 3:1 for large text):

```typescript
// Use shadcn/ui default theme (already compliant)
// Or customize in tailwind.config.ts with tested colors

// Example: Test with tools like WebAIM Contrast Checker
const colors = {
  primary: 'hsl(222.2 47.4% 11.2%)',      // Dark text
  background: 'hsl(0 0% 100%)',            // White background
  // Contrast ratio: 15.3:1 ✓
};
```

### 4. Screen Reader Support

```typescript
// Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#services">Services</a></li>
  </ul>
</nav>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {successMessage && <p>{successMessage}</p>}
</div>

// Hidden content for screen readers
<span className="sr-only">
  Loading, please wait
</span>
```

### 5. Focus Indicators

```typescript
// Visible focus styles (never remove outlines without replacement)
// Tailwind focus utilities
<a className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Link
</a>

// Custom focus styles
.custom-focus:focus {
  outline: 2px solid hsl(222.2 47.4% 11.2%);
  outline-offset: 2px;
}
```

### 6. Form Accessibility

```typescript
// Proper labeling
<div>
  <Label htmlFor="name">Full Name</Label>
  <Input
    id="name"
    name="name"
    type="text"
    required
    aria-required="true"
    aria-invalid={!!errors.name}
    aria-describedby={errors.name ? 'name-error' : 'name-hint'}
  />
  <span id="name-hint" className="text-sm text-muted-foreground">
    Enter your first and last name
  </span>
  {errors.name && (
    <span id="name-error" role="alert" className="text-sm text-destructive">
      {errors.name.message}
    </span>
  )}
</div>
```

### 7. Image Alt Text

```typescript
// Descriptive alt text
<Image
  src="/services/web-dev.jpg"
  alt="Developer working on a responsive web application with modern code editor"
  width={400}
  height={300}
/>

// Decorative images
<Image
  src="/decorative-pattern.svg"
  alt=""  // Empty alt for decorative images
  aria-hidden="true"
  width={100}
  height={100}
/>
```

### 8. Motion and Animations

```typescript
// Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// In Tailwind
<div className="transition-transform motion-reduce:transition-none">
  Content
</div>
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Service Card Complete Rendering

For any service object with title, description, and icon fields, rendering it as a ServiceCard component should produce output containing all three pieces of information (the title text, the description text, and the icon element).

**Validates: Requirements 2.2**

### Property 2: Navigation Link Scroll Behavior

For any navigation link with a valid section ID target, clicking or activating the link should trigger a scroll action to the element with that ID.

**Validates: Requirements 3.2**

### Property 3: Image Optimization and Accessibility

For any image rendered in the application, it should use the Next.js Image component and include a non-empty alt attribute (or empty alt with aria-hidden for decorative images).

**Validates: Requirements 4.6, 8.1**

### Property 4: Valid Form Submission Success

For any contact form data that passes validation (name ≥2 chars, valid email format, service selected, message ≥10 chars), submitting the form should result in a success state with a confirmation message displayed.

**Validates: Requirements 5.2**

### Property 5: Invalid Form Data Error Display

For any contact form data that fails validation (invalid email, missing required fields, or values outside constraints), attempting to submit should display field-specific error messages without submitting to the server.

**Validates: Requirements 5.3**

### Property 6: Email Format Validation

For any string input to the email field, the validation function should correctly identify valid email formats (containing @ and domain) and reject invalid formats, returning appropriate validation results.

**Validates: Requirements 5.4**

### Property 7: Asynchronous Operation Loading States

For any asynchronous operation (form submission, data fetching), the UI should display a loading indicator while the operation is in progress and remove it when the operation completes or fails.

**Validates: Requirements 6.4**

### Property 8: Touch Target Minimum Size

For any interactive element (buttons, links, form inputs), the rendered element should have minimum dimensions of 44x44 pixels to ensure touch-friendly interaction on mobile devices.

**Validates: Requirements 7.4**

### Property 9: Keyboard Navigation Support

For any interactive element (buttons, links, form controls), it should be focusable and activatable via keyboard (Tab to focus, Enter/Space to activate) without requiring mouse interaction.

**Validates: Requirements 10.1**

### Property 10: WCAG Color Contrast Compliance

For any text element rendered on a background, the color combination should meet WCAG 2.1 AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text or UI components).

**Validates: Requirements 10.2**

### Property 11: Icon Button ARIA Labels

For any button element that contains only an icon without visible text, the button should include an aria-label attribute with a descriptive label for screen reader users.

**Validates: Requirements 10.3**

### Property 12: Focus Indicator Visibility

For any focusable element, when it receives keyboard focus, it should display a visible focus indicator (outline, ring, or border) that meets minimum visibility requirements.

**Validates: Requirements 10.5**

## Error Handling

### Client-Side Error Handling

#### Form Validation Errors

**Strategy**: Validate inputs on blur and before submission using React Hook Form + Zod

**Error Types**:
- **Empty Required Fields**: Display "This field is required" below the field
- **Invalid Email Format**: Display "Please enter a valid email address"
- **Minimum Length Violations**: Display "Must be at least X characters"
- **Maximum Length Violations**: Display "Must be less than X characters"

**Implementation**:
```typescript
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  service: z.string()
    .min(1, 'Please select a service'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

// Error display
{errors.email && (
  <p className="text-sm text-destructive mt-1" role="alert">
    {errors.email.message}
  </p>
)}
```

#### Network Errors

**Strategy**: Catch fetch failures and display user-friendly messages

**Error Types**:
- **Network Timeout**: "Request timed out. Please check your connection and try again."
- **Server Unavailable**: "Unable to connect to server. Please try again later."
- **Unknown Error**: "Something went wrong. Please try again."

**Implementation**:
```typescript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const data = await response.json();
  setSuccessMessage(data.message);
} catch (error) {
  if (error instanceof TypeError) {
    setErrorMessage('Network error. Please check your connection.');
  } else {
    setErrorMessage('Failed to send message. Please try again.');
  }
}
```

#### Image Loading Errors

**Strategy**: Provide fallback UI for failed image loads

**Implementation**:
```typescript
<Image
  src="/service-image.jpg"
  alt="Service illustration"
  width={400}
  height={300}
  onError={(e) => {
    e.currentTarget.src = '/fallback-image.jpg';
  }}
/>
```

### Server-Side Error Handling

#### API Route Error Handling

**Strategy**: Validate requests, catch errors, return appropriate status codes

**Error Types**:
- **400 Bad Request**: Invalid or missing request data
- **405 Method Not Allowed**: Non-POST requests to contact endpoint
- **500 Internal Server Error**: Unexpected server errors

**Implementation**:
```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = contactFormSchema.parse(body);
    
    // Process form (send email, save to DB, etc.)
    // In development: just log
    console.log('Contact form submission:', validatedData);
    
    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We'll get back to you soon."
    }, { status: 200 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid form data',
        details: error.errors
      }, { status: 400 });
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process request. Please try again.'
    }, { status: 500 });
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 });
}
```

### Error Boundaries

**Strategy**: Catch React component errors and display fallback UI

**Implementation**:
```typescript
// components/error-boundary.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-6">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
```

### Graceful Degradation

**Strategy**: Ensure core functionality works even when enhancements fail

**Examples**:
- **JavaScript Disabled**: Forms still submit via native HTML form submission
- **Images Fail to Load**: Alt text provides context
- **CSS Fails to Load**: Semantic HTML ensures content is readable
- **Animations Disabled**: Content remains accessible without motion

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, error conditions, and integration points between components
- **Property-Based Tests**: Verify universal properties across all inputs through randomized testing

Both approaches are complementary and necessary. Unit tests catch concrete bugs and validate specific scenarios, while property-based tests verify general correctness across a wide range of inputs.

### Testing Tools and Configuration

**Testing Framework**: Vitest (fast, Vite-native test runner)
**React Testing**: React Testing Library (user-centric testing)
**Property-Based Testing**: fast-check (property-based testing for TypeScript/JavaScript)
**E2E Testing**: Playwright (for full user flows and accessibility testing)

**Installation**:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check
npm install -D @playwright/test
```

**Configuration** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
});
```

### Property-Based Testing Configuration

**Minimum Iterations**: Each property test must run at least 100 iterations to ensure adequate randomized input coverage.

**Test Tagging**: Each property-based test must include a comment referencing the design document property:

```typescript
// Feature: service-website-divtag-studios, Property 1: Service Card Complete Rendering
test('service card renders all required fields', () => {
  fc.assert(
    fc.property(
      serviceArbitrary,
      (service) => {
        // Test implementation
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

#### Component Tests

**Focus Areas**:
- Specific rendering examples (hero displays correct text, navbar has correct links)
- Edge cases (empty service list, very long form inputs)
- User interactions (button clicks, form submissions)
- Error states (network failures, validation errors)

**Example Test Structure**:
```typescript
// components/__tests__/hero-section.test.tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero-section';

describe('HeroSection', () => {
  test('displays company name', () => {
    render(<HeroSection />);
    expect(screen.getByText('Div Tag Studios')).toBeInTheDocument();
  });

  test('displays tagline', () => {
    render(<HeroSection />);
    expect(screen.getByText('Turning Pixels into Products')).toBeInTheDocument();
  });

  test('includes CTA button', () => {
    render(<HeroSection />);
    const button = screen.getByRole('button', { name: /view our services/i });
    expect(button).toBeInTheDocument();
  });
});
```

#### Form Validation Tests

**Focus Areas**:
- Valid input acceptance
- Invalid input rejection
- Error message display
- Edge cases (boundary values, special characters)

**Example**:
```typescript
// components/__tests__/contact-form.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';

describe('ContactForm Validation', () => {
  test('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur validation
    
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  test('shows error for short name', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'A');
    await user.tab();
    
    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
  });
});
```

#### API Route Tests

**Focus Areas**:
- Valid request handling
- Invalid request rejection
- Error responses
- Status codes

**Example**:
```typescript
// app/api/contact/__tests__/route.test.ts
import { POST } from '../route';

describe('POST /api/contact', () => {
  test('returns success for valid data', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'web-development',
        message: 'I need a website'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  test('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid',
        service: 'web-development',
        message: 'I need a website'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

### Property-Based Testing Strategy

#### Generators (Arbitraries)

Define generators for domain objects:

```typescript
// test/arbitraries.ts
import fc from 'fast-check';
import { Service } from '@/lib/constants';

export const serviceArbitrary: fc.Arbitrary<Service> = fc.record({
  id: fc.stringOf(fc.constantFrom('a', 'b', 'c', '-'), { minLength: 5, maxLength: 20 }),
  title: fc.string({ minLength: 3, maxLength: 50 }),
  description: fc.string({ minLength: 10, maxLength: 200 }),
  icon: fc.constant(Code2), // Use actual icon component
  keywords: fc.array(fc.string({ minLength: 2, maxLength: 20 }), { minLength: 1, maxLength: 5 })
});

export const contactFormDataArbitrary = fc.record({
  name: fc.string({ minLength: 2, maxLength: 100 }),
  email: fc.emailAddress(),
  service: fc.constantFrom('web-development', 'android-development', 'ui-ux-design', 'graphic-design', 'video-editing', 'seo'),
  message: fc.string({ minLength: 10, maxLength: 1000 })
});

export const invalidEmailArbitrary = fc.string().filter(s => !s.includes('@') || !s.includes('.'));
```

#### Property Test Examples

**Property 1: Service Card Complete Rendering**
```typescript
// Feature: service-website-divtag-studios, Property 1: Service Card Complete Rendering
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { ServiceCard } from '@/components/service-card';
import { serviceArbitrary } from '@/test/arbitraries';

test('service card renders all required fields for any service', () => {
  fc.assert(
    fc.property(serviceArbitrary, (service) => {
      const { container } = render(<ServiceCard {...service} />);
      const html = container.innerHTML;
      
      // Check that all three required pieces are present
      expect(html).toContain(service.title);
      expect(html).toContain(service.description);
      expect(container.querySelector('svg')).toBeInTheDocument(); // Icon is SVG
    }),
    { numRuns: 100 }
  );
});
```

**Property 6: Email Format Validation**
```typescript
// Feature: service-website-divtag-studios, Property 6: Email Format Validation
import fc from 'fast-check';
import { contactFormSchema } from '@/lib/validations';

test('email validation correctly identifies valid emails', () => {
  fc.assert(
    fc.property(fc.emailAddress(), (email) => {
      const result = contactFormSchema.shape.email.safeParse(email);
      expect(result.success).toBe(true);
    }),
    { numRuns: 100 }
  );
});

test('email validation correctly rejects invalid emails', () => {
  fc.assert(
    fc.property(invalidEmailArbitrary, (invalidEmail) => {
      const result = contactFormSchema.shape.email.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    }),
    { numRuns: 100 }
  );
});
```

**Property 4: Valid Form Submission Success**
```typescript
// Feature: service-website-divtag-studios, Property 4: Valid Form Submission Success
import fc from 'fast-check';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';
import { contactFormDataArbitrary } from '@/test/arbitraries';

test('valid form data results in success message', () => {
  fc.assert(
    fc.asyncProperty(contactFormDataArbitrary, async (formData) => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), formData.name);
      await user.type(screen.getByLabelText(/email/i), formData.email);
      await user.selectOptions(screen.getByLabelText(/service/i), formData.service);
      await user.type(screen.getByLabelText(/message/i), formData.message);
      
      // Submit
      await user.click(screen.getByRole('button', { name: /submit/i }));
      
      // Check for success message
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    }),
    { numRuns: 100 }
  );
});
```

**Property 8: Touch Target Minimum Size**
```typescript
// Feature: service-website-divtag-studios, Property 8: Touch Target Minimum Size
import fc from 'fast-check';
import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('all buttons meet minimum touch target size', () => {
  fc.assert(
    fc.property(fc.string({ minLength: 1, maxLength: 50 }), (buttonText) => {
      const { container } = render(<Button>{buttonText}</Button>);
      const button = container.querySelector('button');
      
      const rect = button?.getBoundingClientRect();
      expect(rect?.width).toBeGreaterThanOrEqual(44);
      expect(rect?.height).toBeGreaterThanOrEqual(44);
    }),
    { numRuns: 100 }
  );
});
```

**Property 10: WCAG Color Contrast Compliance**
```typescript
// Feature: service-website-divtag-studios, Property 10: WCAG Color Contrast Compliance
import fc from 'fast-check';
import { calculateContrastRatio } from '@/lib/utils';
import { COLORS } from '@/lib/constants';

test('all text/background combinations meet WCAG AA standards', () => {
  const colorPairs = [
    { text: COLORS.primary.DEFAULT, bg: COLORS.background },
    { text: COLORS.foreground, bg: COLORS.primary.DEFAULT },
    { text: COLORS.muted.foreground, bg: COLORS.muted.DEFAULT }
  ];

  colorPairs.forEach(({ text, bg }) => {
    const ratio = calculateContrastRatio(text, bg);
    expect(ratio).toBeGreaterThanOrEqual(4.5); // WCAG AA for normal text
  });
});
```

### Accessibility Testing

**Automated Tests**:
- Use `@axe-core/react` for automated accessibility audits
- Test keyboard navigation flows
- Verify ARIA attributes

**Manual Testing Checklist**:
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Color contrast verification
- Focus indicator visibility
- Touch target sizes on real devices

**Example Accessibility Test**:
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('hero section has no accessibility violations', async () => {
  const { container } = render(<HeroSection />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### E2E Testing with Playwright

**Focus Areas**:
- Complete user flows (landing → services → contact → submission)
- Cross-browser compatibility
- Responsive behavior at different viewports
- Performance metrics (Lighthouse scores)

**Example E2E Test**:
```typescript
// e2e/contact-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete contact form submission flow', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to contact section
  await page.click('text=Contact');
  await expect(page.locator('#contact')).toBeInViewport();
  
  // Fill form
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.selectOption('select[name="service"]', 'web-development');
  await page.fill('textarea[name="message"]', 'I need a professional website');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Verify success
  await expect(page.locator('text=Thank you')).toBeVisible();
});

test('mobile navigation works correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Open mobile menu
  await page.click('[aria-label="Open navigation menu"]');
  
  // Click services link
  await page.click('text=Services');
  
  // Verify scroll
  await expect(page.locator('#services')).toBeInViewport();
});
```

### Test Coverage Goals

- **Unit Test Coverage**: Minimum 80% code coverage for components and utilities
- **Property Test Coverage**: All identified correctness properties must have corresponding property-based tests
- **E2E Test Coverage**: All critical user flows (navigation, form submission, responsive behavior)
- **Accessibility Coverage**: All interactive components tested with axe-core

### Continuous Integration

**CI Pipeline** (GitHub Actions example):
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - run: npm run lint
```

**Pre-commit Hooks**:
- Run unit tests
- Run linting
- Type checking with TypeScript

This comprehensive testing strategy ensures the website meets all functional requirements, maintains high quality, and provides an excellent user experience across all devices and accessibility needs.

