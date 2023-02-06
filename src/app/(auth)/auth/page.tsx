"use client";

import { Avatar, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SignTabs from "@/components/tabs/SignTabs";

export default function Auth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <HStack className="mt-20 w-full justify-center rounded-md p-5">
          <VStack className="w-fit space-y-0 rounded-md border border-gray-400 bg-white pt-4 shadow-lg">
            <Box className="rounded-full border border-gray-400 bg-white p-1">
              <Avatar name="Pizzaria logo" size="2xl" src="/static/logo.png" />
            </Box>
            <Heading className="w-full p-4 text-center text-2xl">
              Macaco Louco <br />
              Pizzaria
            </Heading>

            <Box className="w-full space-y-4 rounded-t-2xl border border-gray-400 p-8">
              <SignTabs />
            </Box>
          </VStack>
        </HStack>
      )}
    </>
  );
}
