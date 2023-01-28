"use client";

import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import ItemCartCard from "src/components/cards/ItemCartCard";
import useShoppingCart from "src/store/useShoppingCart";
import { v4 as uuid } from "uuid";

import EmptyCart from "@/components/blocks/cart/EmptyCart";
import { formatCurrency } from "@/utils";

export default function ShoppingCart() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { items, getTotalCart } = useShoppingCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-4 mb-20">
          <HStack className="p-4 border-b-2 w-full border-gray-300 bg-white">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>

          {/* Cart items list ------------> */}
          <VStack className="w-full space-y-4 px-4">
            {items?.map((itemCart) => (
              <ItemCartCard key={uuid()} itemCart={itemCart} />
            ))}
          </VStack>

          <Box className="w-full p-4 bg-white">
            <HStack className="justify-between">
              <Text className="text-xl font-semibold">
                Total: R$ {formatCurrency(getTotalCart())}
              </Text>
              <Button
                onClick={() => router.push("/checkout")}
                className="bg-[#1a95f3] text-white"
              >
                Confirmar pedido
              </Button>
            </HStack>
          </Box>
        </VStack>
      )}
    </>
  );
}
