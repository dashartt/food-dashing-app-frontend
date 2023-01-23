import { Box, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type { IAdminOrder } from "@/types";

import OrderStatus from "../selects/OrderStatus";

type Props = {
  order: IAdminOrder;
};

export default function OrderCard({ order }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="w-full bg-white">
          <Card className="rounded-none border border-gray-400">
            <CardBody className="group m-0">
              <Box>
                {/*  ITEMS  --------------------------> */}
                <VStack className="items-start">
                  <HStack className="w-full justify-between">
                    <Text className="font-bold underline">
                      Pedido #{order.orderCount}
                    </Text>
                    <Box className="w-32">
                      <OrderStatus orderId={order._id} />
                    </Box>
                  </HStack>
                  <Box className="py-2 w-full">
                    <Box className="border bg-gray-100">
                      {order.orderItemsId.map((order_) => {
                        const canSetOneHalf =
                          order_.itemIds.length > 1 ? "½" : "-";
                        return (
                          <Box key={order_._id} className="px-2 ">
                            <HStack>
                              <Text>{order_.quantity}x</Text>
                              <VStack className="items-start -space-y-1">
                                {order_.itemIds.map((items_) => (
                                  <Text className="font-bold" key={uuid()}>
                                    {canSetOneHalf}
                                    {items_.name}
                                  </Text>
                                ))}
                              </VStack>
                            </HStack>
                            <Text>{order_?.observation}</Text>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </VStack>
              </Box>

              <Box className="hidden group-hover:block">
                {/*  CLIENT NAME  --------------------------> */}
                <HStack>
                  <Text className="font-bold">Cliente:</Text>
                  <Text>{order.clientId?.name}</Text>
                </HStack>

                {/*  ADDRESS NAME  --------------------------> */}
                <VStack className="mt-2 items-start -space-y-1">
                  <Text className="font-bold">Endereço:</Text>
                  <Text>{`${order.addressId.addressName}, ${order.addressId.addressNumber} ${order.addressId?.complement}`}</Text>
                  <Text>{order.addressId.referencePoint}</Text>
                </VStack>

                {/*  PAYMENT AND PAYBACK --------------------------> */}
                <HStack className="mt-2">
                  <Text className="font-bold">Pagamento: </Text>
                  <Text>
                    {order.paymentType === "cart" ? "Cartão" : "Dinheiro"}
                  </Text>
                </HStack>
                {order.payback > 0 && (
                  <HStack>
                    <Text className="font-bold">Troco para:</Text>
                    <Text>{order.payback}</Text>
                  </HStack>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
      )}{" "}
    </>
  );
}
