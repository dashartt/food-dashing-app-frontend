import { Box, HStack, Skeleton } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

type Props = {
  quantity?: number;
};

export default function NavItemsLinkSkeleton({ quantity = 1 }: Props) {
  return (
    <Box className="p-4 mx-4 space-y-4">
      {Array(quantity)
        .fill(0)
        .map(() => (
          <HStack key={uuid()}>
            <Skeleton height="10" width="10" />
            <Skeleton height="10" width="36" />
          </HStack>
        ))}
    </Box>
  );
}
