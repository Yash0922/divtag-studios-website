import type { BlogSection } from '@/lib/blogs';

export function BlogContent({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="w-full">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            return (
              <h2
                key={index}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mt-8 sm:mt-10 first:mt-0 mb-3 sm:mb-4 text-balance"
              >
                {section.text}
              </h2>
            );
          case 'paragraph':
            return (
              <p
                key={index}
                className="text-[0.9375rem] sm:text-base leading-[1.75] text-muted-foreground mb-4 sm:mb-5 last:mb-0"
              >
                {section.text}
              </p>
            );
          case 'list':
            return (
              <ul key={index} className="list-none space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 last:mb-0">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.9375rem] sm:text-base leading-relaxed text-muted-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
