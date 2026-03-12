'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';
import { SectionReveal } from '@/components/section-reveal';

/**
 * FAQ section – accordion (Weframe-style "Got questions? We got answers")
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background"
    >
      <CodeMatrixBackground />
      <div className="container relative z-10 mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Got questions? We got answers
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left text-base font-medium text-foreground hover:bg-muted/50 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {item.question}
                  <ChevronDown
                    className={cn('h-5 w-5 flex-shrink-0 transition-transform motion-reduce:transition-none', isOpen && 'rotate-180')}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={cn('overflow-hidden transition-all motion-reduce:transition-none', isOpen ? 'max-h-96' : 'max-h-0')}
                >
                  <p className="pb-4 px-5 pt-0 text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
