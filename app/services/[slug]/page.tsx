import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';
import { WorkCard } from '@/components/work-card';
import { LOCAL_SERVICES, getServiceBySlug } from '@/lib/services-data';
import { WORK_ITEMS } from '@/lib/constants';
import { ServiceFaqAccordion } from './service-faq-accordion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Layers,
  PhoneCall
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCAL_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Div Tag Studios',
    };
  }

  const canonicalUrl = `https://www.divtagstudios.in/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: 'Div Tag Studios',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://www.divtagstudios.in/og-image.png',
          width: 1200,
          height: 630,
          alt: `${service.title} - Div Tag Studios Ghaziabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: ['https://www.divtagstudios.in/og-image.png'],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedWorks = WORK_ITEMS.filter((item) =>
    service.relatedCaseStudyIds.includes(item.id)
  );

  const otherServices = LOCAL_SERVICES.filter((s) => s.slug !== service.slug);

  // Schema.org structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.heading,
    description: service.overview,
    provider: {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      name: 'Div Tag Studios',
      url: 'https://www.divtagstudios.in',
      telephone: '+91 7428244306',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pratap Vihar, Sector 11',
        addressLocality: 'Ghaziabad',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201009',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Ghaziabad' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Delhi NCR' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.title,
          description: item.description,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.divtagstudios.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.divtagstudios.in/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.divtagstudios.in/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none pt-24">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] py-3 text-xs md:text-sm text-muted-foreground">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              <Link href="/#services" className="hover:text-foreground transition-colors">
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                {service.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-background">
          <CodeMatrixBackground />
          <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <MapPin className="h-3.5 w-3.5" />
                {service.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
                {service.heading}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {service.subheading}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center min-h-[48px] rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Book Project Consultation
                </Link>
                <Link
                  href="#case-studies"
                  className="inline-flex items-center justify-center min-h-[48px] rounded-full border border-border px-6 text-sm font-medium text-foreground hover:bg-muted/50 hover:border-primary/40 transition-colors"
                >
                  View Case Studies
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>

              {/* Service Quick Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>{service.timelineEstimate.split(';')[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Pratap Vihar, Ghaziabad</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground col-span-2 sm:col-span-1">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>30-Day Post-Launch SLA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Who It Is For */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-card/40 border-y border-border/40">
          <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="h-4 w-4" />
                  Strategic Overview
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Built to give your business an unfair advantage
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {service.overview}
                </p>
                <div className="pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">
                    Technologies &amp; Frameworks We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-background/80 border border-border text-xs font-medium text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl border border-border/70 bg-card/80 p-6 sm:p-8 backdrop-blur-sm shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Who This Service Is For
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We partner with companies across Ghaziabad and Delhi NCR that demand high quality and commercial results:
                </p>
                <ul className="space-y-3.5">
                  {service.targetAudience.map((audience, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                      <div className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{idx + 1}</span>
                      </div>
                      <span className="leading-relaxed">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                What We Deliver
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Key Deliverables &amp; Solutions
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Every project is delivered with enterprise-grade quality, clean source files, and thorough documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-card/60 p-6 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 font-bold text-sm">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {deliv.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {deliv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5-Step Process Section */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-card/40 border-y border-border/40">
          <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                How We Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Proven 5-Stage Process
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                A transparent, milestone-based methodology keeping your project on time and within budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-xl border border-border/60 bg-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-primary/80">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedWorks.length > 0 && (
          <section
            id="case-studies"
            className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-background"
          >
            <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                    Portfolio &amp; Proof
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Featured Work &amp; Case Studies
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:underline group"
                >
                  View all portfolio projects
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedWorks.map((work) => (
                  <WorkCard key={work.id} item={work} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Localized FAQ Section */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-card/50 border-t border-border/40">
          <div className="container relative z-10 mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                Common Questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Answers to questions clients in Ghaziabad and Delhi NCR ask us before getting started.
              </p>
            </div>

            <ServiceFaqAccordion faqs={service.faqs} />
          </div>
        </section>

        {/* Explore Other Services Cross-Linking */}
        <section className="relative py-16 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-background border-t border-border/40">
          <div className="container relative z-10 mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Other Services Offered in Ghaziabad
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="rounded-xl border border-border/60 bg-card/60 p-4 hover:border-primary/50 hover:bg-card transition-all group"
                >
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    {other.title.replace(' in Ghaziabad', '')}
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {other.subheading}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="relative py-20 px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16 overflow-hidden bg-gradient-to-b from-card/90 to-background border-t border-border/50 text-center">
          <div className="container relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to grow your business in Ghaziabad?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              Schedule a direct consultation with our engineering and design team. We’ll discuss your requirements, provide actionable suggestions, and share an itemized project proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center min-h-[48px] rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                Get a Free Proposal &amp; Quote
              </Link>
              <a
                href="tel:+917428244306"
                className="inline-flex items-center justify-center min-h-[48px] rounded-full border border-border px-6 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                Call +91 7428244306
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
