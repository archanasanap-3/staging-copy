import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  output: 'export',        // Fully static export — zero Node.js server required
  trailingSlash: true,
  images: {
    unoptimized: true,     // Required for static export (no Image Optimization API)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "svgl.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // NOTE: headers() is a server-only Next.js feature and cannot be used with
  // output: 'export'. Apply security headers at the hosting layer instead
  // (Netlify _headers file, Vercel vercel.json headers, Cloudflare Transform Rules).
};

export default nextConfig;
