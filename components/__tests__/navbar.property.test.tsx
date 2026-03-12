import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { Navbar } from '@/components/navbar';
import { validSectionIdArbitrary } from '@/test/arbitraries';

/**
 * Property-Based Tests for Navbar Component
 * 
 * Feature: service-website-divtag-studios
 * Property 2: Navigation Link Scroll Behavior
 * 
 * **Validates: Requirements 3.2**
 * 
 * Test that clicking any valid section link triggers scroll
 */
describe('Navbar - Property-Based Tests', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Clean up any created elements
    document.body.innerHTML = '';
  });

  describe('Property 2: Navigation Link Scroll Behavior', () => {
    test('clicking any valid section link triggers scroll to that section', () => {
      fc.assert(
        fc.asyncProperty(validSectionIdArbitrary, async (sectionId) => {
          // Setup: Create the target section element
          const mockElement = document.createElement('section');
          mockElement.id = sectionId;
          document.body.appendChild(mockElement);

          // Render navbar
          render(<Navbar />);
          const user = userEvent.setup();

          // Find the navigation link for this section
          // Map section IDs to their labels
          const sectionLabels: Record<string, string> = {
            'hero': 'Home',
            'services': 'Services',
            'about': 'About',
            'contact': 'Contact',
          };

          const linkLabel = sectionLabels[sectionId];
          
          // Get all links with this label (desktop + mobile)
          const links = screen.getAllByText(linkLabel);
          
          // Click the first link (desktop version)
          const desktopLink = links[0];
          await user.click(desktopLink);

          // Verify: scrollIntoView was called on the target element
          expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
          });

          // Cleanup
          document.body.removeChild(mockElement);
        }),
        { numRuns: 100 }
      );
    });

    test('clicking navigation link with valid href format triggers scroll action', () => {
      fc.assert(
        fc.asyncProperty(validSectionIdArbitrary, async (sectionId) => {
          // Setup: Create the target section element
          const mockElement = document.createElement('section');
          mockElement.id = sectionId;
          document.body.appendChild(mockElement);

          // Render navbar
          render(<Navbar />);
          const user = userEvent.setup();

          // Map section IDs to their labels
          const sectionLabels: Record<string, string> = {
            'hero': 'Home',
            'services': 'Services',
            'about': 'About',
            'contact': 'Contact',
          };

          const linkLabel = sectionLabels[sectionId];
          const links = screen.getAllByText(linkLabel);
          
          // Click the desktop link
          await user.click(links[0]);

          // Verify: The scroll action was triggered (scrollIntoView called)
          expect(mockElement.scrollIntoView).toHaveBeenCalled();

          // Cleanup
          document.body.removeChild(mockElement);
        }),
        { numRuns: 100 }
      );
    });

    test('all navigation links have valid section ID targets', () => {
      fc.assert(
        fc.property(validSectionIdArbitrary, (sectionId) => {
          // Setup: Create the target section element
          const mockElement = document.createElement('section');
          mockElement.id = sectionId;
          document.body.appendChild(mockElement);

          // Render navbar
          const { container } = render(<Navbar />);

          // Map section IDs to their labels
          const sectionLabels: Record<string, string> = {
            'hero': 'Home',
            'services': 'Services',
            'about': 'About',
            'contact': 'Contact',
          };

          const linkLabel = sectionLabels[sectionId];
          const links = screen.getAllByText(linkLabel);

          // Verify: Links exist and have proper href format
          expect(links.length).toBeGreaterThan(0);
          
          // Get the actual link element (anchor tag)
          const linkElement = links[0].closest('a');
          expect(linkElement).toBeInTheDocument();
          expect(linkElement).toHaveAttribute('href', `#${sectionId}`);

          // Cleanup
          document.body.removeChild(mockElement);
          container.remove();
        }),
        { numRuns: 100 }
      );
    });

    test('scroll behavior is consistent across all valid section links', () => {
      fc.assert(
        fc.asyncProperty(
          fc.array(validSectionIdArbitrary, { minLength: 1, maxLength: 4 }).map(arr => [...new Set(arr)]),
          async (sectionIds) => {
            // Setup: Create all target section elements
            const mockElements = sectionIds.map(id => {
              const element = document.createElement('section');
              element.id = id;
              document.body.appendChild(element);
              return element;
            });

            // Render navbar
            render(<Navbar />);
            const user = userEvent.setup();

            // Map section IDs to their labels
            const sectionLabels: Record<string, string> = {
              'hero': 'Home',
              'services': 'Services',
              'about': 'About',
              'contact': 'Contact',
            };

            // Test each section link
            for (const sectionId of sectionIds) {
              const linkLabel = sectionLabels[sectionId];
              const links = screen.getAllByText(linkLabel);
              
              // Click the desktop link
              await user.click(links[0]);

              // Verify: scrollIntoView was called with consistent parameters
              const targetElement = document.getElementById(sectionId);
              expect(targetElement?.scrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
                block: 'start',
              });
            }

            // Cleanup
            mockElements.forEach(element => {
              if (element.parentNode) {
                document.body.removeChild(element);
              }
            });
          }
        ),
        { numRuns: 50 } // Reduced runs since this tests multiple sections per run
      );
    });
  });
});
