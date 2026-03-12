import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { CONTACT_INFO } from '@/lib/constants';
import { SectionReveal } from '@/components/section-reveal';
import { CodeMatrixBackground } from '@/components/code-matrix-bg';

/**
 * ContactSection component wraps the ContactForm with section layout
 */
export function ContactSection() {
  return (
    <SectionReveal
      as="section"
      id="contact"
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden bg-background"
    >
      <CodeMatrixBackground />
      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Section heading with proper hierarchy */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Contact Us
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-6">
                Reach out to us directly through any of the following channels. We&apos;re here to help bring your ideas to life.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a 
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-muted-foreground">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
