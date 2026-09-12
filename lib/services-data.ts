export interface ServiceProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface LocalServiceDetail {
  slug: string;
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  badge: string;
  overview: string;
  targetAudience: string[];
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  techStack: string[];
  timelineEstimate: string;
  relatedCaseStudyIds: string[];
  faqs: ServiceFAQ[];
}

export const LOCAL_SERVICES: LocalServiceDetail[] = [
  {
    slug: 'web-development-ghaziabad',
    id: 'web-development',
    title: 'Web Development in Ghaziabad',
    metaTitle: 'Web Development Company in Ghaziabad | Div Tag Studios',
    metaDescription:
      'Div Tag Studios is a premier web development company in Ghaziabad. We build fast, responsive Next.js websites, e-commerce stores, and custom web applications for growing businesses.',
    heading: 'Web Development Company in Ghaziabad',
    subheading:
      'Engineered for speed, built for conversion. We craft high-performance websites and custom web platforms for startups and businesses across Ghaziabad, Noida, and Delhi NCR.',
    badge: 'Custom Web Solutions · Ghaziabad & Delhi NCR',
    overview:
      'In a competitive market like Ghaziabad and Delhi NCR, your website is your digital storefront and your primary sales driver. At Div Tag Studios, we don’t build cookie-cutter templates. We architect modern, lightning-fast web solutions using Next.js, React, Node.js, and Tailwind CSS tailored to your commercial objectives, SEO performance, and user retention.',
    targetAudience: [
      'Ghaziabad & Delhi NCR startups needing a high-converting MVP or product launch',
      'Local manufacturing, logistics, and retail businesses modernizing their web presence',
      'E-commerce brands seeking fast load times, seamless checkout, and mobile-first UX',
      'Service businesses and clinics requiring automated booking and customer lead capture',
    ],
    deliverables: [
      {
        title: 'Custom Responsive Websites',
        description: 'Pixel-perfect, mobile-first designs optimized for every screen size from smartphones to 4K displays.',
      },
      {
        title: 'High-Performance Web Applications',
        description: 'Scalable web applications built with Next.js, TypeScript, and modern APIs for complex operational workflows.',
      },
      {
        title: 'E-Commerce & Payment Portals',
        description: 'Custom online storefronts with Razorpay, Cashfree, Stripe, inventory tracking, and high-speed checkout.',
      },
      {
        title: 'Technical SEO & Core Web Vitals',
        description: 'Sub-second load times, structured data markup, semantic HTML5, and 90+ Google Lighthouse performance scores.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Requirement Analysis',
        duration: '3–5 Days',
        description: 'We analyze your target audience in Ghaziabad/NCR, competitor positioning, functional requirements, and technical architecture.',
      },
      {
        step: '02',
        title: 'UI/UX Wireframes & Prototypes',
        duration: '1–2 Weeks',
        description: 'Interactive Figma design systems and clickable prototypes with user journey mapping before writing a single line of code.',
      },
      {
        step: '03',
        title: 'Frontend & Backend Engineering',
        duration: '2–4 Weeks',
        description: 'Clean, type-safe development using React/Next.js, Tailwind CSS, secure API integrations, and CMS configuration.',
      },
      {
        step: '04',
        title: 'Testing, QA & Core Web Vitals Audit',
        duration: '1 Week',
        description: 'Cross-browser testing, accessibility (WCAG AA), security verification, and performance optimization.',
      },
      {
        step: '05',
        title: 'Deployment & Ongoing Support',
        duration: 'Continuous',
        description: 'Production rollout with CDN caching, Google Search Console indexing, domain configuration, and SLA-backed maintenance.',
      },
    ],
    techStack: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'AWS'],
    timelineEstimate: '3 to 6 weeks for standard business websites; 6 to 12 weeks for custom web applications',
    relatedCaseStudyIds: ['ecommerce-platform', 'saas-dashboard', 'restaurant-ordering'],
    faqs: [
      {
        question: 'How much does website development cost in Ghaziabad?',
        answer:
          'A modern business website typically ranges from ₹25,000 to ₹75,000 depending on complexity, features, and custom design requirements. Custom e-commerce platforms and web apps generally start from ₹60,000 upwards. We provide transparent, milestone-based quotes with no hidden costs.',
      },
      {
        question: 'Do you provide maintenance and updates after the website launches?',
        answer:
          'Yes, every website comes with 30 days of complimentary post-launch support and bug fixes. We also offer affordable monthly maintenance plans that cover security patches, content updates, speed optimization, and backups.',
      },
      {
        question: 'Will my website be optimized for mobile phones and local search?',
        answer:
          'Absolutely. Every site we build is 100% mobile-responsive, accessible, and structured according to Google’s local SEO guidelines with schema markup, fast loading speeds, and optimized meta tags.',
      },
      {
        question: 'Can we meet in person in Ghaziabad to discuss our project?',
        answer:
          'Yes! Our studio is located at Pratap Vihar, Sector 11, Ghaziabad. We regularly meet clients locally across Ghaziabad, Indirapuram, Vaishali, Raj Nagar Extension, and Noida.',
      },
      {
        question: 'How long does it take to design and launch a website?',
        answer:
          'A typical corporate or service website takes between 3 to 5 weeks from initial discovery to final deployment. More complex e-commerce or SaaS platforms require 6 to 10 weeks.',
      },
    ],
  },
  {
    slug: 'android-app-development-ghaziabad',
    id: 'android-development',
    title: 'Android App Development in Ghaziabad',
    metaTitle: 'Android App Development Company in Ghaziabad | Div Tag Studios',
    metaDescription:
      'Top Android app development company in Ghaziabad. Div Tag Studios builds scalable native Kotlin and Flutter apps with intuitive UX, real-time sync, and Google Play Store deployment.',
    heading: 'Android App Development Company in Ghaziabad',
    subheading:
      'Native performance, smooth animations, and rock-solid architecture. We develop Android applications that engage users and scale effortlessly.',
    badge: 'Mobile App Engineering · Native Kotlin & Flutter',
    overview:
      'With millions of Android users in India, a well-engineered mobile application can transform your business reach. Div Tag Studios provides end-to-end Android development in Ghaziabad—from architecture and UI/UX design to API integration, offline-first sync, and Google Play Store deployment.',
    targetAudience: [
      'Startups building their first mobile product for the Indian and global market',
      'Retail and D2C brands wanting a dedicated mobile commerce channel',
      'Enterprises needing custom internal mobile tools and field agent apps',
      'Health, fitness, and ed-tech companies needing real-time user engagement',
    ],
    deliverables: [
      {
        title: 'Native Android Applications (Kotlin)',
        description: 'Modern MVVM/Clean Architecture apps leveraging Jetpack Compose, Coroutines, and native hardware features.',
      },
      {
        title: 'Cross-Platform Mobile Apps',
        description: 'Cost-effective multi-platform apps built with React Native or Flutter without compromising speed or polish.',
      },
      {
        title: 'Backend APIs & Cloud Integration',
        description: 'Secure, low-latency REST and GraphQL APIs, push notifications (FCM), and cloud databases.',
      },
      {
        title: 'Play Store Publishing & ASO',
        description: 'Complete assistance with Google Play Developer Console setup, App Store Optimization (ASO), and policy compliance.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Product Scope & UX Architecture',
        duration: '1–2 Weeks',
        description: 'User personas, technical feasibility study, screen flow wireframing, and API contract definition.',
      },
      {
        step: '02',
        title: 'UI Design & Interactive Prototype',
        duration: '1–2 Weeks',
        description: 'Material You design system in Figma, micro-interactions, dark/light theme variants, and client review.',
      },
      {
        step: '03',
        title: 'App Development & Integration',
        duration: '4–8 Weeks',
        description: 'Native Kotlin/Flutter coding, local SQLite/Room caching, authentication, third-party SDKs, and payment gateways.',
      },
      {
        step: '04',
        title: 'Device Testing & QA',
        duration: '1–2 Weeks',
        description: 'Rigorous testing across real Android devices (various screen sizes, OS versions, RAM capacities, and network conditions).',
      },
      {
        step: '05',
        title: 'Play Store Launch & Analytics',
        duration: '1 Week',
        description: 'Release build preparation, signing, privacy policy compliance, submission, and crash analytics setup.',
      },
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Flutter', 'Firebase', 'Node.js', 'PostgreSQL', 'Google Cloud'],
    timelineEstimate: '6 to 12 weeks depending on features, integrations, and complexity',
    relatedCaseStudyIds: ['fitness-app', 'restaurant-ordering'],
    faqs: [
      {
        question: 'Do you help publish the app to the Google Play Store?',
        answer:
          'Yes, we manage the entire publishing process including generating release keys, preparing store assets, drafting privacy policies, and addressing Google Play review guidelines.',
      },
      {
        question: 'Should I choose native Android (Kotlin) or cross-platform (Flutter)?',
        answer:
          'Native Kotlin is ideal for apps requiring deep hardware access, intensive background tasks, or peak performance. Flutter/React Native is best when you want to launch on both Android and iOS simultaneously within a leaner budget.',
      },
      {
        question: 'How do you handle backend and API development for mobile apps?',
        answer:
          'We build robust, scalable backends using Node.js, Express, or Firebase, featuring secure JWT authentication, cloud storage, push notifications, and database caching.',
      },
      {
        question: 'How much does Android app development cost in India?',
        answer:
          'Basic MVP apps generally start around ₹60,000 to ₹1,50,000. Feature-rich apps with real-time tracking, payment gateways, and custom backend infrastructure range between ₹1,50,000 and ₹4,00,000+.',
      },
    ],
  },
  {
    slug: 'ui-ux-design-ghaziabad',
    id: 'ui-ux-design',
    title: 'UI/UX Design Agency in Ghaziabad',
    metaTitle: 'UI/UX Design Agency in Ghaziabad | Div Tag Studios',
    metaDescription:
      'Premier UI/UX design agency in Ghaziabad. We craft human-centered digital experiences, Figma design systems, wireframes, and intuitive interfaces that maximize conversion rates.',
    heading: 'UI/UX Design Agency in Ghaziabad',
    subheading:
      'Turning complex product workflows into intuitive, beautiful user experiences. Design systems, wireframing, and interactive Figma prototypes that drive user delight and revenue.',
    badge: 'Human-Centered Design · Figma & Product Design',
    overview:
      'Great design is not just how something looks—it is how effortlessly it works. Div Tag Studios combines deep behavioral empathy with modern visual aesthetics. We craft design systems, interactive prototypes, and conversion-centered interfaces that help tech startups and businesses retain customers and stand out.',
    targetAudience: [
      'SaaS and software founders needing high-fidelity product design before engineering',
      'Companies with outdated legacy software wanting a modern, accessible overhaul',
      'Startups pitching to investors who need clickable prototypes and visual credibility',
      'E-commerce brands looking to reduce cart abandonment through better checkout UX',
    ],
    deliverables: [
      {
        title: 'User Research & Journey Mapping',
        description: 'Audience personas, user story maps, friction audits, and competitive UX benchmarking.',
      },
      {
        title: 'Wireframes & Information Architecture',
        description: 'Low-fidelity layouts mapping product flow, content hierarchy, and navigation logic.',
      },
      {
        title: 'High-Fidelity Interactive Prototypes',
        description: 'Pixel-perfect, clickable Figma prototypes simulating real product behavior for user testing and stakeholder demos.',
      },
      {
        title: 'Scalable Design Systems',
        description: 'Reusable UI component libraries, tokens, typography scales, dark/light modes, and developer handoff specs.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'User & Product Discovery',
        duration: '3–5 Days',
        description: 'Deep dive into user pain points, business metrics, and competitive landscapes.',
      },
      {
        step: '02',
        title: 'Information Architecture & Wireframing',
        duration: '1–2 Weeks',
        description: 'Structuring intuitive product flows, page layouts, and core interaction loops.',
      },
      {
        step: '03',
        title: 'Visual Design & Theming',
        duration: '1–2 Weeks',
        description: 'Elevating wireframes into polished, modern interfaces with custom color theory, iconography, and micro-interactions.',
      },
      {
        step: '04',
        title: 'Interactive Prototyping & Testing',
        duration: '1 Week',
        description: 'Testing animations, state transitions, and usability with stakeholders and test users.',
      },
      {
        step: '05',
        title: 'Developer Handoff',
        duration: '2–3 Days',
        description: 'Comprehensive Figma specs, asset exports, responsive breakpoints, and CSS token documentation.',
      },
    ],
    techStack: ['Figma', 'FigJam', 'Framer', 'Design Systems', 'WCAG AA Compliance'],
    timelineEstimate: '2 to 5 weeks depending on the number of screens and complexity',
    relatedCaseStudyIds: ['saas-dashboard', 'ecommerce-platform', 'brand-identity'],
    faqs: [
      {
        question: 'What deliverables do you provide at the end of a design project?',
        answer:
          'You receive a comprehensive, neatly organized Figma file with interactive components, responsive screen layouts (mobile, tablet, desktop), color and typography style guides, asset exports, and developer handoff notes.',
      },
      {
        question: 'Do you also develop the designs you create?',
        answer:
          'Yes! We are a full-stack studio. Our in-house engineering team can develop your designs into production-ready web or mobile applications with 100% fidelity.',
      },
      {
        question: 'Can you redesign our existing app or website?',
        answer:
          'Yes. We perform a UX heuristic audit on your existing platform, identify friction points and drop-offs, and redesign the interface for superior usability and modern visual appeal.',
      },
    ],
  },
  {
    slug: 'graphic-design-ghaziabad',
    id: 'graphic-design',
    title: 'Graphic Design Agency in Ghaziabad',
    metaTitle: 'Graphic Design & Brand Identity Agency in Ghaziabad | Div Tag Studios',
    metaDescription:
      'Elevate your brand with professional graphic design services in Ghaziabad. Logo design, brand identity systems, marketing collateral, social media creatives, and print design.',
    heading: 'Graphic Design Agency in Ghaziabad',
    subheading:
      'Memorable brand identities, distinctive logos, and marketing creatives that capture attention and build lasting customer trust across digital and physical touchpoints.',
    badge: 'Brand Identity & Visual Design · Ghaziabad',
    overview:
      'Your visual identity is the first thing customers remember. Div Tag Studios helps Ghaziabad businesses stand out in crowded markets through cohesive branding, distinctive typography, iconic logos, and high-impact marketing collateral that reflect your values and command authority.',
    targetAudience: [
      'New businesses needing complete branding from logo design to brand guidelines',
      'Established brands seeking a modern rebrand to attract younger demographics',
      'Companies needing consistent social media creatives, marketing decks, and banners',
      'Product brands requiring packaging design and physical collateral',
    ],
    deliverables: [
      {
        title: 'Logo Design & Visual Identity',
        description: 'Custom primary logos, secondary marks, favicons, and vector files in all formats (SVG, PNG, EPS).',
      },
      {
        title: 'Brand Style Guidelines',
        description: 'Brand book defining color palettes, typography rules, brand voice, and clear usage guidelines.',
      },
      {
        title: 'Marketing & Sales Collateral',
        description: 'Business cards, letterheads, brochures, pitch decks, flyers, and event banners.',
      },
      {
        title: 'Digital & Social Media Assets',
        description: 'Engaging social media templates, ad banners, email templates, and digital signage.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand Discovery & Moodboarding',
        duration: '2–3 Days',
        description: 'Exploring your brand essence, market position, and aesthetic preferences.',
      },
      {
        step: '02',
        title: 'Concept Development',
        duration: '1 Week',
        description: 'Presenting 3 distinct visual directions and logo concepts with real-world mockups.',
      },
      {
        step: '03',
        title: 'Refinement & Selection',
        duration: '3–5 Days',
        description: 'Iterating on the chosen concept with your feedback on typography, spacing, and colors.',
      },
      {
        step: '04',
        title: 'Collateral & Asset Creation',
        duration: '1 Week',
        description: 'Extending the approved identity across business stationery, social graphics, and marketing materials.',
      },
      {
        step: '05',
        title: 'Final Delivery & Brand Book',
        duration: '2–3 Days',
        description: 'Packaging all print and digital source files alongside a clear brand manual.',
      },
    ],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Figma', 'InDesign', 'After Effects'],
    timelineEstimate: '1 to 3 weeks for brand identity projects',
    relatedCaseStudyIds: ['brand-identity', 'restaurant-ordering'],
    faqs: [
      {
        question: 'Will I get full ownership and copyright of the designs?',
        answer:
          'Yes. Upon project completion and final payment, 100% intellectual property rights and vector source files (AI, EPS, SVG, PDF) are transferred to you.',
      },
      {
        question: 'How many logo concepts do you provide?',
        answer:
          'We typically provide 3 distinct creative concepts in the initial presentation, followed by iterative refinement rounds on your chosen direction.',
      },
      {
        question: 'Do you prepare files ready for commercial printing?',
        answer:
          'Yes, all print collateral is supplied in high-resolution CMYK format with appropriate bleed and trim marks ready for any professional printer.',
      },
    ],
  },
  {
    slug: 'video-editing-ghaziabad',
    id: 'video-editing',
    title: 'Video Editing Services in Ghaziabad',
    metaTitle: 'Professional Video Editing Services in Ghaziabad | Div Tag Studios',
    metaDescription:
      'High-impact video editing and post-production in Ghaziabad. We produce corporate videos, social media reels, product demos, motion graphics, and YouTube content.',
    heading: 'Professional Video Editing in Ghaziabad',
    subheading:
      'Dynamic storytelling, cinematic color grading, sound design, and motion graphics that hook your audience and amplify your digital reach.',
    badge: 'Video Post-Production & Motion Design',
    overview:
      'Video is the highest-converting medium on the internet. Whether you need viral Instagram Reels, YouTube long-form content, corporate promotional videos, or product walkthroughs, Div Tag Studios brings cinematic polish, crisp pacing, and engaging motion design to your brand storytelling.',
    targetAudience: [
      'Founders and creators looking to build personal brands on YouTube, LinkedIn, and Instagram',
      'D2C and e-commerce companies needing high-converting video ads and product demos',
      'Corporates in Ghaziabad & NCR wanting company overview films and client case study videos',
      'Real estate, education, and hospitality businesses showcasing facilities and properties',
    ],
    deliverables: [
      {
        title: 'Short-Form Content (Reels & Shorts)',
        description: 'Fast-paced, hook-driven edits with dynamic captions, sound effects, and trend-focused pacing.',
      },
      {
        title: 'Corporate & Promotional Films',
        description: 'Cinematic brand overviews, customer testimonial interviews, and company milestone videos.',
      },
      {
        title: 'Motion Graphics & Logo Animations',
        description: 'Custom animated intros/outros, 2D infographic explanations, lower-thirds, and visual effects.',
      },
      {
        title: 'Color Grading & Audio Mastering',
        description: 'Professional color balancing, dialogue cleanup, sound design, and royalty-free music scoring.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Raw Footage & Story Brief',
        duration: '1–2 Days',
        description: 'Reviewing footage, audio tracks, narrative goal, and target social platforms.',
      },
      {
        step: '02',
        title: 'Assembly & Rough Cut',
        duration: '2–4 Days',
        description: 'Selecting best takes, establishing pacing, and structuring the core narrative.',
      },
      {
        step: '03',
        title: 'Graphics, Audio & Color Polish',
        duration: '2–3 Days',
        description: 'Adding motion typography, sound effects, soundtrack mixing, and color grade.',
      },
      {
        step: '04',
        title: 'Review & Revision Round',
        duration: '1–2 Days',
        description: 'Timestamped review and incorporating client feedback for final approval.',
      },
      {
        step: '05',
        title: 'Multi-Format Export',
        duration: '1 Day',
        description: 'Exporting in 4K/1080p optimized for Instagram (9:16), YouTube (16:9), and web playback.',
      },
    ],
    techStack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    timelineEstimate: '3 to 7 days for short-form packages; 1 to 2 weeks for corporate videos',
    relatedCaseStudyIds: ['brand-identity', 'fitness-app'],
    faqs: [
      {
        question: 'How do I share raw footage with your team?',
        answer:
          'You can upload footage via Google Drive, Dropbox, or WeTransfer. If you are located nearby in Ghaziabad or Noida, we can also transfer footage directly via hard drive.',
      },
      {
        question: 'Do you provide background music and sound effects?',
        answer:
          'Yes, we license commercial, royalty-free audio tracks and sound design elements so your videos are 100% safe from copyright strikes on all platforms.',
      },
      {
        question: 'What is your turnaround time for Instagram Reels and Shorts?',
        answer:
          'Standard short-form edits are delivered within 48 to 72 hours. We also offer monthly retainer packages for brands needing 10–30 videos per month.',
      },
    ],
  },
  {
    slug: 'seo-services-ghaziabad',
    id: 'seo',
    title: 'SEO Services in Ghaziabad',
    metaTitle: 'SEO Company in Ghaziabad | Local SEO & Organic Growth | Div Tag Studios',
    metaDescription:
      'Leading SEO company in Ghaziabad. Div Tag Studios provides local SEO, Google Business Profile optimization, technical site audits, keyword strategy, and high-ROI organic growth.',
    heading: 'Top SEO Company in Ghaziabad',
    subheading:
      'Rank in Google’s Local 3-Pack and capture high-intent commercial searches in Ghaziabad, Delhi NCR, and across India through ethical, data-driven SEO.',
    badge: 'Local SEO & Technical Growth · Ghaziabad',
    overview:
      'Ranking on Google is not about tricks or spamming keywords—it is about relevance, prominence, technical excellence, and genuine user value. At Div Tag Studios, we optimize every dimension of your search presence: from your Google Business Profile and local citations to page speed, schema markup, and authoritative content.',
    targetAudience: [
      'Ghaziabad businesses looking to dominate local search terms in their niche',
      'E-commerce brands seeking organic product discovery without relying solely on paid ads',
      'B2B firms and manufacturers looking for inbound qualified sales inquiries',
      'Startups wanting long-term, sustainable customer acquisition channels',
    ],
    deliverables: [
      {
        title: 'Google Business Profile & Local 3-Pack',
        description: 'Complete GBP optimization, category alignment, review collection strategy, and local geocoded citations.',
      },
      {
        title: 'Technical SEO & Core Web Vitals',
        description: 'Crawling diagnostics, sitemap configuration, robots.txt, canonicalization, mobile speed, and structured data.',
      },
      {
        title: 'On-Page SEO & Content Strategy',
        description: 'Keyword research with buyer intent, optimized headings, semantic meta tags, and authoritative industry articles.',
      },
      {
        title: 'Authority Building & Local Citations',
        description: 'Ethical local directory listings, guest articles, brand mentions, and niche-specific backlink development.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Comprehensive SEO Audit',
        duration: '3–5 Days',
        description: 'Analyzing technical crawl issues, existing rankings, competitor profiles, and keyword opportunities.',
      },
      {
        step: '02',
        title: 'Technical Fixes & Schema Injection',
        duration: '1–2 Weeks',
        description: 'Resolving Core Web Vitals issues, broken links, metadata deficiencies, and deploying JSON-LD schemas.',
      },
      {
        step: '03',
        title: 'Local SEO & GBP Optimization',
        duration: '1–2 Weeks',
        description: 'Configuring Google Business Profile, standardizing NAP citations, and launching localized landing pages.',
      },
      {
        step: '04',
        title: 'Content Creation & On-Page Optimization',
        duration: 'Ongoing',
        description: 'Publishing targeted, value-driven blog posts and optimizing core service pages for target commercial keywords.',
      },
      {
        step: '05',
        title: 'Monthly Tracking & Reporting',
        duration: 'Monthly',
        description: 'Transparent monthly reports tracking organic impressions, keyword movements, click volume, and lead conversions.',
      },
    ],
    techStack: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Schema.org'],
    timelineEstimate: 'Initial technical fixes in 2 weeks; measurable organic ranking gains typically within 3 to 6 months',
    relatedCaseStudyIds: ['seo-growth-campaign', 'ecommerce-platform'],
    faqs: [
      {
        question: 'How long does it take to rank on Google in Ghaziabad?',
        answer:
          'Local SEO improvements (like Google Business Profile prominence) often show initial traction within 4 to 8 weeks. Organic web rankings for competitive commercial keywords typically take 3 to 6 months of consistent technical and content optimization.',
      },
      {
        question: 'Can you guarantee the #1 ranking on Google?',
        answer:
          'No ethical agency can guarantee a #1 position, as Google’s search algorithms evaluate distance, searcher intent, and competitor dynamics. However, we follow proven Google Webmaster and local-search guidelines to consistently achieve top 3-pack visibility and organic traffic growth.',
      },
      {
        question: 'What is the difference between Local SEO and Organic SEO?',
        answer:
          'Local SEO focuses on ranking in Google Maps and the Local 3-Pack for geographically targeted searches (e.g., “web development company in Ghaziabad”). Organic SEO focuses on national or global search terms across standard search results through in-depth content and site authority.',
      },
      {
        question: 'How do you track and report SEO results?',
        answer:
          'We provide monthly reports directly using Google Search Console and GA4 data, tracking actual impressions, click growth, average keyword positions, and phone/form conversions.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): LocalServiceDetail | undefined {
  return LOCAL_SERVICES.find((service) => service.slug === slug);
}
