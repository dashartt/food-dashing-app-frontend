import type {
  IAccount,
  IAddress,
  IAdminOrder,
  IClientAccount,
  IMenu,
  IMenuItem,
  IOrder,
  IOrderSearchParams,
} from "@/types";

const SERVER_URL = "https://macacoloucopizzaria-backend.vercel.app";
// const SERVER_URL = "http://localhost:3003";

export const getMenuItemByName = async (name: string) => {
  const response = await fetch(`${SERVER_URL}/menu/item/${name}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const menuItem = (await response.json()) as IMenuItem;
  return menuItem;
};

export const getMenuItems = async () => {
  const response = await fetch(`${SERVER_URL}/menu`, {
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenu;
};

export const getMenuItemsByCategory = async (category: string) => {
  const response = await fetch(`${SERVER_URL}/menu/${category}`, {
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const data = await response.json();

  return data as IMenuItem[];
};

export const signup = async ({
  fullName,
  phone,
  password,
  role = "client",
  addressesId,
}: {
  fullName: string;
  password?: string;
  phone: string;
  role?: string;
  addressesId?: string[];
}) => {
  const response = await fetch(`${SERVER_URL}/account/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      fullName,
      phone,
      ...(addressesId && { addressesId }),
      ...(password && { password }),
      role,
    }),
  });

  if (!response.ok) return null;

  const responseData = (await response.json()) as {
    isSuccess: boolean;
    message: string;
    data: IClientAccount;
  };

  return responseData;
};

export const signin = async ({
  phone,
  password,
}: {
  password: string;
  phone: string;
}) => {
  const response = await fetch(`${SERVER_URL}/account/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ password, phone }),
  });

  const responseData = (await response.json()) as {
    isSuccess: boolean;
    message: string;
    data: {
      token: string;
      session: IClientAccount;
    };
  };

  return responseData;
};

export const updateClientAccount = async (
  clientDTO: Omit<IAccount, "password" | "role">
) => {
  const response = await fetch(`${SERVER_URL}/account`, {
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
  const response = await fetch(`${SERVER_URL}/address`, {
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
  const response = await fetch(`${SERVER_URL}/address/${addressId}`, {
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
  const response = await fetch(`${SERVER_URL}/address/${addressId}`, {
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
  await fetch(`${SERVER_URL}/orders/${orderId}?status=${status}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    mode: "cors",
  });
};

export const addOrder = async (orderDTO: IOrder) => {
  const response = await fetch(`${SERVER_URL}/orders`, {
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

  const response = await fetch(`${SERVER_URL}/orders?${params}`, {
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
  const response = await fetch(`${SERVER_URL}/orders/client/${clientId}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) return null;

  const orders = (await response.json()) as IAdminOrder[];

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const response = await fetch(`${SERVER_URL}/orders/${orderId}`, {
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
  const response = await fetch(`${SERVER_URL}/account/auth`, {
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
  const response = await fetch(`${SERVER_URL}/account/auth`, {
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
