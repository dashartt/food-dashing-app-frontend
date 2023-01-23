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
import useShoppingCart from "src/store/useShoppingCart";

import type { ICartItem } from "@/types";

type Props = {
  itemCart: ICartItem;
};

export default function ItemCartCard({ itemCart }: Props) {
  const [mounted, setMounted] = useState(false);
  const { removeItem } = useShoppingCart();

  const canSetOneHalf = itemCart.item.length > 1 ? "½" : "-";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Card className="w-full rounded-none border border-gray-200">
          <CardBody>
            <VStack className="items-start">
              <HStack className="w-full justify-between">
                <VStack className="-space-y-1">
                  <Text className="w-full font-semibold">
                    {canSetOneHalf} {itemCart.item[0]?.name}
                  </Text>
                  {itemCart.item[1]?.name && (
                    <Text className="w-full font-semibold">
                      {canSetOneHalf} {itemCart.item[1]?.name}
                    </Text>
                  )}
                </VStack>
                <IconButton
                  onClick={() => removeItem(itemCart)}
                  className="rounded-full bg-red-400"
                  size="sm"
                  aria-label="Remover item do pedido"
                  icon={<RiCloseLine className="text-xl text-white" />}
                />
              </HStack>
              <HStack>
                <Text>{itemCart.quantity}x</Text>
                <Text className="text-[#1a95f3]">
                  R$ {itemCart.item[0]?.price}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
