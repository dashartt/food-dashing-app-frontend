import { Box, useDisclosure } from "@chakra-ui/react";
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
    <Box className="mx-auto min-h-screen max-w-7xl rounded-md border border-gray-300 bg-white">
      <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />

      <SidebarContent
        isAdmin={isAdmin}
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />

      <SidebarContainer isAdmin={isAdmin} isOpen={isOpen} onClose={onClose}>
        <SidebarContent isAdmin={isAdmin} onClose={onClose} />
      </SidebarContainer>

      <ContentBesideSidebar>{children}</ContentBesideSidebar>
    </Box>
  );
}
