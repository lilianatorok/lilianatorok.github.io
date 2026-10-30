import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files, and serves them from /<repo-name>.
  output: "export",
  basePath: process.env.BASE_PATH || undefined,
};

export default nextConfig;
