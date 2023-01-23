import type {
  IAddress,
  IAdminOrder,
  IClient,
  IMenu,
  IMenuItem,
  IOrder,
} from "@/types";

export const getMenuItemByName = async (name: string) => {
  const response = await fetch(`http://localhost:3001/menu/item/${name}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const menuItem = (await response.json()) as IMenuItem;
  return menuItem;
};

export const getMenuItems = async () => {
  const response = await fetch("http://localhost:3001/menu", {
    method: "GET",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenu;
};

export const getMenuItemsByCategory = async (category: string) => {
  const response = await fetch(`http://localhost:3001/menu/${category}`, {
    method: "GET",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenuItem[];
};

export const addAddress = async (addressDTO: IAddress) => {
  const response = await fetch("http://localhost:3001/address", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(addressDTO),
  });

  if (!response.ok) return null;

  const address = (await response.json()) as { addressId: string };

  return address.addressId;
};

export const addClient = async (clientDTO: IClient) => {
  const response = await fetch("http://localhost:3001/client", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(clientDTO),
  });

  if (!response.ok) return null;

  const client = (await response.json()) as { clientId: string };

  return client.clientId;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  await fetch(`http://localhost:3001/orders/${orderId}?status=${status}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });
};

export const addOrder = async (orderDTO: IOrder) => {
  await fetch("http://localhost:3001/orders", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(orderDTO),
  });
};

export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/orders/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getClientOrders = async (clientId: string) => {
  const response = await fetch(
    `http://localhost:3001/orders/client/${clientId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  );

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) return null;

  const order = (await response.json()) as IAdminOrder;

  return order;
};
