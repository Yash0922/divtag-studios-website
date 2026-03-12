import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { AboutSection } from '@/components/sections/about-section';
import { ABOUT_CONTENT } from '@/lib/constants';

describe('AboutSection', () => {
  test('displays section heading', () => {
    render(<AboutSection />);
    
    const heading = screen.getByRole('heading', { level: 2, name: /about us/i });
    expect(heading).toBeInTheDocument();
  });

  test('displays mission heading', () => {
    render(<AboutSection />);
    
    const missionHeading = screen.getByRole('heading', { level: 3, name: /our mission/i });
    expect(missionHeading).toBeInTheDocument();
  });

  test('displays mission statement', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(ABOUT_CONTENT.mission)).toBeInTheDocument();
  });

  test('displays approach heading', () => {
    render(<AboutSection />);
    
    const approachHeading = screen.getByRole('heading', { level: 3, name: /our approach/i });
    expect(approachHeading).toBeInTheDocument();
  });

  test('displays all core values', () => {
    render(<AboutSection />);
    
    ABOUT_CONTENT.values.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test('displays quality-driven development value', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(/Quality-driven development with attention to every detail/i)).toBeInTheDocument();
  });

  test('displays client-focused approach value', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(/Client-focused approach ensuring your vision comes to life/i)).toBeInTheDocument();
  });

  test('displays innovation value', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(/Innovation at the core of everything we create/i)).toBeInTheDocument();
  });

  test('displays transparent communication value', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(/Transparent communication throughout the entire process/i)).toBeInTheDocument();
  });

  test('has section id for navigation', () => {
    const { container } = render(<AboutSection />);
    
    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
  });

  describe('Layout and Spacing', () => {
    test('has responsive padding', () => {
      const { container } = render(<AboutSection />);
      
      const section = container.querySelector('#about');
      expect(section).toHaveClass('px-4');
      expect(section).toHaveClass('md:px-6');
      expect(section).toHaveClass('lg:px-8');
    });

    test('has responsive vertical padding', () => {
      const { container } = render(<AboutSection />);
      
      const section = container.querySelector('#about');
      expect(section).toHaveClass('py-16');
      expect(section).toHaveClass('md:py-24');
    });

    test('has background color', () => {
      const { container } = render(<AboutSection />);
      
      const section = container.querySelector('#about');
      expect(section).toHaveClass('bg-muted/30');
    });

    test('content container has max width', () => {
      const { container } = render(<AboutSection />);
      
      const contentContainer = container.querySelector('.max-w-4xl');
      expect(contentContainer).toBeInTheDocument();
    });

    test('mission section has bottom margin', () => {
      const { container } = render(<AboutSection />);
      
      const missionDiv = container.querySelector('.mb-12');
      expect(missionDiv).toBeInTheDocument();
    });

    test('values list has proper spacing', () => {
      const { container } = render(<AboutSection />);
      
      const valuesList = container.querySelector('.space-y-4');
      expect(valuesList).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    test('main heading has responsive text sizing', () => {
      render(<AboutSection />);
      
      const heading = screen.getByRole('heading', { level: 2, name: /about us/i });
      expect(heading).toHaveClass('text-3xl');
      expect(heading).toHaveClass('md:text-4xl');
    });

    test('main heading is centered', () => {
      render(<AboutSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-center');
    });

    test('main heading has bottom margin', () => {
      render(<AboutSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('mb-8');
    });

    test('subheadings have responsive text sizing', () => {
      render(<AboutSection />);
      
      const missionHeading = screen.getByRole('heading', { level: 3, name: /our mission/i });
      expect(missionHeading).toHaveClass('text-xl');
      expect(missionHeading).toHaveClass('md:text-2xl');
    });

    test('mission text has responsive sizing', () => {
      const { container } = render(<AboutSection />);
      
      const missionText = screen.getByText(ABOUT_CONTENT.mission);
      expect(missionText).toHaveClass('text-base');
      expect(missionText).toHaveClass('md:text-lg');
    });

    test('mission text has muted color', () => {
      render(<AboutSection />);
      
      const missionText = screen.getByText(ABOUT_CONTENT.mission);
      expect(missionText).toHaveClass('text-muted-foreground');
    });

    test('mission text has relaxed line height', () => {
      render(<AboutSection />);
      
      const missionText = screen.getByText(ABOUT_CONTENT.mission);
      expect(missionText).toHaveClass('leading-relaxed');
    });
  });

  describe('Semantic HTML', () => {
    test('uses section element', () => {
      const { container } = render(<AboutSection />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('uses h2 for main heading', () => {
      render(<AboutSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });

    test('uses h3 for subheadings', () => {
      render(<AboutSection />);
      
      const missionHeading = screen.getByRole('heading', { level: 3, name: /our mission/i });
      expect(missionHeading.tagName).toBe('H3');
      
      const approachHeading = screen.getByRole('heading', { level: 3, name: /our approach/i });
      expect(approachHeading.tagName).toBe('H3');
    });

    test('uses paragraph element for mission', () => {
      const { container } = render(<AboutSection />);
      
      const missionText = screen.getByText(ABOUT_CONTENT.mission);
      expect(missionText.tagName).toBe('P');
    });

    test('uses unordered list for values', () => {
      const { container } = render(<AboutSection />);
      
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
    });

    test('uses list items for each value', () => {
      const { container } = render(<AboutSection />);
      
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(ABOUT_CONTENT.values.length);
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<AboutSection />);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });
      
      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBe(2);
    });

    test('checkmarks are decorative with aria-hidden', () => {
      const { container } = render(<AboutSection />);
      
      const checkmarks = container.querySelectorAll('[aria-hidden="true"]');
      expect(checkmarks.length).toBeGreaterThan(0);
    });

    test('values are in a list for screen readers', () => {
      const { container } = render(<AboutSection />);
      
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(ABOUT_CONTENT.values.length);
    });

    test('all text content is accessible', () => {
      render(<AboutSection />);
      
      // Mission statement
      expect(screen.getByText(ABOUT_CONTENT.mission)).toBeInTheDocument();
      
      // All values
      ABOUT_CONTENT.values.forEach(value => {
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    });
  });

  describe('Visual Design', () => {
    test('checkmarks use primary color', () => {
      const { container } = render(<AboutSection />);
      
      const checkmarks = container.querySelectorAll('.text-primary');
      expect(checkmarks.length).toBe(ABOUT_CONTENT.values.length);
    });

    test('values have proper alignment', () => {
      const { container } = render(<AboutSection />);
      
      const valueItems = container.querySelectorAll('li');
      valueItems.forEach(item => {
        expect(item).toHaveClass('flex');
        expect(item).toHaveClass('items-start');
      });
    });

    test('checkmarks do not shrink', () => {
      const { container } = render(<AboutSection />);
      
      const checkmarks = container.querySelectorAll('.flex-shrink-0');
      expect(checkmarks.length).toBe(ABOUT_CONTENT.values.length);
    });
  });
});
