"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Sidemenu from "@/components/modals/AdminSidemenu";
import { setHeaderTitle } from "@/utils";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  const path = usePathname();
  const title = setHeaderTitle(path || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="bg-gray-700 p-4 top-0 sticky z-10">
          <HStack className="items-center">
            <Sidemenu />
            <Text className="text-2xl text-white">{title}</Text>
          </HStack>
        </Box>
      )}
    </>
  );
}
