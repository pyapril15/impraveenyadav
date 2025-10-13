import { motion } from 'framer-motion';
import { useJourneyTimeline } from '@/hooks/usePortfolioData';

const JourneyTimeline = () => {
  const { data: timeline, isLoading } = useJourneyTimeline();

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-6 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
              <div className="w-0.5 h-24 bg-primary/20 mt-4"></div>
            </div>
            <div className="glass-card p-6 flex-1">
              <div className="h-6 bg-primary/20 rounded mb-2"></div>
              <div className="h-4 bg-primary/20 rounded mb-4 w-24"></div>
              <div className="h-16 bg-primary/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No timeline data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {timeline.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex gap-6"
        >
          {/* Timeline Node */}
          <div className="flex flex-col items-center flex-shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ 
                backgroundColor: item.color || 'hsl(var(--primary))',
                boxShadow: `0 0 20px ${item.color || 'hsl(var(--primary))'}40`
              }}
            >
              {item.icon || '🚀'}
            </motion.div>
            
            {index < timeline.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/20 mt-4 origin-top"
              />
            )}
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            className="glass-card p-6 hover-lift flex-1"
          >
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-medium text-primary">
                    {item.phase}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">
                    Key Highlights:
                  </h4>
                  <ul className="space-y-1">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <motion.li
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.1 + 0.5 + highlightIndex * 0.05 
                        }}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Decorative gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-60"
              style={{ 
                background: `linear-gradient(90deg, ${item.color || 'hsl(var(--primary))'}, transparent)`
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default JourneyTimeline;