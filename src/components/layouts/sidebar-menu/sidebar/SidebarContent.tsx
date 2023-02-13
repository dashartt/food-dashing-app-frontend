import type { BoxProps } from "@chakra-ui/react";
import { Box, CloseButton, Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PizzariaInfo from "@/components/blocks/pizzaria-info/PizzariaInfo";
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

  const navsToHide = ["/history", "/identification"];
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
          className="fixed h-full w-full border-r-2 border-gray-200 bg-white md:w-72"
          {...rest}
        >
          <Flex className="mb-4 h-20 items-center justify-between border-b-2 border-gray-300 px-4">
            <PizzariaInfo />
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
