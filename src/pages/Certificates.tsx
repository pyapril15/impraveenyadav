import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import SEO from '@/components/SEO';
import { useCertifications } from '@/hooks/usePortfolioData';
import { generateBreadcrumbStructuredData } from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const Certificates = () => {
  const { data: certifications, isLoading } = useCertifications();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter certifications based on search
  const filteredCertifications = certifications?.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Group certifications by organization
  const certsByOrganization = filteredCertifications.reduce((acc, cert) => {
    if (!acc[cert.organization]) {
      acc[cert.organization] = [];
    }
    acc[cert.organization].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

  const pageMeta = generatePageMeta('certificates');
  
  const structuredData = [
    generateBreadcrumbStructuredData([
      { name: 'Home', url: '/' },
      { name: 'Certifications', url: '/certificates' }
    ])
  ];

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        canonicalUrl={`${window.location.origin}/certificates`}
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-8">
        <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
            Certifications & Achievements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Certifications */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-primary/20 rounded mb-3"></div>
                <div className="h-4 bg-primary/20 rounded mb-2"></div>
                <div className="h-4 bg-primary/20 rounded mb-4"></div>
                <div className="h-3 bg-primary/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredCertifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AcademicCapIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {searchTerm ? 'No certifications found matching your search.' : 'No certifications available.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {Object.entries(certsByOrganization).map(([organization, orgCerts], orgIndex) => (
              <motion.div
                key={organization}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: orgIndex * 0.1 }}
                className="space-y-6"
              >
                {/* Organization Header */}
                <div className="flex items-center gap-3 mb-6">
                  <TrophyIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    {organization}
                  </h2>
                  <div className="flex-1 h-px bg-primary/20"></div>
                  <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                    {orgCerts?.length} {orgCerts?.length === 1 ? 'certification' : 'certifications'}
                  </span>
                </div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orgCerts?.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: orgIndex * 0.1 + index * 0.05 }}
                      className="glass-card hover-lift group relative overflow-hidden"
                    >
                      {/* Decorative gradient overlay */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-cosmic-gradient" />
                      
                      <div className="p-6 space-y-4">
                        {/* Header */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <AcademicCapIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {cert.name}
                            </h3>
                            <p className="text-sm text-primary font-medium">
                              {cert.organization}
                            </p>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{cert.date}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {cert.description}
                        </p>

                        {/* Link */}
                        {cert.link && (
                          <div className="pt-2">
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium group-hover:underline"
                            >
                              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              <span>View Certificate</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-cosmic-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {!isLoading && certifications && certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 glass-card p-8"
          >
            <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Certification Summary
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{certifications.length}</div>
                <div className="text-sm text-muted-foreground">Total Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Object.keys(certsByOrganization).length}
                </div>
                <div className="text-sm text-muted-foreground">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {certifications.filter(cert => cert.link).length}
                </div>
                <div className="text-sm text-muted-foreground">Verifiable</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {new Date().getFullYear() - Math.min(...certifications.map(cert => 
                    parseInt(cert.date.split(/[-/]/).slice(-1)[0]) || new Date().getFullYear()
                  ))}+
                </div>
                <div className="text-sm text-muted-foreground">Years Learning</div>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </>
  );
};

export default Certificates;