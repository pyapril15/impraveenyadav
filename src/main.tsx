import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

// Define a type for window with dataLayer property
interface WindowWithDataLayer extends Window {
  dataLayer?: Array<Record<string, unknown>>;
}

// Monitor Core Web Vitals for performance tracking
reportWebVitals((metric) => {
  // Send metrics to Google Tag Manager for production analytics
  if (typeof window !== 'undefined' && (window as WindowWithDataLayer).dataLayer) {
    (window as WindowWithDataLayer).dataLayer.push({
      event: 'web_vitals',
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_delta: metric.delta,
    });
  }
});

createRoot(document.getElementById("root")!).render(<App />);
