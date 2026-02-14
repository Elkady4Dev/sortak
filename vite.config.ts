import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Handle client-side routing in production
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    // Ensure proper routing for production
    base: mode === "production" ? "./" : "/",
  };
  
  return config;
});
