import "./globals.css";
import { Quicksand } from "next/font/google";
import ClientThemeProvider from "./ClientThemeProvider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://finly-calculator.vercel.app"),
  title: {
    default:
      "Finly - Free Indian Financial Calculators | EMI, SIP, Tax & Investment Tools",
    template: "%s | Finly - Indian Finance Calculator",
  },
  description:
    "Free comprehensive financial calculators for Indian customers. Calculate EMI, SIP returns, income tax, FD interest, PPF maturity, and more. Plan your loans, investments, taxes, and savings goals with precision.",
  keywords: [
    "financial calculator India",
    "EMI calculator",
    "SIP calculator",
    "income tax calculator 2024-25",
    "FD calculator",
    "PPF calculator",
    "home loan EMI calculator",
    "mutual fund calculator",
    "retirement planning calculator",
    "HRA calculator",
    "capital gains tax calculator",
    "TDS calculator",
    "compound interest calculator",
    "Indian tax calculator",
    "loan calculator India",
    "investment calculator",
    "savings calculator",
    "financial planning tools India",
  ],
  authors: [{ name: "Deepak Roy", url: "https://deepakroy.dev" }],
  creator: "Deepak Roy",
  publisher: "Finly",
  category: "Finance",
  classification: "Financial Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    yandex: "your-yandex-verification-code", // Replace with actual verification code
    yahoo: "your-yahoo-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "hi-IN": "/hi", // Future Hindi version
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finly Calculator",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finly-calculator.vercel.app",
    title:
      "Finly - Free Indian Financial Calculators | EMI, SIP, Tax & Investment Tools",
    description:
      "Free comprehensive financial calculators for Indian customers. Calculate EMI, SIP returns, income tax, FD interest, PPF maturity, and more. Plan your financial future with precision.",
    siteName: "Finly",
    images: [
      {
        url: "/logo/new-logo-2.png",
        width: 1200,
        height: 630,
        alt: "Finly - Professional Indian Finance Calculator - EMI, SIP, Tax Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@finly_calc", // Replace with actual Twitter handle
    creator: "@deepakroy_dev", // Replace with actual Twitter handle
    title: "Finly - Free Indian Financial Calculators",
    description:
      "Free comprehensive financial calculators for Indian customers. Calculate EMI, SIP returns, income tax, and more.",
    images: ["/logo/new-logo-2.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1f7a99" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Finly Calculator" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1f7a99" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Finly - Indian Financial Calculators",
              description:
                "Free comprehensive financial calculators for Indian customers. Calculate EMI, SIP returns, income tax, FD interest, PPF maturity, and more.",
              url: "https://finly-calculator.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              author: {
                "@type": "Person",
                name: "Deepak Roy",
                url: "https://deepakroy.dev",
              },
              publisher: {
                "@type": "Organization",
                name: "Finly",
                logo: {
                  "@type": "ImageObject",
                  url: "https://finly-calculator.vercel.app/logo/new-logo-2.png",
                },
              },
              featureList: [
                "EMI Calculator",
                "SIP Calculator",
                "Income Tax Calculator",
                "Fixed Deposit Calculator",
                "PPF Calculator",
                "Home Loan Calculator",
                "Mutual Fund Calculator",
                "Retirement Planning Calculator",
                "HRA Calculator",
                "Capital Gains Calculator",
                "TDS Calculator",
                "Compound Interest Calculator",
              ],
              screenshot:
                "https://finly-calculator.vercel.app/logo/new-logo-2.png",
              softwareVersion: "1.0",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Finly",
              url: "https://finly-calculator.vercel.app",
              logo: "https://finly-calculator.vercel.app/logo/new-logo-2.png",
              description:
                "Free comprehensive financial calculators for Indian customers",
              sameAs: [
                "https://twitter.com/finly_calc",
                "https://github.com/deepakroy/finly",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Finly - Indian Financial Calculators",
              url: "https://finly-calculator.vercel.app",
              description:
                "Free comprehensive financial calculators for Indian customers",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://finly-calculator.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              author: {
                "@type": "Person",
                name: "Deepak Roy",
              },
            }),
          }}
        />
      </head>
      <body className={quicksand.className}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    updateViaCache: 'none' // Always check for updates
                  })
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                      
                      // Check for updates immediately
                      registration.update();
                      
                      // Listen for service worker updates
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              console.log('New service worker available');
                              // Auto-update in development, prompt in production
                              if (${process.env.NODE_ENV === "development"}) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                              } else {
                                if (confirm('New version available! Reload to update?')) {
                                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                                  window.location.reload();
                                }
                              }
                            }
                          });
                        }
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Load cache manager in development
              if (${process.env.NODE_ENV === "development"}) {
                const script = document.createElement('script');
                script.src = '/cache-manager.js';
                document.head.appendChild(script);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
