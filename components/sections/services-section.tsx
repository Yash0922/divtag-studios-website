import { SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/service-card';
import { SectionReveal } from '@/components/section-reveal';

export function ServicesSection({ className }: { className?: string }) {
  return (
    <SectionReveal
      as="section"
      id="services"
      stagger
      className={`py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-muted/40 dark:bg-muted/20 ${className || ''}`}
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Services
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore the wide array of services we offer—from web and mobile development to design and SEO.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
