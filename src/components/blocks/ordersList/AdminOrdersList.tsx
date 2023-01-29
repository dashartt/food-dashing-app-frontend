import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import type { IAdminOrder } from "@/types";

type Props = {
  orders: IAdminOrder[];
  status: string;
};

export default function OrdersList({ orders, status }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="space-y-4">
          {orders
            .filter((order) => order.status === status)
            .sort(
              ({ orderCount: current }, { orderCount: next }) => current - next
            )
            ?.map((order) => (
              <OrderCard key={order._id} order={order} isAdmin />
            ))}
        </VStack>
      )}
    </>
  );
}
