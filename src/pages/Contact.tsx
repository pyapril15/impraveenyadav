import { motion } from 'framer-motion';
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/SEO';
import ContactForm from '@/components/ContactForm';
import GoogleMap from '@/components/GoogleMap';
import { usePersonalInfo } from '@/hooks/usePortfolioData';
import { 
  generateBreadcrumbStructuredData,
  generateWebPageStructuredData,
  generateOrganizationStructuredData
} from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const Contact = () => {
  const { data: personalInfo } = usePersonalInfo();
  const pageMeta = generatePageMeta('contact');

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]);

  const structuredData = personalInfo ? [
    generateWebPageStructuredData(
      'Contact',
      'Get in touch for project inquiries and collaboration',
      `${window.location.origin}/contact`
    ),
    generateOrganizationStructuredData(personalInfo),
    breadcrumbStructuredData
  ] : [breadcrumbStructuredData];

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        canonicalUrl={`${window.location.origin}/contact`}
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Have a question? Or just want to say hello? 
            I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Left Column - Contact Info & Form */}
          <div className="space-y-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
            
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">{personalInfo?.location || 'Buddha Nagar Colony, Sarnath'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <EnvelopeIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href="mailto:praveen885127@gmail.com" 
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      praveen885127@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-sm text-muted-foreground mb-3">Connect on Social</p>
                <div className="flex gap-3">
                  {personalInfo?.github_url && (
                    <a 
                      href={personalInfo.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass-card hover-lift text-lg transition-all duration-300 hover:text-primary"
                      title="GitHub"
                    >
                      🐙
                    </a>
                  )}
                  {personalInfo?.linkedin_url && (
                    <a 
                      href={personalInfo.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass-card hover-lift text-lg transition-all duration-300 hover:text-primary"
                      title="LinkedIn"
                    >
                      💼
                    </a>
                  )}
                  {personalInfo?.portfolio_url && (
                    <a 
                      href={personalInfo.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass-card hover-lift text-lg transition-all duration-300 hover:text-primary"
                      title="Portfolio"
                    >
                      🌐
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Find Me Here
              </h3>
              <p className="text-muted-foreground">
                Feel free to drop by or reach out through any of the channels below.
              </p>
            </div>
            <GoogleMap />
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center glass-card p-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Response Time
          </h3>
          <p className="text-muted-foreground mb-6">
            I typically respond to messages within <span className="text-primary font-semibold">24 hours</span>. 
            For urgent inquiries, please mention it in your message.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-2">
              <div className="text-primary text-2xl">⚡</div>
              <h4 className="font-semibold text-foreground">Quick Response</h4>
              <p className="text-sm text-muted-foreground">
                Fast turnaround on messages and project inquiries
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-primary text-2xl">🤝</div>
              <h4 className="font-semibold text-foreground">Collaborative</h4>
              <p className="text-sm text-muted-foreground">
                Love working together to bring ideas to life
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-primary text-2xl">🚀</div>
              <h4 className="font-semibold text-foreground">Results-Driven</h4>
              <p className="text-sm text-muted-foreground">
                Focused on delivering high-quality solutions
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;