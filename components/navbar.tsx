'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/mobile-nav';

interface NavbarProps {
  className?: string;
}

const navLinks = [
  { href: '#hero', label: 'Home' },
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

  // Intersection Observer for active section highlighting
  useEffect(() => {
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
    const sections = navLinks.map((link) => 
      document.getElementById(link.href.replace('#', ''))
    ).filter(Boolean) as HTMLElement[];

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Respect user's motion preferences
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'motion-reduce:transition-none',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-background',
        className
      )}
    >
      <nav className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl" aria-label="Main navigation">
        <div className="flex min-h-16 h-24 items-center justify-between">
          {/* Logo - left corner on mobile, larger size; full size on desktop */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center justify-start shrink-0 self-center text-foreground hover:opacity-90 transition-opacity motion-reduce:transition-none rounded-lg py-1 pr-2 lg:px-1"
            aria-label="Div Tag Studios - Home"
          >
            <Image
              src="/1.png"
              alt="Div Tag Studios"
              width={400}
              height={150}
              className="h-28 w-auto object-contain object-left sm:h-35 md:h-36 lg:h-[15rem]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'nav-tab-link inline-block py-3 px-1 min-h-[44px] text-sm font-medium rounded-md',
                    'transition-colors motion-reduce:transition-none',
                    'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              onClick={(e) => handleNavClick(e, ctaHref)}
              className="gradient-cta-button inline-flex items-center justify-center min-h-[44px] text-sm font-medium px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none no-underline"
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
