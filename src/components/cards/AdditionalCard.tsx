import { Box, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import { ImCheckboxChecked } from "react-icons/im";

import useAdditionals from "@/store/useAdditionals";
import type { IAdditional } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  additional: IAdditional;
};

export default function AdditionalCard({ additional }: Props) {
  const [added, setAddeed] = useState(false);
  const { addAdditional, removeAdditional, additionals } = useAdditionals();

  const onClickCard = () => setAddeed((prev) => !prev);

  useEffect(() => {
    const wasAdded = additionals.some((el) => el._id === additional._id);
    if (wasAdded) setAddeed(true);
  }, []);

  useEffect(() => {
    if (added) addAdditional(additional);
    else removeAdditional(additional._id || "");
  }, [added]);

  return (
    <HStack className="w-full justify-between">
      <Text>{additional.name}</Text>

      <HStack className="space-x-4">
        <Text>R$ {formatCurrency(additional.price)}</Text>
        <Box onClick={onClickCard} role="button">
          <ImCheckboxChecked
            className={`text-xl text-green-500 ${!added && "hidden"}`}
          />
          <GoDiffAdded className={`text-xl ${added && "hidden"} t`} />
        </Box>
      </HStack>
    </HStack>
  );
}
