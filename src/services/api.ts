import { Axios } from "axios";

import type {
  IAccount,
  IAdminOrder,
  IOrder,
  IOrderSearchParams,
} from "@/types";
import type { IAddress } from "@/types/address.type";
import type { ISignIn, ISignUp } from "@/types/auth.type";
import type { IMenuItem } from "@/types/shop.type";

// const apiUrl = "https://macacoloucopizzaria-backend.vercel.app";
const apiUrl = "http://localhost:3003";

const request = new Axios({
  baseURL: apiUrl,
});

export const updateOrderStatus = async (orderId: string, status: string) => {
  await fetch(`${apiUrl}/orders/${orderId}?status=${status}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    mode: "cors",
  });
};

export const addOrder = async (orderDTO: IOrder) => {
  const response = await fetch(`${apiUrl}/orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(orderDTO),
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as { orderId: string };

  return orders.orderId;
};

export const getOrders = async ({ today, status }: IOrderSearchParams) => {
  const params = new URLSearchParams(JSON.stringify({ today, status }));

  const response = await fetch(`${apiUrl}/orders?${params}`, {
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

export const accessAuth = async ({ password }: { password: string }) => {
  const response = await fetch(`${apiUrl}/account/auth`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ password }),
  });

  if (!response.ok) return null;

  const token = await response.json();
  return token;
};

export const makePayment = async (details: any) => {
  const token = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN as string;
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(details),
  });

  const responseData = await response.json();
  return responseData;
};
