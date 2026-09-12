'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ServiceFAQ } from '@/lib/services-data';

interface ServiceFaqAccordionProps {
  faqs: ServiceFAQ[];
}

export function ServiceFaqAccordion({ faqs }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-xl border border-border/70 bg-card overflow-hidden transition-colors hover:border-border"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left text-base font-semibold text-foreground hover:bg-muted/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`service-faq-answer-${index}`}
              id={`service-faq-question-${index}`}
            >
              <span className="leading-snug">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180 text-primary'
                )}
                aria-hidden
              />
            </button>
            <div
              id={`service-faq-answer-${index}`}
              role="region"
              aria-labelledby={`service-faq-question-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="pb-5 px-5 pt-1 text-muted-foreground text-sm leading-relaxed border-t border-border/40">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
