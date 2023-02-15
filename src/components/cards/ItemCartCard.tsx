"use client";

import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

import useShoppingCart from "@/store/useShoppingCart";
import type { ICartItem } from "@/types";
import * as utils from "@/utils";

import QuantityInput from "../inputs/QuantityInput";

type Props = {
  itemCart: Omit<ICartItem, "quantity">;
};

export default function ItemCartCard({ itemCart }: Props) {
  const [mounted, setMounted] = useState(false);
  const shoppingCart = useShoppingCart();

  const initialQuantity =
    shoppingCart.getItemById(itemCart._id || "")?.quantity || 1;

  const canSetOneHalf = itemCart.item.length > 1 ? "½" : "-";

  const onUpdateQuantity = (quantity: number) => {
    shoppingCart.updateItem(itemCart._id || "", quantity);
  };

  const onRemoveItem = () => {
    shoppingCart.removeItem(itemCart._id || "");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Card className="w-full border border-gray-400 bg-white shadow-lg">
          <CardBody>
            <VStack className="items-start">
              <HStack className="w-full justify-between">
                <VStack className="-space-y-1 items-start">
                  <Text className="py-1 px-2 rounded-md mb-4">
                    {utils.getCategoryName(itemCart.item[0]?.category.name)}
                  </Text>
                  <Text className="text-xl">
                    {canSetOneHalf} {itemCart.item[0]?.name}
                  </Text>
                  {itemCart.item[1]?.name && (
                    <Text className="text-xl">
                      {canSetOneHalf} {itemCart.item[1]?.name}
                    </Text>
                  )}
                </VStack>
                <IconButton
                  onClick={onRemoveItem}
                  size="sm"
                  aria-label="Remover item do pedido"
                  className="rounded-full bg-transparent self-start"
                  icon={<RiCloseLine className="text-2xl text-red-500 " />}
                />
              </HStack>
              <HStack className="w-full justify-between">
                <QuantityInput
                  initialQuantity={initialQuantity}
                  onChange={onUpdateQuantity}
                />
                <Text className="text-lg">
                  R$
                  {utils.formatCurrency(
                    utils.getTotalItemPrice(itemCart._id || "")
                  )}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
