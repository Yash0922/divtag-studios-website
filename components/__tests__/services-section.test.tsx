import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ServicesSection } from '@/components/sections/services-section';
import { SERVICES } from '@/lib/constants';

describe('ServicesSection', () => {
  test('displays section heading', () => {
    render(<ServicesSection />);
    
    const heading = screen.getByRole('heading', { level: 2, name: /our services/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all six services', () => {
    render(<ServicesSection />);
    
    // Check that all service titles are present
    SERVICES.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  test('renders Web Development service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText(/Custom web applications built with modern frameworks/i)).toBeInTheDocument();
  });

  test('renders Android Development service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('Android Development')).toBeInTheDocument();
    expect(screen.getByText(/Native Android applications with intuitive interfaces/i)).toBeInTheDocument();
  });

  test('renders UI/UX Design service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    expect(screen.getByText(/User-centered design solutions/i)).toBeInTheDocument();
  });

  test('renders Graphic Design service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('Graphic Design')).toBeInTheDocument();
    expect(screen.getByText(/Visual identity and branding materials/i)).toBeInTheDocument();
  });

  test('renders Video Editing service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('Video Editing')).toBeInTheDocument();
    expect(screen.getByText(/Professional video editing and post-production/i)).toBeInTheDocument();
  });

  test('renders SEO service', () => {
    render(<ServicesSection />);
    
    expect(screen.getByText('SEO')).toBeInTheDocument();
    expect(screen.getByText(/Search engine optimization strategies/i)).toBeInTheDocument();
  });

  test('has section id for navigation', () => {
    const { container } = render(<ServicesSection />);
    
    const section = container.querySelector('#services');
    expect(section).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const { container } = render(<ServicesSection className="custom-class" />);
    
    const section = container.querySelector('#services');
    expect(section).toHaveClass('custom-class');
  });

  describe('Layout and Grid', () => {
    test('uses responsive grid layout', () => {
      const { container } = render(<ServicesSection />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    test('has appropriate gap between cards', () => {
      const { container } = render(<ServicesSection />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-6');
    });

    test('has responsive padding', () => {
      const { container } = render(<ServicesSection />);
      
      const section = container.querySelector('#services');
      expect(section).toHaveClass('px-4');
      expect(section).toHaveClass('md:px-6');
      expect(section).toHaveClass('lg:px-8');
    });

    test('has responsive vertical padding', () => {
      const { container } = render(<ServicesSection />);
      
      const section = container.querySelector('#services');
      expect(section).toHaveClass('py-16');
      expect(section).toHaveClass('md:py-24');
    });

    test('content container has max width', () => {
      const { container } = render(<ServicesSection />);
      
      const contentContainer = container.querySelector('.max-w-7xl');
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    test('heading has responsive text sizing', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-3xl');
      expect(heading).toHaveClass('md:text-4xl');
    });

    test('heading is centered', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-center');
    });

    test('heading has bottom margin', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('mb-12');
    });

    test('heading has semibold font weight', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('font-semibold');
    });
  });

  describe('Semantic HTML', () => {
    test('uses section element', () => {
      const { container } = render(<ServicesSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('uses h2 for section heading', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Service Cards', () => {
    test('renders correct number of service cards', () => {
      const { container } = render(<ServicesSection />);
      
      // Each service card should have a unique key based on service.id
      const grid = container.querySelector('.grid');
      expect(grid?.children.length).toBe(SERVICES.length);
    });

    test('each service has an icon', () => {
      const { container } = render(<ServicesSection />);
      
      // Icons are rendered as SVG elements
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(SERVICES.length);
    });
  });

  describe('Accessibility', () => {
    test('section has proper heading hierarchy', () => {
      render(<ServicesSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Our Services');
    });

    test('all service titles are accessible', () => {
      render(<ServicesSection />);
      
      SERVICES.forEach(service => {
        const serviceTitle = screen.getByText(service.title);
        expect(serviceTitle).toBeInTheDocument();
      });
    });

    test('all service descriptions are accessible', () => {
      render(<ServicesSection />);
      
      SERVICES.forEach(service => {
        // Check that description text is present (using partial match)
        const descriptionWords = service.description.split(' ').slice(0, 3).join(' ');
        expect(screen.getByText(new RegExp(descriptionWords, 'i'))).toBeInTheDocument();
      });
    });
  });
});
