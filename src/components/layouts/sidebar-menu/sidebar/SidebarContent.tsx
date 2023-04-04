import type { BoxProps } from "@chakra-ui/react";
import { Box, CloseButton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import NavItemHandler from "../nav/LinkItems";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  isOpen?: boolean;
  isAdmin?: boolean;
}

export default function SidebarContent({
  onClose,
  // isAdmin = false,
  ...rest
}: SidebarContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <Box
          className="relative h-screen w-full border-r-2 border-gray-200 bg-white md:w-96"
          {...rest}
        >
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
            className="absolute top-2 right-2"
          />
          <VStack className="mt-16 w-full items-start px-4">
            <NavItemHandler />
          </VStack>
        </Box>
      )}
    </>
  );
}
