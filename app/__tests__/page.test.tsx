import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Home from '@/app/page';

// Mock the Navbar component since it uses client-side features
vi.mock('@/components/navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

// Mock the section components
vi.mock('@/components/sections/hero-section', () => ({
  HeroSection: () => <section id="hero" data-testid="hero-section">Hero</section>,
}));

vi.mock('@/components/sections/services-section', () => ({
  ServicesSection: () => <section id="services" data-testid="services-section">Services</section>,
}));

vi.mock('@/components/sections/about-section', () => ({
  AboutSection: () => <section id="about" data-testid="about-section">About</section>,
}));

vi.mock('@/components/sections/contact-section', () => ({
  ContactSection: () => <section id="contact" data-testid="contact-section">Contact</section>,
}));

vi.mock('@/components/sections/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

/**
 * Integration tests for main page
 * Tests that all sections render in correct order and page structure is semantic
 * 
 * Requirements: 1.1, 2.1, 3.1, 4.4, 4.5, 5.1, 9.1
 */
describe('Home Page Integration', () => {
  test('renders all sections in correct order', () => {
    const { container } = render(<Home />);
    
    // Get all major elements
    const navbar = screen.getByTestId('navbar');
    const main = container.querySelector('main');
    const hero = screen.getByTestId('hero-section');
    const services = screen.getByTestId('services-section');
    const about = screen.getByTestId('about-section');
    const contact = screen.getByTestId('contact-section');
    const footer = screen.getByTestId('footer');
    
    // Verify all sections exist
    expect(navbar).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(hero).toBeInTheDocument();
    expect(services).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(contact).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    
    // Verify order by checking DOM positions
    const allElements = [navbar, hero, services, about, contact, footer];
    for (let i = 0; i < allElements.length - 1; i++) {
      const current = allElements[i];
      const next = allElements[i + 1];
      
      // Compare positions in the DOM
      const position = current.compareDocumentPosition(next);
      // DOCUMENT_POSITION_FOLLOWING (4) means next comes after current
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  test('uses semantic HTML structure', () => {
    const { container } = render(<Home />);
    
    // Check for semantic elements
    const nav = container.querySelector('nav');
    const main = container.querySelector('main');
    const footer = container.querySelector('footer');
    
    expect(nav).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    
    // Verify main has correct id for skip link
    expect(main).toHaveAttribute('id', 'main-content');
  });

  test('all sections have correct IDs for navigation', () => {
    render(<Home />);
    
    // Verify all section IDs exist for smooth scroll navigation
    const hero = screen.getByTestId('hero-section');
    const services = screen.getByTestId('services-section');
    const about = screen.getByTestId('about-section');
    const contact = screen.getByTestId('contact-section');
    
    expect(hero).toHaveAttribute('id', 'hero');
    expect(services).toHaveAttribute('id', 'services');
    expect(about).toHaveAttribute('id', 'about');
    expect(contact).toHaveAttribute('id', 'contact');
  });

  test('sections are contained within main element', () => {
    const { container } = render(<Home />);
    
    const main = container.querySelector('main');
    const hero = screen.getByTestId('hero-section');
    const services = screen.getByTestId('services-section');
    const about = screen.getByTestId('about-section');
    const contact = screen.getByTestId('contact-section');
    
    // Verify all sections are children of main
    expect(main).toContainElement(hero);
    expect(main).toContainElement(services);
    expect(main).toContainElement(about);
    expect(main).toContainElement(contact);
  });

  test('navbar and footer are outside main element', () => {
    const { container } = render(<Home />);
    
    const main = container.querySelector('main');
    const navbar = screen.getByTestId('navbar');
    const footer = screen.getByTestId('footer');
    
    // Navbar and footer should not be inside main
    expect(main).not.toContainElement(navbar);
    expect(main).not.toContainElement(footer);
  });

  test('page structure follows accessibility best practices', () => {
    const { container } = render(<Home />);
    
    // Check for proper landmark structure
    const nav = container.querySelector('nav');
    const main = container.querySelector('main');
    const footer = container.querySelector('footer');
    
    // All landmarks should exist
    expect(nav).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    
    // Main should have an ID for skip links
    expect(main).toHaveAttribute('id');
  });
});
