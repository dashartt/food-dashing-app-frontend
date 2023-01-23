"use client";

import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import ItemCartCard from "src/components/cards/ItemCartCard";
import DeliveryOrPickup from "src/components/switchs/DeliveryOrPickup";
import useApplyDeliveryFee from "src/store/useApplyDeliveryFee";
import useShoppingCart from "src/store/useShoppingCart";
import { v4 as uuid } from "uuid";

import EmptyCart from "@/components/blocks/cart/EmptyCart";

export default function ShoppingCart() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { items, getTotalCart } = useShoppingCart();
  const { deliveryFee } = useApplyDeliveryFee();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      {" "}
      {mounted && (
        <VStack className="items-start">
          <HStack className="p-4">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>

          {/* Cart items list ------------> */}
          <VStack className="w-full space-y-4 px-4">
            {items?.map((itemCart) => (
              <ItemCartCard key={uuid()} itemCart={itemCart} />
            ))}
          </VStack>

          <Box className="w-full pt-4">
            <Text className="bg-[#ebebeb] p-4 text-2xl font-semibold">
              A pagar
            </Text>

            {/* Delivery or pickup option ------------> */}
            <DeliveryOrPickup />

            <Box className="m-4 border border-gray-400 p-4">
              {/* Order details  ------------> */}
              <HStack className="justify-between ">
                <Text>Pedidos</Text>
                <Text>R$ {getTotalCart()}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Taxa de entrega</Text>
                <Text>R$ {deliveryFee}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text>Total</Text>
                <Text>R${getTotalCart() + deliveryFee}</Text>
              </HStack>

              {/* Confirm order ------------> */}
              <Button
                onClick={() => router.push("/checkout")}
                className="mt-4 w-full rounded-none bg-[#1a95f3] text-white"
              >
                Confirmar pedido
              </Button>
            </Box>
          </Box>
        </VStack>
      )}
    </>
  );
}
