/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import * as api from "@/services/api";
import useOrderState from "@/store/useOrder";
import type { IAdminOrder } from "@/types";

export default function AdminOrdersOven() {
  const [mounted, setMounted] = useState(false);
  const { orders, setOrders } = useOrderState();

  const orders_ = useQuery({
    queryKey: ["admin/orders-oven"],
    queryFn: () => api.getOrders({ today: true, status: "oven" }),
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
            isLoading={orders_.isLoading}
            orders={orders}
            status="oven"
          />
        </Box>
      )}
    </>
  );
}
