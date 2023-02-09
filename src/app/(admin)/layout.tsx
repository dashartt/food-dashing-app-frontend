import "../../styles/global.css";

import type { PropsWithChildren } from "react";
import Header from "src/components/blocks/header/AdminHeader";

import AllInOneProvider from "@/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-[#6691da]">
        <AllInOneProvider>
          <Header />
          {children}
        </AllInOneProvider>
      </body>
    </html>
  );
}
