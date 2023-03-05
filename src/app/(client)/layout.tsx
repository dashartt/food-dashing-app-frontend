"use client";

import "../../styles/global.css";

import type { PropsWithChildren } from "react";

import LayoutSidebarMenu from "@/components/layouts/sidebar-menu";
import AllInOneProvider from "@/components/providers/AllInOneProvider";
import { tokenHandler } from "@/utils/firebase.util";

export default function RootLayout({ children }: PropsWithChildren) {
  tokenHandler();

  return (
    <html lang="en">
      <head />
      <body id="__next">
        <AllInOneProvider>
          <LayoutSidebarMenu>{children}</LayoutSidebarMenu>
        </AllInOneProvider>
      </body>
    </html>
  );
}
