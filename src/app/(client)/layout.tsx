import "./globals.css";

import type { PropsWithChildren } from "react";

import ProviderAIO from "@/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <ProviderAIO>{children}</ProviderAIO>
      </body>
    </html>
  );
}
