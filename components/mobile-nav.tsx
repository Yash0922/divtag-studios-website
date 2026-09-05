'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: Array<{ href: string; label: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeSection: string;
  className?: string;
}

export function MobileNav({
  isOpen,
  onOpenChange,
  navLinks,
  onNavClick,
  activeSection,
  className,
}: MobileNavProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className={cn('lg:hidden', className)}>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-[44px] min-w-[44px] hover:bg-primary/10 rounded-xl"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-card/95 backdrop-blur-xl border-l border-border/60 p-6 flex flex-col justify-between">
        <div>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <div className="flex items-center gap-3 pb-6 border-b border-border/50">
            <Image
              src="/1.png"
              alt="Div Tag Studios"
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
          <nav className="flex flex-col gap-2 mt-6" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '').replace(/^\//, '');
              const isActive = link.href === '/work'
                ? pathname === '/work'
                : link.href === '/blogs'
                  ? pathname.startsWith('/blogs')
                  : isHome && activeSection === sectionId;
              const href = link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  onClick={(e) => onNavClick(e, link.href)}
                  className={cn(
                    'block py-3 px-4 min-h-[48px] text-base font-medium rounded-xl transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border/50">
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => isHome && onNavClick(e, '#contact')}
            className="gradient-cta-button w-full inline-flex items-center justify-center min-h-[48px] text-sm font-medium px-5 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline rounded-xl"
          >
            <span className="gradient-cta-text">Book a Call</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
