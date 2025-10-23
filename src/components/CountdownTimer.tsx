import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import festivalUtil from "@/utils/festival.util";

interface CountdownTimerProps {
  targetDate: string | Date;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-xs text-white/70">{label}</div>
  </div>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [countdown, setCountdown] = useState(() =>
    festivalUtil.calculateCountdown(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(festivalUtil.calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (countdown.isToday) {
    return (
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-2xl font-bold text-white"
        >
          🎉 TODAY! 🎉
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <TimeUnit value={countdown.days} label="Days" />
      <TimeUnit value={countdown.hours} label="Hours" />
      <TimeUnit value={countdown.minutes} label="Mins" />
      <TimeUnit value={countdown.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;
