'use client';

import { CodeMatrixBackground } from '@/components/code-matrix-bg';

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
    <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background">
      <CodeMatrixBackground />
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Book a discovery call
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Let&apos;s discuss your project and see how we can help you build something great.
        </p>
        <button
          type="button"
          onClick={scrollToContact}
          className="gradient-cta-button motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="gradient-cta-text">Book Now</span>
        </button>
      </div>
    </section>
  );
}
