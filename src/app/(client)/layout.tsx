import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import Container from "@/components/helper/Container";
import LayoutSidebarMenu from "@/components/layouts/LayoutSidebarMenu";
import ProviderAIO from "@/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <ProviderAIO>
          <Container className="bg-black">
            <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
          </Container>
        </ProviderAIO>
      </body>
    </html>
  );
}
