"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemCartCard from "src/components/cards/ItemCartCard";
import { v4 as uuid } from "uuid";

import EmptyCart from "@/components/blocks/cart/EmptyCart";
import useShoppingCart from "@/store/useShoppingCart";
import { formatCurrency } from "@/utils";

export default function ShoppingCart() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { items, getTotalPrice } = useShoppingCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-4 md:w-96">
          {/* Cart items list ------------> */}
          <Text className="p-4 text-xl font-semibold">
            Produtos escolhidos do seu pedido
          </Text>
          <VStack className="w-full space-y-4 px-4">
            {items?.map((itemCart) => (
              <ItemCartCard key={uuid()} itemCart={itemCart} />
            ))}
          </VStack>

          <Box className="w-full bg-white p-4">
            <HStack className="justify-between">
              <Text className="text-lg font-semibold">
                Total: R$ {formatCurrency(getTotalPrice())}
              </Text>
              <Button
                onClick={() => router.push("/checkout")}
                className="bg-[#1a95f3] text-white"
              >
                Confirmar
              </Button>
            </HStack>
          </Box>
        </VStack>
      )}
    </>
  );
}
