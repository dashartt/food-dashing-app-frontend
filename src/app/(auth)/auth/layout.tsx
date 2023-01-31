import "../../../styles/global.css";

import type { PropsWithChildren } from "react";
import ProviderAIO from "src/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-gray-200">
        <ProviderAIO>{children}</ProviderAIO>
      </body>
    </html>
  );
}
