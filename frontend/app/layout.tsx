import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NHI Guardian | Powered by Sidibe Enterprises",
  description:
    "NHI Guardian is an AI-powered Non-Human Identity Security Platform, powered by Sidibe Enterprises, that helps security and IAM teams identify risky service accounts, API keys, tokens, secrets, and machine credentials.",
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
    >
      <body className="texture-grain min-h-full flex flex-col bg-[#08070c] text-ink-100">
        {children}
      </body>
    </html>
  );
}
