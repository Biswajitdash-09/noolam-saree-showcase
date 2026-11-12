import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { BackToTop } from "@/components/site/back-to-top";
import { Preloader, preloaderScript } from "@/components/site/preloader";
import { SiteHeader } from "@/components/site/site-header";
import { SilkClipDefs } from "@/components/site/silk-fabric";
import { SiteOverlays } from "@/components/site/site-overlays";
import { StoreProvider } from "@/components/site/store";
import { TickerBar } from "@/components/site/ticker-bar";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { shop, siteUrl } from "@/lib/shop";
import { jsonLd, storeJsonLd } from "@/lib/structured-data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOOLAM · Kanchipuram Silk",
    template: "%s · NOOLAM",
  },
  description:
    "NOOLAM brings the temple looms of Kanchipuram home: Kanjivaram silk in heritage colours, bordered in real zari and finished by hand.",
  keywords: [
    "Kanchipuram saree",
    "Kanjivaram silk",
    "bridal saree",
    "silk blouse",
    "NOOLAM",
  ],
  openGraph: {
    title: "NOOLAM · Kanchipuram Silk",
    description:
      "Woven for the Divine. Kanjivaram silk in heritage colours, bordered in real zari.",
    siteName: shop.legalName,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
      </head>
      <body className="min-h-screen bg-ivory pb-12 text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-maroon-700 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(storeJsonLd()) }}
        />
        <Preloader />
        <StoreProvider>
          <SmoothScroll />
          <SilkClipDefs />
          <SiteHeader />
          <main id="main">{children}</main>
          <TickerBar />
          <BackToTop />
          <WhatsAppButton />
          <SiteOverlays />
          <Toaster
            position="bottom-right"
            offset={{ bottom: 120, right: 20 }}
            mobileOffset={{ bottom: 112, right: 12, left: 12 }}
            toastOptions={{
              style: {
                background: "#4a0a12",
                color: "#faf7f2",
                border: "1px solid rgba(201,162,39,0.4)",
                borderRadius: "14px",
                fontFamily: "var(--font-poppins)",
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
