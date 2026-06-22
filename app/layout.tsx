import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://punemumbaicab.com"),
  title: {
    default: "Premium Cab Service in Pune & Mumbai",
    template: "%s | Pune Mumbai Cab Service",
  },
  description:
    "Luxury cab booking for airport transfers, local travel, and outstation trips. 24×7 service with verified drivers.",
  keywords:
    "Pune cab service, Mumbai taxi, airport transfer, outstation cab, corporate travel",
  authors: [{ name: "Pune Mumbai Cab Service" }],
  creator: "Pune Mumbai Cab Service",
  publisher: "Pune Mumbai Cab Service",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Pune Mumbai Cab Service",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@punemumbaicab",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CustomCursor } from "@/components/ui/custom-cursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth bg-background">
      <body className="bg-background text-text-primary antialiased relative">
        <CustomCursor />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
