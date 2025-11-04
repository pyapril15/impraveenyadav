// 🎯 usePortfolioData Hook Suite
// Location: src/hooks/usePortfolioData.ts

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { redis } from "@/lib/redis";
import type { Tables } from "@/integrations/supabase/types";

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

export type Project = Tables<"projects">;
export type Skill = Tables<"skills">;
export type Certification = Tables<"certifications">;
export type JourneyTimeline = Tables<"journey_timeline">;

/* ⚙️ Query Config */
const STALE_TIME = 10 * 60 * 1000; // 10 min
const GC_TIME = 15 * 60 * 1000; // 15 min

// 🎛 Fine-tuned Redis TTLs (seconds)
const TTL = {
  personal_info: 86400, // 24h
  projects: 300, // 5m
  skills: 3600, // 1h
  certifications: 3600, // 1h
  journey_timeline: 600, // 10m
};

/* 🧠 Helper: Cache-aware fetcher with fallback */
async function fetchWithCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 600
): Promise<T> {
  try {
    const cached = await redis.get<T>(cacheKey);
    if (cached !== null && cached !== undefined) {
      if (import.meta.env.DEV)
        console.log(`🧠 [Redis HIT] ${cacheKey}`, cached);
      return cached;
    }
  } catch (err: unknown) {
    console.error(`Redis GET error for key "${cacheKey}":`, err);
  }

  // Redis miss → fetch fresh data
  try {
    const data = await fetcher();
    // fire-and-forget cache write
    redis.set(cacheKey, data, ttlSeconds).catch((e) =>
      console.warn(`Redis SET failed for ${cacheKey}:`, e)
    );
    if (import.meta.env.DEV) console.log(`🌐 [Fetch] ${cacheKey}`);
    return data;
  } catch (fetchErr) {
    console.error(`Fetcher failed for ${cacheKey}:`, fetchErr);
    // fallback: try again after small delay
    await new Promise((r) => setTimeout(r, 300));
    return await fetcher();
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Hooks                                      */
/* -------------------------------------------------------------------------- */

// 👤 Personal Info
export const usePersonalInfo = () =>
  useQuery({
    queryKey: ["personal_info"],
    queryFn: async (): Promise<PersonalInfo | null> => {
      return fetchWithCache<PersonalInfo | null>(
        "personal_info",
        async () => {
          const { data, error } = await supabase
            .from("personal_info")
            .select("*")
            .limit(1)
            .maybeSingle();
          if (error) throw error;
          return data || null;
        },
        TTL.personal_info
      );
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    placeholderData: (old) => old,
  });

// 💼 Projects
export const useProjects = (featured?: boolean) => {
  const cacheKey = `projects-${featured ? "featured" : "all"}`;
  return useQuery({
    queryKey: ["projects", featured],
    queryFn: async (): Promise<Project[]> => {
      return fetchWithCache<Project[]>(
        cacheKey,
        async () => {
          let query = supabase
            .from("projects")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });
          if (featured) query = query.eq("is_featured", true);
          const { data, error } = await query;
          if (error) throw error;
          return data || [];
        },
        TTL.projects
      );
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    placeholderData: (old) => old,
  });
};

// 🧠 Skills
export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: async (): Promise<Skill[]> => {
      return fetchWithCache<Skill[]>(
        "skills",
        async () => {
          const { data, error } = await supabase
            .from("skills")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("proficiency", { ascending: false });
          if (error) throw error;
          return data || [];
        },
        TTL.skills
      );
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    placeholderData: (old) => old,
  });

// 🎓 Certifications
export const useCertifications = () =>
  useQuery({
    queryKey: ["certifications"],
    queryFn: async (): Promise<Certification[]> => {
      return fetchWithCache<Certification[]>(
        "certifications",
        async () => {
          const { data, error } = await supabase
            .from("certifications")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("date", { ascending: false });
          if (error) throw error;
          return data || [];
        },
        TTL.certifications
      );
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    placeholderData: (old) => old,
  });

// 🕰 Journey Timeline
export const useJourneyTimeline = () =>
  useQuery({
    queryKey: ["journey_timeline"],
    queryFn: async (): Promise<JourneyTimeline[]> => {
      return fetchWithCache<JourneyTimeline[]>(
        "journey_timeline",
        async () => {
          const { data, error } = await supabase
            .from("journey_timeline")
            .select("*")
            .order("sort_order", { ascending: true });
          if (error) throw error;
          return data || [];
        },
        TTL.journey_timeline
      );
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    placeholderData: (old) => old,
  });
