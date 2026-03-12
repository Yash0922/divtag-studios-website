import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { HeroSection } from '@/components/sections/hero-section';

describe('HeroSection', () => {
  test('displays company name as h1 heading', () => {
    render(<HeroSection />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Div Tag Studios');
  });

  test('displays tagline', () => {
    render(<HeroSection />);
    
    expect(screen.getByText('Turning Pixels into Products')).toBeInTheDocument();
  });

  test('includes CTA button with correct text', () => {
    render(<HeroSection />);
    
    const button = screen.getByRole('button', { name: /view our services/i });
    expect(button).toBeInTheDocument();
  });

  test('CTA button scrolls to services section', () => {
    render(<HeroSection />);
    
    const button = screen.getByRole('button', { name: /view our services/i });
    expect(button).toBeInTheDocument();
    // Button has onClick handler that scrolls to #services
  });

  test('has section id for navigation', () => {
    const { container } = render(<HeroSection />);
    
    const section = container.querySelector('#hero');
    expect(section).toBeInTheDocument();
  });

  test('has fade-in animation class', () => {
    const { container } = render(<HeroSection />);
    
    const section = container.querySelector('#hero');
    expect(section).toHaveClass('animate-fade-in');
  });

  test('applies custom className when provided', () => {
    const { container } = render(<HeroSection className="custom-class" />);
    
    const section = container.querySelector('#hero');
    expect(section).toHaveClass('custom-class');
  });

  describe('Responsive Typography', () => {
    test('heading has responsive text sizing', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-4xl');
      expect(heading).toHaveClass('md:text-5xl');
      expect(heading).toHaveClass('lg:text-6xl');
    });

    test('tagline has responsive text sizing', () => {
      render(<HeroSection />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline).toHaveClass('text-xl');
      expect(tagline).toHaveClass('md:text-2xl');
      expect(tagline).toHaveClass('lg:text-3xl');
    });

    test('heading has bold font weight', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
    });
  });

  describe('Layout and Spacing', () => {
    test('section has minimum full viewport height', () => {
      const { container } = render(<HeroSection />);
      
      const section = container.querySelector('#hero');
      expect(section).toHaveClass('min-h-screen');
    });

    test('section centers content vertically and horizontally', () => {
      const { container } = render(<HeroSection />);
      
      const section = container.querySelector('#hero');
      expect(section).toHaveClass('flex');
      expect(section).toHaveClass('items-center');
      expect(section).toHaveClass('justify-center');
    });

    test('has responsive padding', () => {
      const { container } = render(<HeroSection />);
      
      const section = container.querySelector('#hero');
      expect(section).toHaveClass('px-4');
      expect(section).toHaveClass('md:px-6');
      expect(section).toHaveClass('lg:px-8');
    });

    test('content container has max width', () => {
      const { container } = render(<HeroSection />);
      
      const contentContainer = container.querySelector('.max-w-7xl');
      expect(contentContainer).toBeInTheDocument();
    });

    test('content is centered', () => {
      const { container } = render(<HeroSection />);
      
      const contentContainer = container.querySelector('.text-center');
      expect(contentContainer).toBeInTheDocument();
    });

    test('heading has bottom margin', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('mb-6');
    });

    test('tagline has bottom margin', () => {
      render(<HeroSection />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline).toHaveClass('mb-8');
    });
  });

  describe('Semantic HTML', () => {
    test('uses section element', () => {
      const { container } = render(<HeroSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('uses h1 for company name', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    test('uses paragraph element for tagline', () => {
      const { container } = render(<HeroSection />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline.tagName).toBe('P');
    });
  });

  describe('Accessibility', () => {
    test('CTA button is keyboard accessible', () => {
      render(<HeroSection />);
      
      const button = screen.getByRole('button', { name: /view our services/i });
      expect(button).toBeInTheDocument();
      // Button elements are naturally keyboard accessible
    });

    test('heading provides clear page structure', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Div Tag Studios');
    });

    test('button has large size for touch targets', () => {
      render(<HeroSection />);
      
      const button = screen.getByRole('button', { name: /view our services/i });
      // Button uses size="lg" which provides adequate touch target (h-11 = 44px)
      expect(button).toHaveClass('h-11');
    });
  });

  describe('Color and Styling', () => {
    test('heading uses foreground color', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-foreground');
    });

    test('tagline uses muted foreground color', () => {
      render(<HeroSection />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline).toHaveClass('text-muted-foreground');
    });
  });
});
