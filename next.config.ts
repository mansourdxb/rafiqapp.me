import type { NextConfig } from "next";

// Static export for GitHub Pages (rafiqapp.me). Every route is pre-rendered to out/.
const nextConfig: NextConfig = {
  output: "export",
  // A separate build folder per dev server, so several can run side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
