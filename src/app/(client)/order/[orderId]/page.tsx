"use client";

import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

import BackPageBtn from "@/components/buttons/BackPageBtn";
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
        <VStack>
          <HStack className=" p-4">
            <BackPageBtn />
            <Heading size="lg">Detalhes do pedido</Heading>
          </HStack>

          <Box>
            <p>{order?.status}</p>
          </Box>
        </VStack>
      )}
    </>
  );
}
