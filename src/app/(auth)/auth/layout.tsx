import "../../../styles/global.css";

import type { PropsWithChildren } from "react";
import AllInOneProvider from "src/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-[#637eab]">
        {/* @ts-expect-error Server Component */}
        <AllInOneProvider>{children}</AllInOneProvider>
      </body>
    </html>
  );
}
