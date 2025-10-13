import { useState } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/SEO';
import { useSkills } from '@/hooks/usePortfolioData';
import { 
  generateSkillsStructuredData, 
  generateBreadcrumbStructuredData,
  generateWebPageStructuredData
} from '@/utils/structuredData';
import { generatePageMeta } from '@/utils/seo-config';

const Skills = () => {
  const { data: skills, isLoading } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const pageMeta = generatePageMeta('skills');

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  // Get categories for filter
  const categories = ['all', ...Object.keys(skillsByCategory)];

  // Filter skills based on selected category
  const filteredSkillsByCategory = selectedCategory === 'all' 
    ? skillsByCategory 
    : { [selectedCategory]: skillsByCategory[selectedCategory] || [] };

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Skills', url: '/skills' }
  ]);

  const structuredData = skills ? [
    generateWebPageStructuredData(
      'Skills & Expertise',
      'Technical skills and proficiency levels',
      `${window.location.origin}/skills`
    ),
    generateSkillsStructuredData(skills),
    breadcrumbStructuredData
  ] : [breadcrumbStructuredData];

  return (
    <>
      <SEO 
        title={pageMeta.title}
        description={pageMeta.description}
        keywords={pageMeta.keywords}
        canonicalUrl={`${window.location.origin}/skills`}
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
            Skills & Expertise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and areas of expertise.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-12"
        >
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
              {category === 'all' ? 'All Skills' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : Object.keys(filteredSkillsByCategory).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground">
              No skills found in this category.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(filteredSkillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                  {category === 'frontend' && '🎨'}
                  {category === 'backend' && '⚙️'}
                  {category === 'database' && '🗄️'}
                  {category === 'devops' && '🚀'}
                  {category === 'tools' && '🛠️'}
                  {category === 'languages' && '💻'}
                  {category === 'frameworks' && '🏗️'}
                  {!['frontend', 'backend', 'database', 'devops', 'tools', 'languages', 'frameworks'].includes(category) && '⭐'}
                  <span className="capitalize">{category}</span>
                </h3>

                <div className="space-y-6">
                  {categorySkills?.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                      className="space-y-3"
                    >
                      {/* Skill Header */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          {skill.icon && <span className="text-lg">{skill.icon}</span>}
                          {skill.name}
                        </span>
                        <span className="text-xs text-primary font-semibold flex items-center gap-1">
                          <ChartBarIcon className="w-3 h-3" />
                          {skill.proficiency}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="skill-progress">
                        <motion.div
                          className="skill-progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>

                      {/* Description */}
                      {skill.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {skill.description}
                        </p>
                      )}

                      {/* Proficiency Level Indicator */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(skill.proficiency / 20)
                                  ? 'bg-primary'
                                  : 'bg-primary/20'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {skill.proficiency >= 90 ? 'Expert' :
                           skill.proficiency >= 75 ? 'Advanced' :
                           skill.proficiency >= 50 ? 'Intermediate' :
                           skill.proficiency >= 25 ? 'Beginner' : 'Learning'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Skills Summary */}
        {!isLoading && skills && skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 glass-card p-8"
          >
            <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Skills Overview
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{skills.length}</div>
                <div className="text-sm text-muted-foreground">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Object.keys(skillsByCategory).length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Proficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {skills.filter(skill => skill.proficiency >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">Expert Level</div>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </>
  );
};

export default Skills;