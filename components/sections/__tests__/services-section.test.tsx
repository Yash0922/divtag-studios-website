import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ServicesSection } from '../services-section';
import { SERVICES } from '@/lib/constants';

describe('ServicesSection', () => {
  test('renders section heading', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('heading', { name: /our services/i })).toBeInTheDocument();
  });

  test('renders all six services', () => {
    render(<ServicesSection />);
    
    // Check that all service titles are rendered
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  test('renders service descriptions', () => {
    render(<ServicesSection />);
    
    // Check that all service descriptions are rendered
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  test('renders correct number of service cards', () => {
    const { container } = render(<ServicesSection />);
    
    // Count the number of service cards (each has a CardTitle)
    const cards = container.querySelectorAll('[class*="card"]');
    expect(cards.length).toBeGreaterThanOrEqual(6);
  });

  test('has correct section id for navigation', () => {
    const { container } = render(<ServicesSection />);
    const section = container.querySelector('#services');
    expect(section).toBeInTheDocument();
  });

  test('applies responsive grid classes', () => {
    const { container } = render(<ServicesSection />);
    const grid = container.querySelector('.grid');
    
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  test('applies custom className when provided', () => {
    const { container } = render(<ServicesSection className="custom-class" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
