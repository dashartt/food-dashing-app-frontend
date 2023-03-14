import { Axios } from "axios";

import type {
  IAccount,
  IAdminOrder,
  IMenu,
  IMenuItem,
  IOrder,
  IOrderSearchParams,
} from "@/types";
import type { IAddress } from "@/types/address.type";
import type { ISignIn, ISignUp } from "@/types/auth.type";

// const apiUrl = "https://macacoloucopizzaria-backend.vercel.app";
const apiUrl = "http://localhost:3003";

const request = new Axios({
  baseURL: apiUrl,
});

export const getMenuItemByName = async (name: string) => {
  const response = await fetch(`${apiUrl}/menu/item/${name}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const menuItem = (await response.json()) as IMenuItem;
  return menuItem;
};

export const getMenuItems = async () => {
  const response = await fetch(`${apiUrl}/menu`, {
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenu;
};

export const getMenuItemsByCategory = async (category: string) => {
  const response = await fetch(`${apiUrl}/menu/${category}`, {
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenuItem[];
};

export const signup = async (values: ISignUp) => {
  const response = await request.post("/user/signup", {
    ...values,
  });

  if (response.status !== 200)
    return () => console.log("response statuts !== 200");
  console.log(response.data);

  return response.data;
};

export const signin = async (values: ISignIn) => {
  const response = await request.post("/user/signin", {
    ...values,
  });

  if (response.status !== 200)
    return () => console.log("response statuts !== 200");
  console.log(response.data);

  return response.data;
};

export const updateClientAccount = async (
  clientDTO: Omit<IAccount, "password" | "role">
) => {
  const response = await fetch(`${apiUrl}/account`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(clientDTO),
  });

  if (!response.ok) return null;

  const responseData = (await response.json()) as {
    isSuccess: boolean;
    message: string;
    data: {
      accountId: string;
    };
  };

  return responseData;
};

export const addAddress = async (addressDTO: IAddress) => {
  const response = await fetch(`${apiUrl}/address`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(addressDTO),
  });

  if (!response.ok) return null;

  const address = (await response.json()) as { addressId: string };

  return address.addressId;
};

export const removeAddress = async (addressId: string) => {
  const response = await fetch(`${apiUrl}/address/${addressId}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    mode: "cors",
  });

  if (!response.ok) return null;

  const body = (await response.json()) as {
    isSuccess: boolean;
    message: string;
  };

  return body.message;
};

export const updateAddress = async (
  addressId: string,
  addressDTO: IAddress
) => {
  const response = await fetch(`${apiUrl}/address/${addressId}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(addressDTO),
  });

  if (!response.ok) return null;

  const body = (await response.json()) as {
    isSuccess: boolean;
    message: string;
    data: IAddress;
  };

  return body;
};

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

export const getClientOrders = async (clientId: string) => {
  const response = await fetch(`${apiUrl}/orders/client/${clientId}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const response = await fetch(`${apiUrl}/orders/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const order = (await response.json()) as IAdminOrder;

  return order;
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

export const verifyAuth = async ({ token }: { token: string }) => {
  const response = await fetch(`${apiUrl}/account/auth`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "GET",
    mode: "cors",
  });

  const session = await response.json();
  return session;
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

export const getAdditionals = async () => {
  const response = await fetch(`${apiUrl}/additional`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const responseData = await response.json();
  return responseData;
};
