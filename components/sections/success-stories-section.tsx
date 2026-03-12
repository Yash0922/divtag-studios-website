import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/section-reveal';

/**
 * Success Stories / What we deliver – card grid with CTA (Weframe-style)
 */
export function SuccessStoriesSection() {
  const featured = SERVICES.slice(0, 6);
  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cyber grid pattern background */}
      <div className="success-stories-cyber-pattern" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore how we turn ideas into digital products—from web and mobile to design and growth.
            </p>
          </div>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 hover:gap-3 transition-all duration-200 shrink-0"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service) => (
            <Link
              key={service.id}
              href="#services"
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none block text-left"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                View
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
