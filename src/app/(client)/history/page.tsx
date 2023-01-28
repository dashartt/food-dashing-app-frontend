/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import BackPageBtn from "@/components/buttons/BackPageBtn";
import OrderCard from "@/components/cards/OrderItemCard";
import useIdentificationState from "@/store/checkout/useIdentification";

import * as api from "../../../services/api";

export default function History() {
  const [mounted, setMounted] = useState(false);
  const { _id } = useIdentificationState();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.getClientOrders(_id),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="mb-20 items-start space-y-4">
          <HStack className="w-full border-b-2 border-gray-300 bg-white p-4">
            <BackPageBtn />
            <Heading size="lg">Histórico de pedidos</Heading>
          </HStack>

          <VStack className="w-full space-y-4 p-4">
            {data?.map((order) => (
              <OrderCard key={order._id} order={order} date />
            ))}
          </VStack>
        </VStack>
      )}
    </>
  );
}
