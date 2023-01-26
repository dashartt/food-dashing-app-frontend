"use client";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

import BackPageBtn from "@/components/buttons/BackPageBtn";
import OrderCard from "@/components/cards/OrderItemCard";
import OrderStatusStepper from "@/components/stepper/OrderStatusStepper";
import type { IAdminOrder } from "@/types";

import * as api from "../../../../services/api";

type Params = {
  params: {
    orderId: string;
  };
};

export default function OrderPage({ params }: Params) {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<IAdminOrder | null>(null);

  const { data, isFetched } = useQuery({
    queryKey: [`order/${params.orderId}`],
    queryFn: () => api.getOrderById(params.orderId),
  });

  useEffect(() => {
    setMounted(true);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe("client");

    channel.bind("update-order-status", (status: string) => {
      setOrder((state) => (state ? { ...state, status } : state));
      return status;
    });
  }, []);

  useEffect(() => {
    if (data) setOrder(data);
  }, [isFetched]);

  return (
    <>
      {mounted && (
        <VStack className="items-start">
          <HStack className="p-4 border-b-2 w-full">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>

          <VStack className="space-y-8 w-full">
            {/* STATUS BLOCK */}
            <Box className="w-full space-y-2 px-4">
              <Text className="text-xl font-bold underline underline-offset-4">
                Status
              </Text>
              <Box className="border border-gray-400 pt-4 px-4">
                <OrderStatusStepper status={order?.status || "to-do"} />
              </Box>
            </Box>

            {/* ORDER SHEET BLOCK */}
            <Box className="w-full space-y-2 px-4">
              <Text className="text-xl font-bold underline underline-offset-4">
                Comanda
              </Text>
              <OrderCard order={order} />
            </Box>
          </VStack>
        </VStack>
      )}
    </>
  );
}
