import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://finly-calculator.vercel.app";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  // Calculator pages - these would be individual calculator routes if you had them
  const calculators = [
    "emi-calculator",
    "sip-calculator",
    "tax-calculator",
    "fd-calculator",
    "ppf-calculator",
    "home-loan-calculator",
    "sip-calculator",
    "retirement-calculator",
    "hra-calculator",
    "capital-gains-calculator",
    "tds-calculator",
    "compound-interest-calculator",
    "simple-interest-calculator",
    "nsc-calculator",
    "inflation-calculator",
    "roi-calculator",
    "rd-calculator",
    "savings-goal-calculator",
    "credit-card-calculator",
  ];

  const calculatorPages = calculators.map((calc) => ({
    url: `${baseUrl}/${calc}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Category pages
  const categories = [
    "loans-calculators",
    "investment-calculators",
    "tax-calculators",
    "savings-calculators",
    "business-calculators",
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...categoryPages];
}
