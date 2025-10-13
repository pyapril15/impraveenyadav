import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useCertifications } from '@/hooks/usePortfolioData';
import { useState } from 'react';
import CertificationModal from '@/components/modals/CertificationModal';
import { Link } from 'react-router-dom';

const CertificationsCarousel = () => {
  const { data: certifications, isLoading } = useCertifications();
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCertificationModal = (certification: any) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const closeCertificationModal = () => {
    setSelectedCertification(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 w-80 bg-primary/20 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-primary/20 rounded mb-3"></div>
                <div className="h-4 bg-primary/20 rounded mb-2"></div>
                <div className="h-4 bg-primary/20 rounded mb-4"></div>
                <div className="h-3 bg-primary/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-cosmic-gradient bg-clip-text text-transparent"
        >
          Certifications & Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card hover-lift group relative overflow-hidden cursor-pointer"
              onClick={() => openCertificationModal(cert)}
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
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {cert.organization}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click for details
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{cert.date}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                {/* Link */}
                {cert.link && (
                  <div className="pt-2">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
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

        {/* View All Certifications Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/certificates" className="btn-glass">
            View All Certifications
          </Link>
        </motion.div>
      </div>

      {/* Certification Modal */}
      <CertificationModal
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={closeCertificationModal}
      />
    </section>
  );
};

export default CertificationsCarousel;