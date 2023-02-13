import { Box, Flex } from "@chakra-ui/react";

import PizzeriaLogoSkeleton from "../logo/PizzeriaLogoSkeleton";
import NavItemsLinkSkeleton from "./LinkNavItemSkeleton";

export default function SidebarContentSkeleton() {
  return (
    <Box className="fixed h-full w-full border-r-2 border-gray-200 bg-white md:w-72">
      <Flex className="mb-4 h-20 items-center justify-between border-b-2 border-gray-300 px-4">
        <PizzeriaLogoSkeleton />
      </Flex>
      <NavItemsLinkSkeleton quantity={4} />
    </Box>
  );
}
