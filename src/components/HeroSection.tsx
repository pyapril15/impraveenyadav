// src/components/HeroSection.tsx

import { motion } from 'framer-motion';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import {
  usePersonalInfo,
  useProjects,
  useSkills,
  useCertifications,
} from '@/hooks/usePortfolioData';
import CircularProfile from './CircularProfile';

const HeroSection = () => {
  const { data: personalInfo, isLoading } = usePersonalInfo();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: certifications } = useCertifications();

  const stats = {
    projects: projects?.length || 0,
    skills: skills?.length || 0,
    certifications: certifications?.length || 0,
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-cosmic">
          <div className="w-32 h-32 bg-primary/20 rounded-full"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background z-0" />
      <div className="absolute inset-0 aurora-gradient opacity-5 animate-aurora-flow z-0" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[90vh] max-w-7xl mx-auto gap-12 lg:gap-20">

          {/* Left Side - Circular Profile (shown first on mobile) */}
          <div className="flex justify-center lg:justify-end w-full lg:w-1/2 order-1 lg:order-1">
            <CircularProfile personalInfo={personalInfo} stats={stats} />
          </div>

          {/* Right Side - Bio Section (shown second on mobile) */}
          {personalInfo?.bio && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              className="flex-1 max-w-2xl w-full text-left order-2 lg:order-2"
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-2xl sm:text-3xl font-bold mb-4 bg-aurora-gradient bg-clip-text text-transparent"
                >
                  About Me
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-base sm:text-lg text-foreground/80 leading-relaxed whitespace-pre-line"
                >
                  {personalInfo.bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="mt-6 flex flex-wrap gap-4"
                >
                  <motion.button
                    className="btn-cosmic flex items-center gap-3 hover-float will-change-transform"
                    onClick={() => {
                      document
                        .getElementById('projects')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore My Work</span>
                    <CodeBracketIcon className="w-5 h-5" />
                  </motion.button>

                  {personalInfo?.resume_url && (
                    <motion.a
                      href={personalInfo.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card px-6 py-3 rounded-full flex items-center gap-3 hover:scale-105 hover:border-primary/40 transition-all duration-300 group"
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm font-medium text-foreground">
                        Download Resume
                      </span>
                      <svg
                        className="w-5 h-5 text-primary group-hover:text-accent transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
