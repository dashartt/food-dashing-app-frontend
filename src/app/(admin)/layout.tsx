"use client";

import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import Container from "@/components/helpers/Container";
import LayoutSidebarMenu from "@/components/layouts/sidebar-menu";
import AllInOneProvider from "@/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-[#6691da]">
        <AllInOneProvider>
          <Container className="bg-blue-400">
            <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
          </Container>
        </AllInOneProvider>
      </body>
    </html>
  );
}
