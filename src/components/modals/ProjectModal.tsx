import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  name: string;
  description: string;
  short_description?: string;
  image_url?: string;
  live_demo_url?: string;
  source_code_url?: string;
  category: string;
  technologies?: string[];
  features?: string[];
  start_date?: string;
  end_date?: string;
  stats?: Record<string, any>;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
                {project.name}
              </DialogTitle>
              <DialogDescription className="text-primary font-medium">
                {project.category}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          {project.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          )}

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">About This Project</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Date Range */}
            {(project.start_date || project.end_date) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {project.start_date} {project.end_date ? `- ${project.end_date}` : '- Present'}
                </span>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-foreground mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-foreground mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary text-sm">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Stats */}
            {project.stats && Object.keys(project.stats).length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-foreground mb-2">Project Stats</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="glass-card p-3 text-center">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cosmic flex items-center gap-2"
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
                  className="btn-glass flex items-center gap-2"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;