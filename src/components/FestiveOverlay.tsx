import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import festiveBanner from '@/assets/festive-banner.png';

const FestiveOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 400, scale: 0.8 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm"
      >
        {/* Festive Card Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl pointer-events-auto">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-aurora-flow backdrop-blur-xl" />
          <div className="absolute inset-0 bg-background/80" />
          
          {/* Card Content */}
          <div className="relative p-6">
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 hover:bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              aria-label="Close festive banner"
            >
              <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.button>

            {/* Festive Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.5 }}
              className="mb-4"
            >
              <img 
                src={festiveBanner} 
                alt="Festive celebration" 
                className="h-20 w-full object-cover rounded-lg"
              />
            </motion.div>

            {/* Festive Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-2"
            >
              <h3 className="text-xl font-bold bg-cosmic-gradient bg-clip-text text-transparent animate-text-shimmer flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
                <span>Special Celebration</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Welcome to something extraordinary! ✨
              </p>
            </motion.div>
          </div>

          {/* Decorative Border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-cosmic-gradient" />
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-cosmic-gradient" />
        </div>

        {/* Floating Decorative Particles */}
        <div className="absolute -inset-8 pointer-events-none overflow-visible">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 - 50,
                y: 50,
                opacity: 0.8,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, -150],
                x: [null, (Math.random() - 0.5) * 150],
                rotate: [0, 360],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute bottom-0 right-0"
            >
              <Sparkles 
                className="text-primary" 
                style={{ 
                  width: `${Math.random() * 12 + 6}px`,
                  height: `${Math.random() * 12 + 6}px`,
                  filter: 'drop-shadow(0 0 4px currentColor)'
                }} 
              />
            </motion.div>
          ))}
        </div>

        {/* Confetti Effect */}
        <div className="absolute -inset-8 pointer-events-none overflow-visible">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              initial={{ 
                x: Math.random() * 80 - 40,
                y: 50,
                opacity: 0.9
              }}
              animate={{
                y: [null, -200],
                x: [null, (Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 720],
                opacity: [0.9, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute w-2 h-4 rounded-full bottom-0 right-0"
              style={{
                background: i % 3 === 0 
                  ? 'hsl(var(--primary))' 
                  : i % 3 === 1 
                    ? 'hsl(var(--accent))' 
                    : 'hsl(var(--primary-glow))',
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute -inset-16 pointer-events-none">
          <motion.div
            animate={{
              x: [-20, 30, -20],
              y: [-20, 30, -20],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-0 w-24 h-24 bg-primary/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [-30, 20, -30],
              y: [20, -30, 20],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/2 right-0 w-32 h-32 bg-accent/30 rounded-full blur-2xl"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FestiveOverlay;
