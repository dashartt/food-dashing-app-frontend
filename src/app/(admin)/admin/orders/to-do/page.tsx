"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import * as api from "@/services/api";
import Beam from "@/services/Beam";
import Pusher from "@/services/Pusher";
import useOrderState from "@/store/useOrder";

export default function AdminOrdersToDo() {
  const [mounted, setMounted] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const { orders, setOrders } = useOrderState();

  useEffect(() => {
    setMounted(true);

    Pusher.subscribe("admin");
    Beam.subscribe("new-order");

    Pusher.onEvent("new-order", (orderId_: string) => setOrderId(orderId_));
  }, []);

  useEffect(() => {
    if (orderId !== "") {
      api
        .getOrderById(orderId)
        .then((data) => {
          if (!data) {
            throw new Error("erro ao trazer o pedido pelo id");
          } else {
            setOrders(data);
          }
        })
        .catch((_error) => {
          throw new Error("erro ao trazer o pedido pelo id");
        });
    }
  }, [orderId]);

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList orders={orders} status="to-do" />
        </Box>
      )}
    </>
  );
}
