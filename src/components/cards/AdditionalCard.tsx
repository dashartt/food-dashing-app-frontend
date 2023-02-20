import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { SiAddthis } from "react-icons/si";

import type { IAdditional } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  additional: IAdditional;
};

export default function AdditionalCard({ additional }: Props) {
  const [added, setAddeed] = useState(false);

  const onClickCard = () => setAddeed((prev) => !prev);

  return (
    <Card
      onClick={onClickCard}
      className="w-full border border-gray-400"
      role="button"
    >
      <CardBody>
        <HStack className="justify-between">
          <Text>{additional.name}</Text>

          <HStack>
            <Text>R$ {formatCurrency(additional.price)}</Text>
            {added ? (
              <ImCheckboxChecked className="text-green-500 text-xl" />
            ) : (
              <SiAddthis className="text-xl" />
            )}
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
}
