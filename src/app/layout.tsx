import type { Metadata } from "next";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  ...constructMetadata(),
  verification: {
    google: "ymo6qf01gtOVtrexyHvtvsKBSVVDr4mPTuA_FhkzDaI",
    other: {
      "msvalidate.01": "8B29CA3E20A2D34DBFEB386C2024580F",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <meta name="msvalidate.01" content="8B29CA3E20A2D34DBFEB386C2024580F" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
