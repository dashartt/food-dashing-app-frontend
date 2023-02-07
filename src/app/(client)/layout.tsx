import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import Container from "@/components/helper/Container";
import LayoutSidebarMenu from "@/components/layouts/LayoutSidebarMenu";
import AllInOneProvider from "@/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        {/* @ts-expect-error Server Component */}
        <AllInOneProvider>
          <Container className="bg-black">
            <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
          </Container>
        </AllInOneProvider>
      </body>
    </html>
  );
}
