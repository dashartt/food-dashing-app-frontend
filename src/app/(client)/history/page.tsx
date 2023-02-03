/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import PageTitleHeader from "@/components/header/PageTitleHeader";
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
        <VStack className="items-start space-y-4 ">
          <PageTitleHeader isResponsive className="" />
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
            spacing={10}
            className="mx-auto max-w-fit"
          >
            {data && data.length > 0 ? (
              data?.map((order) => (
                <OrderCard key={order._id} order={order} date />
              ))
            ) : (
              <VStack className="items-start space-y-4 rounded-md border border-gray-400 p-4 shadow-lg">
                <Text className="text-xl">Nenhum pedido realizado ainda</Text>
                <Link className="" href="/">
                  <Button className="rounded-md bg-gray-900 p-4 text-white">
                    Ver o cardápio{" "}
                  </Button>
                </Link>
              </VStack>
            )}
          </SimpleGrid>
        </VStack>
      )}
    </>
  );
}
