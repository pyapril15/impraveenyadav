// 📅 src/hooks/useFestivalData.ts
// Provides hooks to fetch Indian festivals with caching and combined logic for today/next festivals

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FestivalsResponse, ReligiousFestivalsResponse, UpcomingFestival } from '../types/festival';
import { redis } from '@/lib/redis';

const API_BASE_URL = 'https://indian-festivals-api.onrender.com/api/v1';
const REDIS_TTL = 86400; // 24 hours

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/* -------------------------------------------------------------------------- */
/*                             Redis caching helper                            */
/* -------------------------------------------------------------------------- */
async function fetchWithCache<T>(cacheKey: string, fetcher: () => Promise<T>, ttl = REDIS_TTL): Promise<T> {
  try {
    const cached = await redis.get<T>(cacheKey);
    if (cached) return cached;
  } catch (err) {
    console.error(`Redis GET error for key "${cacheKey}":`, err);
  }

  const data = await fetcher();

  try {
    await redis.set(cacheKey, data, ttl);
  } catch (err) {
    console.error(`Redis SET error for key "${cacheKey}":`, err);
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                              Use Festivals Hook                              */
/* -------------------------------------------------------------------------- */
export const useFestivals = (year: number, month?: number) => {
  const endpoint = month
    ? `${API_BASE_URL}/festivals/${year}/month/${month}`
    : `${API_BASE_URL}/festivals/${year}`;
  const cacheKey = `festivals_${year}_${month ?? 'all'}`;

  return useQuery<FestivalsResponse>({
    queryKey: ['festivals', year, month],
    queryFn: () =>
      fetchWithCache<FestivalsResponse>(cacheKey, async () => {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch festivals');
        return res.json();
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 1,
    retryDelay: 1000
  });
};

/* -------------------------------------------------------------------------- */
/*                        Use Religious Festivals Hook                         */
/* -------------------------------------------------------------------------- */
export const useReligiousFestivals = (year: number, month?: number) => {
  const endpoint = month
    ? `${API_BASE_URL}/festivals/${year}/religious/month/${month}`
    : `${API_BASE_URL}/festivals/${year}/religious`;
  const cacheKey = `religious_festivals_${year}_${month ?? 'all'}`;

  return useQuery<ReligiousFestivalsResponse>({
    queryKey: ['religious-festivals', year, month],
    queryFn: () =>
      fetchWithCache<ReligiousFestivalsResponse>(cacheKey, async () => {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch religious festivals');
        return res.json();
      }),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    retry: 1,
    retryDelay: 1000
  });
};

/* -------------------------------------------------------------------------- */
/*                           Use Next Festival Hook                             */
/* -------------------------------------------------------------------------- */
export const useNextFestival = () => {
  const currentYear = new Date().getFullYear();

  const { data: festivalsData, isLoading: festivalsLoading, error: festivalsError } = useFestivals(currentYear);
  const { data: religiousData, isLoading: religiousLoading, error: religiousError } = useReligiousFestivals(currentYear);

  const { todayFestival, nextFestival } = useMemo(() => {
    if (!festivalsData && !religiousData) return { todayFestival: null, nextFestival: null };

    const allFestivals: UpcomingFestival[] = [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /* ---------------------- Regular festivals ---------------------- */
    if (festivalsData?.festivals) {
      Object.entries(festivalsData.festivals).forEach(([monthName, items]) => {
        const monthIndex = MONTH_NAMES.indexOf(monthName);
        if (monthIndex === -1) return;

        items.forEach(item => {
          const festivalDate = new Date(currentYear, monthIndex, parseInt(item.date));
          if (festivalDate >= today) allFestivals.push({ ...item, fullDate: festivalDate, monthName });
        });
      });
    }

    /* --------------------- Religious festivals --------------------- */
    if (religiousData?.religious_festivals) {
      Object.entries(religiousData.religious_festivals).forEach(([_, items]) => {
        items.forEach(item => {
          if (!item.month) return;

          const monthIndex = MONTH_NAMES.indexOf(item.month);
          if (monthIndex === -1) return;

          const festivalDate = new Date(currentYear, monthIndex, parseInt(item.date));
          if (festivalDate >= today) allFestivals.push({ ...item, fullDate: festivalDate, monthName: item.month });
        });
      });
    }

    /* ------------------------- Sort by date ------------------------ */
    allFestivals.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

    /* -------------------- Determine today festival ------------------ */
    const todayFestival = allFestivals.find(f => {
      const festivalDay = new Date(f.fullDate.getFullYear(), f.fullDate.getMonth(), f.fullDate.getDate());
      return festivalDay.getTime() === today.getTime();
    }) || null;

    /* -------------------- Determine next festival ------------------ */
    const nextFestival = allFestivals.find(f => f.fullDate.getTime() > today.getTime())
      || (todayFestival ? null : allFestivals[0])
      || null;

    return { todayFestival, nextFestival };
  }, [festivalsData, religiousData, currentYear]);

  return {
    todayFestival,
    nextFestival,
    isLoading: festivalsLoading || religiousLoading,
    error: festivalsError || religiousError
  };
};
