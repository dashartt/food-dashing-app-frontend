"use client";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import BackPageBtn from "@/components/buttons/BackPageBtn";
import { socket } from "@/services/socket";
import type { IAdminOrder } from "@/types";

import * as api from "../../../../services/api";

type Params = {
  params: {
    orderId: string;
  };
};

export default function OrderPage({ params }: Params) {
  const [order, setOrder] = useState<IAdminOrder | null>(null);

  const { data, isFetched } = useQuery({
    queryKey: [`order/${params.orderId}`],
    queryFn: () => api.getOrderById(params.orderId),
  });

  useEffect(() => {
    socket.connect();
    socket.on("update-status-order", (status: string) => {
      setOrder((state) => (state ? { ...state, status } : state));
    });

    // return () => {
    //   socket.off("update-status-order");
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (data) setOrder(data);
  }, [isFetched]);

  return (
    <VStack>
      <HStack className=" p-4">
        <BackPageBtn />
        <Heading size="lg">Detalhes do pedido</Heading>
      </HStack>

      <VStack>
        <Box>
          <Text>Status</Text>
          <Text>{order?.status}</Text>
        </Box>
      </VStack>
    </VStack>
  );
}
