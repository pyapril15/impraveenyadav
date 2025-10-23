import React from "react";
import { motion } from "framer-motion";
import { X, Wifi, WifiOff, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import festivalUtil from "@/utils/festival.util";

// --- Define types for props ---
interface Festival {
  name: string;
  date: string;
  day?: string;
  icon?: React.ReactNode;
  bgImage?: string;
  color?: string;
  shortDesc?: string;
  tagline?: string;
  description?: string;
  source?: string;
}

interface FestiveCardProps {
  festival: Festival;
  onClose: () => void;
  isOnline: boolean;
}

// --- Component ---
const FestiveCard: React.FC<FestiveCardProps> = ({ festival, onClose, isOnline }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 400, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.8 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className="relative overflow-hidden rounded-2xl shadow-2xl w-80"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${festival.bgImage ?? ""})`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Color Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${festival.color ?? "#000"}40, ${
            festival.color ?? "#000"
          }80)`,
        }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative p-6 text-white">
        {/* Online / Offline Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Live</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-red-400" />
              <span className="text-red-400">Offline</span>
            </>
          )}
        </div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300"
          aria-label="Close festival banner"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        {/* Festival Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.5 }}
          className="text-6xl mb-4 text-center mt-6"
        >
          {festival.icon}
        </motion.div>

        {/* Festival Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-2"
        >
          <h3 className="text-2xl font-bold mb-1 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            {festival.name}
          </h3>
          {festival.shortDesc && (
            <p className="text-sm text-white/80 mb-1">{festival.shortDesc}</p>
          )}
          {festival.tagline && (
            <p className="text-xs text-white/70 italic">{festival.tagline}</p>
          )}
        </motion.div>

        {/* Date Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-4"
        >
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm font-semibold">
              {festivalUtil.formatDate(festival.date)}
            </p>
            {festival.day && (
              <p className="text-xs text-white/70">{festival.day}</p>
            )}
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-4"
        >
          <CountdownTimer targetDate={festival.date} />
        </motion.div>

        {/* Description */}
        {festival.description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-xs text-white/80 leading-relaxed">
              {festival.description}
            </p>
          </motion.div>
        )}

        {/* API Source */}
        <div className="text-center mt-3">
          <span className="text-[10px] text-white/50 bg-black/20 px-2 py-1 rounded-full">
            API: {festival.source ?? "unknown"}
          </span>
        </div>
      </div>

      {/* Bottom Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: festival.color ?? "#fff" }}
      />
    </motion.div>
  );
};

export default FestiveCard;
