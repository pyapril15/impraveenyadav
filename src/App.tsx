import { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import FestiveOverlay from "@/components/FestiveOverlay";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * PageLoader Component
 * Displays a loading animation while lazy-loaded pages are being loaded
 */
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

/**
 * Query Client Configuration
 * Optimized settings for better caching and performance
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Main App Component
 * Handles routing, loading state, and global providers
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Handle loading completion
   * Transitions from loading screen to main app
   */
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Optional: Add analytics event
    // trackEvent('app_loaded');
  };

  /**
   * Optional: Monitor app performance
   */
  useEffect(() => {
    if (!isLoading) {
      // Optional: Log performance metrics
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`✓ App loaded in ${pageLoadTime}ms`);
      }
    }
  }, [isLoading]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Toast Notifications */}
          <Toaster />
          <Sonner />

          {/* Loading Screen or Main App */}
          {isLoading ? (
            <LoadingScreen
              onLoadingComplete={handleLoadingComplete}
              logoImage="/android-chrome-192x192.png"
            />
          ) : (
            <BrowserRouter>
              {/* Festive Overlay (seasonal effects) */}
              <FestiveOverlay />

              {/* Main Application Layout */}
              <div className="relative min-h-screen flex flex-col">
                {/* Navigation Header */}
                <Navigation />

                {/* Routes with Lazy Loading */}
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Home Route */}
                      <Route path="/" element={<Index />} />

                      {/* Main Routes */}
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/certificates" element={<Certificates />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE */}

                      {/* Catch-all Route for 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Optional: Footer could go here */}
              </div>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
