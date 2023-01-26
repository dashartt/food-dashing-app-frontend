"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuTab from "src/components/blocks/menu/MenuTab";
import PizzariaInfo from "src/components/blocks/pizzaria-info/PizzariaInfo";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack>
          <Box className="bg-black w-full p-8 ">
            <PizzariaInfo />
          </Box>
          <MenuTab />
        </VStack>
      )}
    </>
  );
}
