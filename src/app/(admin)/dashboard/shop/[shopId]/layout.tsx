"use client";

import "../../../../../styles/global.css";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import LayoutSidebarMenu from "@/components/layouts/sidebar-menu";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import { getShopById } from "@/services/API/shop.service";
import useShopSettings from "@/store/shop/setup/useShopSetup";

export default function RootLayout({ children }: PropsWithChildren) {
  const { shopId } = useShopSegmentURL();
  const { setShopSettings } = useShopSettings();

  useEffect(() => {
    getShopById(shopId).then((response) => {
      if (response.data) setShopSettings(response.data);
    });
  }, []);

  return <LayoutSidebarMenu>{children}</LayoutSidebarMenu>;
}
