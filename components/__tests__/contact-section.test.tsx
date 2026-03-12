import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ContactSection } from '@/components/sections/contact-section';
import { CONTACT_INFO } from '@/lib/constants';

describe('ContactSection', () => {
  test('displays section heading', () => {
    render(<ContactSection />);
    
    const heading = screen.getByRole('heading', { level: 2, name: /contact us/i });
    expect(heading).toBeInTheDocument();
  });

  test('displays introductory text', () => {
    render(<ContactSection />);
    
    expect(screen.getByText(/Have a project in mind/i)).toBeInTheDocument();
  });

  test('displays "Get in Touch" subheading', () => {
    render(<ContactSection />);
    
    const subheading = screen.getByRole('heading', { level: 3, name: /get in touch/i });
    expect(subheading).toBeInTheDocument();
  });

  test('has section id for navigation', () => {
    const { container } = render(<ContactSection />);
    
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });

  describe('Contact Information Display', () => {
    test('displays email heading', () => {
      render(<ContactSection />);
      
      const emailHeading = screen.getByRole('heading', { level: 4, name: /email/i });
      expect(emailHeading).toBeInTheDocument();
    });

    test('displays email address', () => {
      render(<ContactSection />);
      
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_INFO.email}`);
    });

    test('displays phone heading', () => {
      render(<ContactSection />);
      
      const phoneHeading = screen.getByRole('heading', { level: 4, name: /phone/i });
      expect(phoneHeading).toBeInTheDocument();
    });

    test('displays phone number', () => {
      render(<ContactSection />);
      
      const phoneLink = screen.getByRole('link', { name: CONTACT_INFO.phone });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`);
    });

    test('displays address heading', () => {
      render(<ContactSection />);
      
      const addressHeading = screen.getByRole('heading', { level: 4, name: /address/i });
      expect(addressHeading).toBeInTheDocument();
    });

    test('displays address', () => {
      render(<ContactSection />);
      
      expect(screen.getByText(CONTACT_INFO.address)).toBeInTheDocument();
    });
  });

  describe('Contact Form Integration', () => {
    test('renders contact form', () => {
      render(<ContactSection />);
      
      // Check for form fields
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test('renders submit button', () => {
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Layout and Spacing', () => {
    test('has responsive padding', () => {
      const { container } = render(<ContactSection />);
      
      const section = container.querySelector('#contact');
      expect(section).toHaveClass('px-4');
      expect(section).toHaveClass('md:px-6');
      expect(section).toHaveClass('lg:px-8');
    });

    test('has responsive vertical padding', () => {
      const { container } = render(<ContactSection />);
      
      const section = container.querySelector('#contact');
      expect(section).toHaveClass('py-16');
      expect(section).toHaveClass('md:py-24');
    });

    test('content container has max width', () => {
      const { container } = render(<ContactSection />);
      
      const contentContainer = container.querySelector('.max-w-5xl');
      expect(contentContainer).toBeInTheDocument();
    });

    test('uses grid layout for form and contact info', () => {
      const { container } = render(<ContactSection />);
      
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid-cols-1');
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
    });

    test('has gap between grid items', () => {
      const { container } = render(<ContactSection />);
      
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('gap-12');
    });
  });

  describe('Typography', () => {
    test('main heading has responsive text sizing', () => {
      render(<ContactSection />);
      
      const heading = screen.getByRole('heading', { level: 2, name: /contact us/i });
      expect(heading).toHaveClass('text-3xl');
      expect(heading).toHaveClass('md:text-4xl');
    });

    test('main heading is centered', () => {
      render(<ContactSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-center');
    });

    test('subheading has responsive text sizing', () => {
      render(<ContactSection />);
      
      const subheading = screen.getByRole('heading', { level: 3, name: /get in touch/i });
      expect(subheading).toHaveClass('text-xl');
      expect(subheading).toHaveClass('md:text-2xl');
    });

    test('introductory text is centered', () => {
      const { container } = render(<ContactSection />);
      
      const introText = screen.getByText(/Have a project in mind/i);
      expect(introText).toHaveClass('text-center');
    });

    test('introductory text has muted color', () => {
      render(<ContactSection />);
      
      const introText = screen.getByText(/Have a project in mind/i);
      expect(introText).toHaveClass('text-muted-foreground');
    });
  });

  describe('Semantic HTML', () => {
    test('uses section element', () => {
      const { container } = render(<ContactSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('uses h2 for main heading', () => {
      render(<ContactSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });

    test('uses h3 for subheading', () => {
      render(<ContactSection />);
      
      const subheading = screen.getByRole('heading', { level: 3 });
      expect(subheading.tagName).toBe('H3');
    });

    test('uses h4 for contact method headings', () => {
      render(<ContactSection />);
      
      const emailHeading = screen.getByRole('heading', { level: 4, name: /email/i });
      const phoneHeading = screen.getByRole('heading', { level: 4, name: /phone/i });
      const addressHeading = screen.getByRole('heading', { level: 4, name: /address/i });
      
      expect(emailHeading.tagName).toBe('H4');
      expect(phoneHeading.tagName).toBe('H4');
      expect(addressHeading.tagName).toBe('H4');
    });

    test('uses anchor tags for email and phone', () => {
      render(<ContactSection />);
      
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      const phoneLink = screen.getByRole('link', { name: CONTACT_INFO.phone });
      
      expect(emailLink.tagName).toBe('A');
      expect(phoneLink.tagName).toBe('A');
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<ContactSection />);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });
      const h4s = screen.getAllByRole('heading', { level: 4 });
      
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
      expect(h4s.length).toBe(3); // Email, Phone, Address
    });

    test('icons are decorative with aria-hidden', () => {
      const { container } = render(<ContactSection />);
      
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThanOrEqual(3); // Mail, Phone, MapPin icons
    });

    test('email link is accessible', () => {
      render(<ContactSection />);
      
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAccessibleName();
    });

    test('phone link is accessible', () => {
      render(<ContactSection />);
      
      const phoneLink = screen.getByRole('link', { name: CONTACT_INFO.phone });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAccessibleName();
    });

    test('all text content is accessible', () => {
      render(<ContactSection />);
      
      // Main heading
      expect(screen.getByRole('heading', { level: 2, name: /contact us/i })).toBeInTheDocument();
      
      // Contact information
      expect(screen.getByText(CONTACT_INFO.email)).toBeInTheDocument();
      expect(screen.getByText(CONTACT_INFO.phone)).toBeInTheDocument();
      expect(screen.getByText(CONTACT_INFO.address)).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    test('contact method icons have background', () => {
      const { container } = render(<ContactSection />);
      
      const iconContainers = container.querySelectorAll('.bg-primary\\/10');
      expect(iconContainers.length).toBe(3); // Email, Phone, Address
    });

    test('contact method icons are rounded', () => {
      const { container } = render(<ContactSection />);
      
      const iconContainers = container.querySelectorAll('.rounded-lg');
      expect(iconContainers.length).toBeGreaterThanOrEqual(3);
    });

    test('contact method icons have consistent size', () => {
      const { container } = render(<ContactSection />);
      
      const iconContainers = container.querySelectorAll('.w-12.h-12');
      expect(iconContainers.length).toBe(3);
    });

    test('contact links have hover effect', () => {
      render(<ContactSection />);
      
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      const phoneLink = screen.getByRole('link', { name: CONTACT_INFO.phone });
      
      expect(emailLink).toHaveClass('hover:text-primary');
      expect(phoneLink).toHaveClass('hover:text-primary');
    });

    test('contact links have transition', () => {
      render(<ContactSection />);
      
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      const phoneLink = screen.getByRole('link', { name: CONTACT_INFO.phone });
      
      expect(emailLink).toHaveClass('transition-colors');
      expect(phoneLink).toHaveClass('transition-colors');
    });

    test('contact information has proper spacing', () => {
      const { container } = render(<ContactSection />);
      
      const contactInfoContainer = container.querySelector('.space-y-6');
      expect(contactInfoContainer).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    test('validates requirement 5.1: displays contact form', () => {
      render(<ContactSection />);
      
      // Form should be present with all required fields
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test('validates requirement 5.5: displays company contact information', () => {
      render(<ContactSection />);
      
      // Email address should be displayed
      expect(screen.getByText(CONTACT_INFO.email)).toBeInTheDocument();
      
      // Email should be a clickable link
      const emailLink = screen.getByRole('link', { name: CONTACT_INFO.email });
      expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_INFO.email}`);
    });

    test('section has proper layout structure', () => {
      const { container } = render(<ContactSection />);
      
      // Section should exist with proper ID
      const section = container.querySelector('#contact');
      expect(section).toBeInTheDocument();
      
      // Should have heading
      expect(screen.getByRole('heading', { level: 2, name: /contact us/i })).toBeInTheDocument();
      
      // Should have both form and contact info
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByText(CONTACT_INFO.email)).toBeInTheDocument();
    });
  });
});
