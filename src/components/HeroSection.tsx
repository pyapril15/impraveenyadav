import { motion } from 'framer-motion';
import { ArrowDownIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { usePersonalInfo } from '@/hooks/usePortfolioData';

const HeroSection = () => {
  const { data: personalInfo, isLoading } = usePersonalInfo();

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/15" />
      <div className="absolute inset-0 aurora-gradient opacity-5 animate-aurora-flow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-cosmic-drift" />
      
      <div className="container mx-auto px-6 z-10">
        <div className="text-center space-y-8">
          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring", 
              bounce: 0.4,
              delay: 0.2 
            }}
            className="relative mx-auto w-44 h-44 md:w-52 md:h-52 group"
          >
            {/* Animated Ring Effects */}
            <div className="absolute -inset-2 rounded-full bg-cosmic-gradient animate-pulse-cosmic opacity-75"></div>
            <div className="absolute -inset-4 rounded-full bg-aurora-gradient opacity-30 animate-aurora-flow"></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent animate-spin duration-[8s] opacity-20"></div>
            
            {/* Profile Image Container */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
              className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl"
            >
              <img
                src={personalInfo?.image_url || "/placeholder.svg"}
                alt={personalInfo?.name || "Profile"}
                className="w-full h-full object-cover hover-shine"
              />
            </motion.div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0 animate-orbit opacity-60">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </motion.div>

          {/* Enhanced Name and Role */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.6,
              type: "spring",
              bounce: 0.3
            }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-5xl md:text-8xl lg:text-9xl font-bold bg-aurora-gradient bg-clip-text text-transparent animate-text-shimmer will-change-transform"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {personalInfo?.name || "Your Name"}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-3xl text-muted-foreground font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {personalInfo?.role || "Your Role"}
            </motion.p>
            
            {/* Animated Accent Line */}
            <motion.div
              className="w-32 h-1 mx-auto bg-cosmic-gradient rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </motion.div>

          {/* Enhanced Quote */}
          {personalInfo?.quote && (
            <motion.blockquote
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 1.4,
                type: "spring",
                bounce: 0.2
              }}
              className="text-lg md:text-2xl text-foreground/90 italic max-w-4xl mx-auto leading-relaxed font-light"
            >
              <span className="text-3xl text-primary">"</span>
              {personalInfo.quote}
              <span className="text-3xl text-primary">"</span>
            </motion.blockquote>
          )}

          {/* Enhanced Bio */}
          {personalInfo?.bio && (
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.6,
                type: "spring"
              }}
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light"
            >
              {personalInfo.bio}
            </motion.p>
          )}

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 1.8,
              type: "spring",
              bounce: 0.4
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button 
              className="btn-cosmic flex items-center gap-3 hover-float will-change-transform"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore My Work</span>
              <ArrowDownIcon className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </motion.button>
            
            {personalInfo?.resume_url && (
              <motion.a
                href={personalInfo.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass flex items-center gap-3 hover-tilt will-change-transform group"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <DocumentIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Download Resume</span>
              </motion.a>
            )}
          </motion.div>

          {/* Location */}
          {personalInfo?.location && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-sm text-muted-foreground"
            >
              📍 {personalInfo.location}
            </motion.p>
          )}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 group cursor-pointer"
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center relative hover:border-primary transition-all duration-300 group-hover:scale-110"
        >
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-4 bg-primary rounded-full mt-2 group-hover:bg-accent transition-all duration-300"
          />
          
          {/* Glow Effect */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 3 }}
          className="text-xs text-muted-foreground mt-3 text-center group-hover:text-foreground transition-all duration-300"
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;