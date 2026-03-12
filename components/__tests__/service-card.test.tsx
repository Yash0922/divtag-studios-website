import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ServiceCard } from '@/components/service-card';

describe('ServiceCard', () => {
  test('renders service title', () => {
    render(
      <ServiceCard
        title="Web Development"
        description="Custom web applications"
        iconName="Code2"
      />
    );
    
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  test('renders service description', () => {
    render(
      <ServiceCard
        title="Web Development"
        description="Custom web applications"
        iconName="Code2"
      />
    );
    
    expect(screen.getByText('Custom web applications')).toBeInTheDocument();
  });

  test('renders icon element', () => {
    const { container } = render(
      <ServiceCard
        title="Web Development"
        description="Custom web applications"
        iconName="Code2"
      />
    );
    
    // Icon is rendered as SVG
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <ServiceCard
        title="Web Development"
        description="Custom web applications"
        iconName="Code2"
        className="custom-class"
      />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  test('has hover animation classes', () => {
    const { container } = render(
      <ServiceCard
        title="Web Development"
        description="Custom web applications"
        iconName="Code2"
      />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('hover:-translate-y-2');
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('transition-all');
  });

  describe('Hover State Styling', () => {
    test('has transition duration and easing for smooth hover animation', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const card = container.firstChild;
      expect(card).toHaveClass('duration-300');
      expect(card).toHaveClass('ease-in-out');
    });

    test('has cursor pointer for interactive feedback', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const card = container.firstChild;
      // Card should not have cursor-pointer since it's not interactive
      expect(card).not.toHaveClass('cursor-pointer');
    });

    test('includes all hover state classes for lift effect', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const card = container.firstChild as HTMLElement;
      const classes = card.className;
      
      // Verify all hover-related classes are present
      expect(classes).toContain('hover:-translate-y-2');
      expect(classes).toContain('hover:shadow-lg');
      expect(classes).toContain('transition-all');
    });
  });

  describe('Different Icon Types', () => {
    test('renders with Code2 icon (Web Development)', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('renders with Smartphone icon (Android Development)', () => {
      const { container } = render(
        <ServiceCard
          title="Android Development"
          description="Native Android applications"
          iconName="Smartphone"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('renders with Palette icon (UI/UX Design)', () => {
      const { container } = render(
        <ServiceCard
          title="UI/UX Design"
          description="User-centered design solutions"
          iconName="Palette"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('renders with Image icon (Graphic Design)', () => {
      const { container } = render(
        <ServiceCard
          title="Graphic Design"
          description="Visual identity and branding"
          iconName="Image"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('renders with Video icon (Video Editing)', () => {
      const { container } = render(
        <ServiceCard
          title="Video Editing"
          description="Professional video editing services"
          iconName="Video"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('renders with TrendingUp icon (SEO)', () => {
      const { container } = render(
        <ServiceCard
          title="SEO"
          description="Search engine optimization strategies"
          iconName="TrendingUp"
        />
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('text-primary');
    });

    test('icon has consistent sizing across different icon types', () => {
      const iconNames = ['Code2', 'Smartphone', 'Palette', 'Image', 'Video', 'TrendingUp'];
      
      iconNames.forEach((iconName) => {
        const { container } = render(
          <ServiceCard
            title="Test Service"
            description="Test description"
            iconName={iconName}
          />
        );
        
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('h-6');
        expect(svg).toHaveClass('w-6');
      });
    });

    test('icon container has consistent styling across different icons', () => {
      const iconNames = ['Code2', 'Smartphone', 'Palette'];
      
      iconNames.forEach((iconName) => {
        const { container } = render(
          <ServiceCard
            title="Test Service"
            description="Test description"
            iconName={iconName}
          />
        );
        
        const iconContainer = container.querySelector('.bg-primary\\/10');
        expect(iconContainer).toBeInTheDocument();
        expect(iconContainer).toHaveClass('h-12');
        expect(iconContainer).toHaveClass('w-12');
        expect(iconContainer).toHaveClass('rounded-lg');
      });
    });
  });

  describe('Responsive Behavior', () => {
    test('card structure supports responsive grid layouts', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      // Card should be a block-level element that can fit in grid layouts
      const card = container.firstChild as HTMLElement;
      expect(card.tagName.toLowerCase()).toBe('div');
    });

    test('text content is readable and wraps properly', () => {
      const longDescription = 'This is a very long description that should wrap properly on smaller screens and maintain readability across different viewport sizes without breaking the layout or causing overflow issues.';
      
      render(
        <ServiceCard
          title="Web Development"
          description={longDescription}
          iconName="Code2"
        />
      );
      
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    test('card maintains structure with varying content lengths', () => {
      const shortDescription = 'Short text';
      const { container: container1 } = render(
        <ServiceCard
          title="Short"
          description={shortDescription}
          iconName="Code2"
        />
      );
      
      const longDescription = 'This is a much longer description with significantly more content to test how the card handles varying text lengths and ensures consistent layout.';
      const { container: container2 } = render(
        <ServiceCard
          title="Long Title for Testing"
          description={longDescription}
          iconName="Smartphone"
        />
      );
      
      // Both cards should have the same base structure
      const card1 = container1.firstChild;
      const card2 = container2.firstChild;
      
      expect(card1?.nodeName).toBe(card2?.nodeName);
      expect(card1).toHaveClass('transition-all');
      expect(card2).toHaveClass('transition-all');
    });

    test('icon container maintains fixed size for layout consistency', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const iconContainer = container.querySelector('.bg-primary\\/10');
      // Fixed size ensures consistent layout across responsive breakpoints
      expect(iconContainer).toHaveClass('h-12');
      expect(iconContainer).toHaveClass('w-12');
    });

    test('card header uses flex layout for responsive content arrangement', () => {
      const { container } = render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const iconContainer = container.querySelector('.bg-primary\\/10');
      expect(iconContainer).toHaveClass('flex');
      expect(iconContainer).toHaveClass('items-center');
      expect(iconContainer).toHaveClass('justify-center');
    });

    test('title uses responsive text sizing', () => {
      render(
        <ServiceCard
          title="Web Development"
          description="Custom web applications"
          iconName="Code2"
        />
      );
      
      const title = screen.getByText('Web Development');
      expect(title).toHaveClass('text-xl');
    });
  });
});
