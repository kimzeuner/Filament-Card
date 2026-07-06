import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/spoolman-filament-card.js",
      name: "SppolamFilamentCard",
      formats: ["es"],
      fileName: () => "spoolman-filament-card.js"
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});

