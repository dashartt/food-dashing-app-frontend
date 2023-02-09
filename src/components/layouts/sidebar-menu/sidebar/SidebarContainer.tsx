import type { DrawerProps } from "@chakra-ui/react";
import { Drawer, DrawerContent } from "@chakra-ui/react";

interface SidebarProps extends DrawerProps {
  isAdmin?: boolean;
}

export default function SidebarContainer({
  isOpen,
  onClose,
  children,
  isAdmin = false,
}: SidebarProps) {
  const placement = isAdmin ? "left" : "right";
  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size={{ base: "full", sm: "xs" }}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
