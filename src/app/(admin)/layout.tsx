import "./globals.css";

import type { PropsWithChildren } from "react";
import Header from "src/components/blocks/header/AdminHeader";
import ProviderAIO from "src/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-[#6691da]">
        <ProviderAIO withSession>
          <Header />
          {children}
        </ProviderAIO>
      </body>
    </html>
  );
}
