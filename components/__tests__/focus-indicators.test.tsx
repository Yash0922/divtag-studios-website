import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/navbar';
import { MobileNav } from '@/components/mobile-nav';
import { Footer } from '@/components/sections/footer';
import { ContactSection } from '@/components/sections/contact-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SkipLink } from '@/components/skip-link';

/**
 * Focus Indicator Tests
 * Validates Requirement 10.5: Visible focus indicators for keyboard navigation
 * 
 * These tests verify that all interactive elements have proper focus indicators
 * with focus:ring-2 and focus:ring-offset-2 classes (or equivalent focus styles)
 */
describe('Focus Indicators - Requirement 10.5', () => {
  describe('Button Component', () => {
    it('has visible focus indicator classes', () => {
      const { container } = render(<Button>Test Button</Button>);
      const button = container.querySelector('button');
      
      expect(button).toBeTruthy();
      // Button uses focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      const classes = button?.className || '';
      expect(classes).toMatch(/focus-visible:ring-2/);
      expect(classes).toMatch(/focus-visible:ring-offset-2/);
    });
  });

  describe('Input Component', () => {
    it('has visible focus indicator classes', () => {
      const { container } = render(<Input placeholder="Test" />);
      const input = container.querySelector('input');
      
      expect(input).toBeTruthy();
      const classes = input?.className || '';
      expect(classes).toMatch(/focus-visible:ring-2/);
      expect(classes).toMatch(/focus-visible:ring-offset-2/);
    });
  });

  describe('Textarea Component', () => {
    it('has visible focus indicator classes', () => {
      const { container } = render(<Textarea placeholder="Test" />);
      const textarea = container.querySelector('textarea');
      
      expect(textarea).toBeTruthy();
      const classes = textarea?.className || '';
      expect(classes).toMatch(/focus-visible:ring-2/);
      expect(classes).toMatch(/focus-visible:ring-offset-2/);
    });
  });

  describe('Navbar Links', () => {
    it('navigation links have focus indicators', () => {
      const { container } = render(<Navbar />);
      const links = container.querySelectorAll('a');
      
      // Check logo link and navigation links
      links.forEach((link) => {
        const classes = link.className;
        expect(classes).toMatch(/focus:ring-2/);
        expect(classes).toMatch(/focus:ring-offset-2/);
      });
    });
  });

  describe('Mobile Navigation', () => {
    it('hamburger button has focus indicators', () => {
      const mockNavLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
      ];
      
      const { container } = render(
        <MobileNav
          isOpen={false}
          onOpenChange={() => {}}
          navLinks={mockNavLinks}
          onNavClick={() => {}}
          activeSection="home"
        />
      );
      
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      
      // Button component already has focus indicators
      const classes = button?.className || '';
      expect(classes).toMatch(/focus-visible:ring-2/);
    });
  });

  describe('Footer Links', () => {
    it('email link has focus indicators', () => {
      const { container } = render(<Footer />);
      const emailLink = container.querySelector('a[href^="mailto:"]');
      
      expect(emailLink).toBeTruthy();
      const classes = emailLink?.className || '';
      expect(classes).toMatch(/focus:ring-2/);
      expect(classes).toMatch(/focus:ring-offset-2/);
    });

    it('social media links have focus indicators', () => {
      const { container } = render(<Footer />);
      const socialLinks = container.querySelectorAll('a[target="_blank"]');
      
      expect(socialLinks.length).toBeGreaterThan(0);
      socialLinks.forEach((link) => {
        const classes = link.className;
        expect(classes).toMatch(/focus:ring-2/);
        expect(classes).toMatch(/focus:ring-offset-2/);
      });
    });
  });

  describe('Contact Section Links', () => {
    it('email and phone links have focus indicators', () => {
      const { container } = render(<ContactSection />);
      
      // Find email link
      const emailLink = container.querySelector('a[href^="mailto:"]');
      expect(emailLink).toBeTruthy();
      const emailClasses = emailLink?.className || '';
      expect(emailClasses).toMatch(/focus:ring-2/);
      expect(emailClasses).toMatch(/focus:ring-offset-2/);
      
      // Find phone link
      const phoneLink = container.querySelector('a[href^="tel:"]');
      expect(phoneLink).toBeTruthy();
      const phoneClasses = phoneLink?.className || '';
      expect(phoneClasses).toMatch(/focus:ring-2/);
      expect(phoneClasses).toMatch(/focus:ring-offset-2/);
    });
  });

  describe('Skip Link', () => {
    it('has visible focus indicator when focused', () => {
      const { container } = render(<SkipLink />);
      const skipLink = container.querySelector('a');
      
      expect(skipLink).toBeTruthy();
      const classes = skipLink?.className || '';
      expect(classes).toMatch(/focus:ring-2/);
      expect(classes).toMatch(/focus:ring-offset-2/);
    });
  });

  describe('Focus Indicator Visibility', () => {
    it('focus indicators use appropriate ring colors', () => {
      // Test that focus indicators use semantic colors
      const { container: buttonContainer } = render(<Button>Test</Button>);
      const button = buttonContainer.querySelector('button');
      const buttonClasses = button?.className || '';
      
      // Should use ring-ring or ring-primary for visibility
      expect(buttonClasses).toMatch(/focus-visible:ring-ring|focus-visible:ring-primary/);
    });

    it('focus indicators have sufficient offset for visibility', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      const classes = input?.className || '';
      
      // ring-offset-2 provides 2px offset for better visibility
      expect(classes).toMatch(/ring-offset-2/);
    });
  });
});
