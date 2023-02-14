import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getOrderById } from "@/services/api";
// import Beam from "@/services/Beam";
import Pusher from "@/services/Pusher";
import useOrderState from "@/store/useOrder";
import type { IAdminOrder } from "@/types";

export default function useOrderSubscriber() {
  const { setOrder } = useOrderState();
  const [orderId, setOrderId] = useState<string>("");

  const order_ = useQuery({
    queryKey: [`admin/order/${orderId}`],
    queryFn: () => getOrderById(orderId),
    enabled: false,
  });

  useEffect(() => {
    Pusher.subscribe("admin");
    // Beam.subscribe("new-order");
    Pusher.onEvent("new-order", (orderId_: string) => setOrderId(orderId_));
  }, []);

  useEffect(() => {
    if (order_.isFetched) setOrder(order_.data as IAdminOrder);
  }, [order_.isFetched]);

  useEffect(() => {
    order_.refetch({
      queryKey: [`admin/order-${orderId}`],
    });
  }, [orderId]);

  return {
    orderQuery: order_,
  };
}
