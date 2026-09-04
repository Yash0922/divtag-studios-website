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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.divtagstudios.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Div Tag Studios – Web & App Development Agency in Ghaziabad",
    template: "%s | Div Tag Studios",
  },
  description:
    "Div Tag Studios is a full-service digital agency in Ghaziabad offering Web Development, Android App Development, UI/UX Design, Graphic Design, Video Editing, and SEO services. Turning Pixels into Products.",
  keywords: [
    // Primary service keywords
    "web development company Ghaziabad",
    "android app development Ghaziabad",
    "UI UX design agency India",
    "graphic design services Ghaziabad",
    "video editing services India",
    "SEO services Ghaziabad",
    // AI / generative search keywords
    "best digital agency near me",
    "affordable web development India",
    "mobile app developers Ghaziabad",
    "digital product studio India",
    "full stack development company Ghaziabad",
    "React Next.js developers India",
    "Kotlin Android developers Ghaziabad",
    "brand identity design India",
    "technical SEO experts India",
    // Brand
    "Div Tag Studios",
    "divtagstudios.in",
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
    canonical: siteUrl,
  },
  openGraph: {
    title: "Div Tag Studios – Web & App Development Agency in Ghaziabad",
    description:
      "Full-service digital agency: Web Development, Android Apps, UI/UX, Graphic Design, Video Editing & SEO. Based in Ghaziabad, India.",
    type: "website",
    url: siteUrl,
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
    site: "@divtagstudios",
    creator: "@divtagstudios",
  },
  icons: {
    icon: "/1.png",
    apple: "/0.png",
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
    logo: `${siteUrl}/1.png`,
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
      // TODO: Replace with precise coordinates for Pratap Vihar Sector 11 Ghaziabad
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
      "https://twitter.com/divtagstudios",
      "https://linkedin.com/company/divtagstudios",
      "https://github.com/divtagstudios",
    ],
    priceRange: "$$",
    servesCuisine: undefined,
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
