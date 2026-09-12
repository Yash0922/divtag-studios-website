export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  image?: string;
  content: BlogSection[];
}

export type BlogSection =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export const BLOG_CATEGORIES = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Mobile Apps',
  'SEO & Growth',
  'Engineering',
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'nextjs-vs-react-2026',
    title: 'Next.js vs React in 2026: When to Use Which',
    excerpt:
      'React is the library; Next.js is the framework built on top. Here is how to decide between them for SEO, performance, and team velocity.',
    category: 'Web Development',
    author: 'Yash Kumar Pal',
    authorRole: 'Founder, Div Tag Studios',
    publishedAt: '2026-08-15',
    readTime: '8 min read',
    featured: true,
    image: '/images/blogs/nextjs-vs-react-2026.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Every modern web project starts with a version of the same question: should we use React alone, or adopt Next.js? In 2026, the answer depends less on hype and more on how you need pages to render, how important SEO is, and how fast your team needs to ship.',
      },
      {
        type: 'heading',
        text: 'When React alone is enough',
      },
      {
        type: 'list',
        items: [
          'Internal dashboards and admin tools where SEO does not matter',
          'Single-page apps embedded inside a larger product',
          'Teams that already have a custom build pipeline and routing layer',
        ],
      },
      {
        type: 'heading',
        text: 'When Next.js wins',
      },
      {
        type: 'list',
        items: [
          'Marketing sites, portfolios, and content-heavy products that need strong SEO',
          'Projects that benefit from Server Components and built-in routing',
          'Teams that want file-based routing, image optimization, and API routes in one stack',
        ],
      },
      {
        type: 'paragraph',
        text: 'At Div Tag Studios, we default to Next.js for client-facing products because it reduces glue code and keeps Core Web Vitals easier to control. For highly interactive tools behind login, plain React with Vite can still be the faster path.',
      },
    ],
  },
  {
    slug: 'ui-ux-design-product-adoption',
    title: 'Why UI/UX Design Drives Product Adoption',
    excerpt:
      'Great engineering without thoughtful design creates friction. Here is how UX decisions compound into retention, conversion, and brand trust.',
    category: 'UI/UX Design',
    author: 'Div Tag Studios Team',
    authorRole: 'Design & Engineering',
    publishedAt: '2026-08-10',
    readTime: '7 min read',
    featured: true,
    image: '/images/blogs/ui-ux-design-product-adoption.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Users do not experience your architecture—they experience buttons, spacing, copy, and flow. UI/UX design is where product strategy becomes something people can actually use.',
      },
      {
        type: 'heading',
        text: 'What good UX actually changes',
      },
      {
        type: 'list',
        items: [
          'First-session clarity: users understand what to do in seconds, not minutes',
          'Lower support load: fewer “how do I…?” tickets when flows are obvious',
          'Higher conversion: forms, checkout, and sign-up paths with less drop-off',
        ],
      },
      {
        type: 'paragraph',
        text: 'We treat design as part of delivery—not a polish step at the end. Wireframes, prototypes, and design systems upfront save rework later and keep web and mobile experiences consistent.',
      },
    ],
  },
  {
    slug: 'native-vs-cross-platform-mobile',
    title: 'Native vs Cross-Platform Mobile Development in 2026',
    excerpt:
      'Kotlin for Android, React Native, or Flutter? A practical comparison on performance, cost, timeline, and long-term maintenance.',
    category: 'Mobile Apps',
    author: 'Div Tag Studios Team',
    authorRole: 'Mobile Engineering',
    publishedAt: '2026-07-28',
    readTime: '9 min read',
    featured: true,
    image: '/images/blogs/native-vs-cross-platform-mobile.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Cross-platform tools have matured, but native development still wins when you need deep OS integration, maximum performance, or a premium feel on a single platform.',
      },
      {
        type: 'heading',
        text: 'Choose native when',
      },
      {
        type: 'list',
        items: [
          'You are Android-first and want Material Design done properly',
          'The app relies on background services, sensors, or platform APIs',
          'Performance and polish on one OS matter more than speed to both stores',
        ],
      },
      {
        type: 'heading',
        text: 'Choose cross-platform when',
      },
      {
        type: 'list',
        items: [
          'You need iOS and Android with one codebase and a tight budget',
          'The UI is form- and content-driven rather than graphics-heavy',
          'You can accept some platform-specific tuning later',
        ],
      },
    ],
  },
  {
    slug: 'technical-seo-checklist-new-websites',
    title: 'Technical SEO Checklist for New Websites',
    excerpt:
      'Before you publish, run through this checklist: crawlability, metadata, performance, structured data, and the mistakes that block indexing.',
    category: 'SEO & Growth',
    author: 'Div Tag Studios Team',
    authorRole: 'SEO & Web',
    publishedAt: '2026-07-20',
    readTime: '10 min read',
    image: '/images/blogs/technical-seo-checklist-new-websites.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'SEO is not only keywords—it is whether search engines can find, understand, and trust your site. Technical foundations matter as much as content.',
      },
      {
        type: 'heading',
        text: 'Pre-launch essentials',
      },
      {
        type: 'list',
        items: [
          'Unique title and meta description on every indexable page',
          'Sitemap.xml and robots.txt configured correctly',
          'Canonical URLs set to avoid duplicate content',
          'Core Web Vitals: LCP, INP, and CLS within healthy ranges',
          'Mobile-friendly layout and readable font sizes',
          'Structured data (Organization, LocalBusiness, FAQ where relevant)',
        ],
      },
      {
        type: 'paragraph',
        text: 'We bake these into every Next.js launch so growth teams are not fixing crawl errors after the fact.',
      },
    ],
  },
  {
    slug: 'choose-web-development-partner-india',
    title: 'How to Choose a Web Development Partner in India',
    excerpt:
      'Rates, communication, portfolio depth, and post-launch support—what to evaluate before you sign with an agency or studio.',
    category: 'Engineering',
    author: 'Yash Kumar Pal',
    authorRole: 'Founder, Div Tag Studios',
    publishedAt: '2026-07-05',
    readTime: '8 min read',
    image: '/images/blogs/choose-web-development-partner-india.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'India has no shortage of development shops. The hard part is finding a partner who understands your product, communicates clearly, and ships maintainable code—not just a demo.',
      },
      {
        type: 'heading',
        text: 'Questions worth asking',
      },
      {
        type: 'list',
        items: [
          'Can they show live products similar to what you need—not only mockups?',
          'Who writes the code day to day, and will you talk to them directly?',
          'How do they handle scope changes, testing, and deployment?',
          'What happens after launch: bugs, hosting, and small iterations?',
        ],
      },
      {
        type: 'paragraph',
        text: 'We work as an extension of your team: transparent timelines, direct collaboration, and stacks you can hand off or scale with us long term.',
      },
    ],
  },
  {
    slug: 'building-mvp-modern-stack',
    title: 'Building an MVP with a Modern Stack in 2026',
    excerpt:
      'Scope tight, ship fast, leave room to scale. A practical MVP approach using Next.js, Tailwind, and clear feature boundaries.',
    category: 'Web Development',
    author: 'Div Tag Studios Team',
    authorRole: 'Product Engineering',
    publishedAt: '2026-06-18',
    readTime: '7 min read',
    image: '/images/blogs/building-mvp-modern-stack.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'An MVP is not a broken version of the final product—it is the smallest thing that validates your core assumption. Technology choices should support speed without painting you into a corner.',
      },
      {
        type: 'heading',
        text: 'Our default MVP stack',
      },
      {
        type: 'list',
        items: [
          'Next.js for routing, SEO, and API routes in one repo',
          'Tailwind CSS for consistent UI without design debt',
          'TypeScript for safer refactors as the product grows',
          'Email or lightweight CRM integration instead of custom admin on day one',
        ],
      },
      {
        type: 'paragraph',
        text: 'Most MVPs we deliver launch in weeks, not months—because we cut scope ruthlessly and focus on the one workflow that proves value.',
      },
    ],
  },
  {
    slug: 'dark-mode-accessible-design',
    title: 'Dark Mode and Accessible Design That Actually Works',
    excerpt:
      'Dark themes are popular—but contrast, focus states, and readability still need WCAG-minded decisions. Here is what we implement on client sites.',
    category: 'UI/UX Design',
    author: 'Div Tag Studios Team',
    authorRole: 'Design & Engineering',
    publishedAt: '2026-06-01',
    readTime: '6 min read',
    image: '/images/blogs/dark-mode-accessible-design.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Dark mode is not just inverting colors. Accessible dark UI needs deliberate contrast ratios, visible focus rings, and hierarchy that works in low light.',
      },
      {
        type: 'list',
        items: [
          'Test body text at AA contrast against backgrounds—not only headings',
          'Keep primary actions distinguishable from decorative purple accents',
          'Preserve keyboard focus indicators; never remove outlines without a replacement',
          'Use motion sparingly and respect prefers-reduced-motion',
        ],
      },
    ],
  },
  {
    slug: 'core-web-vitals-nextjs',
    title: 'Improving Core Web Vitals with Next.js',
    excerpt:
      'LCP, INP, and CLS explained in plain language—and the Next.js patterns that help marketing and product sites score well.',
    category: 'Engineering',
    author: 'Div Tag Studios Team',
    authorRole: 'Web Performance',
    publishedAt: '2026-05-22',
    readTime: '9 min read',
    image: '/images/blogs/core-web-vitals-nextjs.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Google uses Core Web Vitals as a quality signal. Slow sites lose rankings and users. Next.js gives you built-in levers—but you still have to use them correctly.',
      },
      {
        type: 'heading',
        text: 'Quick wins',
      },
      {
        type: 'list',
        items: [
          'Use next/image for responsive, lazy-loaded images',
          'Prefer static or server rendering for above-the-fold content',
          'Avoid layout shift: reserve space for fonts, images, and embeds',
          'Split client JavaScript—do not hydrate what does not need interactivity',
        ],
      },
    ],
  },
  {
    slug: 'how-much-does-website-development-cost-in-ghaziabad-2026',
    title: 'How Much Does Website Development Cost in Ghaziabad in 2026?',
    excerpt:
      'A realistic guide to web development costs in Ghaziabad and Delhi NCR: from basic business portfolios to custom e-commerce and full-stack web applications.',
    category: 'Web Development',
    author: 'Yash Kumar Pal',
    authorRole: 'Founder, Div Tag Studios',
    publishedAt: '2026-09-08',
    readTime: '6 min read',
    featured: true,
    image: '/images/blogs/nextjs-vs-react-2026.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Whether you operate a manufacturing company in Site 4 Sahibabad, a healthcare clinic in Vaishali, or a modern retail brand in Indirapuram, having an authoritative digital presence is no longer optional. However, quotes for website development in Ghaziabad can range anywhere from ₹10,000 to ₹3,00,000+. Why does such a vast price difference exist, and how much should you realistically budget in 2026?',
      },
      {
        type: 'heading',
        text: 'Pricing Tiers for Website Development in Ghaziabad',
      },
      {
        type: 'list',
        items: [
          'Basic Brochure Website (₹15,000 – ₹30,000): 4–6 pages, standard template, basic contact form. Suitable for local service providers needing simple business card presence.',
          'Custom Business Website (₹30,000 – ₹75,000): Custom UI/UX, responsive across all devices, Next.js/React engineering, SEO optimization, and high speed. Recommended for growing businesses seeking client inquiries.',
          'E-Commerce Storefront (₹50,000 – ₹1,50,000): Product catalog, payment gateway (Razorpay/Stripe), inventory management, and automated checkout.',
          'Custom Web Application / SaaS MVP (₹1,00,000 – ₹3,50,000+): Multi-user authentication, cloud databases, dashboard analytics, and custom business logic.',
        ],
      },
      {
        type: 'heading',
        text: 'Key Factors That Dictate Development Cost',
      },
      {
        type: 'list',
        items: [
          'Custom Design vs Templates: Pre-made templates are cheap initially but lack uniqueness, load slowly, and hurt local SEO rankings.',
          'Performance & Core Web Vitals: High Google Lighthouse scores require modern frameworks like Next.js and optimized assets.',
          'Content & Copywriting: Professional copy tailored to your Ghaziabad customer base drives higher conversion rates.',
          'Post-Launch Support: Reliable hosting, SSL certificates, regular backups, and SLA-backed maintenance.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Investing in a high-performance website developed by a local team ensures seamless communication, local market understanding, and a digital asset that consistently generates customer inquiries.',
      },
    ],
  },
  {
    slug: 'local-seo-checklist-for-businesses-in-ghaziabad',
    title: 'Local SEO Checklist for Businesses in Ghaziabad',
    excerpt:
      'The step-by-step blueprint to ranking in Google’s Local 3-Pack, optimizing your Google Business Profile, and attracting high-intent local customers.',
    category: 'SEO & Growth',
    author: 'Yash Kumar Pal',
    authorRole: 'Founder, Div Tag Studios',
    publishedAt: '2026-09-10',
    readTime: '7 min read',
    featured: true,
    image: '/images/blogs/seo-checklist-2026.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'When prospective customers in Ghaziabad or Delhi NCR search for your services on their phones, Google primarily evaluates three ranking factors: Relevance, Distance, and Prominence. By implementing a systematic local SEO process, your business can consistently appear in Google’s coveted Local 3-Pack.',
      },
      {
        type: 'heading',
        text: 'Step 1: Fully Verify and Optimize Google Business Profile',
      },
      {
        type: 'list',
        items: [
          'Claim and verify your exact physical business location (e.g. Pratap Vihar, Sector 11, Ghaziabad).',
          'Choose the exact primary category (e.g. Website Designer or Software Company) and add accurate secondary categories.',
          'Add genuine high-resolution office photos, team images, and client project work.',
          'Keep opening hours and contact numbers strictly up to date.',
        ],
      },
      {
        type: 'heading',
        text: 'Step 2: Collect Genuine Customer Reviews',
      },
      {
        type: 'list',
        items: [
          'Send a direct review link to satisfied clients right after completing their project.',
          'Encourage clients to naturally mention the service and city in their feedback.',
          'Respond promptly and professionally to all reviews, both positive and critical.',
        ],
      },
      {
        type: 'heading',
        text: 'Step 3: On-Page Local SEO & Structured Data',
      },
      {
        type: 'list',
        items: [
          'Include LocalBusiness and ProfessionalService schema markup in your website JSON-LD code.',
          'Target local commercial search phrases in your H1 and title tags without keyword stuffing.',
          'Build dedicated local service pages that provide genuine value to prospective buyers.',
          'Maintain consistent Name, Address, and Phone number (NAP) across all online directories.',
        ],
      },
      {
        type: 'paragraph',
        text: 'At Div Tag Studios, we implement these local SEO strategies directly for our clients to help them secure dominant local search positions and predictable organic revenue.',
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.featured);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
