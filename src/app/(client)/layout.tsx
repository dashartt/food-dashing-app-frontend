"use client";

import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import LayoutSidebarMenu from "@/components/layouts/sidebar-menu";
import AllInOneProvider from "@/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next" className="bg-[url(/static/bg-image.png)]">
        <AllInOneProvider>
          <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
        </AllInOneProvider>
      </body>
    </html>
  );
}
