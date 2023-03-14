import axios from "axios";

import type { IApiResponse, ICheckShopNameResponse } from "@/types/api.type";
import type { IShopSettings } from "@/types/shop.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const addShop = async (payload: Partial<IShopSettings>) => {
  const response = await fetch(`${API_URL}/shops`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ ...payload }),
  });

  const responseData = await response.json();
  if (response.status !== 201) {
    return responseData as { message: string; data: null };
  }
  return responseData as { message: string; data: IShopSettings };
};

export const checkShopNameDuplicity = async (shopName: string) =>
  axios
    .get(`${API_URL}/shops/?shopName=${shopName}`)
    .then((response) => response.data as IApiResponse<ICheckShopNameResponse>)
    .catch(
      (error) => error.response.data as IApiResponse<ICheckShopNameResponse>
    );

export const getShops = async (ownerId: string) => {
  const response = await fetch(`${API_URL}/user/${ownerId}/shops`, {
    method: "GET",
    mode: "cors",
  });

  const responseData = await response.json();
  if (response.status === 200) {
    return responseData as { message: string; data: IShopSettings[] };
  }
  return responseData as { message: string; data: null };
};
