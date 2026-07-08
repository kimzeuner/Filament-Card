import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/filament-card.js",
      name: "FilamentCard",
      formats: ["es"],
      fileName: () => "filament-card.js"
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

