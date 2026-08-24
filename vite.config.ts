import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Vite serves the demo/preview app. The library itself is built with tsc
// (see tsconfig.build.json) so the shipped files stay readable for
// Tailwind's class scanner in consuming apps.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the demo build away from the library's tsc output in dist/
    outDir: "demo-dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
