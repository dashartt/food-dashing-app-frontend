import { Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { SiAddthis } from "react-icons/si";

import useAdditionals from "@/store/useAdditionals";
import type { IAdditional } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  additional: IAdditional;
};

export default function AdditionalCard({ additional }: Props) {
  const [added, setAddeed] = useState(false);
  const { addAdditional, removeAdditional } = useAdditionals();

  const onClickCard = () => setAddeed((prev) => !prev);

  useEffect(() => {
    if (added) addAdditional(additional);
    else removeAdditional(additional._id || "");
  }, [added]);

  return (
    <Card className="border border-gray-400 w-full">
      <CardBody>
        <HStack className="w-full justify-between">
          <Text>{additional.name}</Text>

          <HStack>
            <Text>R$ {formatCurrency(additional.price)}</Text>
            <Box onClick={onClickCard} role="button">
              <ImCheckboxChecked
                className={`text-xl text-green-500 ${!added && "hidden"}`}
              />
              <SiAddthis className={`text-xl ${added && "hidden"}`} />
            </Box>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
}
