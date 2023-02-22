"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
        <VStack className="items-start space-y-4">
          <Alert variant="blank" className="text-xl mx-auto">
            <AlertIcon className="self-start mt-1" />
            <Text>tempo estimado: 30m - 1h </Text>
          </Alert>

          <VStack className="w-full space-y-4 ">
            {items?.map((itemCart) => (
              <ItemCartCard key={uuid()} itemCart={itemCart} />
            ))}
          </VStack>

          <Box className="w-full bg-white p-4 sticky bottom-20 lg:bottom-0 z-10 border-t-2 border-gray-400">
            <HStack className="justify-between">
              <Text className="text-xl font-semibold">
                Total: R$ {formatCurrency(getTotalPrice())}
              </Text>
              <Button
                onClick={() => router.push("/checkout")}
                className="bg-gray-default text-white"
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
