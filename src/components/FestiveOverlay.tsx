import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FestiveCard from './FestiveCard';
import ParticleEffects from './ParticleEffects';
import LoadingState from './LoadingState';
import festivalAPIService from '@/services/festivalAPI.service';
import festivalUtil from '@/utils/festival.util';

const FestiveOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [nextFestival, setNextFestival] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    loadFestivals();
  }, []);

  const loadFestivals = async () => {
    setIsLoading(true);
    try {
      const health = await festivalAPIService.checkHealth();
      setIsOnline(health.status === 'online');

      const festivals = await festivalAPIService.fetchAllFestivals();

      const next = festivalUtil.getNextFestival(festivals);
      setNextFestival(next);

      if (next) {
        // Additional logic if next festival is found
        setIsVisible(true);
      } else {
        // No next festival found
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error loading festivals:', error);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  if (isLoading) {
    return <LoadingState />;
  }

  if (!nextFestival) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm">
        <div className="pointer-events-auto">
          <FestiveCard
            festival={nextFestival}
            onClose={() => setIsVisible(false)}
            isOnline={isOnline}
          />
        </div>
        <ParticleEffects />
      </div>
    </AnimatePresence>
  );
};

export default FestiveOverlay;
