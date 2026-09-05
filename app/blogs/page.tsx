import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';
import { BlogListing } from '@/components/blog-listing';

export const metadata: Metadata = {
  title: 'Blog – Web, Design & Mobile Insights',
  description:
    'Guides and engineering practice from Div Tag Studios—web development, UI/UX, mobile apps, SEO, and product delivery for startups and businesses in India.',
  alternates: {
    canonical: 'https://www.divtagstudios.in/blogs',
  },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none pt-24">
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="container relative z-10 mx-auto max-w-7xl">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4">
              All articles
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance max-w-3xl">
              Technology Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-4">
              Guides, comparisons, and engineering practice from the team behind Div Tag
              Studios—written for founders, product teams, and developers shipping real products.
            </p>
          </div>
        </section>

        <section className="relative py-12 md:py-16 px-4 md:px-6 lg:px-8 overflow-hidden bg-background border-t border-border/40">
          <div className="success-stories-cyber-pattern" aria-hidden />
          <div className="container relative z-10 mx-auto max-w-7xl">
            <BlogListing />
          </div>
        </section>

        <section className="relative py-16 md:py-20 px-4 md:px-6 lg:px-8 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="container relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Want help shipping your product?</h2>
            <p className="text-muted-foreground mb-8">
              We turn these ideas into live web and mobile products—let&apos;s talk about your project.
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
