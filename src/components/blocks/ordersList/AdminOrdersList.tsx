/* eslint-disable @typescript-eslint/naming-convention */

import { SimpleGrid } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import OrderCard from "@/components/cards/OrderItemCard";
import EmptyOrders from "@/components/empty/EmptyOrders";
import OrderCardSkeleton from "@/components/skeletons/OrderCardSkeleton";
import type { IAdminOrder } from "@/types";

type Props = {
  orders: IAdminOrder[];
  status: string;
  isLoading: boolean;
};

export default function OrdersList({ orders, status, isLoading }: Props) {
  const orders_ = orders.filter((order) => order.status === status);

  return (
    <>
      {!isLoading && orders_.length === 0 && <EmptyOrders status={status} />}

      {orders_ && (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          className="mx-auto max-w-fit"
        >
          {isLoading &&
            Array(4)
              .fill(0)
              .map(() => <OrderCardSkeleton key={uuid()} />)}

          {!isLoading &&
            orders_.length > 0 &&
            orders_
              .filter((order) => order.status === status)
              .sort(
                ({ orderCount: current }, { orderCount: next }) =>
                  current - next
              )
              ?.map((order) => (
                <OrderCard key={order._id} order={order} isAdmin />
              ))}
        </SimpleGrid>
      )}
    </>
  );
}
