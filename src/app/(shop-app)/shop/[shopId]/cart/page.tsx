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
import { useEffect, useState } from "react";
import ItemCartCard from "src/components/cards/ItemCartCard";
import { v4 as uuid } from "uuid";

import EmptyCart from "@/components/empty/EmptyCart";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useShoppingCart from "@/store/useShoppingCart";
import { formatCurrency } from "@/utils";

export default function ShoppingCart() {
  const [mounted, setMounted] = useState(false);
  const { router, baseURL } = useShopSegmentURL();
  const { items, getTotalPrice } = useShoppingCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-4">
          <Alert variant="blank" className="mx-auto mb-6 text-xl">
            <AlertIcon className="mt-1 self-start" />
            <Text>tempo estimado: 30m - 1h </Text>
          </Alert>

          <VStack className="w-full space-y-4 ">
            {items?.map((itemCart) => (
              <ItemCartCard key={uuid()} itemCart={itemCart} />
            ))}
          </VStack>

          <Box className="sticky bottom-0 z-10 w-full border-t-2 border-gray-400 bg-white p-4">
            <HStack className="justify-between">
              <Text className="text-xl font-semibold">
                Total: R$ {formatCurrency(getTotalPrice())}
              </Text>
              <Button
                onClick={() => router.push(`${baseURL}/checkout`)}
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
