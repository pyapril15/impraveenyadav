import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/SEO';
import StarField from '@/components/StarField';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Portfolio"
        description="The page you're looking for doesn't exist. Return to the homepage to explore projects and skills."
        keywords="404, page not found, error"
      />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarField />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h1 className="text-9xl md:text-[12rem] font-bold bg-cosmic-gradient bg-clip-text text-transparent mb-4">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lost in Space
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Oops! The page you're looking for seems to have drifted into a black hole. 
              Let's get you back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/" 
                className="btn-cosmic inline-flex items-center gap-2"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Return Home</span>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="btn-glass inline-flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </div>
          </motion.div>
          
          {/* Animated 404 Illustration */}
          <motion.div
            className="mt-16 text-6xl opacity-20"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🚀
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
