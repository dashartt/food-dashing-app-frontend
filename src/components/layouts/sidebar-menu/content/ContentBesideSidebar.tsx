import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

import PageTitleHeader from "@/components/header/PageTitleHeader";
import Container from "@/components/helpers/Container";

export default function ContentBesideSidebar({ children }: PropsWithChildren) {
  return (
    <Box ml={{ base: 0, lg: 72 }} className="min-h-screen bg-gray-300">
      <PageTitleHeader isDefault isResponsive />
      <Box className="pt-5 md:pt-10">
        <Container
          canFit
          className="mx-auto rounded-md border border-gray-400 bg-white p-4 lg:mx-10 shadow-lg"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
