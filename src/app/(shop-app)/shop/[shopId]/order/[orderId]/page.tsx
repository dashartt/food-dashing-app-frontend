"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import OrderStatusStepper from "@/components/stepper/OrderStatusStepper";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import Beam from "@/services/Beam.service";
import Pusher from "@/services/Pusher.service";
import type { IOrder } from "@/types";

import * as API from "../../../../../../services/API/shopApp.service";

type Props = {
  params: {
    orderId: string;
  };
};

export default function OrderPage({ params }: Props) {
  const [mounted, setMounted] = useState(false);
  const { shopId } = useShopSegmentURL();
  const [order, setOrder] = useState<IOrder | null>();

  const query = useQuery({
    queryKey: [`/shops?shopId=${shopId}&orderId=${params.orderId}`],
    queryFn: () => API.getOrderById(shopId, params.orderId),
    enabled: false,
  });

  useEffect(() => {
    if (!params.orderId) notFound();
    query.refetch();
    setMounted(true);
    Pusher.subscribe("client");
    Beam.subscribe("update-order-status");
    Pusher.onEvent("update-order-status", (status: string) =>
      setOrder((state) => (state ? { ...state, status } : state))
    );
  }, []);

  useEffect(() => {
    if (query.data?.data) {
      setOrder(query.data.data);
    }
  }, [query.isFetched]);

  return (
    <>
      {mounted && (
        <VStack className="mb-8 w-full items-start space-y-8">
          {/* STATUS BLOCK */}
          <Box className="w-full max-w-xs space-y-2">
            <Text className="text-xl font-bold">Status</Text>
            <Box className="w-full rounded-md border border-gray-400 px-4 pt-4">
              <OrderStatusStepper
                isDelivery={order?.isDelivery || false}
                status={order?.status || "to-do"}
              />
            </Box>
          </Box>

          {/* ORDER SHEET BLOCK */}
          <Box className="w-full">
            <Text className="mb-2 text-xl font-bold">Comanda</Text>
            <OrderCard order={order || null} />
          </Box>
        </VStack>
      )}
    </>
  );
}
