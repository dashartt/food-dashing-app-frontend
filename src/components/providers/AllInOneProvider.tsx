import type { PropsWithChildren } from "react";

import ChakraProvider from "./ChakraProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import SessionProvider from "./SessionProvider";

type Props = {
  withSession?: boolean;
};

export default function AllInOneProvider({
  children,
  withSession = false,
}: PropsWithChildren<Props>) {
  return (
    <ChakraProvider>
      <ReactQueryProvider>
        {withSession ? (
          <SessionProvider> {children}</SessionProvider>
        ) : (
          children
        )}
      </ReactQueryProvider>
    </ChakraProvider>
  );
}
