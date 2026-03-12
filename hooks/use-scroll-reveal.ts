'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to reveal content when it enters the viewport (Weframe-style scroll animations).
 * Adds 'is-visible' to the ref element when it crosses the threshold.
 */
export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
