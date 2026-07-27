import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      all: true,
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["components/**/*.{ts,tsx}", "data/**/*.ts"],
      exclude: ["**/*.test.{ts,tsx}", "**/types.ts"],
    },
  },
});
