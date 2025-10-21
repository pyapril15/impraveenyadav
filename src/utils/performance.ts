/**
 * Performance monitoring and optimization utilities
 */

// Monitor Core Web Vitals
export const reportWebVitals = (onPerfEntry?: (metric: unknown) => void) => {
  if (onPerfEntry && typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry); // Replaced onFID with onINP (Interaction to Next Paint)
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }
};

// Image lazy loading observer
export const createImageObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      // cast is safe because func accepts Parameters<T>
      (func as (...a: Parameters<T>) => unknown)(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
// Measure component render time (production-ready)
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
export const measureRenderTime = (componentName: string) => {
  if (typeof window === 'undefined' || !window.performance) return;

  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Send performance metrics to GTM in production
    if (renderTime > 16.67 && typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'performance_metric',
        component_name: componentName,
        render_time: renderTime.toFixed(2),
      });
    }
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};
