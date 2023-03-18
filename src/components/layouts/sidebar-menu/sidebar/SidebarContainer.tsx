import type { DrawerProps } from "@chakra-ui/react";
import { Drawer, DrawerContent } from "@chakra-ui/react";

interface SidebarProps extends DrawerProps {}

export default function SidebarContainer({
  isOpen,
  onClose,
  children,
}: SidebarProps) {
  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size={{ base: "full", sm: "xs" }}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
