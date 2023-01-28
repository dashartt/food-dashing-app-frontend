import "./globals.css";

import type { PropsWithChildren } from "react";

import MenuFooter from "@/components/blocks/footer/MenuFooter";
import ProviderAIO from "@/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <ProviderAIO>
          {children}
          <MenuFooter />
        </ProviderAIO>
      </body>
    </html>
  );
}
