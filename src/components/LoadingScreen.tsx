import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  logoImage?: string | null;
}

const LoadingScreen = ({ onLoadingComplete, logoImage }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [imageError, setImageError] = useState(false);

  const steps = [
    'Initializing portfolio...',
    'Loading components...',
    'Preparing experience...',
    'Finalizing...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 95);
        
        if (newProgress >= 90) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setProgress(100);
            setTimeout(() => onLoadingComplete(), 400);
          }, 300);
          return newProgress;
        }
        return newProgress;
      });
    }, 400);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: 'hsl(222 84% 4.9%)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsla(267, 84%, 61%, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, hsla(280, 100%, 70%, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 0%, hsla(250, 100%, 60%, 0.05) 0%, transparent 80%)
          `,
          backgroundAttachment: 'fixed'
        }}
        variants={containerVariants}
        initial="initial"
        exit="exit"
      >
        {/* Responsive Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'hsl(267 84% 61% / 0.1)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'hsl(280 100% 70% / 0.1)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'hsl(217.2 32.6% 17.5%)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-6 w-full max-w-md"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {/* Icon Container */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-28 h-28">
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: 'linear-gradient(135deg, hsl(267 84% 61%), hsl(280 100% 70%), hsl(250 100% 60%))',
                  opacity: 0.3,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden" 
                   style={{
                     backdropFilter: 'blur(16px)',
                     background: 'hsl(222 84% 4.9% / 0.8)',
                     border: '1px solid hsl(267 84% 61% / 0.2)',
                   }}>
                {logoImage && !imageError ? (
                  <img
                    src={logoImage}
                    alt="Logo"
                    className="w-24 h-24 object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-3xl font-bold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    P
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center space-y-2 w-full">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Portfolio
            </motion.h1>
            <motion.div
              className="h-1 w-12 sm:w-16 rounded-full mx-auto"
              style={{
                background: 'linear-gradient(90deg, hsl(267 84% 61%), hsl(280 100% 70%))',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          {/* Status Text */}
          <div className="h-6 sm:h-8 flex items-center justify-center">
            <motion.p
              key={currentStep}
              className="text-xs sm:text-sm font-medium"
              style={{
                color: 'hsl(215 20.2% 65.1%)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {steps[currentStep]}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-3 gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(215 20.2% 65.1%)' }}>
                Progress
              </span>
              <motion.span
                className="text-xs sm:text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, hsl(267 84% 61%), hsl(280 100% 70%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                key={Math.round(progress)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>

            <div 
              className="relative h-1 sm:h-1.5 rounded-full overflow-hidden border"
              style={{
                background: 'hsl(217.2 32.6% 17.5%)',
                borderColor: 'hsl(267 84% 61% / 0.2)',
              }}
            >
              <motion.div
                className="h-full rounded-full shadow-lg"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, hsl(267 84% 61%), hsl(280 100% 70%), hsl(250 100% 60%))',
                  boxShadow: '0 0 20px hsl(267 84% 61% / 0.5)',
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {progress < 100 && (
                <motion.div
                  className="absolute top-0 h-full w-6 sm:w-8 opacity-40"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.4), transparent)',
                  }}
                  animate={{
                    left: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="relative w-12 sm:w-16 h-12 sm:h-16 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(267 84% 61%), hsl(280 100% 70%))',
                  top: '50%',
                  left: '50%',
                  marginTop: '-3px',
                  marginLeft: '-3px',
                }}
                animate={{
                  x: [0, Math.cos((i * 120 * Math.PI) / 180) * 20],
                  y: [0, Math.sin((i * 120 * Math.PI) / 180) * 20],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;