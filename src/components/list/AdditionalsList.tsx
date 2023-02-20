import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getAdditionals } from "@/services/api";
import type { IAdditional } from "@/types";

import AdditionalCard from "../cards/AdditionalCard";

type Props = {
  category: string;
};

export default function AdditionalsList({ category }: Props) {
  const additionals = useQuery({
    queryKey: ["additionals"],
    queryFn: () => getAdditionals(),
    enabled: false,
  });

  useEffect(() => {
    if (category.includes("pizza")) {
      additionals.refetch();
    }
  }, []);

  return (
    <VStack className="space-y-4">
      {additionals.data?.data?.map((additional: IAdditional) => (
        <AdditionalCard key={additional._id} additional={additional} />
      ))}
    </VStack>
  );
}
