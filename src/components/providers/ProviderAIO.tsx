import type { PropsWithChildren } from "react";

import CustomChakraProvider from "./CustomChakraProvider";
import CustomReactQuery from "./CustomReactQuery";
import SessionProvider from "./SessionProvider";

type Props = {
  withSession?: boolean;
};

export default function ProviderAIO({
  children,
  withSession = false,
}: PropsWithChildren<Props>) {
  return (
    <CustomChakraProvider>
      <CustomReactQuery>
        {withSession ? (
          <SessionProvider> {children}</SessionProvider>
        ) : (
          children
        )}
      </CustomReactQuery>
    </CustomChakraProvider>
  );
}
