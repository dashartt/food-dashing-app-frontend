import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import useOrderState from "@/store/useOrder";
import type { IOrder } from "@/types";

import * as API from "../../services/API/shop.service";
import useShopSegmentURL from "../shared/useShopSegmentURL";

type Props = {
  queryKey: string[];
  status: string;
};

export default function useOrdersPage({ queryKey, status }: Props) {
  const [mounted, setMounted] = useState(false);
  const { shopId } = useShopSegmentURL();
  const { setOrders } = useOrderState();

  const today = status !== "completed";

  const orders_ = useQuery({
    queryKey,
    queryFn: () =>
      API.getShopOrders({
        shopId,
        ordersStatus: status,
        ordersToday: today,
      }),
    enabled: false,
  });

  useEffect(() => {
    setMounted(true);

    orders_.refetch();
  }, []);

  // when orders fetched, set orders state ---------------------
  useEffect(() => {
    if (orders_.isFetched) setOrders(orders_.data?.data as IOrder[]);
  }, [orders_.isFetched]);

  return {
    mounted,
    ordersQuery: orders_,
  };
}
