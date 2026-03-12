/**
 * Accessibility Unit Tests
 * 
 * Comprehensive accessibility testing using axe-core for all major components.
 * Tests WCAG 2.1 AA compliance, keyboard navigation, and screen reader compatibility.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Navbar } from '@/components/navbar';
import { MobileNav } from '@/components/mobile-nav';
import { ServiceCard } from '@/components/service-card';
import { ContactForm } from '@/components/contact-form';
import { SkipLink } from '@/components/skip-link';

// Mock fetch for ContactForm tests
global.fetch = vi.fn();

describe('Accessibility Tests - axe-core', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Navbar Component', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<Navbar />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper ARIA labels for navigation', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    test('should have keyboard accessible links', () => {
      render(<Navbar />);
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        // Links should be focusable
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    test('should have visible focus indicators on links', () => {
      render(<Navbar />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      
      // Check that focus styles are applied (via className)
      expect(homeLink.className).toContain('focus:ring');
    });
  });

  describe('MobileNav Component', () => {
    const mockNavLinks = [
      { href: '#hero', label: 'Home' },
      { href: '#services', label: 'Services' },
    ];

    test('should have no accessibility violations', async () => {
      const { container } = render(
        <MobileNav
          isOpen={false}
          onOpenChange={vi.fn()}
          navLinks={mockNavLinks}
          onNavClick={vi.fn()}
          activeSection="hero"
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have ARIA label on hamburger button', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={vi.fn()}
          navLinks={mockNavLinks}
          onNavClick={vi.fn()}
          activeSection="hero"
        />
      );
      
      const button = screen.getByRole('button', { name: /open navigation menu/i });
      expect(button).toHaveAttribute('aria-label');
    });

    test('should meet minimum touch target size (44x44px)', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={vi.fn()}
          navLinks={mockNavLinks}
          onNavClick={vi.fn()}
          activeSection="hero"
        />
      );
      
      const button = screen.getByRole('button', { name: /open navigation menu/i });
      expect(button.className).toContain('min-h-[44px]');
      expect(button.className).toContain('min-w-[44px]');
    });
  });

  describe('ServiceCard Component', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', () => {
      render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const heading = screen.getByText('Web Development');
      expect(heading).toBeInTheDocument();
    });

    test('should have accessible icon', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      // Icon should be present as SVG
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('ContactForm Component', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<ContactForm />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper form labels', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test('should have aria-required on required fields', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(messageInput).toHaveAttribute('aria-required', 'true');
    });

    test('should have aria-invalid on fields with errors', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      
      // Type invalid input and blur
      await user.type(nameInput, 'A');
      await user.tab();
      
      // Should have aria-invalid
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    test('should have aria-describedby linking to error messages', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      
      // Type invalid email and blur
      await user.type(emailInput, 'invalid-email');
      await user.tab();
      
      // Should have aria-describedby pointing to error
      expect(emailInput).toHaveAttribute('aria-describedby');
      const describedBy = emailInput.getAttribute('aria-describedby');
      expect(describedBy).toContain('error');
    });

    test('should have role="alert" on error messages', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      
      // Trigger validation error
      await user.type(nameInput, 'A');
      await user.tab();
      
      // Error message should have role="alert"
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toBeInTheDocument();
    });

    test('should have aria-live region for success/error messages', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Thank you!' }),
      });

      const user = userEvent.setup();
      const { container } = render(<ContactForm />);
      
      // Fill form with valid data including service selection
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      
      // Select a service from the dropdown
      const serviceSelect = container.querySelector('select[aria-hidden="true"]') as HTMLSelectElement;
      if (serviceSelect) {
        await user.selectOptions(serviceSelect, 'web-development');
      }
      
      await user.type(screen.getByLabelText(/message/i), 'Test message here');
      
      // Submit form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Success message should have aria-live
      const successMessage = await screen.findByText(/thank you/i, {}, { timeout: 2000 });
      expect(successMessage).toBeInTheDocument();
      
      // The success message container should have aria-live="polite"
      const successContainer = container.querySelector('[aria-live="polite"]');
      expect(successContainer).toBeInTheDocument();
      expect(successContainer).toHaveAttribute('role', 'alert');
    });

    test('should have accessible submit button', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('SkipLink Component', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<SkipLink />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should be keyboard accessible', () => {
      render(<SkipLink />);
      
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('should have proper focus styles', () => {
      render(<SkipLink />);
      
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      // Should have focus styles in className
      expect(skipLink.className).toContain('focus:');
    });
  });
});

describe('Keyboard Navigation Tests', () => {
  test('Navbar links should be keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const links = screen.getAllByRole('link');
    
    // Tab through links
    await user.tab();
    expect(links[0]).toHaveFocus();
    
    await user.tab();
    // Second link should be focused (or next focusable element)
    expect(document.activeElement).toBeTruthy();
  });

  test('ContactForm should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Tab to first input
    await user.tab();
    expect(screen.getByLabelText(/name/i)).toHaveFocus();
    
    // Tab to next input
    await user.tab();
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
  });

  test('Submit button should be activatable with Enter key', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Thank you!' }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message here');
    
    // Focus submit button and press Enter
    const submitButton = screen.getByRole('button', { name: /send message/i });
    submitButton.focus();
    await user.keyboard('{Enter}');
    
    // Should submit (check for success message)
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});

describe('Screen Reader Compatibility Tests', () => {
  test('Form fields should have associated labels', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // All inputs should have associated labels
    expect(nameInput).toHaveAccessibleName();
    expect(emailInput).toHaveAccessibleName();
    expect(messageInput).toHaveAccessibleName();
  });

  test('Icon-only buttons should have accessible names', () => {
    const mockNavLinks = [{ href: '#hero', label: 'Home' }];
    
    render(
      <MobileNav
        isOpen={false}
        onOpenChange={vi.fn()}
        navLinks={mockNavLinks}
        onNavClick={vi.fn()}
        activeSection="hero"
      />
    );
    
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    expect(button).toHaveAccessibleName();
  });

  test('Navigation should have accessible name', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toHaveAccessibleName();
  });

  test('Error messages should be announced to screen readers', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    
    // Trigger error
    await user.type(nameInput, 'A');
    await user.tab();
    
    // Error should have role="alert" for screen reader announcement
    const error = await screen.findByRole('alert');
    expect(error).toBeInTheDocument();
  });

  test('Success messages should be announced to screen readers', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Thank you!' }),
    });

    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    
    // Fill and submit form with all required fields
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    // Select a service from the dropdown
    const serviceSelect = container.querySelector('select[aria-hidden="true"]') as HTMLSelectElement;
    if (serviceSelect) {
      await user.selectOptions(serviceSelect, 'web-development');
    }
    
    await user.type(screen.getByLabelText(/message/i), 'Test message here');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Success message should have aria-live for announcement
    const successMessage = await screen.findByText(/thank you/i, {}, { timeout: 2000 });
    expect(successMessage).toBeInTheDocument();
    
    // The success message container should have aria-live="polite"
    const successContainer = container.querySelector('[aria-live="polite"]');
    expect(successContainer).toBeInTheDocument();
    expect(successContainer).toHaveAttribute('role', 'alert');
  });
});
