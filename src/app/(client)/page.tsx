"use client";

import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MenuTab from "src/components/blocks/menu/MenuTab";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="min-h-screen w-full bg-black py-20">
          <MenuTab />
        </VStack>
      )}
    </>
  );
}
