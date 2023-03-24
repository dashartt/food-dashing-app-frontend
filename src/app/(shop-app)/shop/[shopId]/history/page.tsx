/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Alert, AlertIcon, Text, VStack, Wrap } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

import OrderCard from "@/components/cards/OrderItemCard";
import OrderCardSkeleton from "@/components/skeletons/OrderCardSkeleton";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useSessionState from "@/store/useSession";

import * as API from "../../../../../services/API/shopApp.service";

export default function History() {
  const { session } = useSessionState();
  const { shopId } = useShopSegmentURL();

  const query = useQuery({
    queryKey: [`/shops?shopId=${shopId}&userId=${session?._id}`],
    queryFn: () => API.getClientOrders(shopId, session?._id || ""),
  });

  return (
    <VStack className="mx-auto items-start ">
      {query.isFetched && query.data?.data && query.data?.data?.length > 0 && (
        <Alert variant="blank" className="mb-8 w-fit text-xl">
          <AlertIcon className="mt-1 self-start" />
          Clique em algum pedido para ir para a página de detalhes
        </Alert>
      )}
      {query.isFetched && query.data?.data && query.data.data.length === 0 && (
        <VStack className="w-full items-start space-y-4 rounded-md border border-gray-400 p-8 shadow-lg">
          <Text className="text-2xl">Nenhum pedido encontrado</Text>
        </VStack>
      )}
      <Wrap spacing={10} className="">
        {query.isLoading &&
          Array(3)
            .fill(0)
            .map(() => <OrderCardSkeleton key={uuid()} />)}

        {query.isFetched &&
          query.data?.data &&
          query.data.data.length > 0 &&
          query.data.data?.map((order) => (
            <OrderCard key={order._id} order={order} date />
          ))}
      </Wrap>
    </VStack>
  );
}
