import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files, and serves them from /<repo-name>.
  output: "export",
  basePath: process.env.BASE_PATH || undefined,
  // Plain image paths in the pages need the same prefix.
  env: { NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "" },
};

export default nextConfig;
