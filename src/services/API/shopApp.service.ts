import axios from "axios";

import type { IOrder, IOrderSearchParams } from "@/types";
import type { IApiResponse } from "@/types/api.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const updateOrderStatus = async (orderId: string, status: string) =>
  axios
    .patch(`${API_URL}/orders/${orderId}?status=${status}`)
    .then((response) => response.data as IApiResponse)
    .catch((error) => error.response.data as IApiResponse);

export const addOrder = async (orderDTO: IOrder) =>
  axios
    .post(`${API_URL}/orders`, orderDTO)
    .then((response) => response.data as IApiResponse<{ orderId: string }>)
    .catch((error) => error.response.data as IApiResponse);

export const getOrders = async ({ today, status }: IOrderSearchParams) => {
  const params = new URLSearchParams(JSON.stringify({ today, status }));

  const response = await fetch(`${API_URL}/orders?${params}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IOrder[];

  return orders;
};

export const getClientOrders = async (shopId: string, clientId: string) =>
  axios
    .get(`${API_URL}/shops?shopId=${shopId}&userId=${clientId}`)
    .then((response) => response.data as IApiResponse<IOrder[]>)
    .catch((error) => error.response.data as IApiResponse);

export const getOrderById = async (shopId: string, orderId: string) =>
  axios
    .get(`${API_URL}/shops?shopId=${shopId}&orderId=${orderId}`)
    .then((response) => response.data as IApiResponse<IOrder>)
    .catch((error) => error.response.data as IApiResponse);

// export const makePayment = async (details: any) => {
//   const token = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN as string;
//   const response = await fetch("https://api.mercadopago.com/v1/payments", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     method: "POST",
//     body: JSON.stringify(details),
//   });

//   const responseData = await response.json();
//   return responseData;
// };
