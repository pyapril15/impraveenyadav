import { motion } from 'framer-motion';
import { useSkills } from '@/hooks/usePortfolioData';
import { useState } from 'react';
import SkillModal from '@/components/modals/SkillModal';
import { Link } from 'react-router-dom';

const SkillsCarousel = () => {
  const { data: skills, isLoading } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSkillModal = (category: string, categorySkills: any[]) => {
    setSelectedCategory(category);
    setSelectedSkills(categorySkills);
    setIsModalOpen(true);
  };

  const closeSkillModal = () => {
    setSelectedCategory('');
    setSelectedSkills([]);
    setIsModalOpen(false);
  };

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  if (isLoading) {
    return (
      <section className="py-20 bg-nebula-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-primary/20 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-primary/20 rounded mb-4"></div>
                {[1, 2, 3].map((j) => (
                  <div key={j} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 w-24 bg-primary/20 rounded"></div>
                      <div className="h-4 w-8 bg-primary/20 rounded"></div>
                    </div>
                    <div className="skill-progress">
                      <div className="skill-progress-fill bg-primary/20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-nebula-gradient">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-cosmic-gradient bg-clip-text text-transparent"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 hover-lift cursor-pointer"
              onClick={() => openSkillModal(category, categorySkills)}
            >
              <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                {category === 'frontend' && '🎨'}
                {category === 'backend' && '⚙️'}
                {category === 'database' && '🗄️'}
                {category === 'devops' && '🚀'}
                {category === 'tools' && '🛠️'}
                {category === 'languages' && '💻'}
                <span className="capitalize">{category}</span>
                <span className="text-sm font-normal text-muted-foreground ml-auto">
                  Click for details
                </span>
              </h3>

              <div className="space-y-4">
                {categorySkills?.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        {skill.icon && <span className="text-lg">{skill.icon}</span>}
                        {skill.name}
                      </span>
                      <span className="text-xs text-primary font-semibold">
                        {skill.proficiency}%
                      </span>
                    </div>
                    
                    <div className="skill-progress">
                      <motion.div
                        className="skill-progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    </div>

                    {skill.description && (
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/skills" className="btn-glass">
            View All Skills
          </Link>
        </motion.div>
      </div>

      {/* Skill Modal */}
      <SkillModal
        skills={selectedSkills}
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={closeSkillModal}
      />
    </section>
  );
};

export default SkillsCarousel;