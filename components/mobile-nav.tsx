'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: Array<{ href: string; label: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeSection: string;
  className?: string;
}

/**
 * MobileNav component provides mobile navigation with hamburger menu
 * 
 * Features:
 * - Hamburger menu button (44x44px minimum for touch-friendly interaction)
 * - Sheet drawer for mobile navigation
 * - Navigation links that close drawer on click
 * - Smooth scroll behavior for section navigation
 * - Active section highlighting
 * - Touch-friendly button sizes
 * - Accessible with ARIA labels
 * 
 * Requirements: 3.1, 3.2, 3.3, 7.4
 */
export function MobileNav({
  isOpen,
  onOpenChange,
  navLinks,
  onNavClick,
  activeSection,
  className,
}: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className={cn('lg:hidden', className)}>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-[44px] min-w-[44px]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <VisuallyHidden.Root>
          <SheetTitle>Navigation menu</SheetTitle>
        </VisuallyHidden.Root>
        <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                className={cn(
                  'nav-tab-link nav-tab-link-mobile block py-3 px-4 min-h-[44px] text-lg font-medium rounded-md',
                  'transition-colors motion-reduce:transition-none',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
                  isActive && 'nav-tab-link-active text-primary font-semibold',
                  !isActive && 'text-foreground hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="#contact"
            onClick={(e) => onNavClick(e, '#contact')}
            className="gradient-cta-button mt-4 inline-flex items-center justify-center min-h-[44px] text-sm font-medium px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
          >
            <span className="gradient-cta-text">Book a Call</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
