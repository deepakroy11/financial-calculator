"use client";

import Head from "next/head";

interface CalculatorSEOProps {
  title: string;
  description: string;
  calculatorType: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export default function CalculatorSEO({
  title,
  description,
  calculatorType,
  keywords = [],
  canonicalUrl,
}: CalculatorSEOProps) {
  const baseUrl = "https://finly-calculator.vercel.app";
  const fullTitle = `${title} | Finly - Indian Finance Calculator`;
  const url =
    canonicalUrl ||
    `${baseUrl}/${calculatorType
      .toLowerCase()
      .replace(/\s+/g, "-")}-calculator`;

  const defaultKeywords = [
    `${calculatorType.toLowerCase()} calculator`,
    `${calculatorType.toLowerCase()} calculator India`,
    "financial calculator",
    "Indian finance",
    "free calculator",
    "online calculator",
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: description,
    url: url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    featureList: [title],
    author: {
      "@type": "Person",
      name: "Deepak Roy",
    },
    publisher: {
      "@type": "Organization",
      name: "Finly",
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${baseUrl}/#calculators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${baseUrl}/logo/new-logo-2.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/logo/new-logo-2.png`} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </Head>
  );
}
