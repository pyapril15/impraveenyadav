// src/components/modals/SkillModal.tsx

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  proficiency: number;
  icon?: string;
}

interface SkillModalProps {
  skills: Skill[];
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal = ({ skills, category, isOpen, onClose }: SkillModalProps) => {
  // Icons representing categories
  const categoryIcons: Record<string, string> = {
    frontend: "🎨",
    backend: "⚙️",
    database: "🗄️",
    devops: "🚀",
    tools: "🛠️",
    languages: "💻",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          {/* Modal Header with Category Icon and Title */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold bg-cosmic-gradient bg-clip-text text-transparent flex items-center gap-2">
                {categoryIcons[category.toLowerCase()]}
                <span className="capitalize">{category} Skills</span>
              </DialogTitle>
              <DialogDescription>
                Detailed overview of my {category.toLowerCase()} expertise
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

        {/* Skills Content */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-card p-4 space-y-3"
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.icon && <span className="text-lg">{skill.icon}</span>}
                  <h3 className="font-semibold text-foreground">
                    {skill.name}
                  </h3>
                </div>
                <div className="text-primary font-semibold">
                  {skill.proficiency}%
                </div>
              </div>

              {/* Proficiency Progress */}
              <div className="skill-progress">
                <motion.div
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Skill Description */}
              {skill.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              )}

              {/* Proficiency Level */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Proficiency Level</span>
                <span>
                  {skill.proficiency >= 90
                    ? "Expert"
                    : skill.proficiency >= 70
                    ? "Advanced"
                    : skill.proficiency >= 50
                    ? "Intermediate"
                    : "Beginner"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
