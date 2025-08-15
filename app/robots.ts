import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: "https://finly-calculator.vercel.app/sitemap.xml",
    host: "https://finly-calculator.vercel.app",
  };
}
