import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./utils/performance";

// Monitor Core Web Vitals for performance tracking
reportWebVitals((metric) => {
  // Log metrics to console in development
  if (import.meta.env.DEV) {
    console.log(metric);
  }
  // In production, you can send these metrics to an analytics endpoint
});

createRoot(document.getElementById("root")!).render(<App />);
