// 🎯 usePortfolioData Hook Suite
// Location: src/hooks/usePortfolioData.ts

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { redis } from '@/lib/redis';
import type { Tables } from '@/integrations/supabase/types';

/* 🧩 Type Definitions */
export type PersonalInfo = {
  id: string;
  name: string;
  image_url: string;
  role: string;
  bio: string;
  quote: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  resume_url: string;
  created_at: string;
  updated_at: string;
};

export type Project = Tables<'projects'>;
export type Skill = Tables<'skills'>;
export type Certification = Tables<'certifications'>;
export type JourneyTimeline = Tables<'journey_timeline'>;

/* ⚙️ Query Config */
const STALE_TIME = 10 * 60 * 1000;
const GC_TIME = 15 * 60 * 1000;
const REDIS_TTL = 600;

/* 🧠 Helper: Cache-aware fetcher */
async function fetchWithCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  ttl = REDIS_TTL
): Promise<T> {
  try {
    const cached = await redis.get<T>(cacheKey);
    if (cached) return cached;
  } catch (err: unknown) {
    console.error(`Redis GET error for key "${cacheKey}":`, err);
  }

  const data = await fetcher();

  try {
    await redis.set(cacheKey, data, ttl);
  } catch (err: unknown) {
    console.error(`Redis SET error for key "${cacheKey}":`, err);
  }

  return data;
}

/* 🔗 Hooks */

// 👤 Personal Info
export const usePersonalInfo = () =>
  useQuery({
    queryKey: ['personal_info'],
    queryFn: async (): Promise<PersonalInfo | null> => {
      return fetchWithCache<PersonalInfo | null>('personal_info', async () => {
        const { data, error } = await supabase
          .from('personal_info')
          .select('*')
          .limit(1)
          .maybeSingle();
        if (error) throw error;
        return data || null;
      });
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

// 💼 Projects
export const useProjects = (featured?: boolean) => {
  const cacheKey = `projects-${featured ? 'featured' : 'all'}`;
  return useQuery({
    queryKey: ['projects', featured],
    queryFn: async (): Promise<Project[]> => {
      return fetchWithCache<Project[]>(cacheKey, async () => {
        let query = supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });
        if (featured) query = query.eq('is_featured', true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      });
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};

// 🧠 Skills
export const useSkills = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: async (): Promise<Skill[]> => {
      return fetchWithCache<Skill[]>('skills', async () => {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('proficiency', { ascending: false });
        if (error) throw error;
        return data || [];
      });
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

// 🎓 Certifications
export const useCertifications = () =>
  useQuery({
    queryKey: ['certifications'],
    queryFn: async (): Promise<Certification[]> => {
      return fetchWithCache<Certification[]>('certifications', async () => {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('date', { ascending: false });
        if (error) throw error;
        return data || [];
      });
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

// 🕰 Journey Timeline
export const useJourneyTimeline = () =>
  useQuery({
    queryKey: ['journey_timeline'],
    queryFn: async (): Promise<JourneyTimeline[]> => {
      return fetchWithCache<JourneyTimeline[]>('journey_timeline', async () => {
        const { data, error } = await supabase
          .from('journey_timeline')
          .select('*')
          .order('sort_order', { ascending: true });
        if (error) throw error;
        return data || [];
      });
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
