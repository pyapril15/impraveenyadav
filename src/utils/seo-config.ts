/**
 * SEO Configuration and Utilities for Google Search Optimization
 * This file contains centralized SEO settings and helper functions
 */

// Core SEO Configuration
export const SEO_CONFIG = {
  siteName: "Praveen Yadav - Full Stack Developer",
  defaultTitle: "Praveen Yadav | Full Stack Developer Portfolio",
  defaultDescription: "Explore my portfolio showcasing innovative projects, technical expertise, and professional journey in full-stack development and design with React, Node.js, and modern web technologies.",
  siteUrl: typeof window !== 'undefined' ? window.location.origin : 'https://praveenyadavme.vercel.app',
  defaultImage: "/og-image.png",
  twitterHandle: "@praveenyadavdev",
  locale: "en_US",
  keywords: [
    "Praveen Yadav",
    "web developer",
    "portfolio",
    "software engineer",
    "full stack developer",
    "UI/UX designer",
    "React developer",
    "TypeScript",
    "Node.js",
    "Python",
    "JavaScript",
    "frontend developer",
    "backend developer",
    "responsive design",
    "web applications",
    "modern web development"
  ]
};

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Praveen Yadav | Full Stack Developer Portfolio",
    description: "Welcome to my portfolio. Discover innovative web applications, technical expertise, and a passion for creating exceptional digital experiences with React, Node.js, Python, and modern web technologies.",
    keywords: "Praveen Yadav, portfolio home, web developer portfolio, software engineer, full stack developer"
  },
  about: {
    title: "About Praveen Yadav | Full Stack Developer",
    description: "Learn about my journey, skills, and passion for web development. Experienced in building scalable applications with React, TypeScript, Node.js, Python, and modern technologies.",
    keywords: "about Praveen Yadav, professional background, web development experience, technical skills, developer journey"
  },
  projects: {
    title: "Projects | Praveen Yadav's Portfolio Work",
    description: "Explore my portfolio of web applications, from e-commerce platforms to interactive dashboards. Built with React, TypeScript, Node.js, Python, and modern frameworks.",
    keywords: "Praveen Yadav projects, web projects, portfolio work, React applications, TypeScript projects, web applications"
  },
  skills: {
    title: "Skills & Expertise | Praveen Yadav Technical Proficiency",
    description: "Comprehensive overview of my technical skills including React, TypeScript, Node.js, Python, databases, and modern development tools and frameworks.",
    keywords: "Praveen Yadav skills, technical skills, programming languages, web technologies, development tools, frontend backend"
  },
  certificates: {
    title: "Certifications | Praveen Yadav Professional Credentials",
    description: "View my professional certifications and achievements in web development, programming, and software engineering from top platforms and institutions.",
    keywords: "Praveen Yadav certifications, professional credentials, web development certificates, programming certifications"
  },
  contact: {
    title: "Contact Praveen Yadav | Let's Work Together",
    description: "Get in touch to discuss your project, collaboration opportunities, or just to say hello. Fast response times and always happy to help with web development needs.",
    keywords: "contact Praveen Yadav, hire developer, project inquiry, collaboration, web development services"
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
 * Google Tag Manager ID
 * Already implemented in index.html
 */
export const GOOGLE_TAG_MANAGER_ID = "GTM-ML8MLLG2";

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
