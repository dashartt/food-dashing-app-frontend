import { Box, Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import ContentBesideSidebar from "./content/ContentBesideSidebar";
import MobileNav from "./nav/MobileNav";
import SidebarContainer from "./sidebar/SidebarContainer";
import SidebarContent from "./sidebar/SidebarContent";

type LayoutProps = {
  children: ReactNode;
};

export default function LayoutSidebarMenu({ children }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const path = usePathname() || "";
  const isAdmin = path.includes("admin");

  return (
    <Flex className="bg-gray-default min-w-full min-h-screen max-h-screen overflow-hidden items-center justify-center">
      <HStack className="space-x-0 w-full bg-white max-w-screen-xl">
        <SidebarContent
          isAdmin={isAdmin}
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
        />

        <SidebarContainer isAdmin={isAdmin} isOpen={isOpen} onClose={onClose}>
          <SidebarContent isAdmin={isAdmin} onClose={onClose} />
        </SidebarContainer>

        <VStack className="w-full max-h-screen overflow-auto">
          <Box className="border-b-2 border-gray-400 w-full px-4 lg:hidden sticky top-0 z-10">
            <MobileNav onOpen={onOpen} />
          </Box>
          <ContentBesideSidebar>{children}</ContentBesideSidebar>
        </VStack>
      </HStack>
    </Flex>
  );
}
