"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CreateableMenu from "@/components/tabs/CreateableMenu";
import { getShopById } from "@/services/API/shop.service";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const path = usePathname() as string;
  const shopId = path.split("/")[2] as string;

  const query = useQuery({
    queryKey: [`${shopId}/menu`],
    queryFn: () => getShopById(shopId),
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);
    query.refetch();
  }, []);

  return (
    <>
      {mounted && (
        <CreateableMenu
          categories={query.data?.data?.categories || []}
          menu={query.data?.data?.items || []}
        />
      )}
    </>
  );
}
