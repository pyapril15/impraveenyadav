/**
 * SEO Configuration and Utilities for Google Search Optimization
 * This file contains centralized SEO settings and helper functions
 */

// Core SEO Configuration
export const SEO_CONFIG = {
  siteName: "Professional Portfolio",
  defaultTitle: "Professional Portfolio | Full Stack Developer & Designer",
  defaultDescription: "Explore innovative projects, technical expertise, and professional journey in web development. Specialized in React, TypeScript, Node.js, and modern web technologies.",
  siteUrl: typeof window !== 'undefined' ? window.location.origin : '',
  defaultImage: "/og-image.png",
  twitterHandle: "@portfolio",
  locale: "en_US",
  keywords: [
    "web developer",
    "portfolio",
    "software engineer",
    "full stack developer",
    "UI/UX designer",
    "React developer",
    "TypeScript",
    "Node.js",
    "frontend developer",
    "backend developer",
    "responsive design",
    "web applications",
    "JavaScript developer",
    "modern web development"
  ]
};

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Home | Professional Portfolio",
    description: "Welcome to my portfolio. Discover innovative web applications, technical expertise, and a passion for creating exceptional digital experiences.",
    keywords: "portfolio home, web developer portfolio, software engineer, full stack developer"
  },
  about: {
    title: "About Me | Professional Developer",
    description: "Learn about my journey, skills, and passion for web development. Experienced in building scalable applications with modern technologies.",
    keywords: "about developer, professional background, web development experience, technical skills"
  },
  projects: {
    title: "Projects | My Work & Portfolio",
    description: "Explore my portfolio of web applications, from e-commerce platforms to interactive dashboards. Built with React, TypeScript, and modern frameworks.",
    keywords: "web projects, portfolio work, React applications, TypeScript projects, web applications"
  },
  skills: {
    title: "Skills & Expertise | Technical Proficiency",
    description: "Comprehensive overview of my technical skills including React, TypeScript, Node.js, databases, and modern development tools.",
    keywords: "technical skills, programming languages, web technologies, development tools, frontend backend"
  },
  certificates: {
    title: "Certifications | Professional Credentials",
    description: "View my professional certifications and achievements in web development, programming, and software engineering.",
    keywords: "certifications, professional credentials, web development certificates, programming certifications"
  },
  contact: {
    title: "Contact Me | Let's Work Together",
    description: "Get in touch to discuss your project, collaboration opportunities, or just to say hello. Fast response times and always happy to help.",
    keywords: "contact developer, hire developer, project inquiry, collaboration, web development services"
  }
};

/**
 * Generate page-specific meta tags
 */
export const generatePageMeta = (page: keyof typeof PAGE_SEO) => {
  const pageMeta = PAGE_SEO[page];
  return {
    ...pageMeta,
    keywords: `${pageMeta.keywords}, ${SEO_CONFIG.keywords.join(', ')}`
  };
};

/**
 * Generate dynamic title with site name
 */
export const generateTitle = (pageTitle: string): string => {
  return pageTitle.includes('|') ? pageTitle : `${pageTitle} | ${SEO_CONFIG.siteName}`;
};

/**
 * Generate Open Graph image URL
 */
export const generateOGImageUrl = (imagePath?: string): string => {
  const image = imagePath || SEO_CONFIG.defaultImage;
  return image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`;
};

/**
 * Google Search Console verification helper
 * Add this to your index.html or use via Helmet
 */
export const getGoogleVerificationMeta = () => {
  return {
    name: "google-site-verification",
    content: "your-google-verification-code-here" // Replace with actual code from Google Search Console
  };
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};

/**
 * Performance hints for SEO
 */
export const generateResourceHints = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
  ];
};

/**
 * Check if page should be indexed
 */
export const shouldIndexPage = (path: string): boolean => {
  const noIndexPaths = ['/404', '/error', '/admin'];
  return !noIndexPaths.some(noIndexPath => path.startsWith(noIndexPath));
};

/**
 * Generate robots meta content based on page
 */
export const generateRobotsMeta = (path: string): string => {
  if (!shouldIndexPage(path)) {
    return "noindex, nofollow";
  }
  return "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
};

/**
 * SEO-friendly URL slug generator
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Calculate reading time for blog posts (if applicable)
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
