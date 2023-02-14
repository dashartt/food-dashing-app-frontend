/* eslint-disable @typescript-eslint/naming-convention */

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import useOrderState from "@/store/useOrder";
import type { IAdminOrder } from "@/types";

import { getOrders } from "../../services/api";

type Props = {
  queryKey: string[];
  status: string;
};

export default function useOrdersPage({ queryKey, status }: Props) {
  const [mounted, setMounted] = useState(false);
  const { setOrders } = useOrderState();

  const today = status !== "completed";

  const orders_ = useQuery({
    queryKey,
    queryFn: () => getOrders({ today, status }),
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

  return {
    mounted,
    ordersQuery: orders_,
  };
}
