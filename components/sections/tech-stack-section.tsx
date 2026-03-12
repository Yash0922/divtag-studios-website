import { TECH_STACK } from '@/lib/constants';
import { SectionReveal } from '@/components/section-reveal';

/**
 * How we develop – tech stack grid (Weframe-style)
 */
export function TechStackSection() {
  const categories = [
    { title: 'Frontend', items: TECH_STACK.frontend },
    { title: 'Design', items: TECH_STACK.design },
    { title: 'Mobile', items: TECH_STACK.mobile },
    { title: 'Tools', items: TECH_STACK.tools },
  ];
  return (
    <SectionReveal
      as="section"
      stagger
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dot grid + scanline + glitch background */}
      <div className="tech-stack-pattern motion-reduce:[animation:none]" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          How we develop for
        </h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Web, mobile, and design—with a stack built for scale and maintainability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {cat.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
