import { Box, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import type { IOrder } from "@/types";
import { formatDate } from "@/utils";

import OrderStatus from "../selects/OrderStatus";
import OrderCardSkeleton from "../skeletons/OrderCardSkeleton";

type Props = {
  order: IOrder | null;
  isAdmin?: boolean;
  date?: boolean;
};

export default function OrderCard({
  order,
  isAdmin = false,
  date = false,
}: Props) {
  const { router, path, baseURL } = useShopSegmentURL();

  const goToOrderDetails = () => {
    if (/history/.test(path || ".") && !isAdmin)
      router.push(`${baseURL}/order/${order?._id}`);
  };

  if (!order) return <OrderCardSkeleton />;
  return (
    <Card
      className="h-fit w-full min-w-[20rem] max-w-xs rounded-md border border-gray-400 bg-white shadow-lg"
      onClick={goToOrderDetails}
      {...(!isAdmin && { role: "button" })}
    >
      <CardBody className="m-0">
        <Box>
          {/*  ITEMS  --------------------------> */}
          <VStack className="items-start">
            <HStack className="w-full justify-between">
              <Box>
                <Text className="font-bold underline">
                  Pedido #{order?.orderCount}
                </Text>
                <Text>{date && formatDate(order?.createdAt || "")}</Text>
              </Box>
              {isAdmin && (
                <Box className="w-32">
                  <OrderStatus
                    isDelivery={order.isDelivery}
                    orderId={order?._id || ""}
                    statusProp={order?.status || ""}
                  />
                </Box>
              )}
            </HStack>
            <Box className="w-full py-2">
              <Box className="rounded-md border border-gray-400 p-2">
                {order?.items &&
                  order?.items.length > 0 &&
                  order?.items.map((item) => {
                    const canSetOneHalf = item.item.length > 1 ? "½" : "";
                    return (
                      <Box
                        key={item._id}
                        className="border-b-2 border-gray-300 p-2 last:border-none"
                      >
                        <HStack>
                          <Text>{item.quantity}x</Text>
                          <VStack className="items-start -space-y-1">
                            {item.item.map((item_) => (
                              <Text className="font-bold" key={uuid()}>
                                {canSetOneHalf} {item_?.name}
                              </Text>
                            ))}
                          </VStack>
                        </HStack>

                        {item.observation && (
                          <Text>Observações: {item?.observation}</Text>
                        )}

                        {/* {/pizza/.test(order_?.itemIds[0].categoryId.name) && (
                          <Text>Borda: {order_.borderType}</Text>
                        )} */}

                        {item?.additional && item?.additional.length > 0 && (
                          <Text>
                            {`Adicionais: ${item?.additional
                              .map((additional) => additional.name)
                              .join(", ")}`}
                          </Text>
                        )}
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </VStack>
        </Box>

        <Box>
          {/*  CLIENT NAME  --------------------------> */}
          <HStack>
            <Text className="font-bold">Cliente:</Text>
            <Text>{order?.client?.fullName}</Text>
          </HStack>

          {/*  ADDRESS NAME  --------------------------> */}
          <VStack className="mb-1 items-start -space-y-1">
            <Text className="font-bold">Endereço:</Text>
            <Text>{`${order?.address?.street}, ${order?.address?.housenumber} ${
              order?.address?.complement || ""
            } `}</Text>
            <Text>{order?.address?.suburb}</Text>
            <Text>{order?.address?.referencePoint}</Text>
          </VStack>

          <HStack>
            <Text className="font-bold">Opção de entrega: </Text>
            <Text>{order.isDelivery ? "Entrega" : "Retirada no local"}</Text>
          </HStack>

          {/*  PAYMENT AND PAYBACK --------------------------> */}
          <HStack>
            <Text className="font-bold">Pagamento: </Text>
            <Text>{order?.paymentType === "cart" ? "Cartão" : "Dinheiro"}</Text>
          </HStack>
          {order?.payback && order.payback > 0 && (
            <HStack>
              <Text className="font-bold">Troco para:</Text>
              <Text>{order?.payback}</Text>
            </HStack>
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
