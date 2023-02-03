import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import Container from "@/components/helper/Container";
import Menu from "@/components/menu/client/Menu";
import ProviderAIO from "@/components/providers/ProviderAIO";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <ProviderAIO>
          <Container className="bg-black">
            <Menu>{children}</Menu>
          </Container>
        </ProviderAIO>
      </body>
    </html>
  );
}
