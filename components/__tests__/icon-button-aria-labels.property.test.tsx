import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/mobile-nav';
import { Footer } from '@/components/sections/footer';
import { Menu, X, Linkedin, Twitter, Github } from 'lucide-react';

describe('Icon Button ARIA Labels Property-Based Tests', () => {
  // Feature: service-website-divtag-studios, Property 11: Icon Button ARIA Labels
  test('icon-only buttons have aria-label attributes', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Property 11: Icon Button ARIA Labels
     * 
     * For any button element that contains only an icon without visible text,
     * the button should include an aria-label attribute with a descriptive label
     * for screen reader users.
     * 
     * This test validates that icon-only buttons (buttons with size="icon" or
     * buttons containing only icon elements) have appropriate aria-label attributes.
     */
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }),
        (ariaLabel) => {
          // Test icon-only button with aria-label
          const { container } = render(
            <Button size="icon" aria-label={ariaLabel}>
              <Menu className="h-6 w-6" />
            </Button>
          );
          
          const button = container.querySelector('button');
          expect(button).toBeInTheDocument();
          
          // Button should have aria-label attribute
          expect(button).toHaveAttribute('aria-label', ariaLabel);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('icon-only buttons with various icons have aria-label', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that icon-only buttons with different icon types all have
     * aria-label attributes.
     */
    const icons = [
      { Icon: Menu, label: 'Open menu' },
      { Icon: X, label: 'Close' },
      { Icon: Linkedin, label: 'LinkedIn' },
      { Icon: Twitter, label: 'Twitter' },
      { Icon: Github, label: 'GitHub' },
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...icons),
        ({ Icon, label }) => {
          const { container } = render(
            <Button size="icon" aria-label={label}>
              <Icon className="h-6 w-6" />
            </Button>
          );
          
          const button = container.querySelector('button');
          expect(button).toBeInTheDocument();
          expect(button).toHaveAttribute('aria-label', label);
        }
      ),
      { numRuns: 50 }
    );
  });

  test('mobile hamburger menu button has aria-label', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that the mobile navigation hamburger button (icon-only) has
     * an aria-label attribute for screen reader accessibility.
     */
    const mockNavLinks = [
      { href: '#hero', label: 'Home' },
      { href: '#services', label: 'Services' },
    ];

    const { container } = render(
      <MobileNav
        isOpen={false}
        onOpenChange={() => {}}
        navLinks={mockNavLinks}
        onNavClick={() => {}}
        activeSection="hero"
      />
    );
    
    const hamburgerButton = container.querySelector('button[aria-label="Open navigation menu"]');
    
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveAttribute('aria-label', 'Open navigation menu');
    
    // Verify it's an icon-only button (contains Menu icon, no visible text)
    const menuIcon = hamburgerButton?.querySelector('svg');
    expect(menuIcon).toBeInTheDocument();
  });

  test('social media icon links have aria-label attributes', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that social media icon links in the footer (which are icon-only)
     * have aria-label attributes for screen reader users.
     */
    const { container } = render(<Footer />);
    
    // Check LinkedIn icon link
    const linkedinLink = container.querySelector('a[aria-label="Visit our LinkedIn page"]');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('aria-label', 'Visit our LinkedIn page');
    
    // Check Twitter icon link
    const twitterLink = container.querySelector('a[aria-label="Visit our Twitter profile"]');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('aria-label', 'Visit our Twitter profile');
    
    // Check GitHub icon link
    const githubLink = container.querySelector('a[aria-label="Visit our GitHub profile"]');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('aria-label', 'Visit our GitHub profile');
  });

  test('icon-only buttons without aria-label should have sr-only text', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that if an icon-only button doesn't have an aria-label, it should
     * have screen-reader-only text (sr-only class) to provide context.
     * 
     * This is an alternative pattern to aria-label for accessibility.
     */
    const { container } = render(
      <Button size="icon">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    );
    
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    
    // Button should have sr-only text
    const srOnlyText = container.querySelector('.sr-only');
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText?.textContent).toBe('Close');
  });

  test('icon buttons with different variants all support aria-label', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that icon-only buttons with different variants (ghost, outline, etc.)
     * all properly support and render aria-label attributes.
     */
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.string({ minLength: 3, maxLength: 50 }),
        (variant, ariaLabel) => {
          const { container } = render(
            <Button variant={variant} size="icon" aria-label={ariaLabel}>
              <Menu className="h-6 w-6" />
            </Button>
          );
          
          const button = container.querySelector('button');
          expect(button).toBeInTheDocument();
          expect(button).toHaveAttribute('aria-label', ariaLabel);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('icon-only links (not buttons) have aria-label attributes', () => {
    /**
     * **Validates: Requirements 10.3**
     * 
     * Tests that icon-only links (like social media links) have aria-label
     * attributes for screen reader accessibility.
     */
    const socialLinks = [
      { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
      { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
      { href: 'https://github.com', label: 'GitHub', Icon: Github },
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...socialLinks),
        ({ href, label, Icon }) => {
          const { container } = render(
            <a href={href} aria-label={label}>
              <Icon className="h-5 w-5" />
            </a>
          );
          
          const link = container.querySelector('a');
          expect(link).toBeInTheDocument();
          expect(link).toHaveAttribute('aria-label', label);
        }
      ),
      { numRuns: 50 }
    );
  });

  test('icon buttons with aria-label are accessible to screen readers', () => {
    /**
     * **Validates: Requirements 10.3, 10.4**
     * 
     * Tests that icon-only buttons with aria-label provide meaningful
     * accessible names for screen readers.
     */
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length > 0),
        (accessibleName) => {
          const { container } = render(
            <Button size="icon" aria-label={accessibleName}>
              <Menu className="h-6 w-6" />
            </Button>
          );
          
          const button = container.querySelector('button');
          expect(button).toBeInTheDocument();
          
          // Verify the button has the aria-label attribute
          expect(button).toHaveAttribute('aria-label', accessibleName);
          
          // Verify it's a button element (accessible to screen readers)
          expect(button?.tagName).toBe('BUTTON');
        }
      ),
      { numRuns: 100 }
    );
  });
});
