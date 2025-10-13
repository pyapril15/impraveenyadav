import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const texts = [
      'Initializing portfolio...',
      'Loading components...',
      'Preparing experience...',
      'Almost ready...'
    ];

    let currentTextIndex = 0;
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setLoadingText(texts[currentTextIndex]);
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            onLoadingComplete();
          }, 400);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 120);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-cosmic"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-cosmic-drift"></div>
          
          {/* Starfield Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">
          {/* Logo/Icon with Advanced Animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="w-32 h-32 rounded-full bg-cosmic-gradient flex items-center justify-center shadow-cosmic relative"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-2 bg-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.span 
                className="text-5xl relative z-10"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🚀
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Title with Gradient Animation */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-aurora-gradient bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            style={{ backgroundSize: '200% auto' }}
          >
            Loading Portfolio
          </motion.h1>

          {/* Loading Text with Fade Animation */}
          <motion.p
            className="text-muted-foreground text-lg text-center"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loadingText}
          </motion.p>

          {/* Enhanced Progress Bar */}
          <div className="w-80 max-w-md">
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span className="font-medium">Progress</span>
              <motion.span 
                className="font-bold text-primary"
                key={progress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            <div className="skill-progress h-3 bg-secondary/30 rounded-full overflow-hidden">
              <motion.div
                className="skill-progress-fill h-full rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>
          </div>

          {/* Orbiting Particles */}
          <div className="relative w-24 h-24 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full shadow-cosmic"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 40 * Math.cos((i * 120 * Math.PI) / 180)],
                  y: [0, 40 * Math.sin((i * 120 * Math.PI) / 180)],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;