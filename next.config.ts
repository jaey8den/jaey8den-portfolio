import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  /* For none custom domain */
  basePath: "/jaey8den-portfolio",
  assetPrefix: "/jaey8den-portfolio/",
  /* For custom domain */
  // basePath: "",
  // assetPrefix: "/",
};

export default nextConfig;
