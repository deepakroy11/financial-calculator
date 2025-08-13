import "./globals.css";
import { Inter } from "next/font/google";
import ClientThemeProvider from "./ClientThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Indian Finance Calculator",
  description: "Comprehensive financial calculators for Indian customers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
