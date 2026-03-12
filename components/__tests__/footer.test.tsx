import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Footer } from '@/components/sections/footer';

describe('Footer', () => {
  beforeEach(() => {
    // Mock the current year to ensure consistent tests
    vi.setSystemTime(new Date('2024-01-01'));
  });

  test('displays company name', () => {
    render(<Footer />);
    
    const companyName = screen.getByRole('heading', { level: 3, name: /div tag studios/i });
    expect(companyName).toBeInTheDocument();
  });

  test('displays company tagline', () => {
    render(<Footer />);
    
    expect(screen.getByText('Turning Pixels into Products')).toBeInTheDocument();
  });

  test('displays contact heading', () => {
    render(<Footer />);
    
    const contactHeading = screen.getByRole('heading', { level: 3, name: /contact/i });
    expect(contactHeading).toBeInTheDocument();
  });

  test('displays email address', () => {
    render(<Footer />);
    
    const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
    expect(emailLink).toBeInTheDocument();
  });

  test('email link has correct href', () => {
    render(<Footer />);
    
    const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@divtagstudios.com');
  });

  test('displays social media heading', () => {
    render(<Footer />);
    
    const socialHeading = screen.getByRole('heading', { level: 3, name: /follow us/i });
    expect(socialHeading).toBeInTheDocument();
  });

  test('displays LinkedIn link', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
    expect(linkedinLink).toBeInTheDocument();
  });

  test('LinkedIn link has correct href', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/divtagstudios');
  });

  test('LinkedIn link opens in new tab', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  test('LinkedIn link has security attributes', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays Twitter link', () => {
    render(<Footer />);
    
    const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
    expect(twitterLink).toBeInTheDocument();
  });

  test('Twitter link has correct href', () => {
    render(<Footer />);
    
    const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/divtagstudios');
  });

  test('Twitter link opens in new tab', () => {
    render(<Footer />);
    
    const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
    expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  test('Twitter link has security attributes', () => {
    render(<Footer />);
    
    const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays GitHub link', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
    expect(githubLink).toBeInTheDocument();
  });

  test('GitHub link has correct href', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/divtagstudios');
  });

  test('GitHub link opens in new tab', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('GitHub link has security attributes', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays copyright notice with current year', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2024 Div Tag Studios\. All rights reserved\./i)).toBeInTheDocument();
  });

  test('copyright notice updates with current year', () => {
    vi.setSystemTime(new Date('2025-06-15'));
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 Div Tag Studios\. All rights reserved\./i)).toBeInTheDocument();
  });

  describe('Layout and Styling', () => {
    test('uses footer element', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    test('has border at top', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('border-t');
    });

    test('has background color', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-muted/50');
    });

    test('has responsive padding', () => {
      const { container } = render(<Footer />);
      
      const contentContainer = container.querySelector('.px-4');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('md:px-6');
      expect(contentContainer).toHaveClass('lg:px-8');
    });

    test('has responsive vertical padding', () => {
      const { container } = render(<Footer />);
      
      const contentContainer = container.querySelector('.py-8');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('md:py-12');
    });

    test('content container has max width', () => {
      const { container } = render(<Footer />);
      
      const contentContainer = container.querySelector('.max-w-7xl');
      expect(contentContainer).toBeInTheDocument();
    });

    test('uses responsive grid layout', () => {
      const { container } = render(<Footer />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    test('grid has appropriate gap', () => {
      const { container } = render(<Footer />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-8');
    });

    test('copyright section has top border', () => {
      const { container } = render(<Footer />);
      
      const copyrightSection = container.querySelector('.border-t');
      expect(copyrightSection).toBeInTheDocument();
    });

    test('copyright is centered', () => {
      const { container } = render(<Footer />);
      
      const copyrightText = screen.getByText(/© 2024 Div Tag Studios/i);
      expect(copyrightText.parentElement).toHaveClass('text-center');
    });
  });

  describe('Typography', () => {
    test('section headings have proper styling', () => {
      render(<Footer />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      headings.forEach(heading => {
        expect(heading).toHaveClass('font-semibold');
        expect(heading).toHaveClass('text-lg');
        expect(heading).toHaveClass('mb-4');
      });
    });

    test('tagline has small text size', () => {
      render(<Footer />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline).toHaveClass('text-sm');
    });

    test('tagline has muted color', () => {
      render(<Footer />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline).toHaveClass('text-muted-foreground');
    });

    test('copyright section has small text size', () => {
      const { container } = render(<Footer />);
      
      const copyright = screen.getByText(/© 2024 Div Tag Studios/i);
      expect(copyright.parentElement).toHaveClass('text-sm');
    });

    test('copyright section has muted color', () => {
      const { container } = render(<Footer />);
      
      const copyright = screen.getByText(/© 2024 Div Tag Studios/i);
      expect(copyright.parentElement).toHaveClass('text-muted-foreground');
    });
  });

  describe('Icons', () => {
    test('email link has mail icon', () => {
      const { container } = render(<Footer />);
      
      const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
      const svg = emailLink.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    test('social links have icons', () => {
      const { container } = render(<Footer />);
      
      const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
      const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
      const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
      
      expect(linkedinLink.querySelector('svg')).toBeInTheDocument();
      expect(twitterLink.querySelector('svg')).toBeInTheDocument();
      expect(githubLink.querySelector('svg')).toBeInTheDocument();
    });

    test('icons have proper sizing', () => {
      const { container } = render(<Footer />);
      
      const socialIcons = container.querySelectorAll('.h-5.w-5');
      expect(socialIcons.length).toBe(3); // LinkedIn, Twitter, GitHub
    });

    test('mail icon has proper sizing', () => {
      const { container } = render(<Footer />);
      
      const mailIcon = container.querySelector('.h-4.w-4');
      expect(mailIcon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('all social links have aria-labels', () => {
      render(<Footer />);
      
      const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
      const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
      const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
      
      expect(linkedinLink).toHaveAttribute('aria-label');
      expect(twitterLink).toHaveAttribute('aria-label');
      expect(githubLink).toHaveAttribute('aria-label');
    });

    test('email link is accessible', () => {
      render(<Footer />);
      
      const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
      expect(emailLink).toBeInTheDocument();
    });

    test('all links are keyboard accessible', () => {
      render(<Footer />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(4); // Email, LinkedIn, Twitter, GitHub
    });

    test('has proper heading hierarchy', () => {
      render(<Footer />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBe(3); // Company, Contact, Follow Us
    });
  });

  describe('Semantic HTML', () => {
    test('uses footer element', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    test('uses h3 for section headings', () => {
      render(<Footer />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });

    test('uses paragraph element for tagline', () => {
      const { container } = render(<Footer />);
      
      const tagline = screen.getByText('Turning Pixels into Products');
      expect(tagline.tagName).toBe('P');
    });

    test('uses paragraph element for copyright', () => {
      const { container } = render(<Footer />);
      
      const copyright = screen.getByText(/© 2024 Div Tag Studios/i);
      expect(copyright.tagName).toBe('P');
    });
  });

  describe('Hover Effects', () => {
    test('email link has hover transition', () => {
      render(<Footer />);
      
      const emailLink = screen.getByRole('link', { name: /contact@divtagstudios\.com/i });
      expect(emailLink).toHaveClass('transition-colors');
    });

    test('social links have hover transition', () => {
      render(<Footer />);
      
      const linkedinLink = screen.getByRole('link', { name: /visit our linkedin page/i });
      const twitterLink = screen.getByRole('link', { name: /visit our twitter profile/i });
      const githubLink = screen.getByRole('link', { name: /visit our github profile/i });
      
      expect(linkedinLink).toHaveClass('transition-colors');
      expect(twitterLink).toHaveClass('transition-colors');
      expect(githubLink).toHaveClass('transition-colors');
    });
  });
});
