"use client";

import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuTab from "src/components/blocks/menu/MenuTab";
import PizzariaInfo from "src/components/blocks/pizzaria-info/PizzariaInfo";
import SearchMenuItems from "src/components/inputs/SearchMenuItems";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="bgColor">
          <SearchMenuItems />
          <PizzariaInfo />
          <MenuTab />
        </VStack>
      )}
    </>
  );
}
