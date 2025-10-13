import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useProjects } from '@/hooks/usePortfolioData';

const FeaturedProjects = () => {
  const { data: projects } = useProjects(true);

  return (
    <section id="projects" className="py-32 relative">
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
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={`${project.name} project`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {project.is_featured && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-cosmic animate-pulse-glow">
                      Featured
                    </div>
                  )}
                </div>

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
              
              <div className="absolute -inset-0.5 bg-cosmic-gradient rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/projects" className="btn-glass inline-flex items-center gap-2 group">
            <span>View All Projects</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
