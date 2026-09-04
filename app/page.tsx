import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustedBySection } from '@/components/sections/trusted-by-section';
import { WhyChooseSection } from '@/components/sections/why-choose-section';
import { SuccessStoriesSection } from '@/components/sections/success-stories-section';
import { TechStackSection } from '@/components/sections/tech-stack-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CTASection } from '@/components/sections/cta-section';
import { AboutSection } from '@/components/sections/about-section';
import { FAQSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

/**
 * Homepage metadata — overrides layout defaults for the root route.
 * Canonical is explicitly set to https://divtagstudios.in (no trailing slash).
 */
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://divtagstudios.in',
  },
};

/**
 * Home page - Main landing page with all sections
 * Server component for optimal performance and SEO
 * Layout inspired by WeframeTech-style agency flow
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <TrustedBySection />
        <WhyChooseSection />
        <SuccessStoriesSection />
        <TechStackSection />
        <ServicesSection />
        <CTASection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
