import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SkipLink } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Canonical domain — www is the production domain
const siteUrl = "https://www.divtagstudios.in";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.divtagstudios.in"),
  title: {
    default: "Div Tag Studios – Web & App Development Agency in Ghaziabad",
    template: "%s | Div Tag Studios",
  },
  description:
    "Div Tag Studios is a full-service digital agency in Ghaziabad offering Web Development, Android App Development, UI/UX Design, Graphic Design, Video Editing, and SEO services. Turning Pixels into Products.",
  keywords: [
    "web development company Ghaziabad",
    "android app development Ghaziabad",
    "UI UX design agency India",
    "graphic design services Ghaziabad",
    "video editing services India",
    "SEO services Ghaziabad",
    "best digital agency near me",
    "affordable web development India",
    "mobile app developers Ghaziabad",
    "digital product studio India",
    "full stack development company Ghaziabad",
    "React Next.js developers India",
    "Kotlin Android developers Ghaziabad",
    "brand identity design India",
    "technical SEO experts India",
    "Div Tag Studios",
    "www.divtagstudios.in",
    "Turning Pixels into Products",
  ],
  authors: [{ name: "Div Tag Studios", url: siteUrl }],
  creator: "Div Tag Studios",
  publisher: "Div Tag Studios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.divtagstudios.in",
  },
  openGraph: {
    title: "Div Tag Studios – Web & App Development Agency in Ghaziabad",
    description:
      "Full-service digital agency: Web Development, Android Apps, UI/UX, Graphic Design, Video Editing & SEO. Based in Ghaziabad, India.",
    type: "website",
    url: "https://www.divtagstudios.in",
    siteName: "Div Tag Studios",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Div Tag Studios – Turning Pixels into Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Div Tag Studios – Web & App Development Agency in Ghaziabad",
    description:
      "Full-service digital agency: Web, Android, UI/UX, Graphic Design, Video & SEO. Ghaziabad, India.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/0.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    google: "skOX9PpDaKHysYiIC57ApZ38gBLWRnRRNj_FHFEjQy8a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "Div Tag Studios",
    description:
      "Full-service digital agency offering Web Development, Android App Development, UI/UX Design, Graphic Design, Video Editing, and SEO services in Ghaziabad, India.",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/1.png`,
      width: 300,
      height: 300,
    },
    image: `${siteUrl}/og-image.png`,
    telephone: "+917428244306",
    email: "contact@divtagstudios.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pratap Vihar, Sector 11",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6692",
      longitude: "77.4538",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917428244306",
      email: "contact@divtagstudios.in",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/divtagstudios/",
      "https://linkedin.com/company/divtagstudios",
      "https://github.com/Yash0922/divtag-studios-website",
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android App Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Editing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Div Tag Studios",
    description: "Full-service digital agency in Ghaziabad, India",
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Div Tag Studios offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO. From responsive websites to native mobile apps and brand identity—we cover the full digital product lifecycle.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started on a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reach out via the contact form or email. We'll schedule a short call to understand your goals, scope, and timeline, then provide a clear proposal and next steps.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with startups and small businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We work with businesses of all sizes—from startups and SMBs to larger teams. Our approach scales to your needs and budget.",
        },
      },
      {
        "@type": "Question",
        name: "What is your typical project timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timelines depend on scope. A simple website might take a few weeks; a custom web app or mobile product can run from a couple of months to longer. We'll outline this in the discovery phase.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SkipLink />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
