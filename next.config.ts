import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|ico|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache sitemap and robots for 1 day
        source: "/(sitemap.xml|robots.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Redirect common misspellings
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/official",
        destination: "/officials",
        permanent: true,
      },
      {
        source: "/contacts",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  outputFileTracingIncludes: {
    "/**/*": ["./templates/*.docx"],
  },
};

export default nextConfig;
