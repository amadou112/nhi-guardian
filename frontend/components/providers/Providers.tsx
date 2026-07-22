"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
