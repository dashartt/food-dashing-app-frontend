/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Alert, AlertIcon, Text, VStack, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

import OrderCard from "@/components/cards/OrderItemCard";
import OrderCardSkeleton from "@/components/skeletons/OrderCardSkeleton";
import useSessionState from "@/store/useSession";

import * as api from "../../../services/api";

export default function History() {
  const { session } = useSessionState();

  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.getClientOrders(session?._id || ""),
  });

  return (
    <VStack className="mx-auto items-start ">
      {isFetched && data && data.length > 0 && (
        <Alert variant="blank" className="mb-8 w-fit text-xl">
          <AlertIcon className="mt-1 self-start" />
          Clique em algum pedido para ir para a página de detalhes
        </Alert>
      )}
      {isFetched && data && data.length === 0 && (
        <VStack className="w-full items-start space-y-4 rounded-md border border-gray-400 p-8 shadow-lg">
          <Text className="text-2xl">Nenhum pedido encontrado</Text>
        </VStack>
      )}
      <Wrap spacing={10} className="">
        {isLoading &&
          Array(3)
            .fill(0)
            .map(() => <OrderCardSkeleton key={uuid()} />)}

        {isFetched &&
          data &&
          data.length > 0 &&
          data?.map((order) => (
            <OrderCard key={order._id} order={order} date />
          ))}
      </Wrap>
    </VStack>
  );
}
