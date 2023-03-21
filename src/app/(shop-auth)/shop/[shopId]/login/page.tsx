"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import SignTabs from "@/components/tabs/SignTabs";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import * as API from "@/services/API/shop.service";
import useShopSettings from "@/store/shop/setup/useShopSetup";

export default function ShopClientLogin() {
  const [mounted, setMounted] = useState(false);
  const { shopId } = useShopSegmentURL();
  const { shopSettings, setShopSettings } = useShopSettings();

  const query = useQuery({
    queryKey: [`${shopId}/menu`],
    queryFn: () => API.getShopById(shopId),
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);
    query.refetch();
  }, []);
  useEffect(() => {
    if (query.data?.data) {
      setShopSettings(query.data.data);
    }
  }, [query.isFetched]);

  return (
    <>
      {mounted && (
        <Box className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
          <Box className="mx-auto mb-10 w-full max-w-xs md:max-w-md">
            <Heading className="text-3xl text-white md:text-5xl">
              {shopSettings?.shopName}
            </Heading>
            <Text className="max-w-lg text-lg text-white md:text-2xl">
              Venha matar sua fome conosco xD
            </Text>
          </Box>
          <Box className="w-full max-w-xs space-y-0 rounded-md border border-gray-400 bg-white shadow-lg">
            <SignTabs />
          </Box>
        </Box>
      )}
    </>
  );
}
