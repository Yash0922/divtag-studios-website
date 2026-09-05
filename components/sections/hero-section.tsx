'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function HeroSection({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => {
      if (mq.matches) {
        video.pause();
        video.style.visibility = 'hidden';
      } else {
        video.style.visibility = '';
        video.play().catch(() => {});
      }
    };
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 overflow-hidden bg-background ${className || ''}`}
    >
      {/* Video background: screen blend for dark theme */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-[visibility] duration-300 opacity-35"
        style={{
          isolation: 'isolate',
          mixBlendMode: 'screen',
        }}
      >
        <source src="/14492294_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        {/* Visible H1 for SEO — styled to match the brand tagline */}
        <h1
          className="text-sm md:text-base font-medium text-primary uppercase tracking-[0.2em] mb-6 animate-fade-in opacity-0"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Digital Product Studio
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6">
          <span
            className="block text-gradient-hero animate-fade-in-up opacity-0 pb-2"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            Turning Pixels
          </span>
          <span
            className="block text-gradient-hero animate-fade-in-up opacity-0 "
            style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
          >
            into Products
          </span>
        </p>
        <p
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
        >
          We build digital platforms and experiences that scale—from web and mobile to design and growth.
        </p>
        <div
          className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}
        >
          <button
            type="button"
            className="gradient-cta-button motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => scrollToSection('contact')}
          >
            <span className="gradient-cta-text">Book a Call</span>
          </button>
          <Link
            href="/work"
            className="inline-flex items-center justify-center min-h-[48px] rounded-full border border-primary/50 px-8 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary transition-colors motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
