"use client";

import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import type { ICartItem } from "src/types";

import BuyMoreOrFinish from "../../modals/BuyMoreOrFinish";

type Props = {
  orderItem: ICartItem;
};

export default function AddToCart({ orderItem }: Props) {
  const [mounted, setMounted] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [disableDecrement, setDisableDecrement] = useState(false);

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
        <VStack className="w-full space-y-4 items-start">
          <HStack className="justify-between w-full items-center">
            <HStack className="py-1 rounded-lg w-fit">
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
          <Text className="font-semibold text-xl">
            Total R$
            {((orderItem?.item[0]?.price || 0) * quantity).toFixed(2)}
          </Text>
        </VStack>
      )}
    </>
  );
}
