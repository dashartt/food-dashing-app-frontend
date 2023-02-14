import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import PageTitleHeader from "@/components/header/PageTitleHeader";
import Container from "@/components/helpers/Container";

export default function ContentBesideSidebar({ children }: PropsWithChildren) {
  const path = usePathname();
  const defaultStyles = "shadow-lg border border-gray-400 bg-white";
  const styleHandler = () =>
    path?.includes("admin/orders") ? "" : defaultStyles;

  return (
    <Box ml={{ base: 0, lg: 72 }} className="min-h-screen bg-gray-300">
      <PageTitleHeader isDefault isResponsive />
      <Box className="pt-5 md:pt-10">
        <Container
          canFit
          className={`${styleHandler()} mx-auto rounded-md p-4 lg:mx-10`}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
