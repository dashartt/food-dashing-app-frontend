"use client";

import type { BoxProps, DrawerProps, FlexProps } from "@chakra-ui/react";
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
import Container from "@/components/helper/Container";

// --- NavItem ---------------------------------------------------------------->

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
function NavItem({ icon, path, children, ...rest }: NavItemProps) {
  return (
    <Link href={path} className="focus:shadow-none no-underline">
      <Flex
        role="group"
        className="cursor-pointer rounded-md mx-4 p-4 items-center hover:bg-gray-800 hover:text-white"
        {...rest}
      >
        {icon && <Icon className="mr-4 text-2xl" as={icon} />}
        <Text className="text-xl">{children}</Text>
      </Flex>
    </Link>
  );
}

// -- MobileNav ----------------------------------------------------------------->

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
function MobileNav({ onOpen, ...rest }: MobileProps) {
  return (
    <Flex
      className="space-x-4 sticky top-0 z-10 px-4 sm:px-20, md:px-40 justify-between border-b-2 bg-white items-center border-gray-400 h-20"
      {...rest}
    >
      <PageTitleHeader />
      <IconButton
        onClick={onOpen}
        aria-label="Abrir menu"
        icon={<FiMenu className="text-3xl" />}
      />
    </Flex>
  );
}

// -- LinkItem ----------------------------------------------------------------->
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

// -- SidebarContent ----------------------------------------------------------------->
interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

function SidebarContent({ onClose, ...rest }: SidebarContentProps) {
  return (
    <Box
      className="h-full fixed w-full md:w-72 border-r-2 border-gray-200 bg-white"
      {...rest}
    >
      <Flex className="border-b-2 border-gray-300 px-4 mb-4 h-20 justify-between items-center">
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
}

// -- ContentBesideSidebar----------------------------------------------------------------

function ContentBesideSidebar({ children }: { children: ReactNode }) {
  return (
    <Box ml={{ base: 0, lg: 72 }} className="bg-gray-200 min-h-screen ">
      <PageTitleHeader isDefault isResponsive />
      <Box className="pt-5 md:pt-10">
        <Container
          canFit
          className="mx-auto rounded-md border border-gray-300 bg-white p-4 lg:mx-10"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
// ----Sidebar--------------------------------------------------------------
interface SidebarProps extends DrawerProps {}
function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size={{ base: "full", sm: "xs" }}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}

export default function LayoutSidebarMenu({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="mx-auto max-w-7xl border bg-white border-gray-300 rounded-md min-h-screen">
      <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />

      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />

      <Sidebar isOpen={isOpen} onClose={onClose}>
        <SidebarContent onClose={onClose} />
      </Sidebar>

      <ContentBesideSidebar>{children}</ContentBesideSidebar>
    </Box>
  );
}
