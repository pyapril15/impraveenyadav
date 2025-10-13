// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
//
// // https://vitejs.dev/config/
// export default defineConfig(() => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,  // Disable source maps in production for smaller build & security
    outDir: "dist",    // Default output folder
    minify: "esbuild", // Fast minification (default)
    target: "esnext",  // Adjust if you need older browser support
  },
});

