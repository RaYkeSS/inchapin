import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, ".")],
  },
};

export default nextConfig;
