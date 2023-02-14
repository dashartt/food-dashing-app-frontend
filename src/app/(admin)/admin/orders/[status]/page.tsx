"use client";

import { Box } from "@chakra-ui/react";

import OrdersList from "@/components/blocks/ordersList/AdminOrdersList";
import useOrdersPage from "@/hooks/admin/useOrdersPage";
import useOrderSubscriber from "@/hooks/admin/useOrderSubscriber";

export default function OrdersPage({ params }: { params: { status: string } }) {
  const { mounted, ordersQuery } = useOrdersPage({
    status: params.status,
    queryKey: [`admin/orders/${params.status}`],
  });

  useOrderSubscriber();

  return (
    <>
      {mounted && (
        <Box className="m-6">
          <OrdersList
            isLoading={ordersQuery.isLoading}
            status={params.status}
          />
        </Box>
      )}
    </>
  );
}
