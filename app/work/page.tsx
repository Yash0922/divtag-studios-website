import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { WorkCard } from '@/components/work-card';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';
import { WORK_ITEMS, WORK_STATS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Work – Case Studies & Portfolio',
  description:
    'Explore Div Tag Studios portfolio: web apps, mobile products, brand design, and growth projects delivered for startups and businesses across India.',
  alternates: {
    canonical: 'https://www.divtagstudios.in/work',
  },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none pt-24">
        {/* Hero */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4">
                Customer Success Stories
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Explore Our Work
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From web and mobile products to design and growth—we partner with teams to ship
                digital experiences that scale. Here&apos;s a selection of projects we&apos;ve
                delivered.
              </p>
            </div>

            {/* Stats row – Unico-style social proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-4">
              {WORK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-card/50 px-5 py-6 text-center md:text-left"
                >
                  <p className="text-2xl md:text-3xl font-bold text-gradient-hero">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies grid */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background border-t border-border/40">
          <div className="success-stories-cyber-pattern" aria-hidden />
          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WORK_ITEMS.map((item) => (
                <WorkCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="container relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to build something great?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us about your project—we&apos;ll help you scope, design, and ship a product
              tailored to your goals.
            </p>
            <Link
              href="/#contact"
              className="gradient-cta-button inline-flex items-center justify-center min-h-[48px] text-sm font-medium px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
            >
              <span className="gradient-cta-text">Book a Call</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
