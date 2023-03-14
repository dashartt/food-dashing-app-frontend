"use server";

import OrderPage from "@/components/pages/order/OrderPage";

import * as api from "../../../../services/api";

type Props = {
  params: {
    orderId: string;
  };
};

export default async function Order({ params }: Props) {
  const order = await api
    .getOrderById(params.orderId)
    .then((data) => data)
    .catch((error) => console.log(error));

  return <OrderPage orderProps={order || null} />;
}
