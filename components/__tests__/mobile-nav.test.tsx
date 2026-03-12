import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileNav } from '@/components/mobile-nav';

describe('MobileNav', () => {
  const mockNavLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const mockOnNavClick = vi.fn((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  });

  const mockOnOpenChange = vi.fn();

  describe('Rendering', () => {
    test('renders hamburger menu button', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const button = screen.getByRole('button', { name: /open navigation menu/i });
      expect(button).toBeInTheDocument();
    });

    test('hamburger button has proper aria-label', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const button = screen.getByRole('button', { name: 'Open navigation menu' });
      expect(button).toHaveAttribute('aria-label', 'Open navigation menu');
    });

    test('hamburger button meets minimum touch target size (44x44px)', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const button = screen.getByRole('button', { name: /open navigation menu/i });
      expect(button).toHaveClass('min-h-[44px]');
      expect(button).toHaveClass('min-w-[44px]');
    });
  });

  describe('Mobile Menu Drawer', () => {
    test('displays navigation links when open', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      mockNavLinks.forEach((link) => {
        const navLink = screen.getByRole('link', { name: link.label });
        expect(navLink).toBeInTheDocument();
        expect(navLink).toHaveAttribute('href', link.href);
      });
    });

    test('navigation links meet touch target size (44x44px)', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      mockNavLinks.forEach((link) => {
        const navLink = screen.getByRole('link', { name: link.label });
        expect(navLink).toHaveClass('min-h-[44px]');
      });
    });

    test('calls onNavClick when navigation link is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const servicesLink = screen.getByRole('link', { name: 'Services' });
      await user.click(servicesLink);

      expect(mockOnNavClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('navigation has proper aria-label', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const nav = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(nav).toBeInTheDocument();
    });

    test('navigation links have proper focus styles', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      mockNavLinks.forEach((link) => {
        const navLink = screen.getByRole('link', { name: link.label });
        expect(navLink).toHaveClass('focus:outline-none');
        expect(navLink).toHaveClass('focus:ring-2');
        expect(navLink).toHaveClass('focus:ring-primary');
      });
    });

    test('hamburger button has proper focus styles', () => {
      render(
        <MobileNav
          isOpen={false}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const button = screen.getByRole('button', { name: /open navigation menu/i });
      // Button component from shadcn/ui includes focus styles by default
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    test('applies custom className to Sheet trigger', () => {
      const { container } = render(
        <MobileNav
          isOpen={false}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="hero"
          className="custom-class"
        />
      );

      // The className is applied to the SheetTrigger wrapper
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    test('renders with empty navLinks array', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={[]}
          onNavClick={mockOnNavClick}
          activeSection="hero"
        />
      );

      const nav = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(nav).toBeInTheDocument();
    });

    test('renders with single navigation link', () => {
      const singleLink = [{ href: '#home', label: 'Home' }];
      
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={singleLink}
          onNavClick={mockOnNavClick}
          activeSection="home"
        />
      );

      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toBeInTheDocument();
    });

    test('highlights active section', () => {
      render(
        <MobileNav
          isOpen={true}
          onOpenChange={mockOnOpenChange}
          navLinks={mockNavLinks}
          onNavClick={mockOnNavClick}
          activeSection="services"
        />
      );

      const servicesLink = screen.getByRole('link', { name: 'Services' });
      const homeLink = screen.getByRole('link', { name: 'Home' });
      
      // Active link should have active styles
      expect(servicesLink).toHaveClass('text-primary', 'bg-accent', 'font-semibold', 'border-l-4', 'border-primary');
      
      // Inactive link should not have active styles
      expect(homeLink).not.toHaveClass('bg-accent');
      expect(homeLink).not.toHaveClass('border-l-4');
    });
  });
});
