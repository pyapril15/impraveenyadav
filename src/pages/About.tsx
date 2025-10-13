import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { usePersonalInfo } from '@/hooks/usePortfolioData';
import JourneyTimeline from '@/components/JourneyTimeline';
import { 
  generatePersonStructuredData, 
  generateProfilePageStructuredData,
  generateBreadcrumbStructuredData,
  generateWebPageStructuredData
} from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const About = () => {
  const { data: personalInfo, isLoading } = usePersonalInfo();
  const pageMeta = generatePageMeta('about');

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ]);

  // Generate comprehensive structured data
  const structuredData = personalInfo ? [
    generateWebPageStructuredData(
      'About Me',
      personalInfo.bio,
      `${window.location.origin}/about`
    ),
    generatePersonStructuredData(personalInfo),
    generateProfilePageStructuredData(personalInfo),
    breadcrumbStructuredData
  ] : [breadcrumbStructuredData];

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        author={personalInfo?.name}
        canonicalUrl={`${window.location.origin}/about`}
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-8 overflow-x-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover my journey through the digital cosmos, from humble beginnings to where I am today.
          </p>
        </motion.div>

        {/* Personal Info Section */}
        {!isLoading && personalInfo && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full max-w-80 h-80 mx-auto"
                >
                  <div className="absolute inset-0 rounded-2xl bg-cosmic-gradient animate-pulse-cosmic"></div>
                  <img
                    src={personalInfo.image_url || "/placeholder.svg"}
                    alt={`${personalInfo.name} - ${personalInfo.role}`}
                    loading="lazy"
                    className="relative z-10 w-full h-full rounded-2xl object-cover border-4 border-primary/30"
                  />
                </motion.div>
              </div>

              {/* Info */}
              <div className="space-y-6 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {personalInfo.name}
                  </h2>
                  <p className="text-xl text-primary font-medium mb-4">
                    {personalInfo.role}
                  </p>
                  {personalInfo.location && (
                    <p className="text-muted-foreground mb-6">
                      📍 {personalInfo.location}
                    </p>
                  )}
                </motion.div>

                {personalInfo.bio && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      My Story
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {personalInfo.bio}
                    </p>
                  </motion.div>
                )}

                {personalInfo.quote && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="glass-card p-6 border-l-4 border-primary"
                  >
                    <p className="text-foreground italic text-lg">
                      "{personalInfo.quote}"
                    </p>
                  </motion.blockquote>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-cosmic-gradient bg-clip-text text-transparent">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of my professional growth, achievements, and key milestones.
            </p>
          </div>

          <JourneyTimeline />
        </motion.section>
        </div>
      </div>
    </>
  );
};

export default About;