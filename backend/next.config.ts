import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Backend klasörünü workspace root olarak kullan (üst klasördeki lockfile uyarısını kaldırır)
    root: process.cwd(),
  },
};

export default nextConfig;
