/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import * as api from "@/services/api";
import useOrderState from "@/store/useOrder";
import type { IAdminOrder } from "@/types";

export default function AdminOrdersHistory() {
  const [mounted, setMounted] = useState(false);
  const { orders, setOrders } = useOrderState();

  const orders_ = useQuery({
    queryKey: ["admin/orders-completed"],
    queryFn: () => api.getOrders({ today: true, status: "completed" }),
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);

    orders_.refetch();
  }, []);

  // when orders fetched, set orders state ---------------------
  useEffect(() => {
    if (orders_.isFetched) setOrders(orders_.data as IAdminOrder[]);
  }, [orders_.isFetched]);

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList
            orders={orders}
            isLoading={orders_.isLoading}
            status="completed"
          />
        </Box>
      )}
    </>
  );
}
