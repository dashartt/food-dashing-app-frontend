import { Box, VStack } from "@chakra-ui/react";

import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IAdditional } from "@/types/shop.type";

import AdditionalCard from "../cards/AdditionalCard";

type Props = {
  category: string;
};

export default function AdditionalsList({ category }: Props) {
  const additional = useShopSettings(({ shopSettings }) =>
    shopSettings?.additional?.filter((a) =>
      a.categories.some((b) => b?.name === category)
    )
  );
  return (
    <VStack className="space-y-4">
      {additional?.map((additional_: IAdditional) => (
        <Box
          key={additional_._id}
          className="w-full border-b-2 pb-2 last:border-none"
        >
          <AdditionalCard additional={additional_} />
        </Box>
      ))}
    </VStack>
  );
}
