"use client";

import "../../styles/global.css";

import { Container, Flex } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

import AllInOneProvider from "@/components/providers/AllInOneProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body id="__next">
        <AllInOneProvider>
          <Flex className="min-h-screen bg-gray-default justify-center items-center">
            <Container className="bg-white max-h-screen overflow-auto min-w-full sm:min-w-min rounded-md">
              {children}
            </Container>
          </Flex>
        </AllInOneProvider>
      </body>
    </html>
  );
}
