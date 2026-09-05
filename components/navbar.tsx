'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/mobile-nav';

interface NavbarProps {
  className?: string;
}

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '/work', label: 'Work', isRoute: true },
  { href: '/blogs', label: 'Blogs', isRoute: true },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const ctaLabel = 'Book a Call';
const ctaHref = '#contact';

/**
 * Navbar component provides persistent navigation across all viewport sizes
 * 
 * Features:
 * - Sticky/fixed positioning at top of viewport
 * - Desktop: Horizontal navigation menu with logo and links
 * - Mobile: Logo + hamburger button that opens Sheet drawer
 * - Backdrop blur effect on scroll
 * - Smooth scroll behavior for section navigation
 * - Active section highlighting using Intersection Observer API
 * - Client component for scroll detection and mobile menu state
 * 
 * Requirements: 1.3, 3.1, 3.2, 3.4
 */
export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting (homepage only)
  useEffect(() => {
    if (!isHome) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = navLinks
      .filter((link) => link.href.startsWith('#'))
      .map((link) => document.getElementById(link.href.replace('#', '')))
      .filter(Boolean) as HTMLElement[];

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (href.startsWith('/') && !href.startsWith('/#')) {
      return;
    }

    e.preventDefault();

    const targetId = href.replace('#', '');
    const element = isHome ? document.getElementById(targetId) : null;

    if (element) {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    } else {
      window.location.href = href.startsWith('#') ? `/${href}` : href;
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'motion-reduce:transition-none',
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border/60 py-1'
          : 'bg-background/70 backdrop-blur-md border-b border-border/20 py-2 sm:py-3',
        className
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" aria-label="Main navigation">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-4">
          {/* Logo - enlarged, crisp, and responsive */}
          <Link
            href="/"
            className="flex items-center justify-start shrink-0 self-center text-foreground hover:opacity-95 transition-all motion-reduce:transition-none rounded-xl py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Div Tag Studios - Home"
          >
            <Image
              src="/1.png"
              alt="Div Tag Studios"
              width={240}
              height={90}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-card/50 border border-border/50 backdrop-blur-md shadow-inner">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '').replace(/^\//, '');
                const isActive = link.href === '/work'
                  ? pathname === '/work'
                  : link.href === '/blogs'
                    ? pathname.startsWith('/blogs')
                    : isHome && activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'px-4 py-2 min-h-[40px] text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center',
                      'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Link
              href={isHome ? ctaHref : '/#contact'}
              onClick={(e) => isHome && handleNavClick(e, ctaHref)}
              className="gradient-cta-button inline-flex items-center justify-center min-h-[44px] text-sm font-medium px-6 ml-2 shadow-md hover:shadow-primary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
            >
              <span className="gradient-cta-text">{ctaLabel}</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNav
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            navLinks={navLinks}
            onNavClick={handleNavClick}
            activeSection={activeSection}
          />
        </div>
      </nav>
    </header>
  );
}
