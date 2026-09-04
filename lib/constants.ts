import { 
  type LucideIcon 
} from 'lucide-react';

/**
 * Service interface defining the structure of each service offering
 */
export interface Service {
  id: string;                    // Unique identifier (kebab-case)
  title: string;                 // Display name
  description: string;           // Brief description (2-3 sentences)
  iconName: string;              // Icon name from Lucide (not the component itself)
  keywords: string[];            // SEO keywords for this service
}

/**
 * Array of all services offered by Div Tag Studios
 */
export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices. From responsive websites to complex web platforms.',
    iconName: 'Code2',
    keywords: ['web development', 'react', 'next.js', 'frontend', 'backend']
  },
  {
    id: 'android-development',
    title: 'Android Development',
    description: 'Native Android applications with intuitive interfaces and robust performance. Built with Kotlin and modern Android architecture.',
    iconName: 'Smartphone',
    keywords: ['android', 'mobile app', 'kotlin', 'native development']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that combine aesthetics with functionality. Wireframes, prototypes, and design systems.',
    iconName: 'Palette',
    keywords: ['ui design', 'ux design', 'user experience', 'figma', 'prototyping']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Visual identity and branding materials that make your business stand out. Logos, marketing materials, and brand guidelines.',
    iconName: 'Image',
    keywords: ['graphic design', 'branding', 'logo design', 'visual identity']
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video editing and post-production services. From promotional videos to social media content.',
    iconName: 'Video',
    keywords: ['video editing', 'post-production', 'motion graphics', 'video content']
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Search engine optimization strategies to improve your online visibility. Technical SEO, content optimization, and analytics.',
    iconName: 'TrendingUp',
    keywords: ['seo', 'search optimization', 'google ranking', 'digital marketing']
  }
];

/**
 * Design tokens for consistent theming across the application
 */

/**
 * Color palette using HSL values
 * These match the CSS variables defined in globals.css
 */
export const COLORS = {
  primary: {
    DEFAULT: 'hsl(222.2 47.4% 11.2%)',    // Dark blue-gray
    foreground: 'hsl(210 40% 98%)'
  },
  secondary: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(222.2 47.4% 11.2%)'
  },
  accent: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(222.2 47.4% 11.2%)'
  },
  muted: {
    DEFAULT: 'hsl(210 40% 96.1%)',
    foreground: 'hsl(215.4 16.3% 42%)'  // Updated for WCAG AA compliance
  },
  destructive: {
    DEFAULT: 'hsl(0 84.2% 45%)',  // Updated for WCAG AA compliance
    foreground: 'hsl(210 40% 98%)'
  },
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(222.2 47.4% 11.2%)'
};

/**
 * Responsive breakpoints for mobile-first design
 */
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

/**
 * Minimum touch target size for mobile accessibility (WCAG 2.1 AA)
 */
export const TOUCH_TARGET_SIZE = '44px';

/**
 * About section content
 */
export const ABOUT_CONTENT = {
  mission: 'At Div Tag Studios, we transform ideas into exceptional digital experiences. Our mission is to empower businesses with cutting-edge technology solutions that drive growth and innovation.',
  values: [
    'Quality-driven development with attention to every detail',
    'Client-focused approach ensuring your vision comes to life',
    'Innovation at the core of everything we create',
    'Transparent communication throughout the entire process'
  ]
};

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: 'contact@divtagstudios.in',
  phone: '+91 7428244306',
  address: 'Pratap Vihar, Sector 11, Ghaziabad, Uttar Pradesh, India'
};

/** Email address that receives contact form submissions (EmailJS) */
export const CONTACT_FORM_RECIPIENT = 'yashkumarpal987@gmail.com';

/** Why choose us – comparison columns (Weframe-style) */
export const WHY_CHOOSE_US = {
  left: {
    title: 'Freelancers',
    points: [
      'Lack of cross-functional collaboration',
      'Require upfront management effort',
      'Isolated from your internal team',
      'Limited scalability',
      'Unpredictable availability',
      'Few established systems and processes',
    ],
  },
  center: {
    title: 'Div Tag Studios',
    points: [
      'Lower cost than large agencies',
      'Full-stack expertise: web, mobile, design',
      'Direct collaboration—no middlemen',
      'Proven processes and clear communication',
      'Dedicated focus on your product',
      'Quality-driven delivery',
    ],
  },
  right: {
    title: 'Other Agencies',
    points: [
      'Expertise limited to specific areas',
      'Slower response times',
      'Often deliver B-team after promising A-team',
      'Account managers hinder direct collaboration',
      'Struggle to align with dynamic requirements',
    ],
  },
};

/** Tech stack categories for "How we develop" section */
export const TECH_STACK = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  design: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
  mobile: ['Android', 'Kotlin', 'React Native'],
  tools: ['Git', 'SEO', 'Analytics'],
};

/** FAQ items */
export const FAQ_ITEMS = [
  {
    question: 'What services does Div Tag Studios offer?',
    answer: 'We offer Web Development, Android Development, UI/UX Design, Graphic Design, Video Editing, and SEO. From responsive websites to native mobile apps and brand identity—we cover the full digital product lifecycle.',
  },
  {
    question: 'How do I get started on a project?',
    answer: 'Reach out via the contact form or email. We\'ll schedule a short call to understand your goals, scope, and timeline, then provide a clear proposal and next steps.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer: 'Yes. We work with businesses of all sizes—from startups and SMBs to larger teams. Our approach scales to your needs and budget.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Timelines depend on scope. A simple website might take a few weeks; a custom web app or mobile product can run from a couple of months to longer. We\'ll outline this in the discovery phase.',
  },
];
