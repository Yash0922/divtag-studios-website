import { SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/service-card';
import { SectionReveal } from '@/components/section-reveal';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';

export function ServicesSection({ className }: { className?: string }) {
  return (
    <SectionReveal
      as="section"
      id="services"
      stagger
      className={`relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background ${className || ''}`}
    >
      <CodeMatrixBackground />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            What We Deliver
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Our Services
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            From web and mobile engineering to UI/UX design and technical SEO—we cover every stage of the digital product lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconName={service.iconName}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
