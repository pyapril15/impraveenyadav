import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

/**
 * Extend the global Window interface to include dataLayer for Google Tag Manager.
 */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Monitor Core Web Vitals for performance tracking and send metrics
 * to Google Tag Manager in production.
 *
 * @param metric - Core Web Vitals metric object containing:
 *   - name: The name of the metric (e.g., FCP, LCP, CLS, etc.)
 *   - value: Measured value of the metric.
 *   - id: Unique identifier for the metric instance.
 *   - delta: Change in the metric since the last measurement.
 */
reportWebVitals(
  (metric) => {
    // Send metrics to Google Tag Manager if available
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "web_vitals",
        metric_name: metric.name,
        metric_value: metric.value,
        metric_id: metric.id,
        metric_delta: metric.delta,
      });
    }
  }
);

/**
 * Initialize and mount the React application.
 *
 * Retrieves the root DOM element by ID and renders the <App /> component.
 */
createRoot(document.getElementById("root")!).render(<App />);
