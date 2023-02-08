"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import OrderStatusStepper from "@/components/stepper/OrderStatusStepper";
import Pusher from "@/services/Pusher";
import type { IAdminOrder } from "@/types";

type Props = {
  orderProps: IAdminOrder | null;
};

export default function OrderPage({ orderProps }: Props) {
  const [order, setOrder] = useState<IAdminOrder | null>(orderProps);

  useEffect(() => {
    if (!orderProps) notFound();
    Pusher.subscribe("client");
    // Beam.subscribe("update-order-status");
    Pusher.onEvent("update-order-status", (status: string) =>
      setOrder((state) => (state ? { ...state, status } : state))
    );
  }, []);

  return (
    <VStack className="items-start md:w-96">
      <VStack className="mb-8 w-full space-y-8">
        {/* STATUS BLOCK */}
        <Box className="w-full space-y-2 px-4">
          <Text className="text-xl font-bold">Status</Text>
          <Box className="max-w-sm rounded-md border border-gray-400 px-4 pt-4">
            <OrderStatusStepper status={order?.status || "to-do"} />
          </Box>
        </Box>

        {/* ORDER SHEET BLOCK */}
        <Box className="w-full px-4">
          <Text className="mb-2 text-xl font-bold">Comanda</Text>
          <OrderCard order={order} />
        </Box>
      </VStack>
    </VStack>
  );
}
