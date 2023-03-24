import axios from "axios";

import type { IAdminOrder, IOrder, IOrderSearchParams } from "@/types";
import type { IApiResponse } from "@/types/api.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const updateOrderStatus = async (orderId: string, status: string) => {
  await fetch(`${API_URL}/orders/${orderId}?status=${status}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    mode: "cors",
  });
};

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

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getClientOrders = async (shopId: string, clientId: string) =>
  axios
    .get(`${API_URL}/shops?shopId=${shopId}&userId=${clientId}`)
    .then((response) => response.data as IApiResponse<IAdminOrder[]>)
    .catch((error) => error.response.data as IApiResponse);

export const getOrderById = async (shopId: string, orderId: string) =>
  axios
    .get(`${API_URL}/shops?shopId=${shopId}&orderId=${orderId}`)
    .then((response) => response.data as IApiResponse<IAdminOrder>)
    .catch((error) => error.response.data as IApiResponse);
