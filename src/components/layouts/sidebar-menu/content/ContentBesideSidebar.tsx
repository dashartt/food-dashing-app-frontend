import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

import PageTitleHeader from "@/components/header/PageTitleHeader";

export default function ContentBesideSidebar({ children }: PropsWithChildren) {
  return (
    <Box className="mx-auto max-w-sm lg:max-w-fit p-4">
      <Box className="mb-10 p-4 hidden lg:block w-full sticky top-0 z-10 bg-white">
        <PageTitleHeader />
      </Box>
      {children}
    </Box>
  );
}
