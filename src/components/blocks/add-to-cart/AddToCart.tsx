"use client";

import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import type { ICartItem } from "src/types";

import useAdditionals from "@/store/useAdditionals";
import { formatCurrency } from "@/utils";

import BuyMoreOrFinish from "../../modals/BuyMoreOrFinish";

type Props = {
  orderItem: ICartItem;
};

export default function AddToCart({ orderItem }: Props) {
  const [mounted, setMounted] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [disableDecrement, setDisableDecrement] = useState(false);
  const { getAdditionalsPrice } = useAdditionals();

  const decrementQtd = () => setQuantity((qtd) => (qtd > 1 ? qtd - 1 : qtd));
  const incrementQtd = () => setQuantity((qtd) => qtd + 1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDisableDecrement(quantity === 1);
  }, [quantity]);

  return (
    <>
      {mounted && (
        <VStack className="w-full items-start space-y-4">
          <HStack className="w-full items-center justify-between">
            <HStack className="w-fit rounded-lg py-1">
              {/* Decrement item -----------> */}
              <IconButton
                disabled={disableDecrement}
                onClick={decrementQtd}
                aria-label="Remover uma quantidade"
                className="text-2xl"
                icon={<RiSubtractLine />}
              />
              {/* Item quantity -----------> */}
              <Text className="text-xl">{quantity}</Text>

              {/* Increment quantity -----------> */}
              <IconButton
                onClick={incrementQtd}
                aria-label="Adicionar mais uma unidade"
                className="text-2xl"
                icon={<RiAddLine />}
              />
            </HStack>
            {/* Continue buying or finish purchase -----------> */}
            <BuyMoreOrFinish orderItem={{ ...orderItem, quantity }}>
              <Text>Adicionar ao carrinho</Text>
            </BuyMoreOrFinish>
          </HStack>
          <Text className="text-xl font-semibold">
            Total R$
            {formatCurrency(
              (orderItem?.item[0]?.price || 0) * quantity +
                getAdditionalsPrice()
            )}
          </Text>
        </VStack>
      )}
    </>
  );
}
