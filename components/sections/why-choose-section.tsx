'use client';

import { useMemo } from 'react';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { SectionReveal } from '@/components/section-reveal';

const COLUMN_COUNT = 50;
const FALL_DELAYS = [2.5, 3.2, 1.8, 2.9, 1.5, 3.8, 2.1, 2.7, 3.4, 1.9, 3.6, 2.3, 3.1, 2.6, 3.7, 2.8, 3.3, 2.2, 3.9, 2.4, 1.7, 3.5, 2, 4, 1.6, 3, 3.8, 2.5, 3.2, 2.7, 1.8, 3.6, 2.1, 3.4, 2.8, 3.7, 2.3, 1.9, 3.5, 2.6];
/* Slower drop: base durations scaled ~2.5x (about 7–11s per column) */
const FALL_DURATIONS = [7.5, 10, 6.25, 8.75, 7.5, 11.25, 7, 8, 9.5, 6.75, 10.5, 7.75, 9, 7.25, 10.25, 8.25, 9.25, 6.5, 10.75, 8.5, 6, 9.75, 7.5, 11, 5.75, 8.75, 10, 7, 9, 8, 6.75, 10.25, 7.75, 9.25, 7.25, 10.5, 8.25, 6.25, 9.5, 8.5];

/**
 * Why choose us – 3-column comparison (Weframe-style)
 */
export function WhyChooseSection() {
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMN_COUNT }, (_, i) => ({
        left: `${(i / COLUMN_COUNT) * 100}%`,
        delay: -(FALL_DELAYS[i % FALL_DELAYS.length] ?? 2),
        duration: FALL_DURATIONS[i % FALL_DURATIONS.length] ?? 3,
      })),
    []
  );

  const { left, center, right } = WHY_CHOOSE_US;
  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-card/90 border-y border-primary/40"
    >
      {/* Matrix code-rain background – code characters only */}
      <div className="matrix-rain-container" aria-hidden>
        <div className="matrix-rain-track">
          {columns.map((col, i) => (
            <div
              key={i}
              className="matrix-rain-column motion-reduce:animate-none"
              style={{
                left: col.left,
                animationDelay: `${col.delay}s`,
                animationDuration: `${col.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">
          Why choose Div Tag Studios?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6">{left.title}</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {left.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-muted-foreground/60 mt-1.5">·</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-card p-6 md:p-8 shadow-md ring-2 ring-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-6">{center.title}</h3>
            <ul className="space-y-3 text-foreground/90 text-sm">
              {center.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5" aria-hidden>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6">{right.title}</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {right.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-muted-foreground/60 mt-1.5">·</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
