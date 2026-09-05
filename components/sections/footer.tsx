'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';

/**
 * Footer component displaying copyright, social links, and contact information
 * Client component for keyboard event handling
 * 
 * @requirements 9.3 - Display company information in footer
 * @requirements 10.1 - Keyboard navigation support
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = 'mailto:contact@divtagstudios.in';
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[rgb(12,18,33)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link href="#hero" className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
              <Image
                src="/1.png"
                alt="Div Tag Studios"
                width={180}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Turning Pixels into Products
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <a
              href="mailto:contact@divtagstudios.in"
              onKeyDown={handleEmailKeyDown}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            >
              <Mail className="h-4 w-4" />
              contact@divtagstudios.in
            </a>
            <a
              href="tel:+917428244306"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md mt-2"
            >
              +91 7428244306
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Pratap Vihar, Sector 11,<br />Ghaziabad, UP, India
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-6 flex-wrap">
              <a
                href="https://www.linkedin.com/company/div-tag-studios/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                onKeyDown={(e) => handleKeyDown(e, 'https://www.linkedin.com/company/div-tag-studios/')}
                className="footer-social-icon focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                style={{ ['--footer-icon-color' as string]: '#0A66C2' }}
              >
                <div className="footer-social-layer">
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden>
                    <span className="footer-social-icon-inner">
                      <Linkedin className="h-6 w-6" />
                    </span>
                  </span>
                </div>
                <span className="footer-social-label">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/divtagstudios/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram profile"
                onKeyDown={(e) => handleKeyDown(e, 'https://www.instagram.com/divtagstudios/')}
                className="footer-social-icon focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                style={{ ['--footer-icon-color' as string]: '#E1306C' }}
              >
                <div className="footer-social-layer">
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden>
                    <span className="footer-social-icon-inner">
                      <Instagram className="h-6 w-6" />
                    </span>
                  </span>
                </div>
                <span className="footer-social-label">Instagram</span>
              </a>
              <a
                href="https://github.com/Yash0922/divtag-studios-website"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub profile"
                onKeyDown={(e) => handleKeyDown(e, 'https://github.com/Yash0922/divtag-studios-website')}
                className="footer-social-icon focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                style={{ ['--footer-icon-color' as string]: '#e6edf3' }}
              >
                <div className="footer-social-layer">
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden />
                  <span className="footer-social-layer-span" aria-hidden>
                    <span className="footer-social-icon-inner">
                      <Github className="h-6 w-6" />
                    </span>
                  </span>
                </div>
                <span className="footer-social-label">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - dark bar so white logo (0.png) is visible */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
            <span className="text-muted-foreground/60">·</span>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-muted-foreground/90">© {currentYear} Div Tag Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
