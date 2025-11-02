// ⚛️ Main Application Entry
// Location: src/App.tsx

import { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import FestivalOverlay from "@/components/FestivalOverlay";


/* 🧩 Lazy-loaded Pages (Code Splitting) */
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ⏳ Page Loader (Fallback for Lazy Pages) */
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

/* 🧠 Main App Component */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  /* ✅ Handle loading completion */
  const handleLoadingComplete = (): void => {
    setIsLoading(false);
  };

  /* 📊 Optional: Monitor app performance */
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined" && window.performance?.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`✓ App loaded in ${pageLoadTime}ms`);
    }
  }, [isLoading]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* 🔔 Toast Notifications */}
          <Toaster />
          <Sonner />

          {/* 🌀 Loading Screen or Main App */}
          {isLoading ? (
            <LoadingScreen
              onLoadingComplete={handleLoadingComplete}
              logoImage="/android-chrome-192x192.png"
            />
          ) : (
            <BrowserRouter>
              {/* 🎉 Festive Overlay (seasonal effects) */}
              <FestivalOverlay />

              {/* 🧭 Main Layout */}
              <div className="relative min-h-screen flex flex-col">
                <Navigation />

                {/* 🗺 App Routes */}
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* 🏠 Home */}
                      <Route path="/" element={<Index />} />

                      {/* 📄 Main Pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/certificates" element={<Certificates />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* 🚧 Custom routes can be added above */}
                      {/* ❌ 404 Not Found */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
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
