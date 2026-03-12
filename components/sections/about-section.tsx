import { ABOUT_CONTENT } from '@/lib/constants';
import { SectionReveal } from '@/components/section-reveal';

/**
 * AboutSection component displays company mission and core values
 * Server component for optimal performance
 */
export function AboutSection() {
  return (
    <SectionReveal
      as="section"
      id="about"
      className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background dark:bg-card/30"
    >
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            About Us
          </h2>
        </header>

        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Our Mission
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {ABOUT_CONTENT.mission}
          </p>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            Our Approach
          </h3>
          <ul className="space-y-4">
            {ABOUT_CONTENT.values.map((value, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-base md:text-lg text-muted-foreground"
              >
                <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
