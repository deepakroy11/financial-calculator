/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PWA features and fix caching issues
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate", // 24 hours
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate", // Never cache service worker
          },
        ],
      },
      {
        // Cache static assets properly
        source: "/favicon/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year
          },
        ],
      },
      {
        // Cache logo and images
        source: "/logo/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year
          },
        ],
      },
      {
        // Prevent caching of HTML pages in development
        source: "/((?!api|_next/static|_next/image|favicon|logo).*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "development"
                ? "no-cache, no-store, must-revalidate"
                : "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // Disable static optimization for better cache control
  experimental: {
    optimizeCss: false,
  },

  // Configure build output
  generateBuildId: async () => {
    // Use timestamp for build ID to ensure cache busting
    return `build-${Date.now()}`;
  },
};

module.exports = nextConfig;
