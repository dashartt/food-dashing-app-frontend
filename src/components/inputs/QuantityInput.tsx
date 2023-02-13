import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

type Props = {
  onChange: Function;
  initialQuantity: number;
};

export default function QuantityInput({ onChange, initialQuantity }: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [mounted, setMounted] = useState(false);

  const decrement = () => setQuantity((qtd) => (qtd > 1 ? qtd - 1 : qtd));
  const increment = () => setQuantity((qtd) => qtd + 1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) onChange(quantity);
  }, [quantity]);

  return (
    <HStack className=" rounded-lg w-fit border border-gray-400">
      {/* Decrement item -----------> */}
      <IconButton
        disabled={quantity === 1}
        onClick={decrement}
        aria-label="Remover uma quantidade"
        className="text-lg"
        icon={<RiSubtractLine />}
      />
      {/* Item quantity -----------> */}
      <Text className="text-lg">{quantity}</Text>

      {/* Increment quantity -----------> */}
      <IconButton
        onClick={increment}
        aria-label="Adicionar mais uma unidade"
        className="text-lg"
        icon={<RiAddLine />}
      />
    </HStack>
  );
}
