'use client';

import { useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/service-card';
import { SectionReveal } from '@/components/section-reveal';

export function ServicesSection({ className }: { className?: string }) {
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

  return (
    <SectionReveal
      as="section"
      id="services"
      stagger
      className={`relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background ${className || ''}`}
    >
      {/* Video background – 0% opacity, blend with theme */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-5 transition-[visibility] duration-300"
        style={{ mixBlendMode: 'screen', isolation: 'isolate' }}
      >
        <source src="/13381565_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Services
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore the wide array of services we offer—from web and mobile development to design and SEO.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconName={service.iconName}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
