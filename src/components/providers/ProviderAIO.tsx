import type { PropsWithChildren } from "react";

import CustomChakraProvider from "./CustomChakraProvider";
import CustomReactQuery from "./CustomReactQuery";

export default function ProviderAIO({ children }: PropsWithChildren) {
  return (
    <CustomChakraProvider>
      <CustomReactQuery>{children}</CustomReactQuery>
    </CustomChakraProvider>
  );
}
