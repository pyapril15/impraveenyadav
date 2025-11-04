// ⚛️ Main Application Entry
// Location: src/App.tsx

import { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import FestivalOverlay from "@/components/FestivalOverlay";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";

// ⬇️ Import the fetch functions used in hooks (not hooks themselves)
import { supabase } from "@/integrations/supabase/client";
import { redis } from "@/lib/redis";

/* 🧩 Lazy-loaded Pages */
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ⏳ Fallback Loader */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-pulse-cosmic">
        <div className="w-16 h-16 bg-primary/20 rounded-full"></div>
      </div>
      <p className="text-muted-foreground text-sm font-medium">Loading page...</p>
    </div>
  </div>
);

/* ⚙️ React Query Configuration */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/* 🧠 Data Fetchers (for Prefetching) */
const fetchPersonalInfo = async () => {
  const cacheKey = "personal_info";
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("personal_info")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (data) redis.set(cacheKey, data, 86400).catch(() => null);
  return data;
};

const fetchFestivals = async (year: number) => {
  const cacheKey = `festivals_${year}_all`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://indian-festivals-api.onrender.com/api/v1/festivals/${year}`);
  if (!res.ok) throw new Error("Failed to fetch festivals");
  const json = await res.json();
  redis.set(cacheKey, json, 86400).catch(() => null);
  return json;
};

const fetchReligiousFestivals = async (year: number) => {
  const cacheKey = `religious_festivals_${year}_all`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://indian-festivals-api.onrender.com/api/v1/festivals/${year}/religious`);
  if (!res.ok) throw new Error("Failed to fetch religious festivals");
  const json = await res.json();
  redis.set(cacheKey, json, 86400).catch(() => null);
  return json;
};

/* 🧠 Prefetch Key App Data */
async function prefetchEssentialData() {
  try {
    const currentYear = new Date().getFullYear();
    await Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: ["personal_info"],
        queryFn: fetchPersonalInfo,
      }),
      queryClient.prefetchQuery({
        queryKey: ["festivals", currentYear],
        queryFn: () => fetchFestivals(currentYear),
      }),
      queryClient.prefetchQuery({
        queryKey: ["religious-festivals", currentYear],
        queryFn: () => fetchReligiousFestivals(currentYear),
      }),
    ]);
    if (import.meta.env.DEV) console.log("⚡ Prefetched essential data.");
  } catch (err) {
    console.warn("Prefetch failed:", err);
  }
}

/* 🧩 Prefetch Secondary (Idle) Routes */
function prefetchIdlePages() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      [
        () => import("./pages/About"),
        () => import("./pages/Projects"),
        () => import("./pages/Skills"),
        () => import("./pages/Certificates"),
        () => import("./pages/Contact"),
      ].forEach((loader) => loader());
    });
  } else {
    setTimeout(prefetchIdlePages, 3000);
  }
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* 🧠 Main App Component */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = (): void => {
    setIsLoading(false);
  };

  /* 📊 Performance Metrics */
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined" && window.performance?.timing) {
      const t = window.performance.timing;
      const loadTime = t.loadEventEnd - t.navigationStart;
      console.log(`✓ App interactive in ${loadTime}ms`);
    }
  }, [isLoading]);

  /* 🪄 Prefetch Data & Idle Pages */
  useEffect(() => {
    prefetchEssentialData();
    prefetchIdlePages();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {isLoading ? (
            <LoadingScreen
              onLoadingComplete={handleLoadingComplete}
              logoImage="/android-chrome-192x192.png"
            />
          ) : (
            <BrowserRouter>
              <ScrollToTop />
              <FestivalOverlay />
              <div className="relative min-h-screen flex flex-col">
                <Navigation />

                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/certificates" element={<Certificates />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <PortfolioChatbot />
                </main>
              </div>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
