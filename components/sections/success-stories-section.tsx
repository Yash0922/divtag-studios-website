import Link from 'next/link';
import { WORK_ITEMS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/section-reveal';
import { WorkCard, ExploreWorkLink } from '@/components/work-card';

/**
 * Success Stories – featured work preview (Unico Connect–style), links to /work
 */
export function SuccessStoriesSection() {
  const featured = WORK_ITEMS.filter((item) => item.featured);

  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden"
    >
      <div className="success-stories-cyber-pattern" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-3">
              Customer Success Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Explore Our Work
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              See how we turn ideas into digital products—from web and mobile to design and growth.
            </p>
          </div>
          <ExploreWorkLink className="shrink-0 text-base" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <Link
              key={item.id}
              href="/work"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
            >
              <WorkCard item={item} compact />
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="gradient-cta-button inline-flex items-center justify-center min-h-[48px] text-sm font-medium px-8 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
          >
            <span className="gradient-cta-text inline-flex items-center gap-2">
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
