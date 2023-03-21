import {
  Card,
  CardBody,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IAdditional, IItemCategory } from "@/types/shop.type";
import { formatCurrency } from "@/utils/format.util";

import * as API from "../../../services/API/shop.service";

type Props = {
  additional: IAdditional;
  category: Partial<IItemCategory>;
};

export default function AdditionalCard({ additional, category }: Props) {
  const toast = useToast({ position: "top" });
  const { shopId } = useShopSegmentURL();
  const state = useShopSettings();

  const onRemoveItem = () => {
    const payload = state.shopSettings?.additional
      ?.map((additional_) =>
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
      );

    API.saveShopSettings(shopId, {
      additional: payload,
    }).then((response) => {
      toast({
        title: response.message,
      });
      if (response.message.includes("registradas") && response.data) {
        state.setShopSettings({ ...response.data });
      }
    });
  };

  return (
    <Card variant="outline" className="border border-gray-400">
      <CardBody className="relative">
        <VStack className="items-start">
          <Text>{additional.name}</Text>
          <Text>{`R$ ${formatCurrency(additional.price)}`}</Text>
        </VStack>

        <IconButton
          onClick={onRemoveItem}
          aria-label="Excluir adicional"
          className="self-start bg-white hover:bg-white active:bg-white absolute top-2 right-2"
          icon={<MdClose className="text-xl" />}
        />
      </CardBody>
    </Card>
  );
}
