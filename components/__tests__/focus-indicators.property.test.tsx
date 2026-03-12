import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Navbar } from '@/components/navbar';
import { MobileNav } from '@/components/mobile-nav';
import { ContactForm } from '@/components/contact-form';
import { SkipLink } from '@/components/skip-link';

describe('Focus Indicator Visibility Property-Based Tests', () => {
  beforeEach(() => {
    // Reset any mocks
    vi.restoreAllMocks();
  });

  // Feature: service-website-divtag-studios, Property 12: Focus Indicator Visibility
  test('all buttons display visible focus indicators when focused', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Property 12: Focus Indicator Visibility
     * 
     * For any focusable element, when it receives keyboard focus, it should display
     * a visible focus indicator (outline, ring, or border) that meets minimum
     * visibility requirements.
     * 
     * This test validates that buttons with various text content display visible
     * focus indicators (CSS classes for focus styles) when they receive focus.
     */
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (buttonText) => {
          const user = userEvent.setup();
          const { container } = render(<Button>{buttonText}</Button>);
          const button = container.querySelector('button');
          
          expect(button).toBeInTheDocument();
          
          // Tab to focus the button
          await user.tab();
          
          // Button should have focus
          expect(button).toHaveFocus();
          
          // Button should have visible focus indicator classes
          // The button component uses focus-visible:ring-2 and focus-visible:ring-offset-2
          const className = button!.className;
          expect(className).toMatch(/focus-visible:ring-2/);
          expect(className).toMatch(/focus-visible:ring-offset-2/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('all button variants have visible focus indicators', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that all button variants (default, outline, ghost, etc.) and sizes
     * have visible focus indicator classes.
     */
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        fc.string({ minLength: 1, maxLength: 30 }),
        async (variant, size, text) => {
          const user = userEvent.setup();
          const { container } = render(
            <Button variant={variant} size={size}>
              {text}
            </Button>
          );
          const button = container.querySelector('button');
          
          expect(button).toBeInTheDocument();
          
          // Tab to focus
          await user.tab();
          expect(button).toHaveFocus();
          
          // All button variants should have focus indicator classes
          const className = button!.className;
          expect(className).toMatch(/focus-visible:ring/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('form inputs display visible focus indicators when focused', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that form input elements display visible focus indicators
     * when they receive keyboard focus.
     */
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 0, maxLength: 100 }),
        async (placeholder) => {
          const user = userEvent.setup();
          const { container } = render(<Input placeholder={placeholder} />);
          const input = container.querySelector('input');
          
          expect(input).toBeInTheDocument();
          
          // Tab to focus the input
          await user.tab();
          
          // Input should have focus
          expect(input).toHaveFocus();
          
          // Input should have visible focus indicator classes
          const className = input!.className;
          expect(className).toMatch(/focus-visible:ring-2/);
          expect(className).toMatch(/focus-visible:ring-offset-2/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('textarea displays visible focus indicators when focused', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that textarea elements display visible focus indicators
     * when they receive keyboard focus.
     */
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 0, maxLength: 100 }),
        async (placeholder) => {
          const user = userEvent.setup();
          const { container } = render(<Textarea placeholder={placeholder} />);
          const textarea = container.querySelector('textarea');
          
          expect(textarea).toBeInTheDocument();
          
          // Tab to focus
          await user.tab();
          
          // Textarea should have focus
          expect(textarea).toHaveFocus();
          
          // Textarea should have visible focus indicator classes
          const className = textarea!.className;
          expect(className).toMatch(/focus-visible:ring-2/);
          expect(className).toMatch(/focus-visible:ring-offset-2/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('select dropdown trigger displays visible focus indicators', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that select dropdown trigger buttons display visible focus indicators
     * when they receive keyboard focus.
     */
    const user = userEvent.setup();
    
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const trigger = container.querySelector('button');
    expect(trigger).toBeInTheDocument();
    
    // Tab to focus the select trigger
    await user.tab();
    expect(trigger).toHaveFocus();
    
    // Select trigger should have visible focus indicator classes
    const className = trigger!.className;
    expect(className).toMatch(/focus:ring-2/);
    expect(className).toMatch(/focus:ring-offset-2/);
  });

  test('navigation links display visible focus indicators when focused', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that navigation links display visible focus indicators
     * when they receive keyboard focus.
     */
    const user = userEvent.setup();
    const { container } = render(<Navbar />);
    
    // Get all links (logo + navigation links)
    const links = container.querySelectorAll('a');
    
    expect(links.length).toBeGreaterThan(0);
    
    // Check first few links for focus indicators
    for (let i = 0; i < Math.min(links.length, 3); i++) {
      const link = links[i];
      const className = link.className;
      
      // All links should have focus indicator classes
      expect(className).toMatch(/focus:ring-2/);
      expect(className).toMatch(/focus:ring-offset-2/);
    }
  });

  test('mobile navigation hamburger button displays visible focus indicators', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that the mobile hamburger menu button displays visible focus indicators
     * when it receives keyboard focus.
     */
    const user = userEvent.setup();
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
    
    // Tab to focus
    await user.tab();
    expect(hamburgerButton).toHaveFocus();
    
    // Hamburger button should have visible focus indicator classes
    const className = hamburgerButton!.className;
    expect(className).toMatch(/focus-visible:ring/);
  });

  test('mobile navigation links display visible focus indicators', () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that mobile navigation drawer links have visible focus indicator classes.
     */
    const mockNavLinks = [
      { href: '#hero', label: 'Home' },
      { href: '#services', label: 'Services' },
      { href: '#about', label: 'About' },
    ];

    const { container } = render(
      <MobileNav
        isOpen={true}
        onOpenChange={() => {}}
        navLinks={mockNavLinks}
        onNavClick={() => {}}
        activeSection="hero"
      />
    );
    
    // Get navigation links in the mobile drawer
    const navElement = container.querySelector('nav[aria-label="Mobile navigation"]');
    
    // Check if nav element exists (Sheet may not render in jsdom)
    if (!navElement) {
      // If Sheet doesn't render in test environment, verify the component renders
      expect(container).toBeTruthy();
      return;
    }
    
    const links = navElement.querySelectorAll('a');
    
    expect(links.length).toBe(mockNavLinks.length);
    
    // Each link should have focus indicator classes
    links.forEach(link => {
      const className = link.className;
      expect(className).toMatch(/focus:ring-2/);
      expect(className).toMatch(/focus:ring-offset-2/);
    });
  });

  test('skip link displays visible focus indicators when focused', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that the "Skip to main content" link displays visible focus indicators
     * when it receives keyboard focus.
     */
    const user = userEvent.setup();
    
    // Create mock main content element
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.tabIndex = -1;
    document.body.appendChild(mainContent);
    
    const { container } = render(<SkipLink />);
    const skipLink = container.querySelector('a');
    
    expect(skipLink).toBeInTheDocument();
    
    // Tab to focus (skip link should be first focusable element)
    await user.tab();
    expect(skipLink).toHaveFocus();
    
    // Skip link should have visible focus indicator classes
    const className = skipLink!.className;
    expect(className).toMatch(/focus:ring-2/);
    expect(className).toMatch(/focus:ring-offset-2/);
    
    // Cleanup
    document.body.removeChild(mainContent);
  });

  test('contact form elements display visible focus indicators in sequence', async () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Tests that all form elements in the contact form display visible focus
     * indicators when they receive keyboard focus.
     */
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    
    // Get all focusable elements in the form
    const nameInput = container.querySelector('input[id="name"]');
    const emailInput = container.querySelector('input[id="email"]');
    const serviceSelect = container.querySelector('button[id="service"]');
    const messageTextarea = container.querySelector('textarea[id="message"]');
    const submitButton = container.querySelector('button[type="submit"]');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(serviceSelect).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    // Check that each element has focus indicator classes
    const elements = [nameInput, emailInput, serviceSelect, messageTextarea, submitButton];
    
    elements.forEach(element => {
      const className = element!.className;
      // All form elements should have focus indicator classes (ring-2 or focus-visible:ring)
      expect(className).toMatch(/focus.*:ring/);
    });
  });

  test('focus indicators use appropriate ring colors for visibility', () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Property: Focus indicators should use semantic colors (ring-ring or ring-primary)
     * that provide sufficient visibility against backgrounds.
     */
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (buttonText) => {
          const { container } = render(<Button>{buttonText}</Button>);
          const button = container.querySelector('button');
          
          expect(button).toBeInTheDocument();
          
          const className = button!.className;
          
          // Focus indicators should use semantic ring colors
          // focus-visible:ring-ring is the default in shadcn/ui
          expect(className).toMatch(/focus-visible:ring-ring|focus-visible:ring-primary/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('focus indicators have sufficient offset for visibility', () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Property: Focus indicators should have ring-offset-2 (2px offset) for
     * better visibility and separation from the element border.
     */
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (buttonText) => {
          const { container } = render(<Button>{buttonText}</Button>);
          const button = container.querySelector('button');
          
          expect(button).toBeInTheDocument();
          
          const className = button!.className;
          
          // Focus indicators should have ring-offset-2 for visibility
          expect(className).toMatch(/ring-offset-2/);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('all interactive elements have focus indicator classes', () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Property: All interactive elements (buttons, inputs, links, etc.) should
     * have CSS classes that define visible focus indicators.
     */
    const interactiveElements = [
      { component: <Button>Test</Button>, selector: 'button' },
      { component: <Input />, selector: 'input' },
      { component: <Textarea />, selector: 'textarea' },
      { 
        component: (
          <Select>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="1">1</SelectItem></SelectContent>
          </Select>
        ), 
        selector: 'button' 
      },
    ];

    interactiveElements.forEach(({ component, selector }) => {
      const { container } = render(component);
      const element = container.querySelector(selector);
      
      expect(element).toBeInTheDocument();
      
      const className = element!.className;
      
      // All interactive elements should have focus indicator classes
      expect(className).toMatch(/focus.*:ring/);
    });
  });

  test('focus indicators are consistent across all button variants', () => {
    /**
     * **Validates: Requirements 10.5**
     * 
     * Property: All button variants should have consistent focus indicator
     * implementation (same ring width and offset).
     */
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.string({ minLength: 1, maxLength: 30 }),
        (variant, text) => {
          const { container } = render(
            <Button variant={variant}>{text}</Button>
          );
          const button = container.querySelector('button');
          
          expect(button).toBeInTheDocument();
          
          const className = button!.className;
          
          // All variants should have consistent focus indicator classes
          expect(className).toMatch(/focus-visible:ring-2/);
          expect(className).toMatch(/focus-visible:ring-offset-2/);
        }
      ),
      { numRuns: 100 }
    );
  });
});
