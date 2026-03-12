'use client';

import { Button } from '@/components/ui/button';

/**
 * CTA section – "Book a discovery call" (Weframe-style dark block)
 */
export function CTASection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6 lg:px-8 text-white"
      style={{ backgroundColor: 'hsl(var(--cta-bg))' }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Book a discovery call
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
          Let&apos;s discuss your project and see how we can help you build something great.
        </p>
        <button
          type="button"
          onClick={scrollToContact}
          className="inline-flex items-center justify-center rounded-full bg-white text-[hsl(var(--cta-bg))] font-medium h-12 px-8 text-base hover:bg-white/95 active:scale-[0.98] transition-all duration-200 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--cta-bg))]"
        >
          Book Now
        </button>
      </div>
    </section>
  );
}
