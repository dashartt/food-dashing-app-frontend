import { Box, Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react";
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

  return (
    <Flex className="bg-gradient-to-r from-green-400 to-blue-500 min-w-full min-h-screen justify-center items-start">
      <HStack className="space-x-0 w-full bg-white max-w-screen-xl">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
        />

        <SidebarContainer isOpen={isOpen} onClose={onClose}>
          <SidebarContent onClose={onClose} />
        </SidebarContainer>

        <VStack className="w-full min-h-screen max-h-screen overflow-auto">
          <Box className="border-b-2 border-gray-400 w-full px-4 lg:hidden sticky top-0 z-10">
            <MobileNav onOpen={onOpen} />
          </Box>
          <ContentBesideSidebar>{children}</ContentBesideSidebar>
        </VStack>
      </HStack>
    </Flex>
  );
}
