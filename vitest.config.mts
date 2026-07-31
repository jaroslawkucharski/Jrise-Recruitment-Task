import react from "@vitejs/plugin-react";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

function staticAssetModulePlugin() {
  return {
    name: "static-asset-module-plugin",
    enforce: "pre" as const,
    load(id: string) {
      if (/\.(png|jpe?g|webp|avif|gif)(\?.*)?$/.test(id)) {
        const fileName = path.basename(id).replace(/\?.*$/, "");

        return `export default { src: "/${fileName}", width: 1, height: 1, blurDataURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" };`;
      }

      if (/\.svg(\?.*)?$/.test(id)) {
        return 'import * as React from "react"; export default function SvgComponent(props) { return React.createElement("svg", props); }';
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [staticAssetModulePlugin(), tsconfigPaths(), react()],
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
