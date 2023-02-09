import type { FlexProps } from "@chakra-ui/react";
import { Flex, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import PageTitleHeader from "@/components/header/PageTitleHeader";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export default function MobileNav({ onOpen, ...rest }: MobileProps) {
  return (
    <Flex
      className="sm:px-20, sticky top-0 z-10 h-20 items-center justify-between space-x-4 border-b-2 border-gray-400 bg-white px-4 md:px-40"
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
