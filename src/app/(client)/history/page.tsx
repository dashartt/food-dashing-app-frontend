/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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
    <Box>
      <Alert variant="blank" className="mb-8 w-fit text-xl">
        <AlertIcon className="mt-1 self-start" />
        Clique em algum pedido para ir para a página de detalhes
      </Alert>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        className="mx-auto max-w-fit"
      >
        {isLoading &&
          Array(4)
            .fill(0)
            .map(() => <OrderCardSkeleton key={uuid()} />)}

        {isFetched &&
          data &&
          data.length > 0 &&
          data?.map((order) => (
            <OrderCard key={order._id} order={order} date />
          ))}

        {isFetched && data && data.length === 0 && (
          <VStack className="items-start space-y-4 rounded-md border border-gray-400 p-4 shadow-lg">
            <Text className="text-xl">Nenhum pedido realizado ainda</Text>
            <Link className="" href="/">
              <Button className="rounded-md bg-gray-900 p-4 text-white">
                Ver o cardápio
              </Button>
            </Link>
          </VStack>
        )}
      </SimpleGrid>
    </Box>
  );
}
