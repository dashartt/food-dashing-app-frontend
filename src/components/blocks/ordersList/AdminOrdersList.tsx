import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import OrderCard from "@/components/cards/OrderItemCard";
import EmptyOrders from "@/components/empty/EmptyOrders";
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

  if (orders.filter((order) => order.status === status).length === 0)
    return <EmptyOrders status={status} />;

  return (
    <>
      {mounted && (
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
          spacing={10}
          className="max-w-fit mx-auto"
        >
          {orders
            .filter((order) => order.status === status)
            .sort(
              ({ orderCount: current }, { orderCount: next }) => current - next
            )
            ?.map((order) => (
              <OrderCard key={order._id} order={order} isAdmin />
            ))}
        </SimpleGrid>
      )}
    </>
  );
}
