import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { ServiceCard } from '@/components/service-card';
import { serviceArbitrary } from '@/test/arbitraries';

describe('ServiceCard Property-Based Tests', () => {
  // Feature: service-website-divtag-studios, Property 1: Service Card Complete Rendering
  test('service card renders all required fields for any service', () => {
    /**
     * **Validates: Requirements 2.2**
     * 
     * Property 1: Service Card Complete Rendering
     * 
     * For any service object with title, description, and icon fields,
     * rendering it as a ServiceCard component should produce output containing
     * all three pieces of information (the title text, the description text,
     * and the icon element).
     */
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = render(
          <ServiceCard
            title={service.title}
            description={service.description}
            iconName={service.iconName}
          />
        );

        // Get the text content (which handles HTML entity decoding)
        const textContent = container.textContent || '';

        // Verify title is rendered (check that the title text appears in the text content)
        expect(textContent).toContain(service.title);

        // Verify description is rendered (check that the description text appears in the text content)
        expect(textContent).toContain(service.description);

        // Verify icon is rendered (Lucide icons render as SVG elements)
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
      }),
      { numRuns: 20 }
    );
  });
});
