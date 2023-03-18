"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import MenuTabs from "@/components/tabs/MenuTabs";
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

  useEffect(() => {
    console.log(query.data);
  }, [query.isFetched]);

  return (
    <>
      {mounted && (
        <MenuTabs
          tabListClass="bg-white font-bold sticky top-[5.1rem] md:top-20 z-10 border-b-2 border-gray-300"
          categories={["salty pizza", "sweet pizza", "drinks", "arabic snack"]}
        />
      )}
    </>
  );
}
