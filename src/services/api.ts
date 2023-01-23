import type {
  IAddress,
  IAdminOrder,
  IClient,
  IMenu,
  IMenuItem,
  IOrder,
} from "@/types";

const SERVER_URL = "https://macacoloucopizzaria.osc-fr1.scalingo.io:3001";

export const getMenuItemByName = async (name: string) => {
  const response = await fetch(`${SERVER_URL}/menu/item/${name}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const menuItem = (await response.json()) as IMenuItem;
  return menuItem;
};

export const getMenuItems = async () => {
  const response = await fetch(`${SERVER_URL}/menu`, {
    method: "GET",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenu;
};

export const getMenuItemsByCategory = async (category: string) => {
  const response = await fetch(`${SERVER_URL}/menu/${category}`, {
    method: "GET",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenuItem[];
};

export const addAddress = async (addressDTO: IAddress) => {
  const response = await fetch(`${SERVER_URL}/address`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(addressDTO),
  });

  if (!response.ok) return null;

  const address = (await response.json()) as { addressId: string };

  return address.addressId;
};

export const addClient = async (clientDTO: IClient) => {
  const response = await fetch(`${SERVER_URL}/client`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(clientDTO),
  });

  if (!response.ok) return null;

  const client = (await response.json()) as { clientId: string };

  return client.clientId;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  await fetch(`${SERVER_URL}/orders/${orderId}?status=${status}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });
};

export const addOrder = async (orderDTO: IOrder) => {
  await fetch(`${SERVER_URL}/orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(orderDTO),
  });
};

export const getOrders = async () => {
  const response = await fetch(`${SERVER_URL}/orders/`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getClientOrders = async (clientId: string) => {
  const response = await fetch(`${SERVER_URL}/orders/client/${clientId}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const response = await fetch(`${SERVER_URL}/orders/${orderId}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const order = (await response.json()) as IAdminOrder;

  return order;
};
