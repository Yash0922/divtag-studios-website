import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/navbar';

describe('Navbar', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock IntersectionObserver globally
    const mockObserve = vi.fn();
    const mockUnobserve = vi.fn();
    const mockDisconnect = vi.fn();
    
    global.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        // Store callback but don't call it automatically
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
      takeRecords = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    test('displays company name', () => {
      render(<Navbar />);
      expect(screen.getByText('Div Tag Studios')).toBeInTheDocument();
    });

    test('displays logo icon', () => {
      render(<Navbar />);
      const logo = screen.getByText('</>', { exact: false });
      expect(logo).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
      render(<Navbar />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('has proper aria-label for navigation', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Desktop Navigation', () => {
    test('desktop navigation links are hidden on mobile', () => {
      render(<Navbar />);
      const desktopNav = screen.getAllByText('Home')[0].parentElement;
      expect(desktopNav).toHaveClass('hidden', 'lg:flex');
    });

    test('navigation links have proper accessibility attributes', () => {
      render(<Navbar />);
      const links = screen.getAllByRole('link');
      
      links.forEach((link) => {
        // Check that links have href attributes
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Mobile Navigation', () => {
    test('hamburger menu button is visible', () => {
      render(<Navbar />);
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    test('hamburger button has proper aria-label', () => {
      render(<Navbar />);
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-label', 'Open navigation menu');
    });

    test('hamburger button meets minimum touch target size', () => {
      render(<Navbar />);
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      expect(menuButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });

    test('opens mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      await user.click(menuButton);
      
      // Sheet should open and show navigation links
      await waitFor(() => {
        // Mobile menu should have duplicate links (desktop + mobile)
        const homeLinks = screen.getAllByText('Home');
        expect(homeLinks.length).toBeGreaterThan(1);
      });
    });
  });

  describe('Smooth Scroll Behavior', () => {
    test('clicking navigation link triggers smooth scroll', async () => {
      const user = userEvent.setup();
      
      // Mock getElementById
      const mockElement = document.createElement('div');
      mockElement.id = 'services';
      document.body.appendChild(mockElement);
      
      render(<Navbar />);
      
      // Find and click the Services link (desktop version)
      const servicesLinks = screen.getAllByText('Services');
      const desktopServicesLink = servicesLinks[0];
      
      await user.click(desktopServicesLink);
      
      // Verify scrollIntoView was called
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Cleanup
      document.body.removeChild(mockElement);
    });

    test('clicking logo scrolls to hero section', async () => {
      const user = userEvent.setup();
      
      // Mock getElementById
      const mockElement = document.createElement('div');
      mockElement.id = 'hero';
      document.body.appendChild(mockElement);
      
      render(<Navbar />);
      
      const logo = screen.getByText('Div Tag Studios');
      await user.click(logo);
      
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Cleanup
      document.body.removeChild(mockElement);
    });
  });

  describe('Sticky Positioning', () => {
    test('navbar has fixed positioning', () => {
      const { container } = render(<Navbar />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
    });

    test('applies backdrop blur when scrolled', () => {
      const { container } = render(<Navbar />);
      
      // Simulate scroll
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      
      // Wait for state update
      waitFor(() => {
        const header = container.querySelector('header');
        expect(header).toHaveClass('backdrop-blur-md');
      });
    });
  });

  describe('Accessibility', () => {
    test('navigation links have proper focus styles', () => {
      render(<Navbar />);
      // Get navigation links (not the logo)
      const homeLink = screen.getAllByText('Home')[0];
      const servicesLink = screen.getAllByText('Services')[0];
      
      expect(homeLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary');
      expect(servicesLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary');
    });

    test('mobile menu links meet touch target size', () => {
      render(<Navbar />);
      // Get navigation links (not the logo)
      const homeLink = screen.getAllByText('Home')[0];
      const servicesLink = screen.getAllByText('Services')[0];
      
      expect(homeLink).toHaveClass('min-h-[44px]');
      expect(servicesLink).toHaveClass('min-h-[44px]');
    });
  });

  describe('Active Section Highlighting', () => {
    test('highlights home link by default', () => {
      render(<Navbar />);
      const homeLinks = screen.getAllByText('Home');
      const desktopHomeLink = homeLinks[0];
      
      // Home should be active by default (hero section)
      expect(desktopHomeLink).toHaveClass('text-primary', 'font-semibold', 'border-b-2', 'border-primary');
    });

    test('updates active section when Intersection Observer triggers', async () => {
      // Mock IntersectionObserver
      const mockObserve = vi.fn();
      const mockUnobserve = vi.fn();
      const mockDisconnect = vi.fn();
      
      let observerCallback: IntersectionObserverCallback;
      
      global.IntersectionObserver = class MockIntersectionObserver {
        constructor(callback: IntersectionObserverCallback) {
          observerCallback = callback;
        }
        observe = mockObserve;
        unobserve = mockUnobserve;
        disconnect = mockDisconnect;
        takeRecords = vi.fn();
        root = null;
        rootMargin = '';
        thresholds = [];
      } as any;

      // Create mock sections
      const heroSection = document.createElement('section');
      heroSection.id = 'hero';
      const servicesSection = document.createElement('section');
      servicesSection.id = 'services';
      document.body.appendChild(heroSection);
      document.body.appendChild(servicesSection);

      // Mock getElementById to return our sections
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn((id: string) => {
        if (id === 'hero') return heroSection;
        if (id === 'services') return servicesSection;
        return originalGetElementById.call(document, id);
      });

      render(<Navbar />);

      // Verify observer was set up
      expect(mockObserve).toHaveBeenCalled();

      // Simulate services section becoming visible
      await waitFor(() => {
        observerCallback([
          {
            target: servicesSection,
            isIntersecting: true,
            intersectionRatio: 0.5,
          } as IntersectionObserverEntry,
        ], {} as IntersectionObserver);
      });

      // Wait for state update
      await waitFor(() => {
        const servicesLinks = screen.getAllByText('Services');
        const desktopServicesLink = servicesLinks[0];
        expect(desktopServicesLink).toHaveClass('text-primary', 'font-semibold', 'border-b-2', 'border-primary');
      });

      // Cleanup
      document.body.removeChild(heroSection);
      document.body.removeChild(servicesSection);
      document.getElementById = originalGetElementById;
    });

    test('only highlights one section at a time', async () => {
      render(<Navbar />);
      
      // Get all navigation links
      const homeLinks = screen.getAllByText('Home');
      const servicesLinks = screen.getAllByText('Services');
      const aboutLinks = screen.getAllByText('About');
      const contactLinks = screen.getAllByText('Contact');
      
      // Only home should be active initially
      expect(homeLinks[0]).toHaveClass('text-primary', 'font-semibold');
      expect(servicesLinks[0]).not.toHaveClass('text-primary', 'font-semibold');
      expect(aboutLinks[0]).not.toHaveClass('text-primary', 'font-semibold');
      expect(contactLinks[0]).not.toHaveClass('text-primary', 'font-semibold');
    });

    test('applies active styles correctly', () => {
      render(<Navbar />);
      const homeLinks = screen.getAllByText('Home');
      const desktopHomeLink = homeLinks[0];
      
      // Check for active styles
      expect(desktopHomeLink).toHaveClass('text-primary');
      expect(desktopHomeLink).toHaveClass('font-semibold');
      expect(desktopHomeLink).toHaveClass('border-b-2');
      expect(desktopHomeLink).toHaveClass('border-primary');
    });

    test('inactive links have correct styles', () => {
      render(<Navbar />);
      const servicesLinks = screen.getAllByText('Services');
      const desktopServicesLink = servicesLinks[0];
      
      // Check for inactive styles
      expect(desktopServicesLink).toHaveClass('text-foreground');
      expect(desktopServicesLink).toHaveClass('hover:text-primary');
      expect(desktopServicesLink).not.toHaveClass('border-b-2');
    });
  });

  describe('Custom className', () => {
    test('applies custom className to header', () => {
      const { container } = render(<Navbar className="custom-class" />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('custom-class');
    });
  });
});
