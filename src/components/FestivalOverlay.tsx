// 🎉 src/components/FestivalOverlay.tsx
// Displays countdowns for today's and next festivals with animations and styling

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Sparkles } from "lucide-react";
import { useNextFestival } from "@/hooks/useFestivalData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FestivalOverlay = () => {
  // Visibility state for overlay
  const [isVisible, setIsVisible] = useState(true);

  // Countdown timers for today and next festival
  const [todayTimeLeft, setTodayTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextTimeLeft, setNextTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Festival data from custom hook
  const { todayFestival, nextFestival, isLoading, error } = useNextFestival();

  /* ⏳ Countdown timer effect */
  useEffect(() => {
    if (!todayFestival && !nextFestival) return;

    const calculateTimeLeft = () => {
      const now = new Date();

      // Calculate countdown for today's festival (until end of day)
      if (todayFestival?.fullDate) {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const diff = endOfDay.getTime() - now.getTime();

        setTodayTimeLeft({
          days: 0,
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }

      // Calculate countdown for next festival
      if (nextFestival?.fullDate) {
        const target = nextFestival.fullDate.getTime();
        const diff = target - now.getTime();

        if (diff > 0) {
          setNextTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
          });
        }
      }
    };

    calculateTimeLeft(); // initial calculation
    const timer = setInterval(calculateTimeLeft, 1000); // update every second

    return () => clearInterval(timer);
  }, [todayFestival?.fullDate, nextFestival?.fullDate]);

  // Don't render if hidden, error, or no festival data
  if (!isVisible || error || (!todayFestival && !nextFestival)) return null;

  const hasBothFestivals = Boolean(todayFestival && nextFestival);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-20 right-4 z-50 ${hasBothFestivals ? "w-[340px]" : "w-[380px]"}`}
      >
        <div className="relative">
          {/* Overlay Container */}
          <div className="relative bg-gradient-to-br from-primary/20 via-background/95 to-accent/20 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl overflow-hidden">
            {/* Background Gradients and Effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-gradient" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-xl" />

            {/* Content */}
            <div className={`relative ${hasBothFestivals ? "p-4" : "p-6"}`}>
              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
                aria-label="Close festival notification"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-sm">Loading festivals...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Today's Festival Countdown */}
                  {todayFestival && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                          <span className="text-xs font-semibold text-primary">TODAY</span>
                        </div>
                      </div>
                      <div className="bg-background/80 rounded-xl p-3 border border-primary/20">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                          {todayFestival.name}
                        </h3>
                        <div className="text-xs text-muted-foreground mb-2">Ends in</div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { value: todayTimeLeft.days, label: "Days" },
                            { value: todayTimeLeft.hours, label: "Hrs" },
                            { value: todayTimeLeft.minutes, label: "Mins" },
                            { value: todayTimeLeft.seconds, label: "Secs" },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="bg-background/60 rounded-lg p-2 text-center border border-primary/10"
                            >
                              <div className="text-xl font-bold text-primary tabular-nums">{item.value}</div>
                              <div className="text-[10px] text-muted-foreground">{item.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Festival Countdown */}
                  {nextFestival && (
                    <div>
                      {todayFestival ? (
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="text-xs font-semibold text-accent">UPCOMING</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div className="bg-background/60 rounded-xl p-3 border border-primary/10">
                        <h3
                          className={`${hasBothFestivals ? "text-lg" : "text-2xl"
                            } font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2`}
                        >
                          {nextFestival.name}
                        </h3>
                        <div
                          className={`text-center ${hasBothFestivals ? "text-sm" : "text-base"
                            } text-foreground mb-2`}
                        >
                          {nextFestival.date} {nextFestival.monthName} {nextFestival.fullDate.getFullYear()}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2 text-center">Coming in</div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { value: nextTimeLeft.days, label: "Days" },
                            { value: nextTimeLeft.hours, label: "Hrs" },
                            { value: nextTimeLeft.minutes, label: "Mins" },
                            { value: nextTimeLeft.seconds, label: "Secs" },
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-background/80 rounded-lg p-2 text-center border border-primary/10"
                            >
                              <div
                                className={`${hasBothFestivals ? "text-xl" : "text-2xl"
                                  } font-bold text-primary tabular-nums`}
                              >
                                {item.value}
                              </div>
                              <div className="text-[10px] text-muted-foreground">{item.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer note */}
                  <div className="text-center text-[10px] text-muted-foreground mt-3">
                    API: indian-festivals-api
                  </div>
                </>
              )}
            </div>

            {/* Decorative animated backgrounds */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />
            <div
              className="absolute bottom-4 right-4 w-16 h-16 bg-accent/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Animated dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
              }}
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FestivalOverlay;
