import { Helmet } from 'react-helmet-async';

/**
 * SEO Props Interface
 * Comprehensive configuration for search engine optimization
 */
interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'business';
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  structuredData?: object | object[];
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  twitterHandle?: string;
  locale?: string;
  alternateLocales?: string[];
  ogSiteName?: string;
  robots?: string;
}

/**
 * Default SEO Configuration
 * Tailored for Praveen Yadav's Full Stack Developer Portfolio
 */
const DEFAULT_SEO = {
  title: 'Praveen Yadav | Full Stack Developer Portfolio',
  description: 'Explore my portfolio showcasing innovative projects, technical expertise, and professional journey in full-stack development and design with React, Node.js, and modern web technologies.',
  keywords: 'Praveen Yadav, portfolio, full stack developer, web development, react developer, javascript, python, node.js, UI/UX, software engineering, developer portfolio, typescript, frontend, backend',
  author: 'Praveen Yadav',
  twitterHandle: '@praveenyadavdev',
  ogSiteName: 'Praveen Yadav - Full Stack Developer',
  locale: 'en_US',
};

/**
 * Professional SEO Component
 * Handles all meta tags, Open Graph, Twitter Cards, and Structured Data
 */
const SEO = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = '/og-image.png',
  type = 'website',
  keywords = DEFAULT_SEO.keywords,
  author = DEFAULT_SEO.author,
  canonicalUrl,
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  twitterHandle = DEFAULT_SEO.twitterHandle,
  locale = DEFAULT_SEO.locale,
  alternateLocales = ['en_GB', 'en_AU'],
  ogSiteName = DEFAULT_SEO.ogSiteName,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}: SEOProps) => {
  // Get site origin for URL construction
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://praveenyadavme.vercel.app';
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  // Ensure image URL is absolute
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Construct complete page title with brand
  const fullTitle = title.includes('|') ? title : `${title} | ${ogSiteName}`;

  /**
   * Generate schema.org ld+json structured data for portfolio
   */
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Praveen Yadav',
    url: siteUrl,
    image: fullImageUrl,
    sameAs: [
      'https://github.com/pyapril15',
      'https://linkedin.com/in/pyapril15',
      'https://twitter.com/pyapril15',
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self Employed',
    },
  };

  const mergedStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* HTML Language */}
      <html lang="en" />

      {/* ==================== PRIMARY META TAGS ==================== */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* ==================== VIEWPORT & MOBILE ==================== */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Praveen Yadav" />
      <meta name="format-detection" content="telephone=no" />

      {/* ==================== SEARCH ENGINE OPTIMIZATION ==================== */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot" content={robots} />
      <meta name="google" content="notranslate" />
      <meta name="google-site-verification" content="nu83I0yeJbNck4Uf_EBSOWlzMI4whCQ86CZVmWKTKog" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta httpEquiv="Content-Language" content="en-US" />
      <meta name="language" content="English" />

      {/* ==================== OPEN GRAPH / FACEBOOK ==================== */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={locale.replace('_', '-')} />

      {/* Alternate Locales */}
      {alternateLocales.map((altLocale) => (
        <meta
          key={altLocale}
          property="og:locale:alternate"
          content={altLocale.replace('_', '-')}
        />
      ))}

      {/* Article-specific metadata */}
      {type === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* ==================== TWITTER CARD ==================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* ==================== THEME & BRANDING ==================== */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* ==================== PERFORMANCE - PRECONNECT & DNS PREFETCH ==================== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* ==================== ALTERNATE LANGUAGES ==================== */}
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      <link rel="alternate" hrefLang="en-US" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />

      {/* ==================== FAVICON & APP ICONS ==================== */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* ==================== STRUCTURED DATA (JSON-LD) ==================== */}
      {mergedStructuredData && (
        Array.isArray(mergedStructuredData) ? (
          mergedStructuredData.map((data, index) => (
            <script key={`structured-data-${index}`} type="application/ld+json">
              {JSON.stringify(data, null, 2)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(mergedStructuredData, null, 2)}
          </script>
        )
      )}

      {/* ==================== BREADCRUMB SCHEMA (Optional) ==================== */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Projects',
              item: `${siteUrl}/projects`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'About',
              item: `${siteUrl}/about`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Contact',
              item: `${siteUrl}/contact`,
            },
          ],
        }, null, 2)}
      </script>

      {/* ==================== ORGANIZATION SCHEMA ==================== */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: ogSiteName,
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
