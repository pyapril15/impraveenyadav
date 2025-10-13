import type { PersonalInfo, Project, Skill, Certification } from '@/hooks/usePortfolioData';

/**
 * Generate comprehensive Person schema with professional details
 */
export const generatePersonStructuredData = (personalInfo: PersonalInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.role,
    image: personalInfo.image_url,
    url: personalInfo.portfolio_url || window.location.origin,
    sameAs: [
      personalInfo.github_url,
      personalInfo.linkedin_url,
      personalInfo.portfolio_url
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location
    },
    description: personalInfo.bio,
    knowsAbout: ["Web Development", "Software Engineering", "Full Stack Development"],
    alumniOf: personalInfo.quote
  };
};

/**
 * Generate Organization schema for business/professional branding
 */
export const generateOrganizationStructuredData = (personalInfo: PersonalInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${personalInfo.name} - Professional Portfolio`,
    url: window.location.origin,
    logo: personalInfo.image_url,
    description: personalInfo.bio,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Professional Services",
      email: "praveen885127@gmail.com",
      availableLanguage: "English"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location
    },
    sameAs: [
      personalInfo.github_url,
      personalInfo.linkedin_url,
      personalInfo.portfolio_url
    ].filter(Boolean)
  };
};

/**
 * Generate Portfolio/CreativeWork schema with SEO-optimized project data
 */
export const generatePortfolioStructuredData = (projects: Project[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects",
    description: "Collection of professional web development projects and applications",
    numberOfItems: projects.length,
    itemListElement: projects.slice(0, 10).map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.name,
      description: project.description,
      image: project.image_url,
      url: project.live_demo_url,
      creator: {
        "@type": "Person",
        name: "Professional Developer"
      },
      keywords: project.technologies?.join(', '),
      dateCreated: project.created_at,
      thumbnailUrl: project.image_url
    }))
  };
};

/**
 * Generate Breadcrumb navigation for improved SEO
 */
export const generateBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.url}`
    }))
  };
};

/**
 * Generate WebSite schema with search action for Google Search Box
 */
export const generateWebsiteStructuredData = (personalInfo: PersonalInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalInfo.name} - Portfolio`,
    alternateName: "Professional Portfolio Website",
    url: window.location.origin,
    description: personalInfo.bio,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: personalInfo.name
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${window.location.origin}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Generate WebPage schema for individual pages
 */
export const generateWebPageStructuredData = (
  title: string,
  description: string,
  url: string,
  datePublished?: string,
  dateModified?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      url: window.location.origin
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${window.location.origin}/og-image.png`
    }
  };
};

/**
 * Generate Skills as ItemList for SEO
 */
export const generateSkillsStructuredData = (skills: Skill[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional Skills & Expertise",
    description: "Technical skills and proficiency levels",
    numberOfItems: skills.length,
    itemListElement: skills.slice(0, 20).map((skill, index) => ({
      "@type": "Thing",
      position: index + 1,
      name: skill.name,
      description: skill.description
    }))
  };
};

/**
 * Generate FAQ schema for About/Contact pages
 */
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
};

/**
 * Generate ProfilePage schema
 */
export const generateProfilePageStructuredData = (personalInfo: PersonalInfo) => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: personalInfo.name,
      alternateName: personalInfo.role,
      description: personalInfo.bio,
      image: personalInfo.image_url
    }
  };
};
