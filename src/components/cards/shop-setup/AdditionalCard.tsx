import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

import useAdditional from "@/store/shop/setup/useAdditionals";
import type { IAdditional, ICategory } from "@/types/shop/menu";
import { formatCurrency } from "@/utils/format.util";

type Props = {
  onlyLocalStorage?: boolean;
  additional: IAdditional;
  category: Partial<ICategory>;
};

export default function AdditionalCard({
  additional,
  onlyLocalStorage = false,
  category,
}: Props) {
  const state = useAdditional();

  const onRemoveItem = () => {
    console.log(onlyLocalStorage);

    state.setAdditional(
      state.additional
        .map((additional_) =>
          additional_.name === additional.name
            ? {
                ...additional_,
                categories: additional_.categories.filter(
                  (category_) => category_?.name !== category.name
                ),
              }
            : additional_
        )
        .filter((additional_) =>
          additional_.categories.length === 0
            ? additional_.name !== additional.name
            : additional_.categories.every(
                (category_) => category_?.name !== category.name
              )
        )
    );
  };

  return (
    <Card variant="outline">
      <CardBody>
        <HStack className="items-start justify-between">
          <VStack className="items-start">
            <Text>{additional.name}</Text>
            <Text>{`R$ ${formatCurrency(additional.price)}`}</Text>
          </VStack>

          <IconButton
            onClick={onRemoveItem}
            aria-label="Excluir adicional"
            className="self-start bg-white hover:bg-white active:bg-white"
            icon={<MdClose className="text-xl" />}
          />
        </HStack>
      </CardBody>
    </Card>
  );
}
