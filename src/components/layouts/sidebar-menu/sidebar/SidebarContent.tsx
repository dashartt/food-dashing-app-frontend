import type { BoxProps } from "@chakra-ui/react";
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SidebarContentSkeleton from "@/components/skeletons/sidebar-menu/SidebarContentSkeleton";
import useSessionState from "@/store/useSession";

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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const localPath = usePathname();
  const { session } = useSessionState();

  const navsToHide = ["/history", "/account"];
  const isAdminPaths = localPath?.includes("admin");
  const canShowThisNav = (path: string) =>
    navsToHide.includes(path) ? !!session?._id : true;

  const linkItemsHandler = () => (isAdmin ? AdminLinkItems : ClientLinkItems);

  const NavItemsLink = () =>
    linkItemsHandler()
      .filter(({ path }) => (!isAdminPaths ? canShowThisNav(path) : true))
      .map(({ icon, name, path }) => (
        <NavItem
          onClick={() => {
            onClose();
            router.push(path);
          }}
          key={name}
          icon={icon}
          name={name}
        />
      ));

  useEffect(() => setMounted(true), []);

  return (
    <>
      {!mounted && <SidebarContentSkeleton />}
      {mounted && (
        <Box
          className="h-screen w-full border-r-2 border-gray-200 bg-white md:w-96"
          {...rest}
        >
          <Flex className="mb-4 h-20 items-center justify-between border-b-2 border-gray-300 px-4">
            <HStack className="justify-between space-x-3 rounded-full">
              <Box className="rounded-full bg-white p-1">
                <Avatar name="Pizzaria logo" size="lg" src="/static/logo.png" />
              </Box>
              <VStack className="flex items-start space-y-0">
                <HStack className="space-x-0">
                  <Heading
                    as="h1"
                    className="w-fit truncate text-xl font-normal"
                  >
                    Macaco Louco <br />
                    Pizzaria
                  </Heading>
                </HStack>
              </VStack>
            </HStack>

            <CloseButton
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
            />
          </Flex>
          {NavItemsLink()}
        </Box>
      )}
    </>
  );
}
