"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import useOrderState from "@/store/useOrder";

export default function AdminOrdersInProgress() {
  const [mounted, setMunted] = useState(false);
  const { orders } = useOrderState();

  useEffect(() => {
    setMunted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList {...{ orders, status: "in-progress" }} />
        </Box>
      )}
    </>
  );
}
