import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { WorkItem } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  item: WorkItem;
  className?: string;
  compact?: boolean;
}

/**
 * Case study card – Unico Connect–style layout with industry, metrics, and highlights
 */
export function WorkCard({ item, className, compact = false }: WorkCardProps) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-border bg-card overflow-hidden',
        'hover:border-primary/40 hover:shadow-xl hover:-translate-y-1',
        'transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
    >
      {/* Project Thumbnail Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted/50 border-b border-border/50">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end p-4 sm:p-5">
          <div className="flex flex-wrap gap-2 z-10">
            <span className="rounded-full bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-primary border border-primary/25 shadow-sm">
              {item.industry}
            </span>
            <span className="rounded-full bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-muted-foreground border border-border/70 shadow-sm">
              {item.region}
            </span>
          </div>
        </div>
      </div>

      <div className={cn('p-6', compact && 'p-5')}>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          {item.category}
        </p>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>

        {!compact && (
          <ul className="space-y-2 mb-6">
            {item.highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0" aria-hidden>
                  ·
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-3 gap-3 mb-5 pt-4 border-t border-border/60">
          {item.metrics.map((metric, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

interface WorkCardLinkProps extends WorkCardProps {
  href: string;
}

export function WorkCardLink({ href, ...props }: WorkCardLinkProps) {
  return (
    <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl">
      <WorkCard {...props} />
      <span className="sr-only">View {props.item.title}</span>
    </a>
  );
}

export function ExploreWorkLink({ className }: { className?: string }) {
  return (
    <a
      href="/work"
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium text-primary',
        'hover:text-primary/80 hover:gap-3 transition-all duration-200',
        className
      )}
    >
      Explore Our Work
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}
