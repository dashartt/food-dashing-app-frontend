import type { BoxProps } from "@chakra-ui/react";
import { Box, CloseButton, Flex } from "@chakra-ui/react";

import PizzariaInfo from "@/components/blocks/pizzaria-info/PizzariaInfo";

import { AdminLinkItems, ClientLinkItems } from "../nav/LinkItems";
import NavItem from "../nav/NavItem";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  isOpen?: boolean;
  isAdmin?: boolean;
}

export default function SidebarContent({
  onClose,
  isAdmin = false,
  ...rest
}: SidebarContentProps) {
  const linkItemsHandler = () => (isAdmin ? AdminLinkItems : ClientLinkItems);

  return (
    <Box
      className="fixed h-full w-full border-r-2 border-gray-200 bg-white md:w-72"
      {...rest}
    >
      <Flex className="mb-4 h-20 items-center justify-between border-b-2 border-gray-300 px-4">
        <PizzariaInfo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {linkItemsHandler().map(({ icon, name, path }) => (
        <NavItem key={name} icon={icon} path={path}>
          {name}
        </NavItem>
      ))}
    </Box>
  );
}
