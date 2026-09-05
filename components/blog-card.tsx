import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blogs';
import { formatBlogDate } from '@/lib/blogs';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-border bg-card overflow-hidden flex flex-col',
        'hover:border-primary/40 hover:shadow-xl hover:-translate-y-1',
        'transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        featured && 'md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0',
        className
      )}
    >
      <Link
        href={`/blogs/${post.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          'relative w-full overflow-hidden bg-muted/40 block',
          featured ? 'min-h-[260px] sm:min-h-[300px] lg:min-h-full h-full' : 'h-48 sm:h-52'
        )}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={
              featured
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            priority={featured}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary-light)/0.4),transparent_50%)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-primary border border-primary/25 shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      <div className={cn('p-6 flex flex-col', featured && 'lg:p-8 lg:justify-center')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
          <span>by {post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {post.readTime}
          </span>
        </div>

        <h2
          className={cn(
            'font-bold text-foreground mb-3 group-hover:text-primary transition-colors',
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          )}
        >
          <Link href={`/blogs/${post.slug}`} className="focus:outline-none focus-visible:underline">
            {post.title}
          </Link>
        </h2>

        <p className={cn('text-muted-foreground leading-relaxed mb-4', featured ? 'text-base' : 'text-sm line-clamp-3')}>
          {post.excerpt}
        </p>

        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-1 mt-auto text-sm font-medium text-primary hover:gap-2 transition-all duration-200"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
