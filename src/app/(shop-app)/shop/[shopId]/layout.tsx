"use client";

import type { PropsWithChildren } from "react";

import LayoutSidebarMenu from "@/components/layouts/sidebar-menu";

export default function ShopLayout({ children }: PropsWithChildren) {
  return <LayoutSidebarMenu>{children}</LayoutSidebarMenu>;
}
