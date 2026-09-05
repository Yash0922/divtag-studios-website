'use client';

import { useState } from 'react';
import { BLOG_CATEGORIES, BLOG_POSTS, type BlogPost } from '@/lib/blogs';
import { BlogCard } from '@/components/blog-card';
import { cn } from '@/lib/utils';

export function BlogListing() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categoryCounts = BLOG_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter((p) => p.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const filtered: BlogPost[] =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {/* Category filters – Unico-style pills with article counts */}
      <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
        {BLOG_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px] flex items-center gap-1.5',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <span>{category}</span>
            <span
              className={cn(
                'text-xs px-1.5 py-0.5 rounded-full',
                activeCategory === category
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {categoryCounts[category] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No articles in this category yet.</p>
      ) : (
        <div className="space-y-8">
          {featured && activeCategory === 'All' && (
            <BlogCard post={featured} featured />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'All' ? rest : filtered).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
