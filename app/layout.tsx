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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divtagstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Div Tag Studios - Turning Pixels into Products",
  description: "Professional digital services including Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO. Transform your ideas into reality.",
  icons: {
    icon: "/1.png",
    apple: "/0.png",
  },
  keywords: [
    "web development",
    "android development",
    "ui ux design",
    "graphic design",
    "video editing",
    "seo services",
    "digital agency",
  ],
  authors: [{ name: "Div Tag Studios" }],
  openGraph: {
    title: "Div Tag Studios - Turning Pixels into Products",
    description: "Professional digital services for modern businesses",
    type: "website",
    url: "https://divtagstudios.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 800,
        alt: "Div Tag Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Div Tag Studios - Turning Pixels into Products",
    description: "Professional digital services for modern businesses",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Div Tag Studios",
    description:
      "Professional digital services company offering Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO services",
    url: "https://divtagstudios.com",
    logo: "https://divtagstudios.com/1.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@divtagstudios.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://twitter.com/divtagstudios",
      "https://linkedin.com/company/divtagstudios",
      "https://github.com/divtagstudios",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
