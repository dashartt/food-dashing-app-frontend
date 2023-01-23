"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import useOrderState from "@/store/useOrder";

export default function AdminOven() {
  const [mounted, setMounted] = useState(false);
  const { orders } = useOrderState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList {...{ orders, status: "oven" }} />
        </Box>
      )}
    </>
  );
}
