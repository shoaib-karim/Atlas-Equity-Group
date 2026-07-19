import type { Metadata } from "next";
import { Libre_Caslon_Text, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header-3";
import SiteFooter from "@/components/SiteFooter";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/* Fonts self-hosted via next/font for zero layout shift (design §3). */
const caslon = Libre_Caslon_Text({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caslon",
});

const publicSans = Public_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sell Your Vacant Land for Cash | Atlas Equity Group",
    template: "%s | Atlas Equity Group",
  },
  description:
    "Atlas Equity Group buys vacant land across the United States. No fees, no commissions, no obligation. Get a written cash offer within 48 hours and close through a licensed title company.",
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caslon.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Organization schema sitewide (design §10, webcopy dev notes §3)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
