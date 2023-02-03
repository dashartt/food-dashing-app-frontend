"use client";

import type { BoxProps, FlexProps } from "@chakra-ui/react";
import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import type { ReactNode, ReactText } from "react";
import React from "react";
import type { IconType } from "react-icons";
import { BsCart3 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";

import PizzariaInfo from "@/components/blocks/pizzaria-info/PizzariaInfo";
import PageTitleHeader from "@/components/header/PageTitleHeader";

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "black",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            className="mr-4 text-2xl"
            as={icon}
            _groupHover={{
              color: "white",
            }}
          />
        )}
        <Text className="text-xl">{children}</Text>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      className="space-x-4 sticky top-0 z-10 px-4 sm:px-20, md:px-40"
      {...rest}
    >
      <PageTitleHeader />
      <IconButton
        variant=""
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu className="text-3xl" />}
      />
    </Flex>
  );
};

interface LinkItemProps {
  path: string;
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Cardápio",
    path: "/",
    icon: GoBook,
  },
  {
    path: "/cart",
    name: "Carrinho",
    icon: BsCart3,
  },
  {
    path: "/history",
    name: "Pedidos",
    icon: RiFileList3Line,
  },
  {
    path: "/identification",
    name: "Conta",
    icon: MdManageAccounts,
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "72" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        className="border-b-2 border-gray-300 px-4 mb-4"
      >
        <PizzariaInfo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map(({ icon, name, path }) => (
        <NavItem key={name} icon={icon} path={path}>
          {name}
        </NavItem>
      ))}
    </Box>
  );
};

// ------------------------------------------------------------------

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={{ base: "full", sm: "xs" }}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, lg: 72 }} className="bg-gray-200 min-h-full pb-10">
        <PageTitleHeader isDefault isResponsive />
        <Box className="max-w-md md:max-w-lg mx-auto lg:mx-20 mt-10 bg-white p-4 rounded-md border border-gray-300 min-h-full">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
