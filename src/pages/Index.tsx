import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import StarField from '@/components/StarField';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';
import { useProjects, useSkills, useCertifications, usePersonalInfo } from '@/hooks/usePortfolioData';
import { 
  generatePersonStructuredData, 
  generateOrganizationStructuredData,
  generatePortfolioStructuredData, 
  generateWebsiteStructuredData,
  generateWebPageStructuredData
} from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const Index = () => {
  const { data: personalInfo } = usePersonalInfo();
  const { data: projects } = useProjects(true); // Only featured projects
  const { data: skills } = useSkills();
  const { data: certifications } = useCertifications();

  // Get top items for preview
  const topSkills = skills?.slice(0, 6) || [];
  const topCertifications = certifications?.slice(0, 3) || [];

  // Generate comprehensive structured data for homepage
  const structuredData = personalInfo && projects ? [
    generateWebsiteStructuredData(personalInfo),
    generateOrganizationStructuredData(personalInfo),
    generatePersonStructuredData(personalInfo),
    generateWebPageStructuredData(
      'Home',
      personalInfo.bio,
      window.location.href,
      new Date().toISOString(),
      new Date().toISOString()
    ),
    generatePortfolioStructuredData(projects)
  ] : undefined;

  const pageMeta = generatePageMeta('home');

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        image={personalInfo?.image_url}
        keywords={pageMeta.keywords}
        author={personalInfo?.name || "Professional Developer"}
        canonicalUrl={window.location.origin}
        structuredData={structuredData}
      />
      <div className="relative min-h-screen">
        {/* Animated Starfield Background */}
        <StarField />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Projects Section */}
        <section id="projects" className="py-32 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full"
              >
                Portfolio
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A showcase of my best work and recent creations that demonstrate my skills and passion
              </p>
            </motion.div>

            {/* Projects Grid - Show only featured */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {projects?.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  <div className="glass-card overflow-hidden h-full flex flex-col hover-lift">
                    {/* Project Image with Overlay */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={`${project.name} - ${project.short_description || project.description}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      
                      {/* Floating Badge */}
                      {project.is_featured && (
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-cosmic animate-pulse-glow">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </h3>
                        {project.category && (
                          <p className="text-sm text-primary/80 font-medium uppercase tracking-wide">
                            {project.category}
                          </p>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                        {project.short_description || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 text-xs font-medium bg-secondary/50 text-foreground/90 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Glow */}
                  <div className="absolute -inset-0.5 bg-cosmic-gradient rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Link to="/projects" className="btn-glass inline-flex items-center gap-2">
                <span>View All Projects</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Top Skills Preview */}
        <section className="py-32 bg-nebula-gradient relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-cosmic"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-cosmic-drift"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full"
              >
                Expertise
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
                Core Skills
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Technologies and tools I work with every day to create exceptional experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {topSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="glass-card p-6 hover-lift h-full">
                    <div className="flex items-center gap-4 mb-4">
                      {skill.icon && (
                        <div className="text-4xl p-3 bg-primary/10 rounded-xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                          {skill.icon}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-primary font-bold text-lg">
                            {skill.proficiency}%
                          </span>
                        </div>
                        {skill.category && (
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {skill.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="skill-progress h-3 bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div
                        className="skill-progress-fill h-full rounded-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </motion.div>
                    </div>

                    {skill.description && (
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="absolute -inset-0.5 bg-cosmic-gradient rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link to="/skills" className="btn-glass inline-flex items-center gap-2">
                <span>View All Skills</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Recent Certifications Preview */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full"
              >
                Achievements
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
                Recent Achievements
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Latest certifications and professional development milestones
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {topCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative"
                >
                  <div className="glass-card p-8 hover-lift h-full">
                    {/* Certificate Icon/Badge */}
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-cosmic">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-base text-primary/90 font-semibold">
                        {cert.organization}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {cert.date}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Link to="/certificates" className="btn-glass inline-flex items-center gap-2">
                <span>View All Certifications</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-nebula-gradient relative overflow-hidden">
          {/* Animated Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-cosmic"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-cosmic-drift"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center space-y-10"
            >
              {/* Badge */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full"
              >
                Let's Connect
              </motion.span>

              {/* Heading */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold bg-cosmic-gradient bg-clip-text text-transparent leading-tight"
              >
                Ready to Work Together?
              </motion.h2>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Let's discuss your next project and bring your ideas to life with cutting-edge solutions and creative excellence.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
              >
                <Link 
                  to="/contact" 
                  className="btn-cosmic inline-flex items-center gap-3 text-lg px-8 py-4 group"
                >
                  <span>Get In Touch</span>
                  <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/about" 
                  className="btn-glass inline-flex items-center gap-3 text-lg px-8 py-4 group"
                >
                  <span>Learn More About Me</span>
                  <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Social Proof / Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Professional Service</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-16 text-center border-t border-primary/20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6">
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">React</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">TypeScript</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Tailwind CSS</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Supabase</span>
            </div>

            {/* Copyright */}
            <div className="space-y-2">
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <span>© {new Date().getFullYear()}</span>
                {personalInfo?.name && <span>• {personalInfo.name}</span>}
                <span>• All rights reserved</span>
              </p>
              <p className="text-sm text-muted-foreground/70">
                Designed & Developed with passion ✨
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;
