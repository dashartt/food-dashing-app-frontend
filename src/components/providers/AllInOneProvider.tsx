import type { PropsWithChildren } from "react";

import ChakraProvider from "./ChakraProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default async function AllInOneProvider({
  children,
}: PropsWithChildren) {
  return (
    <ChakraProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ChakraProvider>
  );
}
