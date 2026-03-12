/**
 * Accessibility Unit Tests for Section Components
 * 
 * Tests WCAG 2.1 AA compliance for all major page sections using axe-core.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

describe('Section Components - Accessibility Tests', () => {
  describe('HeroSection', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<HeroSection />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', () => {
      render(<HeroSection />);
      
      // Should have h1 for main heading
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/div tag studios/i);
    });

    test('should have accessible CTA button', () => {
      render(<HeroSection />);
      
      // CTA is a button that scrolls to services section
      const ctaButton = screen.getByRole('button', { name: /view our services/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAccessibleName();
    });

    test('should have visible focus indicator on CTA button', () => {
      render(<HeroSection />);
      
      // CTA is a button that scrolls to services section
      const ctaButton = screen.getByRole('button', { name: /view our services/i });
      expect(ctaButton.className).toContain('focus');
    });
  });

  describe('ServicesSection', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<ServicesSection />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', () => {
      render(<ServicesSection />);
      
      // Should have h2 for section heading
      const heading = screen.getByRole('heading', { level: 2, name: /our services/i });
      expect(heading).toBeInTheDocument();
    });

    test('should render all service cards', () => {
      const { container } = render(<ServicesSection />);
      
      // Service cards have titles but they're not h3 headings in the current implementation
      // Check for service card titles by text content
      expect(screen.getByText('Web Development')).toBeInTheDocument();
      expect(screen.getByText('Android Development')).toBeInTheDocument();
      expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
      expect(screen.getByText('Graphic Design')).toBeInTheDocument();
      expect(screen.getByText('Video Editing')).toBeInTheDocument();
      expect(screen.getByText('SEO')).toBeInTheDocument();
    });

    test('should have semantic section element', () => {
      const { container } = render(<ServicesSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('AboutSection', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<AboutSection />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', () => {
      render(<AboutSection />);
      
      // Should have h2 for section heading
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    test('should have semantic section element', () => {
      const { container } = render(<AboutSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('should have readable text content', () => {
      const { container } = render(<AboutSection />);
      
      // Should have text content
      expect(container.textContent).toBeTruthy();
      expect(container.textContent!.length).toBeGreaterThan(50);
    });
  });

  describe('ContactSection', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<ContactSection />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', () => {
      render(<ContactSection />);
      
      // Should have h2 for section heading
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    test('should contain contact form', () => {
      render(<ContactSection />);
      
      // Should have form elements
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    test('should have semantic section element', () => {
      const { container } = render(<ContactSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    test('should have no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results.violations).toEqual([]);
    });

    test('should have semantic footer element', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    test('should have accessible links', () => {
      render(<Footer />);
      
      const links = screen.getAllByRole('link');
      
      // All links should have accessible names
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
        expect(link).toHaveAttribute('href');
      });
    });

    test('should have proper rel attributes on external links', () => {
      const { container } = render(<Footer />);
      
      // External links should have rel="noopener noreferrer"
      const externalLinks = container.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach(link => {
        const rel = link.getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    test('should have visible focus indicators on links', () => {
      render(<Footer />);
      
      const links = screen.getAllByRole('link');
      
      // Links should have focus styles
      links.forEach(link => {
        expect(link.className).toContain('focus:');
      });
    });
  });
});

describe('Color Contrast Tests', () => {
  test('HeroSection should have sufficient color contrast', async () => {
    const { container } = render(<HeroSection />);
    
    // axe will check color contrast automatically
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results.violations).toEqual([]);
  });

  test('ServicesSection should have sufficient color contrast', async () => {
    const { container } = render(<ServicesSection />);
    
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results.violations).toEqual([]);
  });

  test('ContactSection should have sufficient color contrast', async () => {
    const { container } = render(<ContactSection />);
    
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results.violations).toEqual([]);
  });

  test('Footer should have sufficient color contrast', async () => {
    const { container } = render(<Footer />);
    
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results.violations).toEqual([]);
  });
});

describe('Semantic HTML Tests', () => {
  test('All sections should use semantic HTML5 elements', () => {
    const { container: heroContainer } = render(<HeroSection />);
    const { container: servicesContainer } = render(<ServicesSection />);
    const { container: aboutContainer } = render(<AboutSection />);
    const { container: contactContainer } = render(<ContactSection />);
    const { container: footerContainer } = render(<Footer />);
    
    // Check for semantic elements
    expect(heroContainer.querySelector('section')).toBeInTheDocument();
    expect(servicesContainer.querySelector('section')).toBeInTheDocument();
    expect(aboutContainer.querySelector('section')).toBeInTheDocument();
    expect(contactContainer.querySelector('section')).toBeInTheDocument();
    expect(footerContainer.querySelector('footer')).toBeInTheDocument();
  });

  test('Sections should have proper heading hierarchy', () => {
    render(
      <>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </>
    );
    
    // Should have one h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    
    // Should have multiple h2 elements for sections
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements.length).toBeGreaterThanOrEqual(3);
  });
});
