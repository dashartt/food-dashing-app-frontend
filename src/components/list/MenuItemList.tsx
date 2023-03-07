import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MenuItemCardSkeleton from "src/components/skeletons/MenuItemCardSkeleton";
import { getMenuItemsByCategory } from "src/services/api";
import type { IMenuItemCategory } from "src/types";

import MenuItemCard from "@/components/cards/MenuItemCard";

type Props = {
  category: IMenuItemCategory;
};

export default function MenuItemList({ category }: Props) {
  const [mounted, setMounted] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [`menuItem/${category}`],
    queryFn: () => getMenuItemsByCategory(category),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="space-y-4">
          {data?.map((item) => (
            <MenuItemCard hasPrice asButton key={item._id} menuItem={item} />
          ))}

          {isLoading && <MenuItemCardSkeleton />}
        </VStack>
      )}
    </>
  );
}
