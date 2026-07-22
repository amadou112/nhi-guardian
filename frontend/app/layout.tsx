import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://frontend-sandy-nine-57.vercel.app";
const TITLE = "NHI Guardian | Powered by Sidibe Enterprises";
const DESCRIPTION =
  "NHI Guardian is an AI-powered Non-Human Identity Security Platform, powered by Sidibe Enterprises, that helps security and IAM teams identify risky service accounts, API keys, tokens, secrets, and machine credentials.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "NHI Guardian",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NHI Guardian" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
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
      className={`${plexSans.variable} ${plexMono.variable} ${publicSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="texture-grain min-h-full flex flex-col bg-ink-950 text-ink-100 transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
