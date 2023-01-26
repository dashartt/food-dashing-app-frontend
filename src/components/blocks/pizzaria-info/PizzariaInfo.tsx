import { Avatar, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

export default function PizzariaInfo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Link href="/pizzaria-information">
          <HStack className="justify-between space-x-3">
            <Box className="rounded-full bg-white p-1">
              <Avatar name="Pizzaria logo" size="lg" src="/static/logo.png" />
            </Box>
            <VStack className="flex items-start space-y-0">
              <HStack className="space-x-0">
                <Heading
                  as="h1"
                  className="w-[12rem] truncate text-xl text-white"
                >
                  Macaco Louco <br />
                  Pizzaria
                </Heading>
                <RiArrowRightSLine className="bg-transparent text-4xl text-white" />
              </HStack>
            </VStack>
          </HStack>
        </Link>
      )}
    </>
  );
}
