import { Box, HStack, useDisclosure, VStack } from "@chakra-ui/react";
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
    <HStack className="space-x-0 mx-auto min-h-screen max-h-screen overflow-y-hidden min-w-full lg:min-w-[60rem] max-w-fit rounded-md border border-gray-300 bg-white items-start">
      <SidebarContent
        isAdmin={isAdmin}
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />

      <SidebarContainer isAdmin={isAdmin} isOpen={isOpen} onClose={onClose}>
        <SidebarContent isAdmin={isAdmin} onClose={onClose} />
      </SidebarContainer>

      <VStack className="w-full overflow-y-auto max-h-screen min-h-screen w-full">
        <Box className="border-b-2 border-gray-400 w-full px-4">
          <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />
        </Box>
        <ContentBesideSidebar>{children}</ContentBesideSidebar>
      </VStack>
    </HStack>
  );
}
