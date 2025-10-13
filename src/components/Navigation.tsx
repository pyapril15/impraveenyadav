import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  CogIcon, 
  AcademicCapIcon, 
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { usePersonalInfo } from '@/hooks/usePortfolioData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: personalInfo } = usePersonalInfo();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/about', label: 'About', icon: UserIcon },
    { path: '/projects', label: 'Projects', icon: BriefcaseIcon },
    { path: '/skills', label: 'Skills', icon: CogIcon },
    { path: '/certificates', label: 'Certificates', icon: AcademicCapIcon },
    { path: '/contact', label: 'Contact', icon: EnvelopeIcon },
  ];

  return (
    <>
      {/* Enhanced Desktop Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 glass-card-ultra border-b border-primary/30"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo with User Info */}
            <Link to="/" className="flex items-center gap-3 hover-tilt group">
              <motion.div 
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 shadow-cosmic relative"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <img
                  src={personalInfo?.image_url || "/placeholder.svg"}
                  alt={personalInfo?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-cosmic-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.div>
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {personalInfo?.name || "Portfolio"}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 relative overflow-hidden group ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-cosmic' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover-shine'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                        isActive ? 'animate-pulse-glow' : 'group-hover:scale-110'
                      }`} />
                      <span className="text-sm font-medium relative z-10">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          x: isOpen ? '0%' : '100%' 
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-16 right-0 bottom-0 w-80 bg-glass-bg backdrop-blur-md border-l border-primary/20 z-30 md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="p-6">
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : 50 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isOpen ? index * 0.1 : 0 
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;