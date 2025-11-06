// src/main.tsx

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

// Extend Window Interface for GTM (Google Tag Manager)
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]; // For sending web vitals to GTM
  }
}

// Monitor Core Web Vitals & Send Data to GTM
reportWebVitals((metric) => {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "web_vitals", // Event type for GTM
      metric_name: metric.name, // Name of the metric
      metric_value: metric.value, // Value of the metric
      metric_id: metric.id, // Unique identifier for the metric
      metric_delta: metric.delta, // Change in the metric value
    });
  }
});

// Initialize & Mount React App
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
