// src/pages/NotFound.tsx

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  ArrowLeftIcon,
  RocketLaunchIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import SEO from "@/components/SEO";
import StarField from "@/components/StarField";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAstronaut, setShowAstronaut] = useState(true);

  // Log 404 error to console on page load
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Track mouse movement for dynamic parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Define floating planets for background animation
  const floatingPlanets = [
    { size: 60, color: "bg-purple-500/20", delay: 0, duration: 20 },
    { size: 40, color: "bg-blue-500/20", delay: 2, duration: 25 },
    { size: 50, color: "bg-pink-500/20", delay: 4, duration: 22 },
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found | Portfolio"
        description="The page you're looking for doesn't exist. Return to the homepage to explore projects and skills."
        keywords="404, page not found, error"
      />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
        <StarField />

        {/* Floating Planets */}
        {floatingPlanets.map((planet, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${planet.color} blur-xl`}
            style={{
              width: planet.size,
              height: planet.size,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: planet.duration,
              repeat: Infinity,
              delay: planet.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Parallax Astronaut */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AnimatePresence>
            {showAstronaut && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-9xl select-none"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
                }}
              >
                🧑‍🚀
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Main 404 Number */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <motion.h1
              className="text-9xl md:text-[12rem] font-bold bg-cosmic-gradient bg-clip-text text-transparent mb-4 relative"
              animate={{
                textShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 40px rgba(139, 92, 246, 0.8)",
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>

            {/* Glitch Effect Overlay */}
            <motion.h1
              className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-red-500/30"
              animate={{
                x: [-2, 2, -2],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              404
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Animated Title */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                Lost in Space
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Houston, we have a problem! The page you're looking for has
              drifted into the cosmic void. Perhaps it was consumed by a black
              hole, or maybe it never existed in this dimension.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/"
                className="btn-cosmic inline-flex items-center gap-2 group"
              >
                <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Return to Base</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-glass inline-flex items-center gap-2 group"
              >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Location</span>
              </button>
            </motion.div>

            {/* Additional Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-foreground">
                  Need Help Finding Your Way?
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Try these popular destinations:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { to: "/projects", label: "Projects" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                  { to: "/blog", label: "Blog" },
                ].map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className="px-4 py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 text-sm font-medium transition-all hover:scale-105"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Rocket Illustration */}
          <motion.div
            className="mt-16 text-6xl opacity-30 cursor-pointer"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              rotate: 45,
              opacity: 0.5,
            }}
            onClick={() => setShowAstronaut(!showAstronaut)}
          >
            🚀
          </motion.div>

          {/* Error Code Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-xs text-muted-foreground font-mono"
          >
            ERROR_CODE: ROUTE_NOT_FOUND | PATH: {location.pathname}
          </motion.div>
        </div>

        {/* Animated Corner Decorations */}
        <motion.div
          className="absolute top-10 right-10 text-4xl opacity-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ⭐
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-10 text-4xl opacity-20"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌙
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
