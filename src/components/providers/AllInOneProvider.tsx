/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import type { PropsWithChildren } from "react";

import AuthProvider from "./AuthProvider";
import ChakraProvider from "./ChakraProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function AllInOneProvider({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </ChakraProvider>
  );
}
