/* eslint-disable @typescript-eslint/naming-convention */

import { Wrap } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import OrderCard from "@/components/cards/OrderItemCard";
import EmptyOrders from "@/components/empty/EmptyOrders";
import OrderCardSkeleton from "@/components/skeletons/OrderCardSkeleton";
import useOrderState from "@/store/useOrder";

type Props = {
  status: string;
  isLoading: boolean;
};

export default function OrdersList({ status, isLoading }: Props) {
  const { getOrders } = useOrderState();
  const orders_ = getOrders({ today: status !== "completed" })
    .filter((order) => order.status === status)
    .sort(({ orderCount: current }, { orderCount: next }) => current - next);

  return (
    <>
      {!isLoading && orders_.length === 0 && <EmptyOrders status={status} />}

      {orders_ && (
        <Wrap spacing={5} className="mx-auto max-w-fit">
          {isLoading &&
            Array(4)
              .fill(0)
              .map(() => <OrderCardSkeleton key={uuid()} />)}

          {!isLoading &&
            orders_.length > 0 &&
            orders_?.map((order) => (
              <OrderCard date key={order._id} order={order} isAdmin />
            ))}
        </Wrap>
      )}
    </>
  );
}
