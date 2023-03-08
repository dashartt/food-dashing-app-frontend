"use client";

import { Alert, AlertIcon, Box, Text, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import OrderStatusStepper from "@/components/stepper/OrderStatusStepper";
import Beam from "@/services/Beam";
import Pusher from "@/services/Pusher";
import type { IAdminOrder } from "@/types";

type Props = {
  orderProps: IAdminOrder | null;
};

export default function OrderPage({ orderProps }: Props) {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<IAdminOrder | null>(orderProps);

  useEffect(() => {
    if (!orderProps) notFound();
    setMounted(true);
    Pusher.subscribe("client");
    Beam.subscribe("update-order-status");
    Pusher.onEvent("update-order-status", (status: string) =>
      setOrder((state) => (state ? { ...state, status } : state))
    );
  }, []);

  return (
    <>
      {mounted && order && (
        <VStack className="mb-8 w-full items-start space-y-8">
          <Alert variant="blank" className="mx-auto mb-6 max-w-sm text-xl">
            <AlertIcon className="mt-1 self-start" />
            <Text>
              tempo estimado: 30m - 1h <br />
              estaremos fazendo o possível para evitar atrasos ou se prolongar
              mais do que o esperado
            </Text>
          </Alert>

          {/* STATUS BLOCK */}
          <Box className="w-full max-w-xs space-y-2">
            <Text className="text-xl font-bold">Status</Text>
            <Box className="w-full rounded-md border border-gray-400 px-4 pt-4">
              <OrderStatusStepper
                isDelivery={order?.isDelivery}
                status={order?.status || "to-do"}
              />
            </Box>
          </Box>

          {/* ORDER SHEET BLOCK */}
          <Box className="w-full">
            <Text className="mb-2 text-xl font-bold">Comanda</Text>
            <OrderCard order={order} />
          </Box>
        </VStack>
      )}
    </>
  );
}
