import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/section-reveal';
import { BlogCard } from '@/components/blog-card';
import { getFeaturedPosts } from '@/lib/blogs';

/**
 * Blog preview – Technology Insights teaser (Unico Connect–style), links to /blogs
 */
export function BlogPreviewSection() {
  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background"
    >
      <div className="success-stories-cyber-pattern" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-3">
              Technology Insights
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              From our blog
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Guides on web development, UI/UX, mobile apps, and shipping products that scale.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all shrink-0"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="gradient-cta-button inline-flex items-center justify-center min-h-[48px] text-sm font-medium px-8 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
          >
            <span className="gradient-cta-text inline-flex items-center gap-2">
              Read More Articles
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
