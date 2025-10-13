import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, FunnelIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/SEO';
import { useProjects } from '@/hooks/usePortfolioData';
import { 
  generatePortfolioStructuredData, 
  generateBreadcrumbStructuredData,
  generateWebPageStructuredData
} from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const Projects = () => {
  const { data: projects, isLoading } = useProjects(); // Get all projects
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const pageMeta = generatePageMeta('projects');

  // Get unique categories
  const categories = ['all', ...new Set(projects?.map(p => p.category.toLowerCase()) || [])];

  // Filter projects
  const filteredProjects = projects?.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' }
  ]);

  const structuredData = projects ? [
    generateWebPageStructuredData(
      'Projects Portfolio',
      'Collection of innovative web development projects',
      `${window.location.origin}/projects`
    ),
    generatePortfolioStructuredData(projects),
    breadcrumbStructuredData
  ] : [breadcrumbStructuredData];

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        canonicalUrl={`${window.location.origin}/projects`}
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
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my digital creations, from web applications to innovative solutions.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-secondary/50 border border-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <FunnelIcon className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="w-full h-48 bg-primary/20 rounded-lg mb-4"></div>
                <div className="h-6 bg-primary/20 rounded mb-2"></div>
                <div className="h-4 bg-primary/20 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-primary/20 rounded"></div>
                  <div className="h-8 w-20 bg-primary/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground">
              No projects found matching your criteria.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover-lift group"
              >
                {/* Featured Badge */}
                {project.is_featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 bg-cosmic-gradient text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={`${project.name} - ${project.category} project using ${project.technologies?.slice(0, 3).join(', ')}`}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cosmic-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-primary/80 font-medium">
                      {project.category}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.short_description || project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date Range */}
                  {(project.start_date || project.end_date) && (
                    <div className="text-xs text-muted-foreground">
                      {project.start_date} {project.start_date && project.end_date && '→'} {project.end_date}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.source_code_url && (
                      <a
                        href={project.source_code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!isLoading && projects && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 glass-card p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {projects.filter(p => p.is_featured).length}
                </div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {new Set(projects.map(p => p.category)).size}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {new Set(projects.flatMap(p => p.technologies || [])).size}
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </>
  );
};

export default Projects;