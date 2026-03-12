import fc from 'fast-check';
import type { Service } from '@/lib/constants';

/**
 * Arbitrary for generating valid icon names
 * Uses a fixed set of icon names from the actual service offerings
 */
export const iconNameArbitrary: fc.Arbitrary<string> = fc.constantFrom(
  'Code2',
  'Smartphone',
  'Palette',
  'Image',
  'Video',
  'TrendingUp'
);

/**
 * Arbitrary for generating valid Service objects
 * Generates services with realistic data that matches the Service interface
 */
export const serviceArbitrary: fc.Arbitrary<Service> = fc.record({
  id: fc.stringMatching(/^[a-z]+(-[a-z]+)*$/), // kebab-case IDs
  title: fc.string({ minLength: 3, maxLength: 50 }),
  description: fc.string({ minLength: 10, maxLength: 200 }),
  iconName: iconNameArbitrary,
  keywords: fc.array(fc.string({ minLength: 2, maxLength: 20 }), { minLength: 1, maxLength: 5 })
});

/**
 * Arbitrary for generating valid section IDs
 * Uses actual section IDs from the website
 */
export const validSectionIdArbitrary: fc.Arbitrary<string> = fc.constantFrom(
  'hero',
  'services',
  'about',
  'contact'
);

/**
 * Arbitrary for generating valid email addresses
 * Generates emails that pass standard email validation
 */
export const validEmailArbitrary: fc.Arbitrary<string> = fc
  .tuple(
    fc.stringMatching(/^[a-z0-9]+([._-][a-z0-9]+)*$/), // local part
    fc.stringMatching(/^[a-z0-9]+([.-][a-z0-9]+)*$/),  // domain
    fc.constantFrom('com', 'org', 'net', 'io', 'dev')  // TLD
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

/**
 * Arbitrary for generating valid service IDs
 * Uses actual service IDs from the SERVICES constant
 */
export const validServiceIdArbitrary: fc.Arbitrary<string> = fc.constantFrom(
  'web-development',
  'android-development',
  'ui-ux-design',
  'graphic-design',
  'video-editing',
  'seo'
);

/**
 * Arbitrary for generating valid contact form data
 * Generates form data that passes all validation rules:
 * - name: ≥2 characters, ≤100 characters (non-whitespace)
 * - email: valid email format
 * - service: one of the valid service IDs
 * - message: ≥10 characters, ≤1000 characters (non-whitespace)
 * 
 * Note: Strings are filtered to exclude special characters that userEvent.type()
 * interprets as keyboard commands: [ ] { } /
 */
export const validContactFormDataArbitrary = fc.record({
  name: fc.string({ minLength: 2, maxLength: 100 })
    .filter(s => s.trim().length >= 2)
    .filter(s => !/[\[\]{}\/]/.test(s)), // Exclude userEvent special chars
  email: validEmailArbitrary,
  service: validServiceIdArbitrary,
  message: fc.string({ minLength: 10, maxLength: 1000 })
    .filter(s => s.trim().length >= 10)
    .filter(s => !/[\[\]{}\/]/.test(s)) // Exclude userEvent special chars
});

/**
 * Arbitrary for generating invalid email addresses
 * Generates emails that fail standard email validation
 */
export const invalidEmailArbitrary: fc.Arbitrary<string> = fc.oneof(
  fc.string().filter(s => !s.includes('@')), // Missing @
  fc.string().filter(s => s.includes('@') && !s.includes('.')), // Missing domain extension
  fc.constant(''), // Empty string
  fc.constant('invalid'), // No @ or domain
  fc.constant('@example.com'), // Missing local part
  fc.constant('user@'), // Missing domain
  fc.constant('user @example.com'), // Space in email
);

/**
 * Arbitrary for generating invalid contact form data
 * Generates form data that fails at least one validation rule:
 * - name: <2 characters, >100 characters, or empty
 * - email: invalid email format
 * - service: empty string or invalid service ID
 * - message: <10 characters, >1000 characters, or empty
 * 
 * Returns a tuple of [invalidData, expectedErrorField] where expectedErrorField
 * indicates which field should have an error
 */
export const invalidContactFormDataArbitrary = fc.oneof(
  // Invalid name: too short
  fc.record({
    name: fc.oneof(fc.constant(''), fc.constant('a')),
    email: validEmailArbitrary,
    service: validServiceIdArbitrary,
    message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10)
  }).map(data => ({ data, errorField: 'name' as const })),
  
  // Invalid name: too long
  fc.record({
    name: fc.string({ minLength: 101, maxLength: 150 }),
    email: validEmailArbitrary,
    service: validServiceIdArbitrary,
    message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10)
  }).map(data => ({ data, errorField: 'name' as const })),
  
  // Invalid email
  fc.record({
    name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
    email: invalidEmailArbitrary,
    service: validServiceIdArbitrary,
    message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10)
  }).map(data => ({ data, errorField: 'email' as const })),
  
  // Invalid service: empty
  fc.record({
    name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
    email: validEmailArbitrary,
    service: fc.constant(''),
    message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10)
  }).map(data => ({ data, errorField: 'service' as const })),
  
  // Invalid message: too short
  fc.record({
    name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
    email: validEmailArbitrary,
    service: validServiceIdArbitrary,
    message: fc.oneof(fc.constant(''), fc.string({ minLength: 1, maxLength: 9 }))
  }).map(data => ({ data, errorField: 'message' as const })),
  
  // Invalid message: too long
  fc.record({
    name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
    email: validEmailArbitrary,
    service: validServiceIdArbitrary,
    message: fc.string({ minLength: 1001, maxLength: 1100 })
  }).map(data => ({ data, errorField: 'message' as const }))
);

/**
 * Arbitrary for generating button text content
 * Generates realistic button text for testing
 */
export const buttonTextArbitrary: fc.Arbitrary<string> = fc.oneof(
  fc.constantFrom(
    'Submit',
    'Cancel',
    'Save',
    'Delete',
    'Edit',
    'View',
    'Close',
    'Open',
    'Next',
    'Previous',
    'Continue',
    'Back',
    'Confirm',
    'Learn More',
    'Get Started',
    'Sign Up',
    'Log In',
    'Contact Us'
  ),
  fc.string({ minLength: 1, maxLength: 50 })
);

/**
 * Arbitrary for generating keyboard-safe text
 * Generates text that doesn't contain special characters interpreted by userEvent.keyboard
 */
export const keyboardSafeTextArbitrary: fc.Arbitrary<string> = fc
  .stringMatching(/^[a-zA-Z0-9 .,!?'-]+$/)
  .filter(s => s.length > 0);

/**
 * Arbitrary for generating color values (hex format)
 * Generates valid hex color codes for testing
 */
export const hexColorArbitrary: fc.Arbitrary<string> = fc
  .tuple(
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 })
  )
  .map(([r, g, b]) => `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);

/**
 * Arbitrary for generating viewport sizes
 * Generates realistic viewport dimensions for responsive testing
 */
export const viewportSizeArbitrary = fc.record({
  width: fc.oneof(
    fc.constantFrom(320, 375, 414, 768, 1024, 1280, 1920), // Common breakpoints
    fc.integer({ min: 320, max: 2560 })
  ),
  height: fc.oneof(
    fc.constantFrom(568, 667, 896, 1024, 768, 1080, 1440),
    fc.integer({ min: 568, max: 1440 })
  )
});

/**
 * Arbitrary for generating image alt text
 * Generates descriptive alt text for images
 */
export const imageAltTextArbitrary: fc.Arbitrary<string> = fc.oneof(
  fc.constant(''), // Decorative images can have empty alt
  fc.string({ minLength: 5, maxLength: 150 }).filter(s => s.trim().length >= 5)
);

/**
 * Arbitrary for generating URL paths
 * Generates valid URL paths for testing
 */
export const urlPathArbitrary: fc.Arbitrary<string> = fc
  .array(fc.stringMatching(/^[a-z0-9-]+$/), { minLength: 1, maxLength: 3 })
  .map(parts => '/' + parts.join('/'));

/**
 * Arbitrary for generating ARIA role values
 * Generates valid ARIA role attributes
 */
export const ariaRoleArbitrary: fc.Arbitrary<string> = fc.constantFrom(
  'button',
  'link',
  'navigation',
  'main',
  'complementary',
  'contentinfo',
  'banner',
  'search',
  'form',
  'region',
  'article',
  'section',
  'alert',
  'dialog',
  'menu',
  'menuitem',
  'tab',
  'tabpanel',
  'listbox',
  'option'
);
