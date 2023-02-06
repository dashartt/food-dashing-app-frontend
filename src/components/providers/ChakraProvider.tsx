"use client";

import { ChakraProvider as ChakraProvider_ } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

import theme from "@/styles/theme";

export default function ChakraProvider({ children }: PropsWithChildren) {
  return <ChakraProvider_ theme={theme}>{children}</ChakraProvider_>;
}
