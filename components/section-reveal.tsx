'use client';

import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div';
  stagger?: boolean;
  id?: string;
}

/**
 * Wraps content and reveals it when in viewport (Weframe-style scroll animation).
 */
export function SectionReveal({ children, className, as: Tag = 'div', stagger = false, id }: SectionRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={cn(
        'animate-on-scroll',
        isVisible && 'is-visible',
        stagger && 'stagger-children',
        className
      )}
    >
      {children}
    </Tag>
  );
}
