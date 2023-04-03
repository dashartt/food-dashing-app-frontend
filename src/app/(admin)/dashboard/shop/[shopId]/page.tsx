"use client";

import { useEffect } from "react";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";

export default function ShopAdminPage() {
  const { router, baseURL } = useShopSegmentURL();
  useEffect(() => {
    router.push(`${baseURL}/orders/to-do`);
  }, []);
  return <></>;
}
