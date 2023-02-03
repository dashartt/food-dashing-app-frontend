import "./globals.css";

import type { PropsWithChildren } from "react";

import Menu from "@/components/menu/client/Menu";
import ProviderAIO from "@/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <ProviderAIO>
          <Menu>{children}</Menu>
        </ProviderAIO>
      </body>
    </html>
  );
}
