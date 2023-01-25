import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import BackPageBtn from "@/components/buttons/BackPageBtn";

import * as api from "../../../../services/api";

type Params = {
  params: {
    orderId: string;
  };
};

export default function OrderPage({ params }: Params) {
  const { data: order } = useQuery({
    queryKey: [`order/${params.orderId}`],
    queryFn: () => api.getOrderById(params.orderId),
  });

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
