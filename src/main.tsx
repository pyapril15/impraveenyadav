// 🚀 Application Entry Point
// Location: src/main.tsx

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

/* 🌐 Extend Window Interface for GTM */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/* 📊 Monitor Core Web Vitals & Send to GTM */
reportWebVitals((metric) => {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "web_vitals",
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_delta: metric.delta,
    });
  }
});

/* ⚛️ Initialize & Mount React App */
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
