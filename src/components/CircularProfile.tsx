// src/components/CircularProfile.tsx

import { motion } from "framer-motion";
import {
  MapPinIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin } from "lucide-react";

interface CircularProfileProps {
  personalInfo: {
    name?: string;
    role?: string;
    location?: string;
    image_url?: string;
    github_url?: string;
    linkedin_url?: string;
    quote?: string;
  };
  stats: {
    projects: number;
    skills: number;
    certifications: number;
  };
}

const CircularProfile = ({ personalInfo, stats }: CircularProfileProps) => {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115313.38229435613!2d82.95171475820314!3d25.31668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x1e70c21c5b45c2c1!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1638234567890!5m2!1sen!2sin";

  const circularData = [
    { icon: MapPinIcon, label: personalInfo?.name || "Name", angle: 263, delay: 0.2 },
    { icon: Linkedin, label: "LinkedIn", link: personalInfo?.linkedin_url, angle: 315, delay: 0.5 },
    { icon: BriefcaseIcon, label: personalInfo?.role || "Developer", angle: 0, delay: 0.8 },
    { icon: CodeBracketIcon, label: `${stats.projects} Projects`, angle: 45, delay: 1.1 },
    { icon: MapPinIcon, label: personalInfo?.location || "Location", angle: 97, delay: 1.4 },
    { icon: SparklesIcon, label: `${stats.skills} Skills`, angle: 135, delay: 1.7 },
    { icon: AcademicCapIcon, label: `${stats.certifications} Certifications`, angle: 180, delay: 2.0 },
    { icon: Github, label: "GitHub", link: personalInfo?.github_url, angle: 225, delay: 2.3 },
  ];

  // Function to get responsive radius for circular layout
  const getResponsiveRadius = () => {
    if (typeof window === 'undefined') return 54;
    const width = window.innerWidth;
    if (width < 640) return 30; // mobile
    if (width < 1024) return 50; // tablet
    return 55; // desktop
  };

  const getPositionFromAngle = (angle: number) => {
    const radius = getResponsiveRadius();
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return {
      top: `calc(50% + ${y}%)`,
      left: `calc(50% + ${x}%)`,
    };
  };

  // Function to format label if it's longer than two words
  const formatLabel = (label: string) => {
    const words = label.trim().split(/\s+/);
    if (words.length <= 2) return label;
    const lines = [];
    for (let i = 0; i < words.length; i += 2) {
      lines.push(words.slice(i, i + 2).join(' '));
    }
    return lines;
  };

  return (
    <div className="relative w-full max-w-[90vw] sm:max-w-[450px] md:max-w-[480px] lg:max-w-[420px] xl:max-w-[450px] mx-auto pb-32 sm:pb-36">
      {/* Main circular container */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        {/* Inner Circle Group */}
        <div className="relative flex items-center justify-center w-[30%] sm:w-[58%] md:w-[62%] lg:w-[64%] xl:w-[65%] aspect-square">
          {/* Map Background */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/20 z-0"
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-50 grayscale-[0.8] scale-150"
              title="Location Map"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-background/60" />
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.5 }}
            className="relative w-[70%] aspect-square rounded-full border-4 border-primary/40 overflow-hidden shadow-2xl z-10"
          >
            <img
              src={personalInfo?.image_url || "/placeholder.svg"}
              alt={personalInfo?.name || "Profile"}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Glowing Ring */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow"
          />
        </div>

        {/* Circular Items */}
        {circularData.map((item, index) => {
          const IconComponent = item.icon;
          const position = getPositionFromAngle(item.angle);
          const isLeftSide = item.angle > 115 && item.angle < 245;
          const formattedLabel = formatLabel(item.label);
          const isMultiLine = Array.isArray(formattedLabel);

          const baseClasses =
            "glass-card px-3 py-2 rounded-full flex items-center gap-1.5 hover:scale-110 hover:border-primary/40 transition-all duration-300 group whitespace-nowrap text-xs sm:text-sm";
          const sideClasses = isLeftSide
            ? "flex-row-reverse text-right origin-right"
            : "flex-row text-left origin-left";

          const content = (
            <>
              <IconComponent className="w-4 h-4 text-primary group-hover:text-accent transition-colors flex-shrink-0" />
              {isMultiLine ? (
                <span className="font-medium text-foreground/90 leading-tight flex flex-col min-w-0">
                  {formattedLabel.map((line, idx) => (
                    <span key={idx} className="whitespace-nowrap">{line}</span>
                  ))}
                </span>
              ) : (
                <span className="font-medium text-foreground/90 whitespace-nowrap">
                  {formattedLabel}
                </span>
              )}
            </>
          );

          return (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: item.delay,
                type: "spring",
                bounce: 0.5,
              }}
              className="absolute z-20"
              style={{
                ...position,
                transform: `translate(-50%, -50%)`,
              }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseClasses} ${sideClasses}`}
                  style={{
                    transform: `translateX(${isLeftSide ? "-70%" : "-30%"})`,
                  }}
                >
                  {content}
                </a>
              ) : (
                <div
                  className={`${baseClasses} ${sideClasses} cursor-default`}
                  style={{
                    transform: `translateX(${isLeftSide ? "-70%" : "-30%"})`,
                  }}
                >
                  {content}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Quote Section */}
      {personalInfo?.quote && (
        <motion.blockquote
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
          className="absolute left-0 right-0 bottom-0 z-30 px-2 sm:px-4"
        >
          <div className="glass-card px-4 py-3 rounded-2xl mx-auto max-w-full">
            <p className="text-sm sm:text-base text-foreground/90 italic leading-relaxed font-light text-center break-words">
              <span className="text-xl text-primary">"</span>
              {personalInfo.quote}
              <span className="text-xl text-primary">"</span>
            </p>
          </div>
        </motion.blockquote>
      )}
    </div>
  );
};

export default CircularProfile;