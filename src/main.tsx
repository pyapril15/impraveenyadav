import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

// Extend Window interface for Google Tag Manager
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// Monitor Core Web Vitals for performance tracking
reportWebVitals((metric) => {
  // Send metrics to Google Tag Manager for production analytics
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'web_vitals',
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_delta: metric.delta,
    });
  }
});

createRoot(document.getElementById("root")!).render(<App />);
