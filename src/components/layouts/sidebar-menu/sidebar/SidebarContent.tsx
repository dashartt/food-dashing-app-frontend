import type { BoxProps } from "@chakra-ui/react";
import { Box, CloseButton, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useShopSettings from "@/store/shop/setup/useShopSetup";

import NavItemHandler from "../nav/LinkItems";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  isOpen?: boolean;
  isAdmin?: boolean;
}

export default function SidebarContent({
  onClose,
  // isAdmin = false,
  ...rest
}: SidebarContentProps) {
  const [mounted, setMounted] = useState(false);
  const shopName = useShopSettings((state) => state.shopSettings?.shopName);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <Box
          className="relative h-screen w-full border-r-2 border-gray-200 bg-white md:w-96"
          {...rest}
        >
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
            className="absolute top-2 right-2"
          />
          <VStack className="w-full items-start p-8">
            <Text className="border-b-2 border-black text-2xl mb-4">
              {shopName}
            </Text>
            <NavItemHandler />
          </VStack>
        </Box>
      )}
    </>
  );
}
