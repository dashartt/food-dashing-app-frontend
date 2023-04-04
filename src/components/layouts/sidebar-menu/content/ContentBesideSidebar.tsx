import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

import PageTitleHeader from "@/components/header/PageTitleHeader";

// import PageTitleHeader from "@/components/header/PageTitleHeader";

export default function ContentBesideSidebar({ children }: PropsWithChildren) {
  return (
    <Box className="mx-auto max-w-sm p-4 lg:max-w-fit">
      <Box className="sticky top-0 z-10 mb-10 hidden w-full bg-white p-4 lg:block">
        <PageTitleHeader />
      </Box>
      {children}
    </Box>
  );
}
