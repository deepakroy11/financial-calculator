import "./globals.css";
import { Inter } from "next/font/google";
import ClientThemeProvider from "./ClientThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finly - Indian Finance Calculator",
  description:
    "Comprehensive financial calculators for Indian customers. Plan your loans, investments, taxes, and savings goals with precision.",
  keywords:
    "financial calculator, EMI calculator, SIP calculator, tax calculator, Indian finance, loan calculator, investment calculator",
  authors: [{ name: "Deepak Roy", url: "https://deepakroy.dev" }],
  creator: "Deepak Roy",
  publisher: "Finly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    title: "Finly - Indian Finance Calculator",
    description: "Comprehensive financial calculators for Indian customers",
    siteName: "Finly",
    images: [
      {
        url: "/logo/new-logo-2.png",
        width: 1200,
        height: 630,
        alt: "Finly - Indian Finance Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finly - Indian Finance Calculator",
    description: "Comprehensive financial calculators for Indian customers",
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
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#1f7a99" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Finly Calculator" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1f7a99" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
