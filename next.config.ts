import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Next's CLI type-check path receives an empty --showConfig stream under
  // this project's Node runtime. The compiler API performs the same checks
  // without spawning that broken capture path.
  experimental: {
    useTypeScriptCli: false,
  },
};

export default withNextIntl(nextConfig);
