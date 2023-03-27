import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getOrderById } from "@/services/API/shopApp.service";
import Beam from "@/services/Beam.service";
import Pusher from "@/services/Pusher.service";
import useOrderState from "@/store/useOrder";
import type { IOrder } from "@/types";

import useShopSegmentURL from "../shared/useShopSegmentURL";

export default function useOrderSubscriber() {
  const { shopId } = useShopSegmentURL();
  const { setOrder } = useOrderState();
  const [orderId, setOrderId] = useState<string>("");

  const order_ = useQuery({
    queryKey: [`admin/order/${orderId}`],
    queryFn: () => getOrderById(shopId, orderId),
    enabled: false,
  });

  useEffect(() => {
    Pusher.subscribe("admin");
    Beam.subscribe("new-order");
    Pusher.onEvent("new-order", (orderId_: string) => setOrderId(orderId_));
  }, []);

  useEffect(() => {
    if (order_.isFetched) setOrder(order_.data?.data as IOrder);
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
