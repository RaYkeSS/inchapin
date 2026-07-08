import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  typedRoutes: true,
  images: {
    qualities: [75, 90],
  },
  sassOptions: {
    loadPaths: [path.join(__dirname, ".")],
  },
};

export default nextConfig;
