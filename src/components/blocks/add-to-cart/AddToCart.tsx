"use client";

import { HStack, IconButton, Spacer, Text } from "@chakra-ui/react";
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
      {" "}
      {mounted && (
        <HStack className="w-full">
          {/* Decrement item -----------> */}
          <IconButton
            disabled={disableDecrement}
            onClick={decrementQtd}
            aria-label="Remover uma quantidade"
            icon={<RiSubtractLine className="text-2xl text-[#1a95f3]" />}
          />
          {/* Item quantity -----------> */}
          <Text className="text-xl">{quantity}</Text>

          {/* Increment quantity -----------> */}
          <IconButton
            onClick={incrementQtd}
            aria-label="Adicionar mais uma unidade"
            className="text-2xl text-[#1a95f3]"
            icon={<RiAddLine />}
          />

          {/* Continue buying or finish purchase -----------> */}
          <BuyMoreOrFinish orderItem={{ ...orderItem, quantity }}>
            <Text>Adicionar</Text>
            <Spacer />
            <Text>
              R$ {((orderItem?.item[0]?.price || 0) * quantity).toFixed(2)}
            </Text>
          </BuyMoreOrFinish>
        </HStack>
      )}
    </>
  );
}
