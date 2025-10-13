import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cache } from '@/lib/redis';
import type { Tables } from '@/integrations/supabase/types';

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

// Personal Info Hook - Now uses secure public view
export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ['portfolio-public-info'],
    queryFn: async (): Promise<PersonalInfo | null> => {
      const cacheKey = 'portfolio-public-info';
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      // Use the secure public view that excludes sensitive contact info
      const { data, error } = await supabase
        .from('portfolio_public_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        await cache.set(cacheKey, data);
      }
      
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Projects Hook
export const useProjects = (featured?: boolean) => {
  return useQuery({
    queryKey: ['projects', featured],
    queryFn: async (): Promise<Project[]> => {
      const cacheKey = `projects-${featured ? 'featured' : 'all'}`;
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      let query = supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      if (data) {
        await cache.set(cacheKey, data);
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

// Skills Hook
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async (): Promise<Skill[]> => {
      const cacheKey = 'skills';
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('proficiency', { ascending: false });

      if (error) throw error;
      
      if (data) {
        await cache.set(cacheKey, data);
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

// Certifications Hook
export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async (): Promise<Certification[]> => {
      const cacheKey = 'certifications';
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('date', { ascending: false });

      if (error) throw error;
      
      if (data) {
        await cache.set(cacheKey, data);
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

// Journey Timeline Hook
export const useJourneyTimeline = () => {
  return useQuery({
    queryKey: ['journey-timeline'],
    queryFn: async (): Promise<JourneyTimeline[]> => {
      const cacheKey = 'journey-timeline';
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const { data, error } = await supabase
        .from('journey_timeline')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      if (data) {
        await cache.set(cacheKey, data);
      }
      
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};