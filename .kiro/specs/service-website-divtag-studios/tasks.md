# Implementation Plan: Div Tag Studios Service Website

## Overview

This implementation plan breaks down the development of the Div Tag Studios service website into discrete, manageable tasks. The website will be built using Next.js 14+ with App Router, TypeScript, shadcn/ui components, and Tailwind CSS. The implementation follows a bottom-up approach: setting up the foundation, building reusable components, assembling sections, implementing features, and finally integrating everything together.

## Tasks

- [x] 1. Initialize Next.js project and configure development environment
  - Create Next.js 14+ project with TypeScript and App Router
  - Install and configure Tailwind CSS
  - Set up shadcn/ui with initial configuration
  - Configure path aliases (@/ for root imports)
  - Create basic folder structure (components/, lib/, app/, public/)
  - _Requirements: 6.1, 8.2_

- [ ] 2. Set up design system and constants
  - [x] 2.1 Create constants file with service data
    - Define Service interface with id, title, description, icon, and keywords
    - Create SERVICES array with all six services (Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, SEO)
    - Include Lucide React icons for each service
    - _Requirements: 2.1_
  
  - [x] 2.2 Configure Tailwind theme and design tokens
    - Set up color palette (primary, secondary, accent, muted)
    - Configure breakpoints (mobile: 320px, tablet: 768px, desktop: 1024px)
    - Add custom utilities for touch targets (min 44x44px)
    - _Requirements: 1.4, 6.3, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 2.3 Create utility functions
    - Implement cn() utility for className merging
    - Create validation schemas using Zod for contact form
    - _Requirements: 5.3, 5.4_

- [ ] 3. Install and configure shadcn/ui components
  - [x] 3.1 Install base shadcn/ui components
    - Add Button component
    - Add Card component
    - Add Input, Textarea, Label components
    - Add Select component for dropdown
    - Add Sheet component for mobile navigation
    - Add NavigationMenu component
    - _Requirements: 6.1_
  
  - [x] 3.2 Write unit tests for shadcn/ui component integration
    - Test that components render correctly
    - Test component variants and props
    - _Requirements: 6.1_

- [ ] 4. Implement core UI components
  - [x] 4.1 Create ServiceCard component
    - Build card component accepting title, description, and icon props
    - Implement hover animation (lift effect with translateY and shadow)
    - Use shadcn/ui Card as base
    - Make it a client component for hover interactions
    - _Requirements: 2.1, 2.2, 2.4_
  
  - [x] 4.2 Write property test for ServiceCard
    - **Property 1: Service Card Complete Rendering**
    - **Validates: Requirements 2.2**
    - Test that any service object renders with all three fields (title, description, icon)
  
  - [x] 4.3 Write unit tests for ServiceCard
    - Test hover state styling
    - Test with different icon types
    - Test responsive behavior
    - _Requirements: 2.2, 2.4_

- [ ] 5. Build navigation components
  - [x] 5.1 Create Navbar component
    - Implement sticky/fixed positioning at top
    - Add logo and company name
    - Create desktop horizontal navigation menu with links (Home, Services, About, Contact)
    - Implement smooth scroll behavior for section navigation
    - Add backdrop blur effect on scroll
    - Make it a client component for scroll detection
    - _Requirements: 1.3, 3.1, 3.2, 3.4_
  
  - [x] 5.2 Create MobileNav component
    - Implement hamburger menu button
    - Use shadcn/ui Sheet for mobile drawer
    - Add navigation links that close drawer on click
    - Ensure touch-friendly button size (44x44px minimum)
    - _Requirements: 3.1, 3.2, 3.3, 7.4_
  
  - [x] 5.3 Implement active section highlighting
    - Use Intersection Observer API to detect visible section
    - Highlight corresponding navigation link
    - _Requirements: 3.2_
  
  - [x] 5.4 Write property test for navigation scroll behavior
    - **Property 2: Navigation Link Scroll Behavior**
    - **Validates: Requirements 3.2**
    - Test that clicking any valid section link triggers scroll
  

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement page sections
  - [x] 7.1 Create HeroSection component
    - Display "Div Tag Studios" as h1 heading
    - Display "Turning Pixels into Products" as tagline
    - Add "View Our Services" CTA button that scrolls to services section
    - Implement fade-in animation on load
    - Use responsive typography (text-4xl md:text-5xl lg:text-6xl)
    - Make it a server component
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [x] 7.2 Create ServicesSection component
    - Implement responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
    - Map through SERVICES array and render ServiceCard for each
    - Add section heading "Our Services"
    - Make it a server component
    - _Requirements: 2.1, 2.3, 7.1, 7.2, 7.3_
  
  - [x] 7.3 Create AboutSection component
    - Display company mission statement
    - List core values or approach (3-4 points)
    - Use semantic HTML with proper heading hierarchy
    - Make it a server component
    - _Requirements: 9.1, 9.2, 4.5_
  
  - [x] 7.4 Create Footer component
    - Display copyright notice "© 2024 Div Tag Studios. All rights reserved."
    - Add social media links with Lucide icons
    - Display company email contact
    - Add links with proper rel attributes for external links
    - Make it a server component
    - _Requirements: 9.3_
  
  - [x] 7.5 Write unit tests for page sections
    - Test HeroSection displays correct branding
    - Test ServicesSection renders all six services
    - Test AboutSection content
    - Test Footer links and copyright
    - _Requirements: 1.1, 1.2, 2.1, 9.1, 9.3_

- [ ] 8. Implement contact form with validation
  - [x] 8.1 Create ContactForm component
    - Build form with fields: name, email, service (dropdown), message
    - Integrate React Hook Form for form state management
    - Implement Zod validation schema (name ≥2 chars, valid email, service required, message ≥10 chars)
    - Add real-time validation on blur
    - Display field-specific error messages below inputs
    - Implement loading state during submission
    - Show success message after successful submission
    - Make it a client component for interactivity
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 8.2 Write property test for valid form submission
    - **Property 4: Valid Form Submission Success**
    - **Validates: Requirements 5.2**
    - Test that any valid form data results in success state
  
  - [x] 8.3 Write property test for invalid form data
    - **Property 5: Invalid Form Data Error Display**
    - **Validates: Requirements 5.3**
    - Test that invalid data displays appropriate error messages
  
  - [x] 8.4 Write property test for email validation
    - **Property 6: Email Format Validation**
    - **Validates: Requirements 5.4**
    - Test that validation correctly identifies valid and invalid emails
  
  - [x] 8.5 Write unit tests for ContactForm
    - Test form field rendering
    - Test error message display for specific cases
    - Test form reset after submission
    - Test loading state during submission
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.4_
  
  - [x] 8.6 Create ContactSection component
    - Wrap ContactForm with section layout
    - Add section heading "Contact Us"
    - Display company contact information
    - _Requirements: 5.1, 5.5_

- [ ] 9. Create contact form API endpoint
  - [x] 9.1 Implement POST /api/contact route
    - Create route handler in app/api/contact/route.ts
    - Validate request body using Zod schema
    - Return success response (200) with confirmation message
    - Return validation error (400) for invalid data
    - Return server error (500) for unexpected errors
    - Log form submissions to console (development mode)
    - _Requirements: 5.2, 5.3_
  
  - [x] 9.2 Implement error handling for non-POST requests
    - Return 405 Method Not Allowed for GET and other methods
    - _Requirements: 5.2_
  
  - [x] 9.3 Write unit tests for API route
    - Test successful submission with valid data
    - Test 400 response for invalid email
    - Test 400 response for missing required fields
    - Test 405 response for GET requests
    - _Requirements: 5.2, 5.3_

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement SEO and metadata
  - [x] 11.1 Configure root layout metadata
    - Add title: "Div Tag Studios - Turning Pixels into Products"
    - Add description with all six services
    - Add keywords array
    - Configure Open Graph tags with title, description, type, url, and image
    - Configure Twitter Card tags
    - Add authors metadata
    - _Requirements: 4.1, 4.2_
  
  - [x] 11.2 Create sitemap.ts
    - Generate sitemap with homepage entry
    - Set lastModified, changeFrequency, and priority
    - _Requirements: 4.3_
  
  - [x] 11.3 Create robots.ts
    - Allow all user agents
    - Reference sitemap URL
    - _Requirements: 4.3_
  
  - [x] 11.4 Add JSON-LD structured data
    - Implement Organization schema in root layout
    - Include name, description, url, logo, and contactPoint
    - Add sameAs array for social media links
    - _Requirements: 4.1_
  
  - [x] 11.5 Write unit tests for metadata configuration
    - Test that metadata exports correct values
    - Test sitemap generation
    - Test robots.txt configuration
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 12. Implement image optimization and accessibility
  - [x] 12.1 Set up Next.js Image component usage
    - Replace any img tags with Next.js Image component
    - Configure image sizes and responsive srcset
    - Add priority flag for above-the-fold images
    - Implement lazy loading for below-the-fold images
    - _Requirements: 8.1, 8.4_
  
  - [x] 12.2 Add alt text to all images
    - Provide descriptive alt text for content images
    - Use empty alt with aria-hidden for decorative images
    - _Requirements: 4.6_
  
  - [x] 12.3 Write property test for image optimization
    - **Property 3: Image Optimization and Accessibility**
    - **Validates: Requirements 4.6, 8.1**
    - Test that all images use Next.js Image and have alt attributes
  
  - [x] 12.4 Write unit tests for image components
    - Test Image component props
    - Test alt text presence
    - Test lazy loading configuration
    - _Requirements: 4.6, 8.1, 8.4_

- [ ] 13. Implement accessibility features
  - [x] 13.1 Add keyboard navigation support
    - Ensure all interactive elements are focusable
    - Implement proper tab order
    - Add keyboard event handlers (Enter/Space for activation)
    - Create "Skip to main content" link
    - _Requirements: 10.1_
  
  - [x] 13.2 Add ARIA labels and attributes
    - Add aria-label to icon-only buttons (hamburger menu)
    - Add aria-required to required form fields
    - Add aria-invalid and aria-describedby for form errors
    - Add aria-live regions for dynamic content (success messages)
    - Add aria-label to navigation
    - _Requirements: 10.3, 10.4_
  
  - [x] 13.3 Implement visible focus indicators
    - Add focus:ring-2 and focus:ring-offset-2 to all interactive elements
    - Ensure focus indicators meet visibility requirements
    - Test focus styles across all components
    - _Requirements: 10.5_
  
  - [x] 13.4 Ensure color contrast compliance
    - Verify all text/background combinations meet WCAG 2.1 AA (4.5:1 ratio)
    - Test with color contrast checker tools
    - _Requirements: 10.2_
  
  - [x] 13.5 Add motion preferences support
    - Implement prefers-reduced-motion media query
    - Disable animations for users who prefer reduced motion
    - Add motion-reduce: Tailwind utilities
    - _Requirements: 10.1_
  
  - [x] 13.6 Write property test for touch target sizes
    - **Property 8: Touch Target Minimum Size**
    - **Validates: Requirements 7.4**
    - Test that all interactive elements meet 44x44px minimum
  
  - [x] 13.7 Write property test for keyboard navigation
    - **Property 9: Keyboard Navigation Support**
    - **Validates: Requirements 10.1**
    - Test that all interactive elements are keyboard accessible
  
  - [x] 13.8 Write property test for color contrast
    - **Property 10: WCAG Color Contrast Compliance**
    - **Validates: Requirements 10.2**
    - Test that all color combinations meet WCAG AA standards
  
  - [x] 13.9 Write property test for icon button ARIA labels
    - **Property 11: Icon Button ARIA Labels**
    - **Validates: Requirements 10.3**
    - Test that icon-only buttons have aria-label attributes
  
  - [x] 13.10 Write property test for focus indicators
    - **Property 12: Focus Indicator Visibility**
    - **Validates: Requirements 10.5**
    - Test that focused elements display visible indicators
  
  - [x] 13.11 Write accessibility unit tests
    - Run axe-core tests on all major components
    - Test screen reader compatibility
    - Test keyboard navigation flows
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Configure fonts and global styles
  - [x] 15.1 Set up Next.js font optimization
    - Import and configure Google Font (Inter or similar)
    - Use next/font for automatic optimization
    - Add font-display: swap for performance
    - Apply font to root layout
    - _Requirements: 8.1_
  
  - [x] 15.2 Create global CSS file
    - Add Tailwind directives (@tailwind base, components, utilities)
    - Add custom CSS for smooth scrolling
    - Add base styles for semantic HTML elements
    - Configure CSS variables for theme colors
    - _Requirements: 1.4, 3.2, 4.4, 4.5_

- [x] 16. Assemble main page
  - [x] 16.1 Create app/page.tsx with all sections
    - Import and render Navbar
    - Create main element with semantic HTML
    - Add HeroSection with id="hero"
    - Add ServicesSection with id="services"
    - Add AboutSection with id="about"
    - Add ContactSection with id="contact"
    - Import and render Footer
    - Make it a server component
    - _Requirements: 1.1, 1.2, 2.1, 3.1, 5.1, 9.1_
  
  - [x] 16.2 Configure root layout
    - Set up HTML lang attribute
    - Add metadata configuration
    - Include JSON-LD structured data script
    - Apply global styles and fonts
    - Set up proper semantic structure (header, main, footer)
    - _Requirements: 4.1, 4.4, 4.5_
  
  - [x] 16.3 Write integration tests for main page
    - Test that all sections render in correct order
    - Test navigation between sections
    - Test page structure and semantic HTML
    - _Requirements: 1.1, 2.1, 3.1, 4.4, 4.5, 5.1, 9.1_

- [x] 17. Implement error handling
  - [x] 17.1 Create error boundary component
    - Create app/error.tsx for React error boundary
    - Display user-friendly error message
    - Add "Try again" button to reset error
    - Log errors to console
    - _Requirements: 5.2_
  
  - [x] 17.2 Add client-side error handling
    - Implement network error handling in ContactForm
    - Display appropriate error messages for different failure types
    - Add image loading error fallbacks
    - _Requirements: 5.2, 5.3_
  
  - [x] 17.3 Write unit tests for error handling
    - Test error boundary rendering
    - Test network error display
    - Test form validation errors
    - _Requirements: 5.2, 5.3_

- [ ] 18. Add loading states
  - [x] 18.1 Implement form submission loading state
    - Show loading spinner or text on submit button during submission
    - Disable form inputs during submission
    - _Requirements: 6.4_
  
  - [x] 18.2 Write property test for loading states
    - **Property 7: Asynchronous Operation Loading States**
    - **Validates: Requirements 6.4**
    - Test that async operations display loading indicators
  
  - [x] 18.3 Write unit tests for loading states
    - Test button loading state
    - Test form disabled state during submission
    - _Requirements: 6.4_

- [x] 19. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Set up testing infrastructure
  - [x] 20.1 Configure Vitest
    - Install Vitest, React Testing Library, and fast-check
    - Create vitest.config.ts with jsdom environment
    - Set up test setup file with testing-library matchers
    - Configure path aliases for tests
    - _Requirements: All testing requirements_
  
  - [x] 20.2 Configure Playwright for E2E tests
    - Install @playwright/test
    - Create playwright.config.ts
    - Set up test browsers and viewports
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [x] 20.3 Create test utilities and arbitraries
    - Create serviceArbitrary for property-based tests
    - Create contactFormDataArbitrary
    - Create invalidEmailArbitrary
    - Add helper functions for common test scenarios
    - _Requirements: All property test requirements_

- [ ] 21. Write E2E tests
  - [ ] 21.1 Write complete contact form submission flow test
    - Test navigation to contact section
    - Test form filling and submission
    - Test success message display
    - _Requirements: 5.1, 5.2_
  
  - [ ] 21.2 Write mobile navigation E2E test
    - Test hamburger menu open/close
    - Test mobile navigation links
    - Test at mobile viewport (375x667)
    - _Requirements: 3.3, 7.1_
  
  - [ ] 21.3 Write responsive layout E2E tests
    - Test service grid at mobile (1 column)
    - Test service grid at tablet (2 columns)
    - Test service grid at desktop (3 columns)
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 21.4 Write smooth scroll navigation E2E test
    - Test clicking each navigation link
    - Verify smooth scroll to corresponding section
    - _Requirements: 3.2_

- [ ] 22. Performance optimization
  - [ ] 22.1 Implement code splitting
    - Use dynamic imports for heavy components if needed
    - Verify automatic route-based code splitting
    - _Requirements: 8.2_
  
  - [ ] 22.2 Optimize bundle size
    - Import only needed Lucide icons (not entire library)
    - Verify tree-shaking is working
    - Run bundle analyzer to identify large dependencies
    - _Requirements: 8.2_
  
  - [ ] 22.3 Configure caching headers
    - Set appropriate Cache-Control headers for API routes
    - Verify static asset caching
    - _Requirements: 8.1_
  
  - [ ] 22.4 Run Lighthouse audit
    - Test performance score (target: >90)
    - Test accessibility score
    - Test SEO score
    - Test best practices score
    - _Requirements: 8.3_

- [ ] 23. Create public assets
  - [ ] 23.1 Add logo and favicon
    - Create or add logo.svg to public/
    - Add favicon.ico
    - Add Open Graph image (og-image.png, 1200x630)
    - _Requirements: 1.3, 4.2_
  
  - [ ] 23.2 Optimize all images
    - Ensure images are in appropriate formats (WebP with fallbacks)
    - Compress images for web
    - _Requirements: 8.1_

- [ ] 24. Final integration and polish
  - [ ] 24.1 Test complete user flows
    - Test landing → services → about → contact flow
    - Test form submission end-to-end
    - Test navigation across all sections
    - _Requirements: All requirements_
  
  - [ ] 24.2 Cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge
    - Test mobile browsers (iOS Safari, Chrome Mobile)
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 24.3 Responsive design verification
    - Test at mobile breakpoint (320px-767px)
    - Test at tablet breakpoint (768px-1023px)
    - Test at desktop breakpoint (1024px+)
    - Verify touch targets on real mobile devices
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 24.4 Accessibility audit
    - Run complete axe-core audit
    - Test with screen reader (NVDA, JAWS, or VoiceOver)
    - Test keyboard-only navigation
    - Verify all WCAG 2.1 AA requirements
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 24.5 SEO verification
    - Verify metadata in browser dev tools
    - Test Open Graph tags with social media debuggers
    - Verify sitemap.xml is accessible
    - Verify robots.txt is accessible
    - Check semantic HTML structure
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [ ] 24.6 Performance final check
    - Run final Lighthouse audit
    - Verify Core Web Vitals (LCP, FID, CLS)
    - Test page load speed on slow 3G
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 25. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- The implementation follows a bottom-up approach: foundation → components → sections → features → integration
- Property-based tests validate universal correctness properties across randomized inputs
- Unit tests validate specific examples, edge cases, and integration points
- E2E tests validate complete user flows and cross-browser compatibility
- Checkpoints ensure incremental validation and provide opportunities to address issues early
- All code should be written in TypeScript for type safety
- Use Next.js 14+ App Router conventions throughout
- Leverage shadcn/ui components for consistent, accessible UI
- Follow responsive-first design with mobile (320px+), tablet (768px+), and desktop (1024px+) breakpoints
