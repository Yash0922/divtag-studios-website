import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';
import { BlogContent } from '@/components/blog-content';
import { BlogCard } from '@/components/blog-card';
import { BLOG_POSTS, formatBlogDate, getBlogBySlug } from '@/lib/blogs';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.divtagstudios.in/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none pt-28 md:pt-32 lg:pt-36">
        <article className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <header className="mb-8 md:mb-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  Back to all articles
                </Link>

                <span className="rounded-full bg-primary/15 px-3.5 py-1 text-xs font-semibold text-primary border border-primary/25 shadow-sm">
                  {post.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-foreground mb-4 sm:mb-5 leading-[1.2] tracking-tight">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-6 sm:mt-8 pt-6 border-t border-border/60">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    by{' '}
                    <span className="text-foreground font-medium">{post.author}</span>
                    {post.authorRole && (
                      <span className="text-muted-foreground"> — {post.authorRole}</span>
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                    <span className="hidden sm:inline h-3 w-px bg-border/80" aria-hidden />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {post.image && (
              <div className="relative mb-8 sm:mb-10 w-full aspect-[16/9] sm:h-80 md:h-[400px] rounded-2xl overflow-hidden border border-border/60 shadow-xl bg-muted/40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
              <BlogContent sections={post.content} />
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background border-t border-border/40">
            <div className="success-stories-cyber-pattern" aria-hidden />
            <div className="relative z-10 mx-auto w-full max-w-7xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">
                Related articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {related.map((item) => (
                  <BlogCard key={item.slug} post={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="relative z-10 mx-auto w-full max-w-3xl text-center px-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
              Ready to start your project?
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Tell us about your idea—we&apos;ll help you scope, design, and ship a product tailored
              to your goals.
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
