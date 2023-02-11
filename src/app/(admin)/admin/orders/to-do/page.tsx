/* eslint-disable @typescript-eslint/naming-convention */

"use client";

import { Box } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import * as api from "@/services/api";
// import Beam from "@/services/Beam";
import Pusher from "@/services/Pusher";
import useOrderState from "@/store/useOrder";
import type { IAdminOrder } from "@/types";

export default function AdminOrdersToDo() {
  // states and vars ----------------------
  const { setOrders, setOrder } = useOrderState();
  const [mounted, setMounted] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  // react query setup ------------------
  const [orders_, order_] = useQueries({
    queries: [
      {
        queryKey: ["admin/orders-to-do"],
        queryFn: () => api.getOrders({ today: true, status: "to-do" }),
        enabled: false,
      },
      {
        queryKey: [`admin/order-${orderId}`],
        queryFn: () => api.getOrderById(orderId),
        enabled: false,
      },
    ],
  });

  // when component did mount, do this --------------------
  useEffect(() => {
    setMounted(true);

    // fetch orders on did mount
    orders_.refetch();

    // events and notifications setup ------------
    Pusher.subscribe("admin");
    // Beam.subscribe("new-order");
    Pusher.onEvent("new-order", (orderId_: string) => setOrderId(orderId_));
  }, []);

  // when orders fetched, set orders state ---------------------
  useEffect(() => {
    if (orders_.isFetched) setOrders(orders_.data as IAdminOrder[]);
  }, [orders_.isFetched]);

  // when order fetched, update orders state ---------------------
  useEffect(() => {
    if (order_.isFetched) setOrder(order_.data as IAdminOrder);
  }, [order_.isFetched]);

  // when emit new order, fetch order by id ---------------------
  useEffect(() => {
    order_.refetch({
      queryKey: [`admin/order-${orderId}`],
    });
  }, [orderId]);

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList isLoading={orders_.isLoading} status="to-do" />
        </Box>
      )}
    </>
  );
}
