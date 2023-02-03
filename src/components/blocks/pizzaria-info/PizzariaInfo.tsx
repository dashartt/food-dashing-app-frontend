import { Avatar, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PizzariaInfo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Link href="/pizzaria-information">
          <HStack className="justify-between space-x-3 rounded-full">
            <Box className="rounded-full bg-white p-1">
              <Avatar name="Pizzaria logo" size="lg" src="/static/logo.png" />
            </Box>
            <VStack className="flex items-start space-y-0">
              <HStack className="space-x-0">
                <Heading as="h1" className="truncate text-xl w-fit">
                  Macaco Louco <br />
                  Pizzaria
                </Heading>
              </HStack>
            </VStack>
          </HStack>
        </Link>
      )}
    </>
  );
}
